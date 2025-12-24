
import React from 'react';
import { Save, Download, RefreshCw, FileText, CheckCircle, AlertCircle, Wand2, User, Brain, ClipboardList, Upload, FileUp, Loader2, FileSpreadsheet, Scale, ChevronDown } from 'lucide-react';
import { generateReportDetails, extractReportDataFromImage, extractReportDataFromText } from '../services/geminiService';
import { LabReportData, AIReportName } from '../types';
import { PSYCHOLOGICAL_TESTS } from '../constants';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import saveAs from 'file-saver';

const LabReportTool: React.FC = () => {
  const [data, setData] = React.useState<LabReportData>({
    patientName: '',
    patientAge: '',
    patientGender: 'Male',
    testType: '',
    results: '',
    observations: '',
    reportDate: new Date().toISOString().split('T')[0]
  });

  const [aiDetails, setAiDetails] = React.useState<AIReportName | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isExtracting, setIsExtracting] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large (max 10MB). Please upload a smaller image or CSV.");
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setIsExtracting(true);
    try {
      let extracted: Partial<LabReportData>;

      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        const text = await fileToText(file);
        extracted = await extractReportDataFromText(text);
      } else if (file.type.startsWith('image/')) {
        const base64 = await fileToBase64(file);
        const cleanedBase64 = base64.split(',')[1];
        extracted = await extractReportDataFromImage(cleanedBase64, file.type);
      } else {
        alert("Unsupported file type. Please upload a CSV or an Image.");
        setIsExtracting(false);
        return;
      }
      
      setData(prev => ({
        ...prev,
        ...extracted,
        patientGender: (extracted.patientGender as any) || prev.patientGender
      }));
      
      if (extracted.patientName || extracted.testType) {
        const fullData = { ...data, ...extracted } as LabReportData;
        const details = await generateReportDetails(fullData);
        setAiDetails(details);
      }
    } catch (error: any) {
      console.error("Extraction failed", error);
      alert(error.message || "Failed to extract data. Please ensure the file is readable and try again.");
    } finally {
      setIsExtracting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const fileToText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const generateAIName = async () => {
    if (!data.patientName || !data.testType) {
      alert("Please enter at least Client Name and Assessment Type.");
      return;
    }
    setIsGenerating(true);
    const result = await generateReportDetails(data);
    setAiDetails(result);
    setIsGenerating(false);
  };

  const downloadAsWord = async () => {
    setIsDownloading(true);
    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              text: "24/7 HOSPITAL PSYCHOLOGICAL SERVICES",
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Confidential Clinical Documentation", italics: true }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({ text: "", spacing: { after: 400 } }),
            
            new Paragraph({
              children: [
                new TextRun({ text: "ASSESSMENT TITLE: ", bold: true }),
                new TextRun({ text: aiDetails?.suggestedTitle || `${data.testType} Evaluation` }),
              ],
            }),
            new Paragraph({ text: "" }),
            
            new Paragraph({
              children: [
                new TextRun({ text: "CLIENT INFORMATION", bold: true, size: 24 }),
              ],
            }),
            new Paragraph({ text: `Name: ${data.patientName}` }),
            new Paragraph({ text: `Age/Gender: ${data.patientAge} / ${data.patientGender}` }),
            new Paragraph({ text: `Date of Evaluation: ${data.reportDate}` }),
            new Paragraph({ text: "", spacing: { after: 400 } }),

            new Paragraph({
              children: [
                new TextRun({ text: "ASSESSMENT BATTERY", bold: true, size: 24 }),
              ],
            }),
            new Paragraph({ text: `Test Type: ${data.testType}` }),
            new Paragraph({ text: `Scores & Metrics: ${data.results}` }),
            new Paragraph({ text: "", spacing: { after: 200 } }),

            new Paragraph({
              children: [
                new TextRun({ text: "BEHAVIORAL OBSERVATIONS", bold: true, size: 24 }),
              ],
            }),
            new Paragraph({ text: data.observations }),
            new Paragraph({ text: "", spacing: { after: 200 } }),

            new Paragraph({
              children: [
                new TextRun({ text: "EXECUTIVE CLINICAL SUMMARY", bold: true, size: 24 }),
              ],
            }),
            new Paragraph({ text: aiDetails?.summary || "Findings reviewed and documented for the clinical record." }),
            new Paragraph({ text: "", spacing: { after: 800 } }),

            new Paragraph({
              text: "Digitally signed by Department of Psychology",
              italics: true,
              alignment: AlignmentType.RIGHT,
            }),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `PsychReport_${data.patientName.replace(/\s+/g, '_')}.docx`);
    } catch (error) {
      console.error("Download failed", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2.5 rounded-xl text-indigo-600">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Psychological Data Intake</h2>
                  <p className="text-slate-500 text-sm font-medium">Generate clinical assessment reports from raw data.</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".csv, image/*"
                  className="hidden"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isExtracting}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-100 transition-all disabled:opacity-50 border border-indigo-100"
                >
                  {isExtracting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4" />
                      <Upload className="w-4 h-4" />
                    </div>
                  )}
                  {isExtracting ? "Analysing File..." : "Upload Assessment"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <User className="w-3 h-3" /> Client Name
                </label>
                <input 
                  type="text" 
                  name="patientName"
                  value={data.patientName}
                  onChange={handleInputChange}
                  placeholder="Full Legal Name"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Scale className="w-3 h-3" /> Assessment Type
                </label>
                <div className="relative group">
                  <select 
                    name="testType"
                    value={PSYCHOLOGICAL_TESTS.includes(data.testType) ? data.testType : "Other / Custom Assessment"}
                    onChange={(e) => {
                      if (e.target.value !== "Other / Custom Assessment") {
                        handleInputChange(e);
                      }
                    }}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a psychological test...</option>
                    {PSYCHOLOGICAL_TESTS.map(test => (
                      <option key={test} value={test}>{test}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                {(!PSYCHOLOGICAL_TESTS.includes(data.testType) || data.testType === "Other / Custom Assessment") && (
                  <input 
                    type="text" 
                    name="testType"
                    value={data.testType === "Other / Custom Assessment" ? "" : data.testType}
                    onChange={handleInputChange}
                    placeholder="Enter custom test name..."
                    className="w-full px-4 py-3 mt-2 bg-indigo-50/50 border border-indigo-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all italic text-indigo-900"
                  />
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Age</label>
                  <input 
                    type="text" 
                    name="patientAge"
                    value={data.patientAge}
                    onChange={handleInputChange}
                    placeholder="Years"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gender</label>
                  <select 
                    name="patientGender"
                    value={data.patientGender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Evaluation Date</label>
                <input 
                  type="date" 
                  name="reportDate"
                  value={data.reportDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Scores & Metric Data</label>
                <textarea 
                  name="results"
                  value={data.results}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Raw scores, T-scores, percentiles..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mental Status & Behavioral Observations</label>
                <textarea 
                  name="observations"
                  value={data.observations}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Appearance, affect, speech, thought content, cooperation..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                />
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button 
                onClick={generateAIName}
                disabled={isGenerating || !data.patientName || !data.testType}
                className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                {isGenerating ? "Processing..." : "Generate Professional Clinical Synthesis"}
              </button>
              <button 
                onClick={() => {
                  setData({
                    patientName: '',
                    patientAge: '',
                    patientGender: 'Male',
                    testType: '',
                    results: '',
                    observations: '',
                    reportDate: new Date().toISOString().split('T')[0]
                  });
                  setAiDetails(null);
                }}
                className="p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 transition-colors"
                title="Reset Intake"
              >
                <RefreshCw className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Preview / Download Side */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <div className={`bg-white rounded-3xl p-8 border-2 transition-all h-full min-h-[500px] flex flex-col ${aiDetails ? 'border-indigo-500 shadow-2xl shadow-indigo-50' : 'border-slate-100 border-dashed'}`}>
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400">Clinical Report Draft</span>
              {aiDetails && <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full"><CheckCircle className="w-3 h-3" /> Verification Ready</span>}
            </div>

            {!aiDetails ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <Brain className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-lg font-bold text-slate-400 mb-2">Psychological Analysis Ready</h3>
                <p className="text-sm text-slate-300 font-medium">Capture or upload raw assessment data. AI will draft a confidential professional report for your review.</p>
              </div>
            ) : (
              <div className="flex-1">
                <div className="mb-8">
                  <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">AI Diagnostic Summary</h4>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">
                    {aiDetails.suggestedTitle}
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Client</h5>
                      <p className="text-sm font-bold text-slate-700 truncate">{data.patientName}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Metrics</h5>
                      <p className="text-sm font-bold text-slate-700">{data.patientAge}Y / {data.patientGender}</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Executive Clinical Synthesis</h5>
                    <div className="p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
                      <p className="text-slate-700 text-sm leading-relaxed font-semibold">
                        {aiDetails.summary}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-auto">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 italic">
                      <AlertCircle className="w-3 h-3" />
                      Confidential AI output. Must be verified by a licensed psychologist.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {aiDetails && (
              <button 
                onClick={downloadAsWord}
                disabled={isDownloading}
                className="mt-10 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl active:scale-[0.98]"
              >
                {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                {isDownloading ? "Generating Doc..." : "Download Clinical Report (.docx)"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabReportTool;
