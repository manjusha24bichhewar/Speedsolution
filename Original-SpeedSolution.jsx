import { useState, useEffect } from "react";

// ── Inject fonts & global styles ──────────────────────────
(function () {
  const link = document.createElement("link");
  link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
  const s = document.createElement("style");
  s.textContent = `
    *{font-family:'Plus Jakarta Sans',system-ui,sans-serif}
    .fade-in{animation:fadeUp .45s ease both}
    @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
    .card-lift{transition:transform .2s,box-shadow .2s}
    .card-lift:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(30,64,175,.11)}
    .btn-bounce{transition:transform .15s,background .2s}
    .btn-bounce:hover{transform:translateY(-1px)}
    .btn-bounce:active{transform:scale(.97)}
    input:focus,select:focus,textarea:focus{outline:2px solid #3b82f6;outline-offset:0}
    select option[disabled]{color:#aaa}
  `;
  document.head.appendChild(s);
})();

// ── Constants ─────────────────────────────────────────────
const PHONE = "+919076104510";
const EMAIL = "speedsolution25@yahoo.com";
const WA = "+919076104510";

const SERVICES = [
  {
    id: "govt",
    category: "Government ID Services",
    emoji: "🪪",
    border: "border-blue-200",
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-800",
    dot: "bg-blue-500",
    items: [
      { name: "Aadhaar Card", desc: "New enrollment, address update, mobile number linking" },
      { name: "PAN Card", desc: "New application, corrections & reprint service" },
      { name: "Voter ID", desc: "New voter registration, updates, duplicate card" },
      { name: "Passport", desc: "Fresh passport, renewal and tatkal services" },
    ],
  },
  {
    id: "cert",
    category: "Certificates",
    emoji: "📜",
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-800",
    dot: "bg-emerald-500",
    items: [
      { name: "Birth Certificate", desc: "Registration, corrections and duplicate copies" },
      { name: "Death Certificate", desc: "Official registration and certified copies" },
      { name: "Marriage Certificate", desc: "Registration and certified copies" },
    ],
  },
  {
    id: "prop",
    category: "Property & Legal",
    emoji: "🏠",
    border: "border-amber-200",
    bg: "bg-amber-50",
    badge: "bg-amber-100 text-amber-800",
    dot: "bg-amber-500",
    items: [
      { name: "Rent Agreement", desc: "Drafting and notarized rent agreements" },
      { name: "Property Transfer", desc: "Sale deed, gift deed, mutation assistance" },
      { name: "Shop Act License", desc: "New registration and annual renewals" },
    ],
  },
  {
    id: "fin",
    category: "Financial Services",
    emoji: "💳",
    border: "border-violet-200",
    bg: "bg-violet-50",
    badge: "bg-violet-100 text-violet-800",
    dot: "bg-violet-500",
    items: [
      { name: "Home / Personal Loan", desc: "Eligibility check, documentation and processing" },
      { name: "Business Loan", desc: "Working capital and term loan assistance" },
      { name: "Credit Card", desc: "Application guidance and eligibility help" },
      { name: "MSME Registration", desc: "Udyam registration for small businesses" },
    ],
  },
  {
    id: "ins",
    category: "Insurance Services",
    emoji: "🛡️",
    border: "border-sky-200",
    bg: "bg-sky-50",
    badge: "bg-sky-100 text-sky-800",
    dot: "bg-sky-500",
    items: [
      { name: "Life Insurance", desc: "Term, whole life and investment-linked plans" },
      { name: "Health Insurance", desc: "Individual, family floater and senior citizen plans" },
      { name: "Vehicle Insurance", desc: "Two-wheeler and four-wheeler insurance" },
      { name: "Property Insurance", desc: "Home and commercial property coverage" },
    ],
  },
];

