import React from 'react';
import { FiAward, FiSearch, FiTrendingUp, FiStar, FiFileText, FiTarget } from 'react-icons/fi';

const features = [
  { icon: FiAward, title: 'Expert Tutors', description: 'Learn from qualified and experienced tutors across all subjects', color: 'indigo' },
  { icon: FiSearch, title: 'Easy Search', description: 'Filter tuitions by class, subject, and tutor preferences', color: 'emerald' },
  { icon: FiTrendingUp, title: 'Track Progress', description: 'Monitor your learning journey with detailed progress tracking', color: 'violet' },
  { icon: FiStar, title: 'Reviews & Ratings', description: 'Read honest reviews from students to make informed decisions', color: 'amber' },
  { icon: FiFileText, title: 'Assignments', description: 'Get assignments and practice materials from your tutor', color: 'sky' },
  { icon: FiTarget, title: 'Personalized Learning', description: 'One-on-one attention tailored to your learning needs', color: 'rose' },
];

const FeatureProduct = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 mb-4">
            Features
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Why Choose TuitionHub?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Everything you need for a successful learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card-modern-interactive p-6 group shadow-sm hover:shadow-md transition-shadow rounded-lg"
            >
              <div className={`w-10 h-10 rounded-xl bg-${feature.color}-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`h-5 w-5 text-${feature.color}-600`} />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureProduct;