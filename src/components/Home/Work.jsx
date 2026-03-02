import React from "react";
import { FiSearch, FiSend, FiPlay, FiUserPlus, FiEdit, FiCheckCircle } from "react-icons/fi";

const studentSteps = [
  { icon: FiSearch, title: "Browse Tuitions", desc: "Search and filter tuitions by subject, class, and tutor" },
  { icon: FiSend, title: "Apply for Tuition", desc: "Submit your application with one click" },
  { icon: FiPlay, title: "Start Learning", desc: "Get selected and begin your learning journey" },
];

const tutorSteps = [
  { icon: FiUserPlus, title: "Register as Tutor", desc: "Create your tutor profile with qualifications" },
  { icon: FiEdit, title: "Post Tuitions", desc: "Add tuition details and manage availability" },
  { icon: FiCheckCircle, title: "Teach Students", desc: "Select applicants and start teaching" },
];

const StepCard = ({ icon: Icon, title, desc, step, color }) => (
  <div className="card-modern-interactive p-6 text-center">
    <div className={`w-12 h-12 rounded-2xl bg-${color}-50 flex items-center justify-center mx-auto mb-4 relative`}>
      <Icon className={`h-5 w-5 text-${color}-600`} />
      <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-${color}-600 text-white text-xs font-bold flex items-center justify-center`}>
        {step}
      </span>
    </div>
    <h3 className="text-base font-semibold text-slate-900 mb-1">{title}</h3>
    <p className="text-sm text-slate-500">{desc}</p>
  </div>
);

const Work = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 mb-4">
            How It Works
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Get started in 3 simple steps
          </h2>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider text-center mb-6">For Students</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {studentSteps.map((step, i) => (
                <StepCard key={step.title} {...step} step={i + 1} color="indigo" />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-violet-600 uppercase tracking-wider text-center mb-6">For Tutors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {tutorSteps.map((step, i) => (
                <StepCard key={step.title} {...step} step={i + 1} color="violet" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
