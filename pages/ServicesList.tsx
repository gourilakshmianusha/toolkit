
import React from 'react';
import { Link } from 'react-router-dom';
import { HOSPITAL_SERVICES, getIcon } from '../constants';
import { ArrowRight } from 'lucide-react';

const ServicesList: React.FC = () => {
  const categories = Array.from(new Set(HOSPITAL_SERVICES.map(s => s.category)));

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Explore Our Departments</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">From diagnostic screening to advanced surgical interventions, we provide specialized care across every medical domain.</p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-20">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
              {category} Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HOSPITAL_SERVICES.filter(s => s.category === category).map((service) => (
                <Link 
                  key={service.id} 
                  to={`/service/${service.id}`}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group"
                >
                  <div className="mb-4 text-blue-600 p-2 bg-blue-50 rounded-lg w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="text-blue-600 font-medium text-sm flex items-center gap-1">
                    Details <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
