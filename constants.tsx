
import React from 'react';
import { 
  Activity, 
  Heart, 
  Stethoscope, 
  Thermometer, 
  Microscope, 
  FlaskConical, 
  Eye, 
  Brain, 
  Zap, 
  Syringe, 
  Ambulance, 
  Bone, 
  Scissors, 
  Droplets,
  Wind,
  Coffee,
  Tablets,
  Users
} from 'lucide-react';
import { HospitalService } from './types';

export const PSYCHOLOGICAL_TESTS = [
  "WAIS-IV (Wechsler Adult Intelligence Scale)",
  "WISC-V (Wechsler Intelligence Scale for Children)",
  "MMPI-3 (Minnesota Multiphasic Personality Inventory)",
  "BDI-II (Beck Depression Inventory)",
  "BAI (Beck Anxiety Inventory)",
  "NEO-PI-3 (NEO Personality Inventory)",
  "TAT (Thematic Apperception Test)",
  "Rorschach Inkblot Test",
  "PHQ-9 (Patient Health Questionnaire)",
  "GAD-7 (General Anxiety Disorder)",
  "16PF (Sixteen Personality Factor Questionnaire)",
  "Conners 3 (ADHD Assessment)",
  "MOCA (Montreal Cognitive Assessment)",
  "VABS-3 (Vineland Adaptive Behavior Scales)",
  "ADOS-2 (Autism Diagnostic Observation Schedule)",
  "PCL-5 (PTSD Checklist)",
  "Millon Clinical Multiaxial Inventory (MCMI-IV)",
  "Other / Custom Assessment"
];

export const HOSPITAL_SERVICES: HospitalService[] = [
  {
    id: 'emergency',
    name: 'Emergency & Trauma',
    category: 'Diagnostic',
    description: '24/7 rapid response for critical care and emergency situations.',
    longDescription: 'Our Emergency and Trauma Department is staffed with world-class specialists and equipped with cutting-edge technology to handle life-threatening situations 24/7. We provide immediate triage, stabilization, and advanced surgical interventions.',
    icon: 'Zap'
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    category: 'Support',
    description: 'Fully stocked inpatient and outpatient pharmacy services.',
    longDescription: 'Our 24/7 pharmacy ensures that life-saving medications are always available. We follow strict international protocols for medication safety, storage, and dispensing.',
    icon: 'Tablets'
  },
  {
    id: 'laboratory',
    name: 'Well Equipped Laboratory',
    category: 'Diagnostic',
    description: 'Comprehensive pathology and diagnostic testing.',
    longDescription: 'Equipped with the latest automated analyzers, our lab provides accurate and timely results for blood work, microbiology, histopathology, and specialized diagnostics.',
    icon: 'Microscope'
  },
  {
    id: 'diagnostics',
    name: 'TMT / ECHO / USG & X-Ray',
    category: 'Diagnostic',
    description: 'Advanced imaging and cardiac functional testing.',
    longDescription: 'Our radiology department offers high-resolution Ultrasound, Digital X-Ray, Treadmill Testing (TMT), and Echocardiography for precise clinical evaluation.',
    icon: 'Activity'
  },
  {
    id: 'cath-lab',
    name: 'Cath Lab',
    category: 'Specialized',
    description: 'Precision cardiac interventions and angiography.',
    longDescription: 'Our state-of-the-art Catheterization Lab performs complex angioplasties, stenting, and pacemaker implantations with high success rates.',
    icon: 'Heart'
  },
  {
    id: 'dialysis',
    name: 'Dialysis',
    category: 'Specialized',
    description: 'Modern renal replacement therapy and kidney care.',
    longDescription: 'We provide sterile and comfortable dialysis sessions for patients with chronic and acute renal failure, supervised by senior nephrologists.',
    icon: 'Droplets'
  },
  {
    id: 'modular-ot',
    name: 'Modular OT',
    category: 'Support',
    description: 'Infection-free advanced surgical suites.',
    longDescription: 'Our Modular Operation Theatres are designed with laminar airflow and HEPA filters to minimize infection risk during complex surgeries.',
    icon: 'Scissors'
  },
  {
    id: 'icu',
    name: 'Intensive Care Unit (ICU / CCU / HDU)',
    category: 'Clinical',
    description: 'Critical monitoring for high-dependency patients.',
    longDescription: 'Our ICU and CCU wings are equipped with multi-channel monitors and ventilators, providing 1:1 patient-nurse ratios for the highest level of care.',
    icon: 'Activity'
  },
  {
    id: 'ambulance',
    name: 'Ambulance Services',
    category: 'Support',
    description: 'Advanced Life Support (ALS) mobile units.',
    longDescription: 'Our ambulances are mobile ICUs, equipped with ventilators, defibrillators, and trained paramedics to provide care while in transit.',
    icon: 'Ambulance'
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    category: 'Clinical',
    description: 'Expert care for all heart-related conditions.',
    longDescription: 'From preventive screenings to advanced invasive procedures, our cardiology department handles all heart health needs.',
    icon: 'Heart'
  },
  {
    id: 'ctvs',
    name: 'Cardio Thoracic & Vascular Surgery',
    category: 'Specialized',
    description: 'Advanced heart and lung surgical procedures.',
    longDescription: 'Specializing in open-heart surgery, bypass procedures, and thoracic interventions by highly experienced surgeons.',
    icon: 'Activity'
  },
  {
    id: 'neurology',
    name: 'Neurology',
    category: 'Clinical',
    description: 'Specialized treatment for brain and nervous system disorders.',
    longDescription: 'Management of stroke, epilepsy, migraines, and neurodegenerative diseases with advanced neuro-diagnostic support.',
    icon: 'Brain'
  },
  {
    id: 'nephrology',
    name: 'Nephrology',
    category: 'Clinical',
    description: 'Comprehensive kidney and renal care.',
    longDescription: 'Diagnosis and management of kidney diseases, hypertension, and electrolyte imbalances.',
    icon: 'Droplets'
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Spine Surgery',
    category: 'Clinical',
    description: 'Expertise in bone, joint, and spine treatments.',
    longDescription: 'Offering joint replacements, complex fracture management, and minimally invasive spine surgeries.',
    icon: 'Bone'
  },
  {
    id: 'ent',
    name: 'ENT',
    category: 'Clinical',
    description: 'Specialized care for Ear, Nose, and Throat.',
    longDescription: 'Comprehensive treatment for hearing disorders, sinusitis, and vocal issues.',
    icon: 'Wind'
  }
];

export const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Zap': return <Zap className="w-6 h-6" />;
    case 'Tablets': return <Tablets className="w-6 h-6" />;
    case 'Microscope': return <Microscope className="w-6 h-6" />;
    case 'Activity': return <Activity className="w-6 h-6" />;
    case 'Heart': return <Heart className="w-6 h-6" />;
    case 'Droplets': return <Droplets className="w-6 h-6" />;
    case 'Scissors': return <Scissors className="w-6 h-6" />;
    case 'Ambulance': return <Ambulance className="w-6 h-6" />;
    case 'Brain': return <Brain className="w-6 h-6" />;
    case 'Bone': return <Bone className="w-6 h-6" />;
    case 'Wind': return <Wind className="w-6 h-6" />;
    default: return <Stethoscope className="w-6 h-6" />;
  }
};
