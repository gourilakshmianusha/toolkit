
export interface HospitalService {
  id: string;
  name: string;
  category: 'Diagnostic' | 'Clinical' | 'Support' | 'Specialized';
  description: string;
  longDescription: string;
  icon: string;
}

export interface LabReportData {
  patientName: string;
  patientAge: string;
  patientGender: string;
  testType: string;
  results: string;
  observations: string;
  reportDate: string;
}

export interface AIReportName {
  suggestedTitle: string;
  summary: string;
}
