import React from "react";

const Work = () => {
  return (
    <div>
      <div className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Students */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-2xl font-bold mb-2">Browse Tuitions</h3>
              <p className="text-gray-600">
                Search and filter tuitions by subject, class, and tutor
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-2xl font-bold mb-2">Apply for Tuition</h3>
              <p className="text-gray-600">
                Submit your application with one click
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-2xl font-bold mb-2">Start Learning</h3>
              <p className="text-gray-600">
                Get selected and begin your learning journey
              </p>
            </div>
          </div>

          <div className="divider my-12">OR</div>

          {/* For Tutors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-2xl font-bold mb-2">Register as Tutor</h3>
              <p className="text-gray-600">
                Create your tutor profile with qualifications
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-2xl font-bold mb-2">Post Tuitions</h3>
              <p className="text-gray-600">
                Add tuition details and manage availability
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-2xl font-bold mb-2">Teach Students</h3>
              <p className="text-gray-600">
                Select applicants and start teaching
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
