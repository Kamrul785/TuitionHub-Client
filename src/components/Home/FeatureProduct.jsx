import React from 'react';

const FeatureProduct = () => {
  const features = [
    {
      icon: '🎓',
      title: 'Expert Tutors',
      description: 'Learn from qualified and experienced tutors across all subjects',
    },
    {
      icon: '🔍',
      title: 'Easy Search',
      description: 'Filter tuitions by class, subject, and tutor preferences',
    },
    {
      icon: '📊',
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed progress tracking',
    },
    {
      icon: '💬',
      title: 'Reviews & Ratings',
      description: 'Read honest reviews from students to make informed decisions',
    },
    {
      icon: '📝',
      title: 'Assignments',
      description: 'Get assignments and practice materials from your tutor',
    },
    {
      icon: '🎯',
      title: 'Personalized Learning',
      description: 'One-on-one attention tailored to your learning needs',
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Why Choose TuitionHub?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Everything you need for a successful learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="card-body items-center text-center p-6">
                <div className="text-5xl sm:text-6xl mb-4">{feature.icon}</div>
                <h3 className="card-title text-xl sm:text-2xl mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureProduct;