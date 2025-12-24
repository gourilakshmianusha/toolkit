
import React from 'react';
import Navbar from './components/Navbar';
import LabReportTool from './pages/LabReportTool';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow">
        <LabReportTool />
      </main>
      <footer className="bg-white border-t border-slate-200 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">PsychReport.AI</span>
            <span>&bull;</span>
            <span>Confidential Assessment Support</span>
          </div>
          <div className="text-center md:text-right">
            &copy; {new Date().getFullYear()} Clinical Psychology Services. Powered by Gemini Pro.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
