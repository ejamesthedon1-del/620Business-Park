import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { PropertyLocationMap } from "./components/PropertyLocationMap";
import { BenefitIcon, type BenefitIconId } from "./components/BenefitIcons";
import { propertyLocation } from "../data/location";
import {
  MapPin,
  ArrowRight,
  Phone,
  Mail,
  Check,
  Menu,
  X,
  Star,
} from "lucide-react";

const HERO_IMG = "/images/hero.png";
const GALLERY_IMG_PARKING = "/images/gallery-parking.png";
const GALLERY_IMG_WALKWAY = "/images/gallery-walkway.png";
const GALLERY_IMG_BUILDING = "/images/gallery-building.png";

const spaces = [
  {
    id: "Suite 110",
    floor: "1st Floor",
    type: "Executive Suite",
    sqft: "1,850",
    available: "Immediate",
    rate: "$28 / SF / Yr",
    image: "/images/gallery-building.png",
    features: ["Corner unit", "Private entrance", "Kitchenette", "2 private offices"],
  },
  {
    id: "Suite 220",
    floor: "2nd Floor",
    type: "Open Plan",
    sqft: "3,400",
    available: "August 1, 2026",
    rate: "$26 / SF / Yr",
    image: "/images/gallery-walkway.png",
    features: ["Open floor plan", "Conference room", "Storage room", "Elevator access"],
  },
  {
    id: "Suite 310",
    floor: "3rd Floor",
    type: "Professional Suite",
    sqft: "2,200",
    available: "Immediate",
    rate: "$27 / SF / Yr",
    image: "/images/gallery-parking.png",
    features: ["City views", "Reception area", "4 private offices", "Break room"],
  },
];

const businessBenefits: { icon: BenefitIconId; title: string; description: string }[] = [
  {
    icon: "impression",
    title: "Make a strong first impression",
    description: "Professional surroundings that signal credibility and help you win trust from the first meeting.",
  },
  {
    icon: "team",
    title: "Give your team room to perform",
    description: "Thoughtful layouts and quiet, well-managed spaces where people can focus and collaborate.",
  },
  {
    icon: "growth",
    title: "Grow without starting over",
    description: "Flexible suites that adapt as your business expands — so your space keeps pace with your ambition.",
  },
  {
    icon: "confidence",
    title: "Operate with confidence",
    description: "On-site management and secure access mean fewer distractions and more time running your business.",
  },
];