// ── Navbar ────────────────────────────────────────────────
function Navbar({ page, go, user, onLogout }) {
  const [open, setOpen] = useState(false);
  const nav = (p) => { go(p); setOpen(false); };
  const links = ["home", "services", "enquiry"];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, background: "#fff", borderBottom: "1px solid #e5e7eb", boxShadow: "0 1px 8px rgba(0,0,0,.05)" }}>
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <button onClick={() => nav("home")} className="flex items-center gap-2 text-blue-900 font-extrabold text-lg">
          <span style={{ fontSize: 22 }}>⚡</span>
          <span className="hidden sm:block">Speed Solution</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(p => (
            <button key={p} onClick={() => nav(p)} className="capitalize text-sm font-medium transition-colors"
              style={{ color: page === p ? "#1d4ed8" : "#4b5563", borderBottom: page === p ? "2px solid #1d4ed8" : "none", paddingBottom: 2 }}>
              {p}
            </button>
          ))}
          {user?.isAdmin && (
            <button onClick={() => nav("admin")} className="text-sm font-semibold"
              style={{ color: "#7c3aed" }}>Admin</button>
          )}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Hi, {user.name}</span>
              <button onClick={onLogout} className="text-sm text-red-500 hover:text-red-700">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={() => nav("login")} className="text-sm font-medium text-gray-600 hover:text-blue-700">Login</button>
              <button onClick={() => nav("register")} className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-full btn-bounce">
                Register
              </button>
            </div>
          )}
        </div>

        {/* Hamburger */}
        <button className="md:hidden p-2 text-gray-700" onClick={() => setOpen(!open)}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open ? (
              <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {links.map(p => (
            <button key={p} onClick={() => nav(p)} className="block w-full text-left py-2.5 text-sm font-medium capitalize"
              style={{ color: page === p ? "#1d4ed8" : "#374151" }}>{p}</button>
          ))}
          {user?.isAdmin && <button onClick={() => nav("admin")} className="block w-full text-left py-2.5 text-sm font-semibold text-violet-700">Admin Panel</button>}
          {user ? (
            <button onClick={() => { onLogout(); setOpen(false); }} className="block w-full text-left py-2.5 text-sm text-red-500">Logout ({user.name})</button>
          ) : (
            <div className="flex gap-3 pt-1">
              <button onClick={() => nav("login")} className="flex-1 py-2 text-sm border border-gray-200 rounded-xl text-gray-700">Login</button>
              <button onClick={() => nav("register")} className="flex-1 py-2 text-sm bg-blue-700 text-white rounded-xl font-semibold">Register</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

// ── Footer ─────────────────────────────────────────────────
function Footer({ go }) {
  return (
    <footer style={{ background: "#0f172a", color: "#cbd5e1" }} className="mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 text-white font-extrabold text-xl mb-3">
            <span>⚡</span> Speed Solution
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
            Your trusted partner for government, legal, and financial services — fast, reliable, and hassle-free.
          </p>
          <div className="flex gap-3 mt-5">
            <a href={`https://wa.me/${WA}`} target="_blank"
              className="px-4 py-2 rounded-full text-xs font-semibold btn-bounce"
              style={{ background: "#16a34a", color: "#fff" }}>💬 WhatsApp</a>
            <a href={`tel:${PHONE}`}
              className="px-4 py-2 rounded-full text-xs font-semibold btn-bounce"
              style={{ background: "#1e40af", color: "#fff" }}>📞 Call Us</a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <div className="space-y-2">
            {[["home","Home"], ["services","Services"], ["enquiry","Enquire Now"], ["login","Login"], ["register","Register"]].map(([p, l]) => (
              <button key={p} onClick={() => go(p)} className="block text-sm hover:text-white transition-colors text-left"
                style={{ color: "#94a3b8" }}>{l}</button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <div className="space-y-3 text-sm" style={{ color: "#94a3b8" }}>
            <a href={`tel:${PHONE}`} className="flex items-center gap-2 hover:text-white transition-colors">📞 {PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-white transition-colors">✉️ {EMAIL}</a>
            <p>📍 New Mumbai, Maharashtra, India</p>
          </div>
        </div>
      </div>
      <div className="border-t px-4 py-5 text-center text-xs space-y-1" style={{ borderColor: "#1e293b", color: "#64748b" }}>
        <p>⚠️ <strong>Disclaimer:</strong> We do not collect sensitive personal data online. Our team will contact you for further processing.</p>
        <p>© {new Date().getFullYear()} Speed Solution — Your Partner in Growth & Protection. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ── Home Page ──────────────────────────────────────────────
function HomePage({ go, setService }) {
  const features = [
    { icon: "⚡", t: "Fast Processing", d: "Quick turnaround on all document services" },
    { icon: "🔒", t: "Secure & Private", d: "Your information handled with care" },
    { icon: "📞", t: "Dedicated Support", d: "Expert guidance at every step" },
    { icon: "🏆", t: "5000+ Clients", d: "Trusted across New Mumbai & Maharashtra" },
  ];

  return (
    <div className="fade-in">
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg,#0f172a 0%,#1e3a8a 60%,#1d4ed8 100%)",
        overflow: "hidden", position: "relative"
      }} className="text-white">
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
        <div className="relative max-w-6xl mx-auto px-4 py-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", color: "#93c5fd" }}>
            🇮🇳 Trusted Government & Legal Services — New Mumbai
          </div>
          <h1 className="font-extrabold leading-tight mb-3" style={{ fontSize: "clamp(2.2rem,6vw,4rem)" }}>
            Speed Solution
          </h1>
          <p className="font-semibold mb-4" style={{ fontSize: "clamp(1.1rem,2.5vw,1.5rem)", color: "#93c5fd" }}>
            Your Partner in Growth & Protection
          </p>
          <p className="max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "#bfdbfe", fontSize: "1.05rem" }}>
            From Aadhaar to Insurance — we handle all your government, legal &amp; financial service needs. Fast, easy and completely hassle-free.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => go("services")}
              className="px-8 py-3.5 font-extrabold rounded-full text-base btn-bounce shadow-lg"
              style={{ background: "#f97316", color: "#fff" }}>
              Explore Services →
            </button>
            <a href={`tel:${PHONE}`}
              className="px-8 py-3.5 font-semibold rounded-full text-base btn-bounce"
              style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.25)", color: "#fff" }}>
              📞 Click to Call
            </a>
          </div>
        </div>
      </section>

      {/* Feature pills */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map(f => (
            <div key={f.t} className="rounded-2xl p-5 text-center card-lift"
              style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
              <div style={{ fontSize: 30 }} className="mb-2">{f.icon}</div>
              <p className="font-bold text-blue-900 text-sm mb-1">{f.t}</p>
              <p className="text-xs text-gray-500">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section style={{ background: "#f8fafc" }} className="py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-extrabold text-blue-950 mb-2" style={{ fontSize: "1.9rem" }}>Our Services</h2>
            <p className="text-gray-500">Everything you need — under one roof</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(cat => (
              <div key={cat.id} onClick={() => go("services")}
                className={`p-6 rounded-2xl border ${cat.bg} ${cat.border} card-lift cursor-pointer`}>
                <span style={{ fontSize: 32 }}>{cat.emoji}</span>
                <h3 className="font-bold text-gray-800 mt-3 mb-1">{cat.category}</h3>
                <p className="text-sm text-gray-500">{cat.items.length} services available</p>
                <p className="text-sm font-semibold text-blue-700 mt-3">View services →</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Contact strip */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="rounded-3xl p-8 md:p-12 text-white text-center"
          style={{ background: "linear-gradient(135deg,#1e3a8a,#1d4ed8)" }}>
          <h2 className="font-extrabold mb-2" style={{ fontSize: "1.7rem" }}>Need Help? Contact Us</h2>
          <p className="mb-8" style={{ color: "#bfdbfe" }}>Our team is ready to assist you with any service enquiry</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`tel:${PHONE}`} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold btn-bounce"
              style={{ background: "#fff", color: "#1e3a8a" }}>📞 {PHONE}</a>
            <a href={`https://wa.me/${WA}`} target="_blank"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold btn-bounce"
              style={{ background: "#16a34a", color: "#fff" }}>💬 WhatsApp Us</a>
            <a href={`mailto:${EMAIL}`}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold btn-bounce"
              style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.3)", color: "#fff" }}>✉️ Email Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Services Page ──────────────────────────────────────────
function ServicesPage({ go, setService }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 fade-in">
      <div className="text-center mb-10">
        <h1 className="font-extrabold text-blue-950 mb-2" style={{ fontSize: "2rem" }}>Our Services</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Professional assistance for government, legal and financial needs</p>
      </div>

      <div className="space-y-10">
        {SERVICES.map(cat => (
          <div key={cat.id}>
            <div className="flex items-center gap-3 mb-5">
              <span style={{ fontSize: 28 }}>{cat.emoji}</span>
              <h2 className="font-extrabold text-gray-800 text-xl">{cat.category}</h2>
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${cat.badge}`}>
                {cat.items.length} services
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cat.items.map(svc => (
                <div key={svc.name}
                  className={`bg-white rounded-2xl border p-5 card-lift flex flex-col justify-between ${cat.border}`}>
                  <div>
                    <div className={`w-2 h-2 rounded-full ${cat.dot} mb-3`} />
                    <h3 className="font-bold text-gray-800 mb-2">{svc.name}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{svc.desc}</p>
                  </div>
                  <button
                    onClick={() => { setService(svc.name); go("enquiry"); }}
                    className="w-full py-2.5 rounded-xl text-sm font-bold text-white btn-bounce"
                    style={{ background: "#1d4ed8" }}>
                    Enquire Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-4 rounded-2xl text-center text-sm"
        style={{ background: "#fffbeb", border: "1px solid #fcd34d", color: "#92400e" }}>
        ⚠️ <strong>Disclaimer:</strong> We do not collect sensitive personal data (Aadhaar number, documents) online. Our team will contact you for further processing.
      </div>
    </div>
  );
}

// ── Enquiry Form ───────────────────────────────────────────
function EnquiryPage({ preSelected, go }) {
  const [form, setForm] = useState({
    name: "", phone: "", age: "", service: preSelected || "", reqType: "New", message: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (preSelected) setForm(f => ({ ...f, service: preSelected }));
  }, [preSelected]);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter a valid 10-digit phone number";
    if (!form.age || +form.age < 1 || +form.age > 120) e.age = "Enter a valid age";
    if (!form.service) e.service = "Please select a service";
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      const enquiry = {
        id: Date.now(), name: form.name, phone: form.phone, age: +form.age,
        service_type: form.service, request_type: form.reqType,
        message: form.message, created_at: new Date().toISOString()
      };
      const raw = await window.storage.get("enquiries").catch(() => null);
      const list = raw ? JSON.parse(raw.value) : [];
      list.push(enquiry);
      await window.storage.set("enquiries", JSON.stringify(list));
      go("thankyou");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const Field = ({ label, fk, type = "text", ph = "" }) => (
    <div>
      <label className="block text-sm font-semibold mb-1.5" style={{ color: "#374151" }}>{label}</label>
      <input type={type} value={form[fk]} placeholder={ph}
        onChange={e => set(fk, e.target.value)}
        style={{
          width: "100%", padding: "10px 14px", borderRadius: 12, fontSize: 14,
          border: `1px solid ${errors[fk] ? "#f87171" : "#d1d5db"}`,
          background: errors[fk] ? "#fff5f5" : "#fff", boxSizing: "border-box"
        }} />
      {errors[fk] && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors[fk]}</p>}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 fade-in">
      <div className="text-center mb-8">
        <h1 className="font-extrabold text-blue-950 mb-1" style={{ fontSize: "1.9rem" }}>Submit Enquiry</h1>
        <p className="text-gray-500">Fill in your details — our team will contact you within 24 hours</p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 space-y-5"
        style={{ border: "1px solid #e5e7eb", boxShadow: "0 8px 40px rgba(0,0,0,.07)" }}>

        <Field label="Full Name *" fk="name" ph="Enter your full name" />

        <div className="grid grid-cols-2 gap-4">
          <Field label="Phone Number *" fk="phone" type="tel" ph="10-digit number" />
          <Field label="Age *" fk="age" type="number" ph="Your age" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#374151" }}>Service Type *</label>
          <select value={form.service} onChange={e => set("service", e.target.value)}
            style={{
              width: "100%", padding: "10px 14px", borderRadius: 12, fontSize: 14,
              border: `1px solid ${errors.service ? "#f87171" : "#d1d5db"}`,
              background: errors.service ? "#fff5f5" : "#fff", boxSizing: "border-box"
            }}>
            <option value="">Select a service...</option>
            {SERVICES.map(cat => (
              <optgroup key={cat.id} label={`${cat.emoji} ${cat.category}`}>
                {cat.items.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
              </optgroup>
            ))}
          </select>
          {errors.service && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.service}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: "#374151" }}>Request Type *</label>
          <div className="flex gap-3">
            {["New", "Update"].map(t => (
              <button key={t} onClick={() => set("reqType", t)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{
                  background: form.reqType === t ? "#1d4ed8" : "#f9fafb",
                  color: form.reqType === t ? "#fff" : "#374151",
                  border: `1px solid ${form.reqType === t ? "#1d4ed8" : "#e5e7eb"}`
                }}>{t} Request</button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#374151" }}>Message (Optional)</label>
          <textarea rows={3} value={form.message} placeholder="Any additional details or requirements..."
            onChange={e => set("message", e.target.value)}
            style={{
              width: "100%", padding: "10px 14px", borderRadius: 12, fontSize: 14,
              border: "1px solid #d1d5db", resize: "none", boxSizing: "border-box"
            }} />
        </div>

        <div className="rounded-2xl p-4 text-sm" style={{ background: "#fffbeb", border: "1px solid #fcd34d", color: "#92400e" }}>
          ⚠️ We do not collect sensitive personal data (Aadhaar number, documents) online. Our team will contact you for further processing.
        </div>

        <button onClick={submit} disabled={loading}
          className="w-full py-3.5 rounded-xl font-extrabold text-white text-base btn-bounce"
          style={{ background: loading ? "#93c5fd" : "#1d4ed8" }}>
          {loading ? "Submitting..." : "Submit Enquiry ✓"}
        </button>
      </div>
    </div>
  );
}

// ── Thank You Page ─────────────────────────────────────────
function ThankYouPage({ go }) {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center fade-in">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#d1fae5", fontSize: 36 }}>✅</div>
      <h1 className="font-extrabold text-gray-800 mb-3" style={{ fontSize: "1.9rem" }}>Enquiry Submitted!</h1>
      <p className="text-gray-500 mb-2 leading-relaxed">
        Thank you for reaching out to <strong>Speed Solution</strong>.
      </p>
      <p className="text-gray-500 mb-8">
        Our team will review your request and contact you within <strong>24 hours</strong> on your registered phone number.
      </p>
      <div className="rounded-2xl p-4 mb-8 text-sm" style={{ background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1e40af" }}>
        For urgent queries, call us at <a href={`tel:${PHONE}`} className="font-bold">{PHONE}</a> or message us on WhatsApp.
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button onClick={() => go("home")} className="px-6 py-2.5 rounded-full font-bold text-white btn-bounce" style={{ background: "#1d4ed8" }}>Back to Home</button>
        <button onClick={() => go("services")} className="px-6 py-2.5 rounded-full font-semibold btn-bounce" style={{ background: "#f1f5f9", color: "#374151" }}>View Services</button>
        <a href={`https://wa.me/${WA}`} target="_blank"
          className="px-6 py-2.5 rounded-full font-semibold btn-bounce inline-block text-center"
          style={{ background: "#16a34a", color: "#fff" }}>💬 WhatsApp</a>
      </div>
    </div>
  );
}

// ── Login Page ─────────────────────────────────────────────
function LoginPage({ go, onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverErr, setServerErr] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); setServerErr(""); };

  const submit = async () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    if (!form.password) e.password = "Password is required";
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    if (form.email === "admin@speedsolution.in" && form.password === "Admin@123") {
      onLogin({ name: "Admin", email: form.email, isAdmin: true });
      go("admin"); return;
    }
    try {
      const raw = await window.storage.get("users").catch(() => null);
      const users = raw ? JSON.parse(raw.value) : [];
      const found = users.find(u => u.email === form.email && u.password === form.password);
      if (found) { onLogin({ name: found.name, email: found.email, isAdmin: false }); go("home"); }
      else { setServerErr("Invalid email or password. Please try again."); setLoading(false); }
    } catch { setServerErr("Something went wrong. Please try again."); setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 fade-in">
      <div className="text-center mb-8">
        <div style={{ fontSize: 40 }} className="mb-3">🔐</div>
        <h1 className="font-extrabold text-blue-950" style={{ fontSize: "1.8rem" }}>Welcome Back</h1>
        <p className="text-gray-500 text-sm mt-1">Login to your Speed Solution account</p>
      </div>
      <div className="bg-white rounded-3xl p-6 space-y-4" style={{ border: "1px solid #e5e7eb", boxShadow: "0 8px 40px rgba(0,0,0,.07)" }}>
        {serverErr && (
          <div className="rounded-xl p-3 text-sm" style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#b91c1c" }}>{serverErr}</div>
        )}
        {[["Email", "email", "email", "your@email.com"], ["Password", "password", "password", "••••••••"]].map(([label, key, type, ph]) => (
          <div key={key}>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "#374151" }}>{label}</label>
            <input type={type} value={form[key]} placeholder={ph} onChange={e => set(key, e.target.value)}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 12, fontSize: 14, boxSizing: "border-box",
                border: `1px solid ${errors[key] ? "#f87171" : "#d1d5db"}`, background: errors[key] ? "#fff5f5" : "#fff"
              }} />
            {errors[key] && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors[key]}</p>}
          </div>
        ))}
        <button onClick={submit} disabled={loading}
          className="w-full py-3 rounded-xl font-extrabold text-white btn-bounce"
          style={{ background: loading ? "#93c5fd" : "#1d4ed8" }}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <button onClick={() => go("register")} className="font-semibold text-blue-700 hover:underline">Register here</button>
        </p>
        <div className="rounded-xl p-3 text-xs" style={{ background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1e40af" }}>
          <strong>Admin credentials:</strong> admin@speedsolution.in &nbsp;/&nbsp; Admin@123
        </div>
      </div>
    </div>
  );
}

// ── Register Page ──────────────────────────────────────────
function RegisterPage({ go }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "10-digit phone required";
    if (form.password.length < 6) e.password = "Minimum 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      const raw = await window.storage.get("users").catch(() => null);
      const users = raw ? JSON.parse(raw.value) : [];
      if (users.find(u => u.email === form.email)) {
        setErrors({ email: "This email is already registered" }); setLoading(false); return;
      }
      users.push({ name: form.name, email: form.email, phone: form.phone, password: form.password });
      await window.storage.set("users", JSON.stringify(users));
      setDone(true);
    } catch { setLoading(false); }
  };

  if (done) return (
    <div className="max-w-md mx-auto px-4 py-20 text-center fade-in">
      <div style={{ fontSize: 48 }} className="mb-4">🎉</div>
      <h2 className="font-extrabold text-gray-800 mb-2" style={{ fontSize: "1.7rem" }}>Account Created!</h2>
      <p className="text-gray-500 mb-6">Your account has been successfully created. You can now login.</p>
      <button onClick={() => go("login")} className="px-8 py-2.5 rounded-full font-bold text-white btn-bounce" style={{ background: "#1d4ed8" }}>Go to Login</button>
    </div>
  );

  const fields = [
    ["Full Name *", "name", "text", "Your full name"],
    ["Email Address *", "email", "email", "your@email.com"],
    ["Phone Number *", "phone", "tel", "10-digit mobile number"],
    ["Password *", "password", "password", "Min. 6 characters"],
    ["Confirm Password *", "confirm", "password", "Re-enter password"],
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-16 fade-in">
      <div className="text-center mb-8">
        <div style={{ fontSize: 40 }} className="mb-3">👤</div>
        <h1 className="font-extrabold text-blue-950" style={{ fontSize: "1.8rem" }}>Create Account</h1>
        <p className="text-gray-500 text-sm mt-1">Register to track your service enquiries</p>
      </div>
      <div className="bg-white rounded-3xl p-6 space-y-4" style={{ border: "1px solid #e5e7eb", boxShadow: "0 8px 40px rgba(0,0,0,.07)" }}>
        {fields.map(([label, key, type, ph]) => (
          <div key={key}>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "#374151" }}>{label}</label>
            <input type={type} value={form[key]} placeholder={ph} onChange={e => set(key, e.target.value)}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 12, fontSize: 14, boxSizing: "border-box",
                border: `1px solid ${errors[key] ? "#f87171" : "#d1d5db"}`, background: errors[key] ? "#fff5f5" : "#fff"
              }} />
            {errors[key] && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors[key]}</p>}
          </div>
        ))}
        <button onClick={submit} disabled={loading}
          className="w-full py-3 rounded-xl font-extrabold text-white btn-bounce"
          style={{ background: loading ? "#93c5fd" : "#1d4ed8" }}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>
        <p className="text-center text-sm text-gray-500">
          Already registered?{" "}
          <button onClick={() => go("login")} className="font-semibold text-blue-700 hover:underline">Login here</button>
        </p>
      </div>
    </div>
  );
}

