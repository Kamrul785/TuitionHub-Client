import { FiArrowRight, FiCheckCircle, FiBook, FiAward } from "react-icons/fi";
import { Link } from "react-router";

const CTA = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
              Get Started Today
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Ready to Transform Your Learning Journey?
            </h2>

            <p className="text-slate-400 leading-relaxed">
              Join thousands of students and expert tutors. Choose your path to learn from the best or share your expertise.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { label: "Expert Tutors", desc: "Verified professionals ready to help" },
                { label: "Flexible Learning", desc: "Learn at your own pace" },
                { label: "Progress Tracked", desc: "Monitor your growth with assignments & topics" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <FiCheckCircle className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-300 text-sm">
                    <span className="font-semibold text-white">{item.label}</span>  {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Link
              to="/register"
              className="block group card-modern-interactive p-6 hover:border-indigo-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                  <FiBook className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">For Students</h3>
                  <p className="text-sm text-slate-500 mb-3">Find expert tutors and accelerate your learning</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 group-hover:gap-2.5 transition-all">
                    Get Started <FiArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>

            <Link
              to="/register"
              className="block group card-modern-interactive p-6 hover:border-violet-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-100 transition-colors">
                  <FiAward className="w-5 h-5 text-violet-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">For Tutors</h3>
                  <p className="text-sm text-slate-500 mb-3">Share your expertise and build your tutoring business</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 group-hover:gap-2.5 transition-all">
                    Start Teaching <FiArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-slate-800 grid grid-cols-3 gap-8">
          {[
            { value: "50K+", label: "Active Students" },
            { value: "5K+", label: "Expert Tutors" },
            { value: "98%", label: "Satisfaction Rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTA;
