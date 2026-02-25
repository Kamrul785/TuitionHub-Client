import React from "react";
import { FiSearch, FiMessageCircle, FiCheckCircle, FiCalendar, FiBookOpen, FiShield } from "react-icons/fi";

const steps = [
  {
    icon: FiSearch,
    title: "Find your tutor",
    body: "Filter by subject, class level, availability, and ratings to see the best matches for you.",
  },
  {
    icon: FiMessageCircle,
    title: "Discuss goals",
    body: "Chat safely in-app to align on schedule, learning goals, and expectations before booking.",
  },
  {
    icon: FiCheckCircle,
    title: "Confirm enrollment",
    body: "Lock in sessions, pay securely, and get a clear plan with milestones and materials.",
  },
  {
    icon: FiCalendar,
    title: "Learn & track",
    body: "Attend sessions, complete assignments, and track progress with transparent updates.",
  },
];

const benefits = [
  {
    icon: FiBookOpen,
    title: "Structured learning",
    body: "Milestones, assignments, and feedback loops keep every learner on track.",
  },
  {
    icon: FiShield,
    title: "Safe & reliable",
    body: "Verified tutors, protected payments, and responsive support for parents and students.",
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-12">
        <header className="space-y-3 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary text-sm font-semibold">
            <FiCheckCircle className="h-4 w-4" /> How it works
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">A clear path from search to success</h1>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
            Tuition Hub makes it simple to find the right tutor, agree on goals, and track real progress with safe payments and built-in communication.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="text-sm text-slate-500">Step {idx + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-[1.2fr,0.8fr] items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">What you get with Tuition Hub</h2>
            <p className="text-slate-600 leading-relaxed">
              Every enrollment includes transparent progress tracking, structured milestones, and secure communication so learners and parents stay informed.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary text-xs font-semibold mb-2">
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-blue-100 to-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Ready to begin?</h3>
            <p className="text-sm text-slate-700 mb-4">
              Browse tutors by subject and schedule your first session today. You can always message tutors before you book.
            </p>
            <div className="flex flex-wrap gap-3">
              <LinkButton to="/tuitions" label="Browse tuitions" variant="primary" />
              <LinkButton to="/register" label="Become a tutor" variant="outline" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const LinkButton = ({ to, label, variant }) => {
  const base = "btn btn-sm";
  const style = variant === "outline" ? "btn-outline" : "btn-primary";
  return (
    <a href={to} className={`${base} ${style}`}>
      {label}
    </a>
  );
};

export default HowItWorks;
