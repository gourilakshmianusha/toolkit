
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { HOSPITAL_SERVICES, getIcon } from '../constants';
import { ChevronLeft, ArrowRight, ShieldCheck, Clock, Users } from 'lucide-react';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = HOSPITAL_SERVICES.find(s => s.id === id);

  if (!service) return <Navigate to="/services" />;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link to="/services" className="inline-flex items-center gap-2 text-blue-600 font-medium mb-8 hover:underline">
          <ChevronLeft className="w-4 h-4" /> Back to All Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
              <div className="mb-8 p-4 bg-blue-50 rounded-2xl w-fit text-blue-600">
                {getIcon(service.icon)}
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-6">{service.name}</h1>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">{service.category}</span>
                <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                  <Clock className="w-4 h-4" /> 24/7 Available
                </span>
              </div>
              <p className="text-xl text-slate-700 leading-relaxed mb-10">
                {service.longDescription}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-100">
                <div className="flex flex-col gap-2">
                  <ShieldCheck className="w-8 h-8 text-blue-600 mb-2" />
                  <h4 className="font-bold">Safe & Sterile</h4>
                  <p className="text-sm text-slate-500">Adhering to strict international safety protocols.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Users className="w-8 h-8 text-teal-600 mb-2" />
                  <h4 className="font-bold">Expert Team</h4>
                  <p className="text-sm text-slate-500">Staffed by board-certified specialists.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Clock className="w-8 h-8 text-indigo-600 mb-2" />
                  <h4 className="font-bold">Fast Results</h4>
                  <p className="text-sm text-slate-500">Quick turnaround for critical diagnostics.</p>
                </div>
              </div>
            </div>

            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
              <img 
                src={`https://picsum.photos/1200/800?${service.id}=1`} 
                alt={service.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-200">
              <h3 className="text-2xl font-bold mb-4">Book a Consultation</h3>
              <p className="opacity-90 mb-8 leading-relaxed">
                Connect with our specialists for personalized care and expert medical advice.
              </p>
              <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-bold shadow-lg hover:bg-slate-50 transition-colors">
                Book Appointment
              </button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold mb-6">Other Departments</h3>
              <div className="space-y-4">
                {HOSPITAL_SERVICES.filter(s => s.id !== service.id).slice(0, 5).map(other => (
                  <Link 
                    key={other.id} 
                    to={`/service/${other.id}`}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100"
                  >
                    <span className="font-medium text-slate-700">{other.name}</span>
                    <ArrowRight className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
