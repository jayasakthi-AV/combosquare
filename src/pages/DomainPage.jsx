import { useParams } from "react-router-dom";
import { domainData } from "../data/domainData";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Footer from "../components/home/Footer";
import { motion } from "framer-motion";

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

  /* ---------------- Scroll to Top ---------------- */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [domainId]);

  /* ---------------- Typing Effect ---------------- */
  const [typedTitle, setTypedTitle] = useState("");
  useEffect(() => {
    let i = 0;
    setTypedTitle("");
    const interval = setInterval(() => {
      setTypedTitle(domain.title.slice(0, i));
      i++;
      if (i > domain.title.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, [domainId]);

  const coursesRef = useRef(null);
  const scrollToCourses = () =>
    coursesRef.current?.scrollIntoView({ behavior: "smooth" });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-24 bg-gray-50"
    >
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-900 to-indigo-700 text-white py-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-400/30 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-400/30 blur-3xl rounded-full" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-yellow-300" />
              <p className="uppercase tracking-wider text-purple-200 text-sm font-semibold">
                Premium Learning Track
              </p>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold min-h-[80px]">
              {typedTitle}
              <span className="ml-1 border-r-4 border-yellow-300 animate-pulse" />
            </h1>

            <p className="mt-5 text-lg text-purple-100 max-w-xl">
              {domain.subtitle}
            </p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
              className="grid gap-4 mt-8"
            >
              {domain.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ scale: 1.02 }}
                  className="flex gap-4 bg-white/10 border border-white/20 p-4 rounded-xl backdrop-blur-lg"
                >
                  <CheckCircle className="text-yellow-300" />
                  <p className="text-purple-100">{h}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.07, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={scrollToCourses}
              className="mt-8 px-8 py-3 bg-white text-purple-700 font-bold rounded-full flex items-center gap-2 shadow-xl"
            >
              Explore Courses <ArrowRight />
            </motion.button>
          </div>

          {/* RIGHT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex justify-center md:justify-end"
          >
            <div className="p-[3px] rounded-3xl bg-gradient-to-r from-purple-300 to-purple-500">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4">
                <img
                  src={domain.heroImg}
                  alt={domain.title}
                  className="max-w-[360px] rounded-2xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* ================= COURSES ================= */}
<section
  ref={coursesRef}
  className="max-w-7xl mx-auto px-6 py-20"
>
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-4xl font-extrabold text-gray-900 mb-12"
  >
    Explore Courses with{" "}
    <span className="text-purple-600">placement guidance</span>
  </motion.h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {domain.courses.map((c, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -10, scale: 1.03 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden border hover:shadow-2xl transition-all"
      >
        {/* Thumbnail */}
        <div className="relative">
          <img
            src={c.thumbnail}
            alt={c.title}
            className="h-48 w-full object-cover"
          />
          <span className="absolute top-4 left-4 bg-purple-700 text-white text-xs px-4 py-1 rounded-full shadow-md">
            {c.level}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {c.title}
          </h3>

          <p className="text-gray-500 mt-2">
            {c.duration}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 w-full py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-md hover:bg-purple-900 transition"
          >
            Know More
          </motion.button>
        </div>
      </motion.div>
    ))}
  </div>
</section>


      {/* ================= LEARNING PATH ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-extrabold mb-12">Learning Journey</h2>

        <div className="relative pl-10 border-l-4 border-purple-600 space-y-12">
          {domain.learningPath.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative bg-white rounded-2xl p-6 shadow-xl"
            >
              <span className="absolute -left-10 top-6 w-10 h-10 bg-white border-2 border-purple-600 rounded-full flex items-center justify-center font-bold text-purple-700 shadow-md">
                <span className="absolute inset-0 rounded-full bg-purple-500 opacity-30 blur-md animate-ping" />
                {i + 1}
              </span>
              <p className="text-gray-700">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= TOOLS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-extrabold mb-12">
          Tools You Will Use
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {domain.tools.map((tool, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="bg-white rounded-xl shadow-md p-6 text-center font-semibold text-gray-800 hover:text-purple-700 transition"
            >
              {tool}
            </motion.div>
          ))}
        </div>
      </section>

     {/* ================= UNIQUE FINAL CTA ================= */}
<section className="relative py-28 overflow-hidden bg-gradient-to-br from-[#2b1055] via-[#3a1c71] to-[#1e1b4b]">

{/* Floating abstract shapes */}
<div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-purple-500/30 blur-[140px]" />
<div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-indigo-500/30 blur-[160px]" />

<div className="max-w-7xl mx-auto px-6 relative z-10">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="grid md:grid-cols-2 gap-14 items-center"
  >

    {/* LEFT CONTENT */}
    <div className="text-white">
      <p className="uppercase tracking-widest text-purple-300 font-semibold text-sm mb-4">
        Limited Seats Available
      </p>

      <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
        Build your future in{" "}
        <span className="text-purple-300">{domain.title}</span>
      </h2>

      <p className="mt-5 text-lg text-purple-100 max-w-xl leading-relaxed">
        Learn with a structured roadmap, real-world projects, and expert mentorship.
        Designed to take you from beginner to industry-ready — confidently.
      </p>

      {/* Trust indicators */}
      <div className="flex flex-wrap gap-4 mt-8">
        {[
          "Beginner Friendly",
          "Career-Oriented",
          "Project Based",
          "Mentor Support",
        ].map((tag, i) => (
          <div
            key={i}
            className="px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur text-sm font-semibold"
          >
            {tag}
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.07, y: -4 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={scrollToCourses}
        className="mt-10 px-12 py-4 bg-white text-purple-800 font-bold rounded-full shadow-xl"
      >
        Explore Courses →
      </motion.button>
    </div>

    {/* RIGHT VISUAL CARD */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
    >
      {/* Gradient ring */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400 via-indigo-400 to-purple-600 blur-xl opacity-60" />

      <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 shadow-2xl">
        <h3 className="text-2xl font-bold text-white mb-6">
          What you’ll gain
        </h3>

        <ul className="space-y-4">
          {[
            "Clear learning roadmap",
            "Hands-on real-world projects",
            "Strong portfolio & resume",
            "Career guidance & support",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-purple-100">
              <span className="mt-1 w-2 h-2 rounded-full bg-purple-300" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8 text-sm text-purple-200">
          🚀 Designed for students & early professionals
        </div>
      </div>
    </motion.div>

  </motion.div>
</div>
</section>


      <Footer />
    </motion.div>
  );
}
