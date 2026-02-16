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
  show: { opacity: 1, y: 0, transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] } }
};

const products = [
  {
    id: "01",
    name: "CHRONOMETRIC OBJECT / 01",
    serial: "SKM-TIME-02/12",
    primary: "/image/IMG_4341.PNG",
    detail: "/image/IMG_4342.PNG",
    desc: "Balanced dial, brushed blade hands, micro-grain cap texture."
  },
  {
    id: "02",
    name: "DEPLIGHT SUBMARINE / 02",
    serial: "SKM-LIGHT-01/08",
    primary: "/image/IMG_4351.PNG",
    detail: "/image/IMG_4348.PNG",
    desc: "Machined aluminum shell with warm optical chambers and quiet glow."
  },
  {
    id: "03",
    name: "SIGNATURE METAL PLATE / 03",
    serial: "SKM-PLATE-02/12",
    primary: "/image/IMG_4338.PNG",
    detail: "/image/IMG_4347.PNG",
    desc: "Flush torx fastening and horizontal brushing tuned by hand-finishing."
  }
];

export default function Page() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);

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
    <main className="relative bg-[#f3f4f6] pb-8">
      <CustomCursor />

      <header className="fixed top-0 z-50 w-full bg-[#f3f4f6]/90 backdrop-blur-md">
        <div className="mx-auto flex w-[92%] max-w-[1360px] items-center justify-between py-5">
          <a href="#top" className="text-3xl tracking-[0.19em] text-[#111827] md:text-4xl">
            SANGHYUNK!M
          </a>
          <div className="technical flex items-center gap-4 text-[10px] uppercase text-[#4b5563] md:gap-7">
            <a href="#atelier">Atelier</a>
            <a href="#objects">Objects</a>
            <a href="#discovery">Custom Order</a>
          </div>
        </div>
        <div className="hairline" />
      </header>

      <section id="top" ref={heroRef} className="relative min-h-[840px] w-full overflow-hidden pt-24 md:h-screen">
        <motion.div style={{ y: parallaxY }} className="absolute inset-0">
          <Image
            src="/image/IMG_4351.PNG"
            alt="SanghyunK!m signature object"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f3f4f63f] via-[#f3f4f615] to-[#f3f4f6]" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="relative z-10 mx-auto flex h-full w-[92%] max-w-[1360px] flex-col justify-end pb-20 md:pb-24"
        >
          <motion.p variants={item} className="technical text-[11px] text-[#4b5563]">
            SANGHYUNK!M ATELIER / SEOUL / HAND-FINISHED METALWORK
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-4 max-w-[980px] text-[42px] leading-[1.03] text-[#111827] md:text-[88px]"
          >
            Precision Objects.
            <br />
            Quiet Weight For Living Spaces.
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-[640px] text-base text-[#4b5563] md:text-lg">
            SanghyunK!m builds clocks, lights, and vessels as industrial art pieces with exacting
            tolerances, brushed surfaces, and signed serial identity.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <a href="#discovery" className="btn-metal technical">
              Request a Quote
            </a>
            <a href="#objects" className="btn-metal technical">
              Explore Collection
            </a>
          </motion.div>
        </motion.div>
      </section>

      <motion.section
        id="atelier"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -6% 0px" }}
        transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
        className="scroll-mt-28 mx-auto w-[92%] max-w-[1360px] pb-16 pt-14"
      >
        <div className="hairline-soft pb-5" />
        <div className="grid items-start gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="max-w-[780px] text-[34px] leading-tight text-[#111827] md:text-[62px]">
              Not mass-market product design.
              <br />
              A refined industrial atelier by SanghyunK!m.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="technical text-[11px] leading-7 text-[#4b5563]">
              EVERY PIECE IS BUILT AS AN EDITION.
              <br />
              FLUSH FASTENER, BRUSHED GRAIN, HAND-FINISHED EDGE.
              <br />
              CUSTOM SCALE AND MATERIAL ARE AVAILABLE BY INQUIRY.
            </p>
          </div>
        </div>
      </motion.section>

      <section id="objects" className="scroll-mt-28 mx-auto w-[92%] max-w-[1360px] pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px -5% 0px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {products.map((product) => (
            <motion.article key={product.id} variants={item} className="group relative overflow-hidden">
              <div className="relative aspect-[4/5] overflow-hidden border border-[#8f96a34f] bg-[#d9dde3]">
                <Image
                  src={product.primary}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.045] group-hover:opacity-0"
                />
                <Image
                  src={product.detail}
                  alt={`${product.name} detail`}
                  fill
                  className="object-cover opacity-0 transition duration-700 ease-out group-hover:scale-[1.055] group-hover:opacity-100"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f172a1c] to-transparent opacity-70" />
                <div className="pointer-events-none absolute -inset-x-12 top-[-40%] h-[45%] rotate-[17deg] bg-gradient-to-r from-transparent via-[#ffffff88] to-transparent opacity-0 transition duration-700 group-hover:translate-y-[280%] group-hover:opacity-100" />
              </div>
              <div className="hairline-soft mt-3 pt-3" />
              <p className="technical text-[11px] text-[#4b5563]">{product.serial}</p>
              <h3 className="mt-1 text-[28px] leading-tight tracking-[0.04em] text-[#111827]">{product.name}</h3>
              <p className="mt-2 text-sm leading-6 text-[#4b5563]">{product.desc}</p>
              <a href="#discovery" className="technical mt-4 inline-block text-[10px] uppercase tracking-[0.18em] text-[#111827]">
                Start Discovery
              </a>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <motion.section
        id="discovery"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px -4% 0px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="scroll-mt-28 metal-bg mx-auto grid w-[92%] max-w-[1360px] gap-12 border border-[#8f96a34f] p-8 md:grid-cols-2 md:p-12"
      >
        <div>
          <p className="technical text-[11px] text-[#4b5563]">INQUIRY-BASED STORE / SANGHYUNK!M</p>
          <h2 className="mt-2 text-[44px] leading-tight text-[#111827] md:text-[64px]">Custom Quote Desk</h2>
          <p className="mt-5 max-w-[530px] text-base leading-7 text-[#4b5563]">
            Instead of checkout buttons, each project starts with conversation. Describe your space,
            preferred dimensions, finish direction, and usage mood. We return a curated proposal and
            timeline.
          </p>
          <div className="mt-9 space-y-2 technical text-[11px] text-[#4b5563]">
            <p>PROCESS 01 / MATERIAL SELECTION</p>
            <p>PROCESS 02 / LIGHTING & SCALE REVIEW</p>
            <p>PROCESS 03 / PERSONAL QUOTATION</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 border border-[#8f96a34f] bg-[#f3f4f6c2] p-6 md:p-7">
          <div className="hairline-soft pb-2 technical text-[10px] text-[#6b7280]">
            PERSONALIZED ORDER FORM
          </div>
          <input
            required
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={onChange}
            className="w-full border border-[#8f96a34f] bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[#9ca3af] focus:border-[#111827]"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={onChange}
            className="w-full border border-[#8f96a34f] bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[#9ca3af] focus:border-[#111827]"
          />
          <select
            name="category"
            value={formData.category}
            onChange={onChange}
            className="w-full border border-[#8f96a34f] bg-transparent px-4 py-3 text-sm outline-none focus:border-[#111827]"
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
            placeholder="Tell us about space size, material direction, and desired delivery timeline."
            value={formData.notes}
            onChange={onChange}
            className="w-full border border-[#8f96a34f] bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[#9ca3af] focus:border-[#111827]"
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
              Missing EmailJS variables: NEXT_PUBLIC_EMAILJS_SERVICE_ID,
              NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            </p>
          )}
        </form>
      </motion.section>

      <footer className="mx-auto mt-24 w-[92%] max-w-[1360px] pb-12">
        <div className="hairline pb-4" />
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="text-3xl tracking-[0.15em] text-[#111827]">SANGHYUNK!M</p>
          <div className="technical text-[10px] uppercase text-[#4b5563]">
            <p>© {year} SanghyunK!m Atelier / Seoul / Inquiry Only</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
