import { useParams } from "react-router-dom";
import { domainData } from "../data/domainData.js";

import { CheckCircle, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Footer from "../components/home/Footer";

export default function DomainPage() {
  const { domainId } = useParams();
  const domain = domainData[domainId];

  if (!domain) {
    return (
      <div className="pt-32 text-center text-2xl font-semibold text-red-600">
        Domain Not Found
      </div>
    );
  }

  /* ---------------------- TYPING ANIMATION ---------------------- */
  const [typedTitle, setTypedTitle] = useState("");
  const fullTitle = domain.title;

  useEffect(() => {
    let i = 0;
    setTypedTitle("");

    const interval = setInterval(() => {
      setTypedTitle(fullTitle.slice(0, i));
      i++;
      if (i > fullTitle.length) clearInterval(interval);
    }, 120);

    return () => clearInterval(interval);
  }, [domainId]);

  /* ---------------------- SCROLL TO COURSES ---------------------- */
  const coursesRef = useRef(null);
  const scrollToCourses = () => {
    coursesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pt-24 bg-gray-50">

      {/* ⚡ HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-900 to-indigo-700 text-white py-16 sm:py-20 md:py-24">

        {/* Glowing background */}
        <div className="absolute top-10 left-10 w-16 sm:w-20 h-16 sm:h-20 bg-purple-300 opacity-30 rounded-full blur-3xl animate-[glow_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-10 right-10 w-20 sm:w-28 h-20 sm:h-28 bg-indigo-400 opacity-30 rounded-full blur-3xl animate-[glow_8s_ease-in-out_infinite]" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 sm:gap-12 items-center relative z-10">

          {/* LEFT */}
          <div className="animate-[fadeUp_0.9s_ease-out]">

            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-yellow-300 w-5 h-5 sm:w-6 sm:h-6" />
              <p className="uppercase tracking-wider text-purple-200 text-xs sm:text-sm font-semibold">
                Premium Learning Track
              </p>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-2xl min-h-[60px] sm:min-h-[90px]">
              {typedTitle}
              <span className="border-r-4 border-yellow-300 ml-1 animate-pulse" />
            </h1>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-purple-100 max-w-xl opacity-90 leading-relaxed">
              {domain.subtitle}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 gap-4 mt-8 sm:mt-10">
              {domain.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-4 py-4 sm:px-5 sm:py-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 animate-[fadeUp_1s_ease-out] opacity-0"
                  style={{
                    animationDelay: `${0.15 * i}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <div className="bg-yellow-400/20 p-2 rounded-full">
                    <CheckCircle className="text-yellow-300 w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <p className="text-purple-100 font-medium text-sm sm:text-lg">{h}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end animate-[fadeUp_1.2s_ease-out]">
            <div className="relative p-[2px] sm:p-[3px] rounded-3xl bg-gradient-to-r from-purple-300 to-purple-500 shadow-2xl animate-[float_7s_ease-in-out_infinite]">
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-3 sm:p-4 border border-white/20 shadow-xl">
                <img
                  src={domain.heroImg}
                  alt={domain.title}
                  className="w-[220px] sm:w-[300px] md:w-[380px] rounded-2xl object-contain"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ⭐ STATS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {domain.stats.map((s, i) => (
            <div
              key={i}
              className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 text-center hover:-translate-y-1 hover:shadow-2xl transition border-t-4 border-purple-600"
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-purple-700">{s.value}</h3>
              <p className="text-gray-600 mt-2 sm:mt-3 text-base sm:text-lg">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ⭐ COURSES */}
      <section ref={coursesRef} className="max-w-7xl mx-auto px-4 md:px-6 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 sm:mb-10">
          Explore Courses with <span className="text-purple-600">placements guidance</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {domain.courses.map((c, index) => (
            <div key={index} className="rounded-2xl shadow-xl overflow-hidden bg-white border hover:-translate-y-2 hover:shadow-2xl transition">
              <div className="relative">
                <img
                  src={c.thumbnail}
                  className="h-40 sm:h-48 w-full object-cover"
                  alt={c.title}
                />
                <span className="absolute top-3 left-3 bg-purple-700 text-white text-xs px-3 py-1 rounded-full shadow">
                  {c.level}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold">{c.title}</h3>
                <p className="text-gray-500 mt-2 text-sm sm:text-base">{c.duration}</p>
              </div>

              <div className="px-5 sm:px-6 pb-6">
                <button className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-900 transition text-base sm:text-lg shadow-md hover:shadow-lg">
                  Know More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ⭐ LEARNING PATH */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-10">Learning Path</h2>

        <div className="relative border-l-4 border-purple-600 pl-5 sm:pl-8 space-y-10">
          {domain.learningPath.map((step, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-5 sm:-left-6 w-7 h-7 sm:w-8 sm:h-8 bg-purple-700 rounded-full flex items-center justify-center text-white shadow text-sm sm:text-base">
                {i + 1}
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-xl transition">
                <p className="text-gray-700 text-sm sm:text-base font-medium">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ⭐ TOOLS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-10">Tools You Will Learn</h2>

        <div className="flex flex-wrap gap-3 sm:gap-5">
          {domain.tools.map((t, i) => (
            <div
              key={i}
              className="px-5 py-2 sm:px-6 sm:py-3 bg-white rounded-full shadow-md text-gray-800 font-semibold border hover:bg-purple-50 hover:text-purple-700 hover:shadow-xl transition text-sm sm:text-base"
            >
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* ⭐ CONSULTATION FORM */}
      <section className="w-full bg-gradient-to-b from-gray-100 to-gray-200 py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-6 sm:p-10">

          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-8">
            Don’t Know Which Program to Choose?
            <span className="text-purple-600"> Talk to Our Experts</span>
          </h2>

          <form className="space-y-6">
            {["Name", "Email", "Phone"].map((label, i) => (
              <div key={i}>
                <label className="block text-gray-700 font-medium mb-1">{label}*</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500"
                  placeholder={`Enter your ${label.toLowerCase()}`}
                />
              </div>
            ))}

            {[
              { label: "Educational Qualification*", options: ["10th", "12th", "Diploma", "UG", "PG"] },
              { label: "Current Profile*", options: ["Student", "Working Professional", "Job Seeker"] },
              { label: "Year of Graduation*", options: ["2025", "2024", "2023", "2022"] },
              { label: "Language of Speaking*", options: ["English", "Tamil", "Hindi"] },
            ].map((item, i) => (
              <div key={i}>
                <label className="block text-gray-700 font-medium mb-1">{item.label}</label>
                <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500">
                  <option>Select</option>
                  {item.options.map((op, idx) => (
                    <option key={idx}>{op}</option>
                  ))}
                </select>
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-4 bg-purple-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-purple-900 transition"
            >
              Apply Now
            </button>
          </form>
        </div>
      </section>

      {/* ⭐ FINAL CTA */}
      <section className="relative py-20 sm:py-24 overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <div className="absolute top-16 left-16 w-40 sm:w-52 h-40 sm:h-52 bg-purple-400 opacity-20 blur-3xl rounded-full" />
        <div className="absolute bottom-16 right-16 w-40 sm:w-52 h-40 sm:h-52 bg-indigo-400 opacity-20 blur-3xl rounded-full" />

        <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 sm:p-14 text-center animate-[fadeUp_1s_ease-out]">

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-snug drop-shadow-xl">
              Start Your <span className="text-purple-300">{domain.title}</span> Journey Today
            </h2>

            <p className="text-purple-200 text-sm sm:text-lg mt-4 max-w-2xl mx-auto">
              Learn premium industry skills, build real-world projects, and transform your future with expert guidance.
            </p>

            <button
              onClick={scrollToCourses}
              className="mt-8 sm:mt-10 px-10 sm:px-14 py-3 sm:py-4 text-lg font-bold rounded-full bg-white text-purple-700 shadow-lg hover:bg-purple-100 hover:scale-105 transition-all duration-300"
            >
              Explore Courses
            </button>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
