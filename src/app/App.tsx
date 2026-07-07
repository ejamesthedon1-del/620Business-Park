import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { PropertyLocationMap } from "./components/PropertyLocationMap";
import { SpaceDetailModal } from "./components/SpaceDetailModal";
import { ReviewsCarousel } from "./components/ReviewsCarousel";
import { propertyLocation } from "../data/location";
import { initMetaPixel, trackMetaEvent } from "../lib/metaPixel";
import {
  MapPin,
  ArrowRight,
  Phone,
  Mail,
  Check,
  Menu,
  X,
} from "lucide-react";

const HERO_IMG = "/images/hero.png";
const GALLERY_IMG_BUILDING = "/images/gallery-building.png";
const SPACE_MAIN_IMAGE = GALLERY_IMG_BUILDING;
const SUITE_110_IMAGE = "/images/suite-110.png";

const SUITE_110_GALLERY = [
  { src: "/images/suite-110.png", alt: "Suite 106 — private office with corner window" },
  { src: "/images/suite-110-main.png", alt: "Suite 106 — open main room with built-in kitchenette" },
  { src: "/images/suite-110-office.png", alt: "Suite 106 — bright private office with three windows" },
  { src: "/images/suite-110-entry.png", alt: "Suite 106 — entry with kitchenette and keyless door" },
  { src: "/images/suite-110-hallway.png", alt: "Suite 106 — hallway leading to private rooms" },
  { src: "/images/suite-110-pantry.png", alt: "Suite 106 — pantry with butcher-block counter and storage" },
];

type SpaceItem = {
  id: string;
  floor: string;
  type: string;
  sqft: string;
  available: string;
  rate: string;
  image: string;
  features: string[];
  gallery?: { src: string; alt: string }[];
};

const spaces: SpaceItem[] = [
  {
    id: "Suite 203",
    floor: "1st Floor",
    type: "Executive Suite",
    sqft: "1,940",
    available: "Immediate",
    rate: "$28 / SF / Yr",
    image: SUITE_110_IMAGE,
    gallery: SUITE_110_GALLERY,
    features: ["4 offices", "Reception area", "Conference room"],
  },
  {
    id: "Suite 106",
    floor: "1st Floor",
    type: "Open Plan",
    sqft: "1,385",
    available: "Immediate",
    rate: "$26 / SF / Yr",
    image: "/images/suite-220.png",
    gallery: [
      { src: "/images/suite-220.png", alt: "Suite 106 — open room with tile flooring and bright windows" },
      { src: "/images/suite-220-2.png", alt: "Suite 106 — open-plan layout with wood flooring and multiple rooms" },
      { src: "/images/suite-220-3.png", alt: "Suite 106 — wood-paneled office with recessed lighting" },
      { src: "/images/suite-220-4.png", alt: "Suite 106 — private office with built-in cabinetry and desk" },
      { src: "/images/suite-220-5.png", alt: "Suite 106 — bright office with multiple windows and wood flooring" },
      { src: "/images/suite-220-6.png", alt: "Suite 106 — private restroom with vanity and vessel sink" },
    ],
    features: ["Open floor plan", "Conference room", "Storage room"],
  },
];

// Web3Forms access key — destination inbox is set when you create the key at https://web3forms.com.
// Stored in .env.local as VITE_WEB3FORMS_ACCESS_KEY (the key is safe to expose publicly).
const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY";

const keyStats: { value: string; label: string }[] = [
  { value: "700–2,000", label: "SF Available" },
  { value: "6", label: "Buildings On-Site" },
  { value: "2026", label: "Renovated" },
];

