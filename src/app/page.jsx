"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  AlertTriangle,
  Anchor,
  BadgeDollarSign,
  Ban,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Fish,
  Handshake,
  Leaf,
  Megaphone,
  Network,
  Scale,
  ShieldCheck,
  ShoppingBasket,
  Users,
  Waves,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const matterCards = [
  ["Millions of Cambodians", Users],
  ["Fishing communities", Anchor],
  ["Food security", Fish],
  ["Markets and small shops", ShoppingBasket],
  ["Cambodia's local economy", CircleDollarSign],
];

const illegalCards = [
  ["Electric fishing", "Stuns or kills fish at many sizes, damaging stocks and nearby aquatic life.", AlertTriangle],
  ["Illegal nets", "Fine mesh and banned gear catch juvenile fish before they can reproduce.", Network],
  ["Banned seasons", "Fishing during closed periods interrupts spawning and future catches.", Ban],
  ["Undersized fish", "Removing young fish weakens tomorrow's food supply and income.", Fish],
  ["Protected areas", "Overfishing conservation zones damages habitats meant to rebuild stocks.", ShieldCheck],
];

const survey = [
  { label: "Serious problem", value: 82.8, note: "Most respondents see illegal fishing as an urgent public issue.", color: "#ef4444" },
  { label: "Poverty as main cause", value: 48.3, note: "Economic pressure pushes some households toward risky choices.", color: "#f97316" },
  { label: "Weak enforcement", value: 32.8, note: "A large share connects the problem to law and monitoring gaps.", color: "#67e8f9" },
  { label: "Support campaigns", value: 79.3, note: "Public education has strong community support.", color: "#9cc56b" },
];

const causes = [
  ["Poverty", "Daily income pressure can make illegal gear feel like a shortcut."],
  ["Lack of other jobs", "Few alternatives leave families dependent on fish catches."],
  ["Weak law enforcement", "Rules lose power when patrols and penalties are inconsistent."],
  ["High demand for fish", "Market pressure rewards large catches, even when they are illegal."],
  ["Lack of awareness", "Some people underestimate long-term damage to the lake."],
];

const impacts = [
  "Legal fishermen earn less",
  "Small businesses lose income",
  "Fish prices may increase",
  "Communities become more vulnerable",
];

const roles = [
  ["Government", "Enforce fishing laws, fund patrols, and coordinate fisheries management.", Building2],
  ["Community", "Report violations, support conservation zones, and share local knowledge.", Users],
  ["Fishermen", "Use legal gear, respect seasons, and protect juvenile fish.", Anchor],
  ["NGOs", "Support education, monitoring, research, and livelihood programs.", Handshake],
  ["Consumers", "Choose legal, sustainable fish and support responsible markets.", ShoppingBasket],
];

const solutions = [
  ["Stronger law enforcement", ShieldCheck],
  ["Community cooperation", Handshake],
  ["Education programs", BookOpen],
  ["Better job opportunities", BriefcaseBusiness],
  ["Sustainable fishing practices", Fish],
  ["Environmental protection", Leaf],
];

const recommendations = [
  "Strengthen enforcement of fishing laws.",
  "Increase support programs for poor fishing communities.",
  "Improve education about sustainable fishing practices.",
  "Encourage community involvement in reporting illegal fishing.",
  "Continue monitoring and protecting Tonle Sap's ecosystem.",
  "Promote alternative jobs and income sources for fishermen.",
];