// ── Admin Page ─────────────────────────────────────────────
function AdminPage({ user, go }) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    (async () => {
      try {
        const raw = await window.storage.get("enquiries").catch(() => null);
        const list = raw ? JSON.parse(raw.value) : [];
        setEnquiries([...list].reverse());
      } finally { setLoading(false); }
    })();
  }, []);

  if (!user?.isAdmin) return (
    <div className="max-w-md mx-auto px-4 py-20 text-center fade-in">
      <div style={{ fontSize: 48 }} className="mb-4">🔒</div>
      <h2 className="font-bold text-gray-800 mb-2 text-xl">Access Denied</h2>
      <p className="text-gray-500 mb-5">You need admin access to view this page.</p>
      <button onClick={() => go("login")} className="px-6 py-2.5 rounded-full font-bold text-white" style={{ background: "#1d4ed8" }}>Login as Admin</button>
    </div>
  );

  const filtered = enquiries.filter(e => {
    const q = search.toLowerCase();
    const matchSearch = !q || e.name.toLowerCase().includes(q) || e.phone.includes(q) || e.service_type.toLowerCase().includes(q);
    const matchType = filterType === "All" || e.request_type === filterType;
    return matchSearch && matchType;
  });

  const stats = [
    { label: "Total Enquiries", val: enquiries.length, color: "#1d4ed8" },
    { label: "New Requests", val: enquiries.filter(e => e.request_type === "New").length, color: "#16a34a" },
    { label: "Update Requests", val: enquiries.filter(e => e.request_type === "Update").length, color: "#d97706" },
    { label: "Services", val: new Set(enquiries.map(e => e.service_type)).size, color: "#7c3aed" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 fade-in">
      <div className="mb-8">
        <h1 className="font-extrabold text-blue-950 mb-1" style={{ fontSize: "1.9rem" }}>Admin Panel</h1>
        <p className="text-gray-500">Manage and view all customer enquiries</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="rounded-2xl p-4 bg-white" style={{ border: "1px solid #e5e7eb" }}>
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className="font-extrabold text-2xl" style={{ color: s.color }}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, phone, service..."
          style={{ flex: 1, padding: "9px 14px", borderRadius: 12, fontSize: 14, border: "1px solid #d1d5db", boxSizing: "border-box" }} />
        <div className="flex gap-2">
          {["All", "New", "Update"].map(t => (
            <button key={t} onClick={() => setFilterType(t)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
              style={{
                background: filterType === t ? "#1d4ed8" : "#f1f5f9",
                color: filterType === t ? "#fff" : "#374151"
              }}>{t}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading enquiries...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <div style={{ fontSize: 48 }} className="mb-3">📭</div>
          <p className="text-gray-500">No enquiries found. {search && "Try a different search."}</p>
          {!search && <button onClick={() => go("services")} className="mt-4 px-5 py-2 rounded-full text-sm font-semibold text-white" style={{ background: "#1d4ed8" }}>Go to Services</button>}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((e, i) => (
            <div key={e.id} className="bg-white rounded-2xl p-4" style={{ border: "1px solid #e5e7eb" }}>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-start">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">#{filtered.length - i} · Name</p>
                  <p className="font-bold text-gray-800 text-sm">{e.name}</p>
                  <p className="text-xs text-gray-500">Age: {e.age}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                  <a href={`tel:${e.phone}`} className="font-semibold text-sm" style={{ color: "#1d4ed8" }}>{e.phone}</a>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Service</p>
                  <p className="text-sm font-medium text-gray-700">{e.service_type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Request Type</p>
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{
                      background: e.request_type === "New" ? "#d1fae5" : "#fff7ed",
                      color: e.request_type === "New" ? "#065f46" : "#92400e"
                    }}>{e.request_type}</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Submitted</p>
                  <p className="text-xs text-gray-600">{new Date(e.created_at).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                </div>
              </div>
              {e.message && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Message</p>
                  <p className="text-sm text-gray-600">{e.message}</p>
                </div>
              )}
              <div className="mt-3 flex gap-2">
                <a href={`tel:${e.phone}`} className="px-3 py-1.5 rounded-lg text-xs font-semibold btn-bounce" style={{ background: "#eff6ff", color: "#1d4ed8" }}>📞 Call</a>
                <a href={`https://wa.me/91${e.phone}`} target="_blank" className="px-3 py-1.5 rounded-lg text-xs font-semibold btn-bounce" style={{ background: "#f0fdf4", color: "#16a34a" }}>💬 WhatsApp</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── App ────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedService, setSelectedService] = useState(null);
  const [user, setUser] = useState(null);

  const go = (p) => {
    setPage(p);
    try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch {}
  };

  const setService = (s) => { setSelectedService(s); };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Navbar page={page} go={go} user={user}
        onLogout={() => { setUser(null); go("home"); }} />
      <main style={{ paddingTop: 64 }}>
        {page === "home"     && <HomePage go={go} setService={setService} />}
        {page === "services" && <ServicesPage go={go} setService={setService} />}
        {page === "enquiry"  && <EnquiryPage preSelected={selectedService} go={go} />}
        {page === "thankyou" && <ThankYouPage go={go} />}
        {page === "login"    && <LoginPage go={go} onLogin={setUser} />}
        {page === "register" && <RegisterPage go={go} />}
        {page === "admin"    && <AdminPage user={user} go={go} />}
      </main>
      <Footer go={go} />
    </div>
  );
}
