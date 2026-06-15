import { useState, useEffect, useRef } from "react";
import { MapPin, ArrowRight, Phone, Mail, ChevronDown, Check, Menu, X } from "lucide-react";

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
    features: ["Corner unit", "Private entrance", "Kitchenette", "2 private offices"],
  },
  {
    id: "Suite 220",
    floor: "2nd Floor",
    type: "Open Plan",
    sqft: "3,400",
    available: "August 1, 2026",
    rate: "$26 / SF / Yr",
    features: ["Open floor plan", "Conference room", "Storage room", "Elevator access"],
  },
  {
    id: "Suite 310",
    floor: "3rd Floor",
    type: "Professional Suite",
    sqft: "2,200",
    available: "Immediate",
    rate: "$27 / SF / Yr",
    features: ["City views", "Reception area", "4 private offices", "Break room"],
  },
];

const businessBenefits = [
  {
    title: "Make a strong first impression",
    description: "Professional surroundings that signal credibility and help you win trust from the first meeting.",
  },
  {
    title: "Give your team room to perform",
    description: "Thoughtful layouts and quiet, well-managed spaces where people can focus and collaborate.",
  },
  {
    title: "Grow without starting over",
    description: "Flexible suites that adapt as your business expands — so your space keeps pace with your ambition.",
  },
];

const amenities = [
  "24/7 Secure Access",
  "On-site Property Management",
  "High-Speed Fiber Internet",
  "Common Area HVAC",
  "ADA Compliant",
  "Covered Parking",
  "EV Charging Stations",
  "On-site Café",
  "Conference Facilities",
  "Bike Storage",
  "Rooftop Terrace",
  "LEED Certified",
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
    { label: "Amenities", id: "amenities" },
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
              className="text-xs tracking-[0.2em] uppercase text-accent font-medium"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              620
            </span>
            <span
              className="text-xs tracking-[0.25em] uppercase text-foreground/80 font-light"
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
      <section id="hero" className="relative h-screen min-h-[600px] flex items-end bg-black">
        <img
          src={HERO_IMG}
          alt="620 Office Park — stone office buildings with parking and mature trees"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.5)_28%,transparent_55%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 md:pb-12 w-full">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={12} className="text-accent" />
            <span className="text-xs tracking-[0.2em] uppercase text-accent">
              620 Office Park Drive
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-normal text-white leading-[0.88] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="block">Space that works</span>
            <span className="block text-accent not-italic">as hard as you do.</span>
          </h1>

          <p className="text-base md:text-lg text-white/70 max-w-xl mb-6 font-light leading-snug">
            Premium Class A office suites available for immediate occupancy. Designed for businesses that demand more from their environment.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("spaces")}
              className="flex items-center gap-3 px-7 py-3.5 bg-accent text-accent-foreground text-sm tracking-[0.1em] uppercase hover:bg-accent/90 transition-colors duration-200"
            >
              View Available Spaces
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="flex items-center gap-3 px-7 py-3.5 border border-white/30 text-white/80 text-sm tracking-[0.1em] uppercase hover:border-white/60 hover:text-white transition-all duration-200"
            >
              Schedule a Tour
            </button>
          </div>
        </div>

        <button
          onClick={() => scrollTo("overview")}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors animate-bounce"
        >
          <ChevronDown size={20} />
        </button>
      </section>

      {/* WHY OUR SPACES */}
      <section id="overview" className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-tight mb-5 max-w-4xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Helping Businesses Grow Starts With the Right Space
          </h2>
          <p className="text-sm md:text-base text-foreground/55 font-light max-w-2xl mb-12 leading-relaxed">
            The right space does more than hold your team — it elevates how you work, how you&apos;re seen, and how fast you can grow.
          </p>
          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {businessBenefits.map((benefit) => (
              <div key={benefit.title} className="flex flex-col gap-3 border-t border-border pt-8">
                <h3
                  className="text-xl md:text-2xl font-normal text-foreground leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {benefit.title}
                </h3>
                <p className="text-sm text-foreground/55 font-light leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTY OVERVIEW */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-accent mb-5">About the Property</p>
            <h2
              className="text-4xl md:text-5xl font-normal text-foreground leading-tight mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              A landmark address
              <br />in the heart of the district.
            </h2>
            <p className="text-foreground/55 leading-relaxed mb-6 font-light">
              620 Office Park is a premier Class A commercial development offering 48,000 square feet of
              thoughtfully designed workspace. With four stories of contemporary office suites, the property
              combines architectural distinction with the operational infrastructure modern businesses require.
            </p>
            <p className="text-foreground/55 leading-relaxed font-light">
              Tenants enjoy unmatched proximity to regional transit, executive dining, and a curated roster
              of professional services — all within walking distance of the building.
            </p>
          </div>

          <div>
            <img
              src={HERO_IMG}
              alt="620 Office Park — stone office buildings with parking and mature trees"
              className="w-full aspect-[4/3] object-cover bg-card"
            />
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

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {spaces.map((s, i) => (
              <div
                key={s.id}
                className="bg-card p-8 flex flex-col gap-6 group hover:bg-background transition-colors duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">{s.floor}</p>
                    <h3
                      className="text-xl text-foreground font-normal"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {s.id}
                    </h3>
                  </div>
                  <span className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 border border-accent text-accent">
                    {s.available === "Immediate" ? "Available" : "Coming Soon"}
                  </span>
                </div>

                <div className="border-t border-border pt-6 grid grid-cols-2 gap-4">
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

      {/* AMENITIES */}
      <section id="amenities" className="border-t border-border py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-accent mb-5">Building Features</p>
              <h2
                className="text-4xl md:text-5xl font-normal text-foreground leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Everything your
                <br />business needs.
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {amenities.map((a) => (
                <div key={a} className="flex items-center gap-3 py-3 border-b border-border">
                  <div className="w-1 h-1 rounded-full bg-accent shrink-0" />
                  <span className="text-sm text-foreground/70 font-light">{a}</span>
                </div>
              ))}
            </div>
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
                    <p className="text-sm text-foreground">620 Office Park Drive, Suite 100</p>
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