function AnimatedCounter({ value, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame;
    const start = performance.now();
    const duration = 1300;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function Section({ id, eyebrow, title, children, className = "" }) {
  return (
    <section id={id} className={`relative overflow-hidden px-5 py-20 sm:px-8 lg:px-12 ${className}`}>
      <div className="wave-field pointer-events-none absolute inset-0" />
      <div className="mx-auto max-w-7xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-cyan-200/75">{eyebrow}</p>
          <h2 className="max-w-4xl font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function FishActivity({ light = false }) {
  const fish = useMemo(
    () => [
      { top: "18%", left: "8%", delay: 0, size: 30 },
      { top: "28%", left: "72%", delay: 0.7, size: 22 },
      { top: "58%", left: "16%", delay: 1.1, size: 26 },
      { top: "72%", left: "82%", delay: 1.6, size: 20 },
      { top: "42%", left: "46%", delay: 2.2, size: 24 },
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {fish.map((item) => (
        <motion.div
          key={`${item.left}-${item.top}`}
          className={light ? "absolute text-sky-600/22" : "absolute text-cyan-100/40"}
          style={{ top: item.top, left: item.left }}
          animate={{ x: [0, 44, 92], y: [0, -34, 6], rotate: [0, -18, 10], opacity: [0, 1, 0] }}
          transition={{ duration: 4.6, delay: item.delay, repeat: Infinity, repeatDelay: 3.4, ease: "easeInOut" }}
        >
          <Fish size={item.size} />
        </motion.div>
      ))}
    </div>
  );
}

function PieChart({ value, color }) {
  const radius = 42;
  const circle = 2 * Math.PI * radius;
  return (
    <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
      <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="12" />
      <motion.circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="12"
        initial={{ strokeDasharray: `0 ${circle}` }}
        whileInView={{ strokeDasharray: `${(value / 100) * circle} ${circle}` }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
    </svg>
  );
}

function Flow() {
  const steps = ["Illegal Fishing", "Fewer Fish", "Lower Fishermen Income", "Reduced Market Activity", "Economic Hardship"];
  return (
    <div className="mt-12 grid gap-4 lg:grid-cols-5">
      {steps.map((step, index) => (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative rounded-lg border border-cyan-200/15 bg-white/[0.06] p-5 shadow-glow"
        >
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-cyan-300/12 text-cyan-100">
            {index === 0 ? <AlertTriangle /> : index === 1 ? <Fish /> : index === 2 ? <BadgeDollarSign /> : index === 3 ? <ShoppingBasket /> : <Users />}
          </div>
          <p className="text-lg font-semibold text-white">{step}</p>
          {index < steps.length - 1 && <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-cyan-200/40 lg:block" />}
        </motion.div>
      ))}
    </div>
  );
}

function Ecosystem() {
  const fish = useMemo(() => Array.from({ length: 28 }, (_, i) => i), []);
  return (
    <div className="relative mt-12 min-h-[360px] overflow-hidden rounded-lg border border-cyan-200/15 bg-gradient-to-b from-lake-800/80 to-lake-950 p-6">
      <div className="absolute inset-0 waterline opacity-30" />
      {fish.map((item) => (
        <motion.div
          key={item}
          className="absolute text-cyan-100/80"
          style={{ left: `${8 + (item % 7) * 13}%`, top: `${20 + Math.floor(item / 7) * 16}%` }}
          initial={{ opacity: 1, x: -18 }}
          whileInView={{ opacity: item > 10 ? 0.14 : 0.8, x: 26 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.8, delay: item * 0.03, repeat: Infinity, repeatType: "reverse" }}
        >
          <Fish size={item % 3 === 0 ? 26 : 18} />
        </motion.div>
      ))}
      <div className="relative z-10 grid gap-6 md:grid-cols-[1fr_320px]">
        <div>
          <p className="max-w-xl text-lg text-cyan-50/78">
            Illegal gear and pressure on protected zones reduce fish populations, damage habitats, and disturb the balance that makes Tonle Sap productive.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Declining fish populations", "Habitat destruction", "Loss of biodiversity", "Ecosystem imbalance"].map((effect) => (
              <div key={effect} className="rounded-lg border border-white/10 bg-lake-950/55 p-4 text-sm text-cyan-50/85">
                {effect}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-reed/30 bg-reed/10 p-6">
          <p className="text-5xl font-bold text-reed">
            <AnimatedCounter value={77.6} suffix="%" decimals={1} />
          </p>
          <p className="mt-3 text-cyan-50/80">of respondents believe illegal fishing harms the environment.</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.24], ["0%", "22%"]);
  const [solutionMode, setSolutionMode] = useState(false);

  return (
    <main className="bg-sky-50 text-slate-900">
      <section className="noise relative min-h-screen overflow-hidden">
        <motion.video
          src="/images/herobg.mp4"
          poster="/images/tonle-sap-hero.png"
          aria-label="Tonle Sap water and fishing documentary background"
          style={{ y: heroY }}
          className="absolute inset-0 h-[112%] w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-vignette absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-32 wave-motion bg-[radial-gradient(ellipse_at_center,rgba(103,232,249,.22),transparent_68%)] blur-2xl" />
        <FishActivity />
        <div className="relative z-10 flex min-h-screen items-center px-5 sm:px-8 lg:px-12">
          <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-cyan-100/85">Investigative Documentary</p>
              <h1 className="max-w-5xl font-serif text-5xl font-semibold leading-[0.95] text-white drop-shadow-2xl sm:text-7xl lg:text-8xl">
                Illegal Fishing in Tonle Sap
              </h1>
              <p className="mt-5 max-w-3xl text-xl font-semibold text-cyan-50 drop-shadow sm:text-2xl">
                How It Affects People's Jobs, Money, and Communities in Cambodia
              </p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white drop-shadow sm:text-lg">
                "Thousands of Cambodian families depend on Tonle Sap for food and income. But illegal fishing is threatening both livelihoods and the future of the lake."
              </p>
            </motion.div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["58", "survey responses"],
                ["82.8%", "call it serious"],
                ["79.3%", "support campaigns"],
              ].map(([num, label]) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  className="hero-card rounded-lg p-4"
                >
                  <p className="text-3xl font-bold text-white">{num}</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-cyan-100/70">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2 text-cyan-100/80">
          <ChevronDown size={34} />
        </motion.div>
      </section>

      <div className="light-story sea-surface relative">
        <FishActivity light />
      <Section id="matters" eyebrow="Why Tonle Sap Matters" title="The lake is an ecosystem, a food source, and an economic engine.">
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {matterCards.map(([label, Icon], index) => (
            <motion.div key={label} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="rounded-lg border border-cyan-200/15 bg-white/[0.055] p-5">
              <Icon className="mb-5 text-cyan-200" size={32} />
              <p className="text-lg font-semibold text-white">{label}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-cyan-50/76">
          Tonle Sap is one of Southeast Asia's most important freshwater ecosystems and supports thousands of jobs across Cambodia.
        </p>
      </Section>

      <Section id="illegal" eyebrow="What Is Illegal Fishing?" title="Illegal methods can take fish faster than the lake can recover.">
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {illegalCards.map(([title, body, Icon]) => (
            <motion.article key={title} whileHover={{ y: -8, scale: 1.02 }} className="rounded-lg border border-orange-400/20 bg-gradient-to-b from-red-950/35 to-lake-900/70 p-5 transition-colors hover:border-orange-300/70">
              <Icon className="mb-5 text-orange-300" size={34} />
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-cyan-50/72">{body}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="survey" eyebrow="Survey Results" title="What people think about illegal fishing.">
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {survey.map((item) => (
            <div key={item.label} className="rounded-lg border border-cyan-200/15 bg-white/[0.055] p-5">
              <div className="flex items-center gap-5">
                <PieChart value={item.value} color={item.color} />
                <div>
                  <p className="text-4xl font-bold text-white">
                    <AnimatedCounter value={item.value} suffix="%" decimals={1} />
                  </p>
                  <p className="mt-1 font-semibold text-cyan-100">{item.label}</p>
                </div>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.value}%` }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-full rounded-full" style={{ background: item.color }} />
              </div>
              <p className="mt-4 text-sm leading-6 text-cyan-50/72">{item.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="causes" eyebrow="Why It Happens" title="The causes are social, economic, and civic.">
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-cyan-200/15 bg-lake-900/60 p-8">
            <Waves className="absolute right-8 top-8 text-cyan-200/30" size={120} />
            <Scale className="relative z-10 mb-8 text-orange-300" size={58} />
            <p className="relative z-10 max-w-md text-2xl font-semibold leading-snug text-white">
              When income is fragile and rules are weak, the lake becomes a place where survival and protection collide.
            </p>
            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-3">
              {["Jobs", "Law", "Demand"].map((label) => (
                <div key={label} className="rounded-lg bg-white/8 p-3 text-center text-sm text-cyan-100">{label}</div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {causes.map(([title, body], index) => (
              <motion.div key={title} initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-lg border border-cyan-200/15 bg-white/[0.055] p-5">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-cyan-50/72">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="economy" eyebrow="The Economic Cost" title="Illegal fishing moves through the economy like a chain reaction.">
        <Flow />
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {impacts.map((impact) => (
            <div key={impact} className="rounded-lg border border-cyan-200/15 bg-cyan-300/[0.07] p-4 text-sm font-semibold text-cyan-50">
              {impact}
            </div>
          ))}
        </div>
      </Section>

      <Section id="environment" eyebrow="The Lake Pays the Price" title="Environmental damage becomes economic damage.">
        <Ecosystem />
      </Section>

      <Section id="civics" eyebrow="Who Should Act?" title="Protecting Tonle Sap requires shared responsibility.">
        <div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr] lg:items-center">
          <div className="relative mx-auto h-80 w-80 rounded-full border border-cyan-200/25 bg-cyan-300/[0.06]">
            <div className="absolute inset-20 flex items-center justify-center rounded-full bg-lake-950 text-center text-lg font-bold text-white shadow-glow">Tonle Sap</div>
            {roles.map(([name, , Icon], index) => {
              const angle = (index / roles.length) * Math.PI * 2 - Math.PI / 2;
              const x = 132 + Math.cos(angle) * 118;
              const y = 132 + Math.sin(angle) * 118;
              return (
                <div key={name} className="absolute flex h-14 w-14 items-center justify-center rounded-full border border-cyan-200/30 bg-lake-800 text-cyan-100" style={{ left: x, top: y }}>
                  <Icon size={24} />
                </div>
              );
            })}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {roles.map(([name, body]) => (
              <div key={name} className="rounded-lg border border-cyan-200/15 bg-white/[0.055] p-5">
                <h3 className="text-xl font-semibold text-white">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-cyan-50/72">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="solutions" eyebrow="Protecting Tonle Sap's Future" title="Solutions turn warning signs into recovery paths.">
        <div className="mt-8 flex items-center gap-4">
          <button onClick={() => setSolutionMode((value) => !value)} className="rounded-full border border-cyan-200/30 bg-cyan-300/10 px-5 py-3 text-sm font-bold text-cyan-50 transition hover:bg-cyan-300/18">
            {solutionMode ? "Show warning state" : "Show solution state"}
          </button>
          <span className="text-sm text-cyan-50/62">Toggle the cards to see the shift from risk to action.</span>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map(([title, Icon]) => (
            <motion.div key={title} layout className={`rounded-lg border p-6 transition-colors ${solutionMode ? "border-reed/40 bg-reed/12" : "border-cyan-200/20 bg-white/[0.07] hover:border-cyan-300/45 hover:bg-white/[0.11]"}`}>
              <Icon className={solutionMode ? "text-reed" : "text-lake-500"} size={34} />
              <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-cyan-50/72">
                {solutionMode ? "A practical step toward stronger communities, healthier fish stocks, and more stable income." : "Without action, this pressure continues to weaken livelihoods and the lake."}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="limits" eyebrow="Research Transparency" title="The findings are useful, but they have limits.">
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {[
            "Survey sample: 58 responses",
            "Most participants were students and teachers",
            "No direct interviews with fishermen were conducted due to time and access limitations",
            "Some survey responses were short or lacked detail",
            "Results may not represent every community around Tonle Sap",
          ].map((limit) => (
            <div key={limit} className="rounded-lg border border-cyan-200/15 bg-white/[0.045] p-5 text-sm leading-6 text-cyan-50/76">{limit}</div>
          ))}
        </div>
      </Section>

      <Section id="recommendations" eyebrow="What Needs To Change?" title="Recommendations for stronger protection and fairer livelihoods.">
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((item) => (
            <div key={item} className="rounded-lg border border-reed/25 bg-reed/[0.08] p-5">
              <CheckCircle2 className="mb-4 text-reed" />
              <p className="font-semibold leading-7 text-white">{item}</p>
            </div>
          ))}
        </div>
      </Section>
      </div>

      <section className="noise relative min-h-screen overflow-hidden px-5 py-24 sm:px-8 lg:px-12">
        <img src="/images/tonle-sap-final.png" alt="Fishing boat floating on Tonle Sap at sunset" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-lake-950 via-lake-950/68 to-lake-950/20" />
        <div className="relative z-10 mx-auto flex min-h-[76vh] max-w-5xl flex-col justify-end">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl">
            <p className="font-serif text-4xl font-semibold leading-tight text-white sm:text-6xl">
              "Protecting Tonle Sap means protecting the people who depend on it."
            </p>
            <p className="mt-6 text-2xl text-white">"The future of the lake depends on the choices we make today."</p>
            <div className="mt-10 border-t border-cyan-200/20 pt-6 text-sm uppercase tracking-[0.2em] text-cyan-50/70">
              <p>Created by Hoklay Ho</p>
              <p className="mt-2">Grade 12 Capstone Project</p>
              <p className="mt-2">CIA First International School, 2026</p>
              <p className="mt-2">Economics / Civics / Sustainability / Cambodia</p>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-cyan-200/15 bg-lake-950 px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-center gap-3 text-cyan-100">
            <Megaphone size={20} />
            <p className="text-sm font-bold uppercase tracking-[0.22em]">Footer Sources</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-cyan-50/70">
            {["Food and Agriculture Organization (FAO)", "Mekong River Commission", "WorldFish Cambodia", "Survey Responses (58 Participants)", "Cambodia Fisheries Administration", "Tonle Sap Conservation Resources"].map((source) => (
              <span key={source} className="rounded-full border border-cyan-200/15 px-4 py-2">{source}</span>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
