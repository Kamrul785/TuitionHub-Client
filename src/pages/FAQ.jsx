import React from "react";
import { FiHelpCircle, FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    q: "How do I pick the right tutor?",
    a: "Use filters by subject, class level, availability, and rating. You can message tutors before booking to confirm fit.",
  },
  {
    q: "Is payment secure?",
    a: "Yes. Payments are processed securely and tutors are paid after sessions are confirmed as delivered.",
  },
  {
    q: "Can I track my child's progress?",
    a: "You’ll see milestones, assignments, and session notes on the enrollment dashboard, plus notifications for updates.",
  },
  {
    q: "What if I need to reschedule?",
    a: "You can request a reschedule directly from the enrollment view. Tutors can propose alternative slots.",
  },
  {
    q: "Do tutors provide materials?",
    a: "Most tutors share assignments, practice sets, and topic notes. Check tutor profiles for their resources.",
  },
  {
    q: "How are tutors vetted?",
    a: "Tutors are reviewed for credentials, experience, and ratings. New tutors start with a probationary period.",
  },
];

const FAQ = () => {
  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 space-y-8">
        <header className="text-center space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary text-sm font-semibold">
            <FiHelpCircle className="h-4 w-4" /> FAQs
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Answers to common questions
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Get quick clarity on finding tutors, payments, rescheduling, and
            progress tracking.
          </p>
        </header>

        <div className="space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left">
                <div>
                  <p className="font-semibold text-slate-900">{item.q}</p>
                </div>
                <FiChevronDown className="h-5 w-5 text-slate-500 transition-transform group-open:rotate-180" />
              </summary>
              <p className="text-sm text-slate-600 mt-3 sm:hidden">{item.a}</p>
              <p className="text-sm text-slate-600 mt-2 sm:block hidden">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-blue-100 to-white p-6 shadow-sm text-center space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">
            Still need help?
          </h3>
          <p className="text-sm text-slate-700">
            Reach out and we’ll guide you to the right tutor or resolve any
            issue.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="mailto:support@tuitionhub.com"
              className="btn btn-primary btn-sm"
            >
              Email support
            </a>
            <a href="/tuitions" className="btn btn-outline btn-sm">
              Browse tutors
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
