
import React from 'react';
import { HeartPulse, Brain, ShieldCheck } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">
              Psych<span className="text-indigo-600">Report</span>.AI
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-slate-500 text-sm font-medium">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              Confidential & Secure
            </div>
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold bg-indigo-50 px-4 py-2 rounded-full text-sm">
              <Brain className="w-4 h-4" />
              Psychologist Suite
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