const reviews = [
  {
    name: "Larrisa Rangel",
    source: "Google Review",
    rating: 5,
    quote:
      "This is a great location for a business. The buildings are well kept, the management is awesome, and the onsite grounds caretaker is always on top of things. The rent is priced well for the area and the traffic for business is good.",
  },
  {
    name: "Annjanette Arviso",
    source: "Google Review",
    rating: 5,
    quote:
      "Best landlord ever!! He gets things done in a timely manner if anything goes wrong — very fair and not overbearing, and keeps up with his buildings. The bathrooms are always spotless!! Love renting from here, it's a great place to have a business at!",
  },
  {
    name: "Jonathan Kirkland",
    source: "Google Review",
    rating: 5,
    quote:
      "Nice office park. Owner maintains the property consistently. Location is terrific!",
  },
  {
    name: "Amanda Spencer",
    source: "Google Review",
    rating: 5,
    quote:
      "We've had our spa at 620 Oaks Office Park for about 6 years now and couldn't be happier with the management. It's a quiet office park with many different businesses, and all of our neighbors have been friendly over the years. Jon is quick to solve any maintenance issues we've had and has always been available whenever we've needed him. The rent is fair and the location is great!",
  },
  {
    name: "Mike Connors",
    source: "Google Review",
    rating: 5,
    quote:
      "I spent four great years at 620 Oaks Office Park. We ran our construction business out of this location and really had a great experience. We expanded and needed more office space and a warehouse. The management was great the whole time. Never raised our rent and if we ever had a concern Jon took care of it immediately. I don't think you'll find better pricing in North Austin. While it's not the most luxurious place you can lease it's definitely a solid, well priced and serviceable location for a small business.",
  },
  {
    name: "Todd Panozzo",
    source: "Google Review",
    rating: 4,
    quote:
      "John, the property manager, is always willing to get right on anything that comes up. He's easy to work with and gets things done. Also, when comparing office rental prices of similar quality and location, this is hard to beat.",
  },
  {
    name: "J P",
    source: "Google Review",
    rating: 5,
    quote:
      "I like this office park because it's visually appealing. It's hard to do business in a place that millennials cringe at and this is definitely not that. Well done.",
  },
];

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", interest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<(typeof spaces)[number] | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    initMetaPixel();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  const inquireAboutSpace = (spaceId: string) => {
    setForm((prev) => ({ ...prev, interest: spaceId }));
    setSelectedSpace(null);
    scrollTo("contact");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New leasing inquiry — ${form.name || "620 Oaks Office Park"}`,
          from_name: "620 Oaks Office Park Website",
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          space_of_interest: form.interest || "Not specified",
          message: form.message,
          replyto: form.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        trackMetaEvent("Lead", {
          content_name: form.interest || "General inquiry",
          content_category: "Leasing inquiry",
        });
        setSubmitted(true);
        setForm({ name: "", company: "", email: "", phone: "", interest: "", message: "" });
      } else {
        setError(
          data.message ||
            "Something went wrong. Please try again or email us directly at perfectoffice512@gmail.com.",
        );
      }
    } catch {
      setError(
        "We couldn't send your message. Please try again or email us directly at perfectoffice512@gmail.com.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const navLinks = [
    { label: "Spaces", id: "spaces" },
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
        <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Left: mobile menu */}
          <div className="flex items-center">
            <button
              className="md:hidden text-foreground/70 hover:text-foreground"
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Menu"
            >
              {navOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Center: logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 group whitespace-nowrap"
          >
            <span
              className="text-base md:text-xl tracking-[0.08em] uppercase text-foreground font-bold"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              620
            </span>
            <span
              className="text-base md:text-xl tracking-[0.06em] uppercase text-foreground font-bold"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Oaks Office Park
            </span>
          </button>

          {/* Right: desktop nav / mobile call */}
          <div className="flex items-center">
            <nav className="hidden md:flex items-center gap-6">
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

            <a
              href="tel:+15129948075"
              className="md:hidden text-foreground/70 hover:text-accent transition-colors"
              aria-label="Call (512) 994-8075"
            >
              <Phone size={18} />
            </a>
          </div>
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
          alt="620 Oaks Office Park — stone office buildings with parking and mature trees"
          className="absolute bottom-0 left-0 right-0 w-full h-[56%] md:h-[60%] object-cover object-[center_64%] translate-y-4 md:translate-y-5"
        />
        <div className="absolute inset-x-0 bottom-0 h-44 md:h-56 bg-[linear-gradient(to_top,var(--card)_0%,color-mix(in_srgb,var(--card)_90%,transparent)_10%,color-mix(in_srgb,var(--card)_65%,transparent)_26%,color-mix(in_srgb,var(--card)_38%,transparent)_42%,color-mix(in_srgb,var(--card)_15%,transparent)_58%,transparent_78%)] pointer-events-none z-[2]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-28 w-full text-center">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-normal text-foreground leading-[0.95] mb-4 max-w-4xl mx-auto"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="block">Best Location</span>
            <span className="block">and Prices</span>
            <span className="block text-accent not-italic">on FM 620</span>
          </h1>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => scrollTo("spaces")}
              className="flex items-center gap-3 px-7 py-3.5 bg-accent text-accent-foreground text-sm tracking-[0.1em] uppercase hover:bg-accent/90 transition-colors duration-200"
            >
              View Featured Spaces
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

      {/* KEY STATS */}
      <section className="bg-card -mt-px">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 border-y border-border">
            {keyStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center py-8 md:py-10 px-3 md:px-4 border-border ${
                  i < keyStats.length - 1 ? "border-r" : ""
                }`}
              >
                <span
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-foreground leading-none whitespace-nowrap"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-muted-foreground mt-3">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="bg-card py-14 md:py-20">
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
              Hear from teams who chose 620 Oaks Office Park as their home base.
            </p>
          </div>

          <ReviewsCarousel reviews={reviews} />
        </div>
      </section>

      {/* AVAILABLE SPACES */}
      <section id="spaces" className="bg-background pt-12 md:pt-16 pb-10 md:pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <p className="text-[11px] tracking-[0.25em] uppercase text-accent mb-2">For Lease</p>
            <h2
              className="text-4xl md:text-5xl font-normal text-foreground leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Featured Spaces
            </h2>
            <p className="text-sm md:text-base text-foreground/55 font-light mt-2 leading-relaxed">
              Flexible configurations to match
              <br />your team&apos;s way of working.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {spaces.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedSpace(s)}
                className="bg-background overflow-hidden text-left group transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={s.image}
                    alt={`${s.id} — ${s.type}`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <span className="absolute top-4 right-4 text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full bg-white/90 text-foreground backdrop-blur-sm">
                    {s.available === "Immediate" ? "Available" : "Coming Soon"}
                  </span>
                </div>
                <div className="pt-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-0.5">{s.floor}</p>
                  <h3
                    className="text-xl md:text-2xl text-foreground font-normal leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {s.id}
                  </h3>
                  <p className="text-sm text-foreground/60 font-light leading-tight mt-0.5">{s.sqft} SF</p>
                  <p className="mt-1.5 flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-accent group-hover:gap-3 transition-all">
                    View Details
                    <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </p>
                </div>
              </button>
            ))}
          </div>

          <SpaceDetailModal
            space={selectedSpace}
            image={selectedSpace?.image ?? SPACE_MAIN_IMAGE}
            gallery={selectedSpace?.gallery}
            onClose={() => setSelectedSpace(null)}
            onInquire={inquireAboutSpace}
          />
        </div>
      </section>

      {/* PROPERTY OVERVIEW */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-accent mb-4">About the Property</p>
          <h2
            className="text-4xl md:text-5xl font-normal text-foreground leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            At the center of a
            <br />thriving business community.
          </h2>
          <p className="text-sm md:text-base text-foreground/55 font-light mt-5 leading-relaxed">
            At the center of one of Austin&apos;s most active business corridors.
          </p>
        </div>

        <PropertyLocationMap />
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-card border-t border-border py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left: Info */}
            <div className="text-center">
              <p className="text-[11px] tracking-[0.25em] uppercase text-accent mb-3">Get in Touch</p>
              <h2
                className="text-4xl md:text-5xl font-normal text-foreground leading-tight mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Schedule a Tour Today.
              </h2>
              <p className="text-foreground/50 font-light leading-relaxed mb-8 max-w-sm mx-auto">
                Reach out to schedule a private tour or request a lease proposal. We typically respond within one business day.
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-accent" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-0.5">Phone</p>
                    <p className="text-sm text-foreground">(512) 994-8075</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-accent" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-0.5">Email</p>
                    <p className="text-sm text-foreground">perfectoffice512@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-accent" />
                  </div>
                  <div className="text-left">
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
                    Thank you for your interest in 620 Oaks Office Park. A member of our leasing team will be in touch shortly.
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

                  {error && (
                    <p className="text-xs text-destructive leading-relaxed">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center justify-center gap-3 px-7 py-4 bg-accent text-accent-foreground text-xs tracking-[0.15em] uppercase hover:bg-accent/90 transition-colors duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending..." : "Send Inquiry"}
                    {!submitting && <ArrowRight size={13} />}
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
            <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40">Oaks Office Park</span>
          </div>
          <p className="text-[10px] tracking-[0.1em] text-muted-foreground">
            © 2026 620 Oaks Office Park. All rights reserved.
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
