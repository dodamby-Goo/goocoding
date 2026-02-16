"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import CustomCursor from "../components/custom-cursor";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};

const products = [
  {
    id: "01",
    name: "OBJECT 01 / TIME",
    edition: "SERIES 02/12",
    primary: "/image/IMG_4341.PNG",
    detail: "/image/IMG_4342.PNG",
    desc: "Hand-balanced dial architecture, brushed grain hands."
  },
  {
    id: "02",
    name: "OBJECT 02 / DEPLIGHT",
    edition: "SERIES 01/08",
    primary: "/image/IMG_4339.PNG",
    detail: "/image/IMG_4348.PNG",
    desc: "CNC chambered body, warm optical aperture."
  },
  {
    id: "03",
    name: "OBJECT 03 / PLATE",
    edition: "SERIES 02/12",
    primary: "/image/IMG_4338.PNG",
    detail: "/image/IMG_4347.PNG",
    desc: "Signature torx fixation with quiet linear brushing."
  }
];

export default function Page() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Object Inquiry",
    notes: ""
  });
  const [submitState, setSubmitState] = useState("idle");

  const year = useMemo(() => new Date().getFullYear(), []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitState("loading");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitState("config_error");
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          inquiry_type: formData.category,
          message: formData.notes
        },
        { publicKey }
      );
      setSubmitState("success");
      setFormData({ name: "", email: "", category: "Object Inquiry", notes: "" });
    } catch (error) {
      console.error(error);
      setSubmitState("error");
    }
  };

  return (
    <main className="relative overflow-hidden bg-[#f3f4f6]">
      <CustomCursor />

      <header className="fixed top-0 z-40 w-full bg-[#f3f4f6]/92 backdrop-blur-sm">
        <div className="mx-auto flex w-[92%] max-w-[1360px] items-center justify-between py-5">
          <p className="font-[var(--font-cormorant)] text-3xl tracking-[0.2em] text-[#1f2937]">
            MINIOR
          </p>
          <div className="technical flex items-center gap-6 text-[10px] uppercase text-[#4b5563]">
            <a href="#objects">Objects</a>
            <a href="#atelier">Atelier</a>
            <a href="#discovery">Discovery</a>
          </div>
        </div>
        <div className="hairline" />
      </header>

      <section ref={heroRef} className="relative h-screen min-h-[760px] w-full pt-24">
        <motion.div style={{ y: parallaxY }} className="absolute inset-0">
          <Image
            src="/image/IMG_4351.PNG"
            alt="MINIOR x Sanghyunk!m hero"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f3f4f655] via-[#f3f4f610] to-[#f3f4f6]" />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="relative z-10 mx-auto flex h-full w-[92%] max-w-[1360px] flex-col justify-end pb-20"
        >
          <motion.p variants={item} className="technical text-xs text-[#4b5563]">
            SANGHYUNK!M STUDIO / SEOUL / PRECISION METAL OBJECTS
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-4 max-w-[900px] text-5xl leading-[1.08] text-[#111827] md:text-7xl"
          >
            Quiet Weight.
            <br />
            Industrial Craftsmanship.
          </motion.h1>
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <a href="#discovery" className="btn-metal technical">
              Request a Quote
            </a>
            <a href="#objects" className="btn-metal technical">
              Discovery
            </a>
          </motion.div>
        </motion.div>
      </section>

      <motion.section
        id="atelier"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-[92%] max-w-[1360px] pb-16 pt-8"
      >
        <div className="hairline-soft pb-4" />
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="max-w-[760px] text-4xl leading-tight text-[#111827] md:text-6xl">
              MINIOR by Sanghyun Kim crafts clocks, lights, and vessels as exhibition-grade
              objects.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="technical text-xs leading-7 text-[#4b5563]">
              NO MASS PRODUCTION.
              <br />
              HAND-FINISHED SURFACES.
              <br />
              SIGNATURE FASTENERS SECURED FLUSH.
              <br />
              EACH OBJECT MARKED BY INDIVIDUAL SERIAL.
            </p>
          </div>
        </div>
      </motion.section>

      <section id="objects" className="mx-auto w-[92%] max-w-[1360px] pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="grid gap-4 md:grid-cols-3"
        >
          {products.map((product) => (
            <motion.article key={product.id} variants={item} className="group">
              <div className="relative aspect-[4/5] overflow-hidden border border-[#8f96a34f] bg-[#d9dde3]">
                <Image
                  src={product.primary}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                />
                <Image
                  src={product.detail}
                  alt={`${product.name} detail`}
                  fill
                  className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
              </div>
              <div className="hairline-soft mt-3 pt-3" />
              <p className="technical text-[11px] text-[#4b5563]">{product.edition}</p>
              <h3 className="mt-1 text-2xl tracking-[0.08em] text-[#111827]">{product.name}</h3>
              <p className="mt-1 text-sm text-[#4b5563]">{product.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <motion.section
        id="discovery"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="metal-bg mx-auto grid w-[92%] max-w-[1360px] gap-10 border border-[#8f96a34f] p-8 md:grid-cols-2 md:p-12"
      >
        <div>
          <p className="technical text-xs text-[#4b5563]">INQUIRY-BASED STORE</p>
          <h2 className="mt-2 text-5xl leading-tight text-[#111827]">Request a Quote</h2>
          <p className="mt-5 max-w-[500px] text-base leading-7 text-[#4b5563]">
            Custom orders are tailored by size, finish, and lighting condition. Share your space,
            material preference, and timeline. We respond with a personalized proposal.
          </p>
          <div className="mt-8 space-y-2 technical text-[11px] text-[#4b5563]">
            <p>OBJECT 01 / TIME</p>
            <p>OBJECT 02 / DEPLIGHT</p>
            <p>OBJECT 03 / VESSEL</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 border border-[#8f96a34f] p-6">
          <div className="hairline-soft pb-2 technical text-[10px] text-[#6b7280]">
            PERSONALIZED CUSTOM ORDER
          </div>
          <input
            required
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={onChange}
            className="w-full border border-[#8f96a34f] bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[#9ca3af]"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={onChange}
            className="w-full border border-[#8f96a34f] bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[#9ca3af]"
          />
          <select
            name="category"
            value={formData.category}
            onChange={onChange}
            className="w-full border border-[#8f96a34f] bg-transparent px-4 py-3 text-sm outline-none"
          >
            <option>Object Inquiry</option>
            <option>Commission Piece</option>
            <option>Lighting Installation</option>
            <option>Collaboration</option>
          </select>
          <textarea
            required
            name="notes"
            rows={5}
            placeholder="Tell us about your space, preferred finish, and desired mood."
            value={formData.notes}
            onChange={onChange}
            className="w-full border border-[#8f96a34f] bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[#9ca3af]"
          />
          <button type="submit" disabled={submitState === "loading"} className="btn-metal technical w-full">
            {submitState === "loading" ? "Sending..." : "Request a Quote"}
          </button>
          {submitState === "success" && (
            <p className="technical text-[10px] text-[#374151]">Inquiry sent successfully.</p>
          )}
          {submitState === "error" && (
            <p className="technical text-[10px] text-[#7f1d1d]">Failed to send. Please try again.</p>
          )}
          {submitState === "config_error" && (
            <p className="technical text-[10px] text-[#7f1d1d]">
              EmailJS env vars are missing: NEXT_PUBLIC_EMAILJS_SERVICE_ID,
              NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            </p>
          )}
        </form>
      </motion.section>

      <footer className="mx-auto mt-20 w-[92%] max-w-[1360px] pb-12">
        <div className="hairline pb-4" />
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="text-3xl tracking-[0.16em] text-[#111827]">MINIOR</p>
          <div className="technical text-[10px] uppercase text-[#4b5563]">
            <p>© {year} Sanghyunk!m / Seoul / Inquiry Only</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
