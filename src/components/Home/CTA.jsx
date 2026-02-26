import { FiArrowRight, FiCheckCircle, FiBook, FiAward } from "react-icons/fi";
import { Link } from "react-router";

const CTA = () => {
  return (
    <div className="py-20 bg-gradient-to-r from-blue-500 via-blue-700 to-indigo-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6">
            <div className="inline-block">
              <span className="text-sm font-semibold text-blue-200 bg-blue-500/20 px-4 py-2 rounded-full">
                🎯 Get Started Today
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Ready to Transform Your Learning Journey?
            </h2>

            <p className="text-lg text-blue-100">
              Join thousands of students and expert tutors. Choose your
              path to learn from the best or share your expertise.
            </p>

            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3">
                <FiCheckCircle className="h-6 w-6 text-blue-300 flex-shrink-0 mt-0.5" />
                <p className="text-blue-100">
                  <span className="font-semibold text-white">
                    Expert Tutors
                  </span>{" "}
                  - Verified professionals ready to help
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FiCheckCircle className="h-6 w-6 text-blue-300 flex-shrink-0 mt-0.5" />
                <p className="text-blue-100">
                  <span className="font-semibold text-white">
                    Flexible Learning
                  </span>{" "}
                  - Learn at your own pace
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FiCheckCircle className="h-6 w-6 text-blue-300 flex-shrink-0 mt-0.5" />
                <p className="text-blue-100">
                  <span className="font-semibold text-white">
                    Progress Tracked
                  </span>{" "}
                  - Monitor your growth with assignments & topics
                </p>
              </div>
            </div>
          </div>

          {/* Right CTA Cards */}
          <div className="space-y-4">
            {/* Student Card */}
            <Link
              to="/register"
              className="block group p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <FiBook className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    For Students
                  </h3>
                  <p className="text-slate-600 mt-2">
                    Find expert tutors and accelerate your learning
                  </p>
                </div>
                <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                  Get Started
                  <FiArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>

            {/* Tutor Card */}
            <Link
              to="/register"
              className="block group p-8 bg-indigo-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-indigo-200"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                  <FiAward className="w-7 h-7 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    For Tutors
                  </h3>
                  <p className="text-slate-600 mt-2">
                    Share your expertise and build your tutoring business
                  </p>
                </div>
                <div className="flex items-center gap-2 text-indigo-600 font-semibold group-hover:gap-3 transition-all">
                  Start Teaching
                  <FiArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 pt-16 border-t border-blue-400/30 grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white">
              50K+
            </div>
            <p className="text-blue-200 mt-2">Active Students</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white">5K+</div>
            <p className="text-blue-200 mt-2">Expert Tutors</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white">98%</div>
            <p className="text-blue-200 mt-2">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