const reviews = [
  {
    name: "Sarah Chen",
    company: "Meridian Legal Group",
    suite: "Suite 220",
    rating: 5,
    quote:
      "Moving here was one of the best decisions we made for the firm. The building is impeccably maintained, parking is easy, and our clients consistently comment on how professional the space feels.",
  },
  {
    name: "James Whitfield",
    company: "Whitfield Advisory",
    suite: "Suite 110",
    rating: 5,
    quote:
      "The on-site management team is responsive and genuinely helpful. From day one, setup was smooth and we've had zero downtime — exactly what a growing business needs.",
  },
  {
    name: "Priya Kapoor",
    company: "Kapoor Design Studio",
    suite: "Suite 310",
    rating: 5,
    quote:
      "Natural light, quiet floors, and a layout that actually works for our team. We looked at a dozen properties before choosing 620 — this one stood out immediately.",
  },
];

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", interest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const navLinks = [
    { label: "Why Us", id: "overview" },
    { label: "Spaces", id: "spaces" },
    { label: "Gallery", id: "gallery" },
    { label: "Reviews", id: "reviews" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 group"
          >
            <span
              className="text-sm md:text-base tracking-[0.2em] uppercase text-accent font-medium"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              620
            </span>
            <span
              className="text-sm md:text-base tracking-[0.25em] uppercase text-foreground/80 font-light"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Office Park
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 4).map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-xs tracking-[0.15em] uppercase text-foreground/50 hover:text-foreground transition-colors duration-200"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="text-xs tracking-[0.15em] uppercase px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-200"
            >
              Inquire
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button className="md:hidden text-foreground/60 hover:text-foreground" onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {navOpen && (
          <div className="md:hidden bg-background/98 backdrop-blur border-t border-border px-6 py-6 flex flex-col gap-5">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-left text-sm tracking-[0.15em] uppercase text-foreground/60 hover:text-foreground transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-[620px] md:min-h-[700px] pb-12 md:pb-14 overflow-hidden bg-[#7eb8dc]">
        {/* Extended sky — fills the text zone */}
        <div className="absolute inset-x-0 top-0 h-[70%] md:h-[64%] z-[1] bg-gradient-to-b from-[#6aabda] from-0% via-[#7eb8dc] via-35% via-[#91c5e6] via-65% to-transparent to-100% pointer-events-none" />
        <img
          src={HERO_IMG}
          alt="620 Office Park — stone office buildings with parking and mature trees"
          className="absolute bottom-0 left-0 right-0 w-full h-[56%] md:h-[60%] object-cover object-top translate-y-4 md:translate-y-5"
        />
        <div className="absolute inset-x-0 bottom-0 h-44 md:h-56 bg-[linear-gradient(to_top,var(--card)_0%,color-mix(in_srgb,var(--card)_90%,transparent)_10%,color-mix(in_srgb,var(--card)_65%,transparent)_26%,color-mix(in_srgb,var(--card)_38%,transparent)_42%,color-mix(in_srgb,var(--card)_15%,transparent)_58%,transparent_78%)] pointer-events-none z-[2]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-28 w-full text-center">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-normal text-foreground leading-[0.95] mb-4 max-w-4xl mx-auto"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="block">The Next Chapter</span>
            <span className="block">for Your Business</span>
            <span className="block text-accent not-italic">Starts Here.</span>
          </h1>

          <p className="text-base md:text-lg text-foreground/60 max-w-xl mb-6 font-light leading-snug mx-auto">
            Premium Class A office suites available for immediate occupancy. Designed for businesses that demand more from their environment.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => scrollTo("spaces")}
              className="flex items-center gap-3 px-7 py-3.5 bg-accent text-accent-foreground text-sm tracking-[0.1em] uppercase hover:bg-accent/90 transition-colors duration-200"
            >
              View Available Spaces
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="flex items-center gap-3 px-7 py-3.5 bg-white text-foreground text-sm tracking-[0.1em] uppercase shadow-sm hover:bg-white/90 transition-colors duration-200"
            >
              Schedule a Tour
            </button>
          </div>
        </div>
      </section>

      {/* WHY OUR SPACES */}
      <section id="overview" className="border-b border-border bg-card -mt-px">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Everything Your Business Needs to Thrive
            </h2>
            <p className="text-sm md:text-base text-foreground/55 font-light mt-5 leading-relaxed">
              The right space does more than hold your team — it elevates how you work, how you&apos;re seen, and how fast you can grow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {businessBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-border bg-background p-8 md:p-10 flex flex-col gap-5 transition-colors duration-300 hover:border-accent/25 hover:bg-secondary/30"
              >
                <BenefitIcon id={benefit.icon} />
                <h3 className="text-base md:text-lg font-medium text-foreground leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-sm text-foreground/55 font-light leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTY OVERVIEW */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-5 gap-12 md:gap-10 items-start">
          <div className="md:col-span-2">
            <p className="text-[11px] tracking-[0.25em] uppercase text-accent mb-5">About the Property</p>
            <h2
              className="text-4xl md:text-5xl font-normal text-foreground leading-tight mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              At the center of a
              <br />thriving business community.
            </h2>
            <p className="text-foreground/55 leading-relaxed mb-6 font-light">
              620 Office Park sits at the crossroads of northwest Austin's busiest commercial corridors —
              Plaza Volente and Anderson Mill to the east, Four Points dining and retail to the west, and
              national brands, grocers, banks, and services lining RM 620 in both directions.
            </p>
            <p className="text-foreground/55 leading-relaxed font-light">
              That concentration of established businesses and everyday community activity is what makes
              this location worth capitalizing on. Tenants gain the visibility, convenience, and foot traffic
              of a proven market — right from the center of it all.
            </p>
          </div>

          <div className="md:col-span-3">
            <PropertyLocationMap />
          </div>
        </div>
      </section>

      {/* AVAILABLE SPACES */}
      <section id="spaces" className="bg-card border-y border-border py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-accent mb-4">For Lease</p>
              <h2
                className="text-4xl md:text-5xl font-normal text-foreground"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Available Spaces
              </h2>
            </div>
            <p className="text-foreground/50 text-sm font-light max-w-xs leading-relaxed">
              Three distinct configurations to match your team's way of working.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {spaces.map((s) => (
              <div
                key={s.id}
                className="rounded-3xl border border-border bg-background overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={s.image}
                    alt={`${s.id} — ${s.type}`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/5 pointer-events-none" />
                  <span className="absolute top-4 right-4 text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full bg-white/90 text-foreground backdrop-blur-sm">
                    {s.available === "Immediate" ? "Available" : "Coming Soon"}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/75 mb-1">{s.floor}</p>
                    <h3
                      className="text-2xl md:text-[1.65rem] text-white font-normal leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {s.id}
                    </h3>
                  </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col gap-6 flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">Type</p>
                    <p className="text-sm text-foreground/80">{s.type}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">Size</p>
                    <p className="text-sm text-foreground/80">{s.sqft} SF</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">Rate</p>
                    <p className="text-sm text-foreground/80">{s.rate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1">Available</p>
                    <p className="text-sm text-foreground/80">{s.available}</p>
                  </div>
                </div>

                <ul className="flex flex-col gap-2 border-t border-border pt-5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <Check size={11} className="text-accent shrink-0" />
                      <span className="text-xs text-foreground/55">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="mt-auto flex items-center gap-2 text-xs tracking-[0.1em] uppercase text-accent group-hover:gap-3 transition-all duration-200"
                >
                  Inquire About This Suite
                  <ArrowRight size={11} />
                </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <p className="text-[11px] tracking-[0.25em] uppercase text-accent mb-12">Gallery</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border">
          <div className="col-span-2 aspect-[16/9] bg-card overflow-hidden">
            <img
              src={GALLERY_IMG_PARKING}
              alt="620 Office Park — parking lot with stone buildings and mature trees"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="aspect-[4/3] bg-card overflow-hidden hidden md:block">
            <img
              src={GALLERY_IMG_WALKWAY}
              alt="620 Office Park — covered stone walkway with landscaping"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="col-span-2 md:col-span-3 aspect-[16/9] bg-card overflow-hidden">
            <img
              src={GALLERY_IMG_BUILDING}
              alt="620 Office Park — two-story stone building with exterior staircase"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="border-t border-border py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <p className="text-[11px] tracking-[0.25em] uppercase text-accent mb-4">What Tenants Say</p>
            <h2
              className="text-4xl md:text-5xl font-normal text-foreground leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Trusted by Growing Businesses
            </h2>
            <p className="text-sm md:text-base text-foreground/55 font-light mt-5 leading-relaxed">
              Hear from teams who chose 620 Office Park as their home base.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="rounded-3xl border border-border bg-background p-8 md:p-10 flex flex-col gap-5"
              >
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-sm text-foreground/70 font-light leading-relaxed flex-1">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="border-t border-border pt-5">
                  <p className="text-sm font-medium text-foreground">{review.name}</p>
                  <p className="text-xs text-foreground/50 mt-1">
                    {review.company} · {review.suite}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-card border-t border-border py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left: Info */}
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-accent mb-5">Get in Touch</p>
              <h2
                className="text-4xl md:text-5xl font-normal text-foreground leading-tight mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ready to make
                <br />620 yours?
              </h2>
              <p className="text-foreground/50 font-light leading-relaxed mb-12 max-w-sm">
                Reach out to schedule a private tour or request a lease proposal. We typically respond within one business day.
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-0.5">Phone</p>
                    <p className="text-sm text-foreground">(555) 620-0100</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-0.5">Email</p>
                    <p className="text-sm text-foreground">leasing@620officepark.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-0.5">Address</p>
                    <p className="text-sm text-foreground">{propertyLocation.fullAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              {submitted ? (
                <div className="h-full flex flex-col items-start justify-center gap-4 py-12">
                  <div className="w-12 h-12 border border-accent flex items-center justify-center">
                    <Check size={18} className="text-accent" />
                  </div>
                  <h3
                    className="text-2xl font-normal text-foreground"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Message received.
                  </h3>
                  <p className="text-foreground/50 font-light leading-relaxed max-w-xs">
                    Thank you for your interest in 620 Office Park. A member of our leasing team will be in touch shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs tracking-[0.15em] uppercase text-accent border border-accent/30 px-5 py-2.5 hover:border-accent transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                        Full Name <span className="text-accent">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="bg-background border border-border px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                        Company
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="bg-background border border-border px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                        placeholder="Acme Corp."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                        Email <span className="text-accent">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="bg-background border border-border px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                        placeholder="jane@acme.com"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="bg-background border border-border px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                        placeholder="(555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      Space of Interest
                    </label>
                    <select
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className="bg-background border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent transition-colors appearance-none"
                    >
                      <option value="">Select a suite...</option>
                      {spaces.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.id} — {s.sqft} SF ({s.type})
                        </option>
                      ))}
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="bg-background border border-border px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder="Tell us about your space requirements, preferred move-in date, or any questions..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-3 px-7 py-4 bg-accent text-accent-foreground text-xs tracking-[0.15em] uppercase hover:bg-accent/90 transition-colors duration-200 mt-2"
                  >
                    Send Inquiry
                    <ArrowRight size={13} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-[0.2em] uppercase text-accent">620</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40">Office Park</span>
          </div>
          <p className="text-[10px] tracking-[0.1em] text-muted-foreground">
            © 2026 620 Office Park. All rights reserved.
          </p>
          <div className="flex gap-6">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
