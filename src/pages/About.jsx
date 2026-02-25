import React from "react";
import { FiCheckCircle, FiShield, FiCalendar, FiUsers } from "react-icons/fi";

const highlights = [
    {
        title: "Learners first",
        body: "One-on-one attention, flexible schedules, and transparent progress so every student stays on track.",
    },
    {
        title: "Trusted tutors",
        body: "Verified educators across STEM, language, and test prep with ratings you can rely on.",
    },
    {
        title: "Built for outcomes",
        body: "Assignments, milestones, and feedback loops that turn sessions into measurable results.",
    },
];

const stats = [
    { label: "Registered tutors", value: "44,886" },
    { label: "Applications processed", value: "57,890" },
    { label: "Live tuition jobs", value: "1,946" },
    { label: "Stakeholders served", value: "367,452" },
];

const About = () => {
    return (
        <div className="bg-gradient-to-b from-slate-50 via-white to-slate-100">
            <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 items-center">
                    <div className="space-y-5">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary text-sm font-semibold">
                            <FiShield className="h-4 w-4" />
                            About Tuition Hub
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                            Connecting learners with tutors who deliver outcomes
                        </h1>
                        <p className="text-base md:text-lg text-slate-600">
                            Tuition Hub is a marketplace for personalized learning. We help parents and students find the right tutor, manage sessions, track progress, and keep communication simple—all in one place.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <span className="badge badge-primary badge-outline">Verified tutors</span>
                            <span className="badge badge-primary badge-outline">Safe payments</span>
                            <span className="badge badge-primary badge-outline">Progress tracking</span>
                        </div>
                        <div className="flex gap-3 flex-wrap pt-2">
                            <button className="btn btn-primary btn-sm">Explore tuitions</button>
                            <button className="btn btn-outline btn-sm">Become a tutor</button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-primary/10 via-blue-100 to-white blur-2xl" aria-hidden="true" />
                        <div className="relative grid grid-cols-2 gap-4">
                            {stats.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:-translate-y-0.5 transition-transform"
                                >
                                    <p className="text-2xl font-bold text-slate-900">{item.value}</p>
                                    <p className="text-sm text-slate-600">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 pb-14">
                <div className="grid gap-6 md:grid-cols-3">
                    {highlights.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-transform"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary text-xs font-semibold mb-3">
                                <FiCheckCircle className="h-4 w-4" />
                                Focused
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 pb-16">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                    <div className="grid gap-8 md:grid-cols-[1.1fr,0.9fr] md:items-center">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary text-sm font-semibold">
                                <FiCalendar className="h-4 w-4" />
                                Our mission
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Built for real learning wins</h2>
                            <p className="text-slate-600 leading-relaxed">
                                We believe every learner deserves a tutor who fits their style, pace, and goals. By combining vetted educators with simple tooling—messaging, scheduling, payments, and progress—we remove friction so students can focus on learning.
                            </p>
                            <p className="text-slate-600 leading-relaxed">
                                Tuition Hub is built by educators, parents, and engineers who have seen how tailored guidance unlocks confidence. We are committed to transparent pricing, safety, and measurable outcomes.
                            </p>
                        </div>
                        <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-blue-100 to-white p-6 border border-primary/20">
                            <ul className="space-y-3 text-slate-800">
                                <li className="flex items-start gap-2">
                                    <FiUsers className="mt-0.5 h-4 w-4 text-primary" />
                                    <span>Vetted tutors across STEM, languages, arts, and test prep</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <FiCheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                                    <span>Clear milestones, assignments, and feedback loops</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <FiShield className="mt-0.5 h-4 w-4 text-primary" />
                                    <span>Secure payments and scheduling in one place</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <FiCalendar className="mt-0.5 h-4 w-4 text-primary" />
                                    <span>Responsive support for parents and students</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;