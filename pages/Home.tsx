
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Phone, Clock, MapPin } from 'lucide-react';
import { HOSPITAL_SERVICES, getIcon } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/1920/1080?medical=1" 
            alt="Hospital Interior" 
            className="w-full h-full object-cover brightness-[0.3]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md border border-blue-400/30 text-blue-400 px-4 py-2 rounded-full mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">Always Open - 24 Hours / 7 Days</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Advanced Healthcare <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Care Beyond Boundaries</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Experience world-class medical excellence with cutting-edge technology and compassionate care at 24/7 Hospital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/services" 
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl hover:-translate-y-1"
            >
              Our Services
            </Link>
            <Link 
              to="/lab-tool" 
              className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-xl hover:-translate-y-1"
            >
              Lab Report Tool
            </Link>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl flex items-start gap-4 border border-slate-100">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1">Emergency Call</h3>
            <p className="text-2xl font-black text-blue-600">+1 (247) 900-1000</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl flex items-start gap-4 border border-slate-100">
          <div className="bg-teal-100 p-3 rounded-xl text-teal-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1">Open 24/7</h3>
            <p className="text-slate-600">Round-the-clock specialists always available.</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl flex items-start gap-4 border border-slate-100">
          <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1">Location</h3>
            <p className="text-slate-600">Medical District, Healthcare Ave, City Center</p>
          </div>
        </div>
      </div>

      {/* Services Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Specialized Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We provide comprehensive healthcare solutions across various departments with state-of-the-art facilities.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {HOSPITAL_SERVICES.slice(0, 6).map((service) => (
              <Link 
                key={service.id} 
                to={`/service/${service.id}`}
                className="group bg-slate-50 p-8 rounded-3xl hover:bg-white hover:shadow-2xl transition-all border border-slate-100"
              >
                <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
            >
              View All 25+ Departments <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">Why 24/7 Hospital Stands Out?</h2>
            <div className="space-y-6">
              {[
                "International safety standards and protocols.",
                "Team of 100+ highly qualified medical specialists.",
                "Latest diagnostic technology and modular operating suites.",
                "Patient-centric care and comfortable healing environment.",
                "Transparent billing and round-the-clock support."
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="text-lg text-slate-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://picsum.photos/600/800?doctor=1" 
              alt="Medical Team" 
              className="rounded-3xl shadow-2xl w-full h-[600px] object-cover"
            />
            <div className="absolute -bottom-8 -left-8 bg-blue-600 p-8 rounded-2xl shadow-xl text-white max-w-xs">
              <p className="text-3xl font-bold mb-2">15+</p>
              <p className="font-medium opacity-90">Years of serving the community with excellence and trust.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
