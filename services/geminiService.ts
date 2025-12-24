
import { GoogleGenAI, Type } from "@google/genai";
import { LabReportData, AIReportName } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Extracts structured data from a psychological assessment image
 */
export const extractReportDataFromImage = async (base64Image: string, mimeType: string): Promise<Partial<LabReportData>> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            {
              inlineData: {
                data: base64Image,
                mimeType: mimeType,
              },
            },
            {
              text: "Extract clinical psychological data from this assessment image. Return only valid JSON matching this structure: { patientName: string, patientAge: string, patientGender: 'Male'|'Female'|'Other', testType: string, results: string, observations: string }. Map 'Client' or 'Patient' to patientName. Map 'Assessment' or 'Test Battery' to testType. Map 'Scores' to results. Map 'Mental Status' or 'Behavioral' to observations.",
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            patientName: { type: Type.STRING },
            patientAge: { type: Type.STRING },
            patientGender: { type: Type.STRING },
            testType: { type: Type.STRING },
            results: { type: Type.STRING },
            observations: { type: Type.STRING },
          },
          required: ["patientName", "patientAge", "patientGender", "testType", "results", "observations"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text);
  } catch (error: any) {
    if (error?.message?.includes('token count')) {
      throw new Error("The image file is too high-resolution or large for the AI to process in one go. Please try a smaller file or a screenshot.");
    }
    console.error("Error extracting report data:", error);
    throw error;
  }
};

/**
 * Extracts structured data from a CSV or raw text file (Psychological Context)
 */
export const extractReportDataFromText = async (fileContent: string): Promise<Partial<LabReportData>> => {
  try {
    // Truncate content to avoid token limit errors (100k chars is ~25k tokens, well within limits)
    // Most psychological reports have key info at the beginning
    const truncatedContent = fileContent.length > 80000 
      ? fileContent.substring(0, 80000) + "... [Content Truncated for Processing]" 
      : fileContent;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Parse the following data from a psychological test/assessment and map it to a structured JSON format. 
      
      DATA SOURCE:
      """
      ${truncatedContent}
      """

      Return only valid JSON matching this structure: { patientName: string, patientAge: string, patientGender: 'Male'|'Female'|'Other', testType: string, results: string, observations: string }. 
      Focus on identifying psychological test names (e.g., MMPI, WAIS, BDI) and clinical observations. If multiple patients are found, extract the first one.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            patientName: { type: Type.STRING },
            patientAge: { type: Type.STRING },
            patientGender: { type: Type.STRING },
            testType: { type: Type.STRING },
            results: { type: Type.STRING },
            observations: { type: Type.STRING },
          },
          required: ["patientName", "patientAge", "patientGender", "testType", "results", "observations"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text);
  } catch (error: any) {
    if (error?.message?.includes('token count')) {
      throw new Error("The file content is too large to process. Please try uploading a smaller segment or a simplified CSV.");
    }
    console.error("Error extracting report data from text:", error);
    throw error;
  }
};

/**
 * Generates a professional psychological report title and executive clinical summary
 */
export const generateReportDetails = async (data: LabReportData): Promise<AIReportName> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert clinical psychologist. Based on the following assessment data, suggest a formal report title and a 3-sentence executive clinical summary including diagnostic impressions if applicable.
      Client: ${data.patientName} (${data.patientAge}, ${data.patientGender})
      Assessment: ${data.testType}
      Scores/Data: ${data.results}
      Mental Status/Observations: ${data.observations}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedTitle: {
              type: Type.STRING,
              description: "A formal title (e.g., 'Neuropsychological Assessment Summary' or 'Psychodiagnostic Evaluation Report')"
            },
            summary: {
              type: Type.STRING,
              description: "A concise 3-sentence clinical summary of the findings."
            }
          },
          required: ["suggestedTitle", "summary"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      suggestedTitle: result.suggestedTitle || "Psychological Assessment Report",
      summary: result.summary || "Findings documented for clinical review."
    };
  } catch (error) {
    console.error("Error generating report details:", error);
    return {
      suggestedTitle: `Assessment Report: ${data.testType}`,
      summary: "Automatic clinical summary generation unavailable. Manual review required."
    };
  }
};
