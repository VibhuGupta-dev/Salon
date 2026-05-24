import React, { useState, useEffect } from "react";

const SERVICES = ["Cut & Finish", "Hair Colour", "Hair Texture", "Hair Treatments", "Beard Styling", "Other"];
const TIMES    = ["Morning (9am–12pm)", "Afternoon (12pm–4pm)", "Evening (4pm–7pm)"];

export default function Contact() {
  const [form, setForm]       = useState({ name:"", phone:"", email:"", service:"", time:"", message:"" });
  const [focused, setFocused] = useState(null);
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1600);
  };

  const inputStyle = (name) => ({
    width: "100%",
    boxSizing: "border-box",
    background: focused === name ? "rgba(197, 168, 128, 0.04)" : "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === name ? "#c5a880" : "rgba(197, 168, 128, 0.15)"}`,
    padding: "0.85rem 0",
    fontSize: isMobile ? 15 : 14,
    color: "#e4e4e7",
    fontFamily: "'Playfair Display', serif",
    outline: "none",
    transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
    borderRadius: 0,
    // Prevent zoom on iOS
    WebkitTextSizeAdjust: "100%",
  });

  const labelStyle = (name) => ({
    display: "block",
    fontSize: 9,
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    marginBottom: 4,
    color: focused === name ? "#c5a880" : "#a1a1aa",
    transition: "color 0.3s ease",
  });

  return (
    <section id="contact" style={{ background: "#0d0d0e", color: "#e4e4e7", overflow: "hidden", position: "relative" }}>

      {/* Top micro-border */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(197, 168, 128, 0.2), transparent)" }} />

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "4rem 1.25rem 2.5rem" : "8rem 2.5rem 4rem" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.6em", textTransform: "uppercase", color: "#866848", margin: "0 0 1.25rem" }}>
          Reserve Your Session
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 300,
          fontSize: isMobile ? "clamp(2.6rem, 11vw, 3.5rem)" : "clamp(3rem, 7vw, 5.5rem)",
          letterSpacing: "-0.02em", lineHeight: 1.05, margin: 0, color: "#f4f4f5",
        }}>
          Let's <em style={{ color: "#c5a880", fontStyle: "italic" }}>Create</em>
          <br />
          Something <em style={{ color: "#866848", fontStyle: "italic" }}>Extraordinary</em>
        </h2>
        <div style={{ marginTop: isMobile ? "2rem" : "3rem", height: 1, background: "linear-gradient(90deg, rgba(197, 168, 128, 0.25), rgba(197, 168, 128, 0.05) 70%, transparent)" }} />
      </div>

      {/* ── BODY ─────────────────────────────────────────────────── */}
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: isMobile ? "0 1.25rem 4rem" : "0 2.5rem 8rem",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1.3fr",
        gap: isMobile ? "3rem" : "6rem",
        alignItems: "start",
      }}>

        {/* LEFT: Info Panel */}
        <div>
          <p style={{
            fontFamily: "'Playfair Display', serif", fontStyle: "italic",
            fontSize: isMobile ? "1.1rem" : "clamp(1.1rem, 2vw, 1.4rem)",
            fontWeight: 300, color: "#c5a880", lineHeight: 1.65,
            margin: "0 0 2.5rem",
            borderLeft: "1px solid rgba(197, 168, 128, 0.3)",
            paddingLeft: "1.25rem",
          }}>
            "Every great haircut begins with a conversation."
          </p>

          {/* Contact details */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr",
            gap: isMobile ? "0" : "0",
          }}>
            {[
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                label: "Find Us", value: "12, Hazratganj, Lucknow, UP",
              },
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                label: "Call Us", value: "+91 98765 43210",
              },
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                label: "Email Us", value: "hello@floydsbarber.in",
              },
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                label: "Open Hours", value: "Mon–Sat: 9am – 7pm",
              },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{
                display: "flex", gap: "1rem", alignItems: "flex-start",
                padding: isMobile ? "1rem 0" : "1.5rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}>
                <span style={{ color: "#c5a880", flexShrink: 0, marginTop: 2 }}>{icon}</span>
                <div>
                  <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "#866848", margin: "0 0 4px" }}>{label}</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 13 : 15, fontWeight: 300, color: "#e4e4e7", margin: 0 }}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social Row */}
          <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            {["Instagram", "Facebook", "WhatsApp"].map(s => (
              <a key={s} href="#"
                onMouseEnter={e => { e.currentTarget.style.borderColor="#c5a880"; e.currentTarget.style.color="#c5a880"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(197,168,128,0.2)"; e.currentTarget.style.color="#a1a1aa"; }}
                style={{
                  padding: "0.45rem 1rem", border: "1px solid rgba(197,168,128,0.2)",
                  color: "#a1a1aa", fontSize: 9, letterSpacing: "0.15em",
                  textTransform: "uppercase", borderRadius: 999,
                  textDecoration: "none", transition: "all 0.3s ease",
                }}
              >{s}</a>
            ))}
          </div>
        </div>

        {/* RIGHT: Form */}
        <div style={{
          background: "#161618", borderRadius: 8,
          padding: isMobile ? "2rem 1.25rem" : "3.5rem",
          border: "1px solid rgba(255,255,255,0.03)",
        }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{
                width: 50, height: 50, borderRadius: "50%",
                border: "1px solid #c5a880",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.75rem",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c5a880" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 300, color: "#f4f4f5", margin: "0 0 1rem" }}>
                Request <em style={{ color: "#c5a880", fontStyle: "italic" }}>Received</em>
              </h3>
              <p style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.7, margin: "0 0 2rem" }}>
                We'll confirm your session within 2 hours.<br/>See you at the chair.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name:"", phone:"", email:"", service:"", time:"", message:"" }); }}
                style={{
                  padding: "0.75rem 2.2rem", border: "1px solid #c5a880",
                  background: "transparent", color: "#c5a880",
                  fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
                  borderRadius: 999, cursor: "pointer",
                }}
              >Book Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile ? 18 : 20,
                fontWeight: 300, color: "#f4f4f5",
                margin: "0 0 2rem", letterSpacing: "-0.01em",
              }}>
                Book Your <em style={{ color: "#c5a880", fontStyle: "italic" }}>Appointment</em>
              </p>

              {/* Name + Phone — stack on mobile */}
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? "0" : "2rem",
                marginBottom: isMobile ? "0" : "2rem",
              }}>
                <div style={{ marginBottom: "1.75rem" }}>
                  <label style={labelStyle("name")}>Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required
                    placeholder="Your name"
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                    style={inputStyle("name")}
                  />
                </div>
                <div style={{ marginBottom: "1.75rem" }}>
                  <label style={labelStyle("phone")}>Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} required
                    placeholder="+91 00000 00000" type="tel"
                    onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                    style={inputStyle("phone")}
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: "1.75rem" }}>
                <label style={labelStyle("email")}>Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="your@email.com"
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                  style={inputStyle("email")}
                />
              </div>

              {/* Service + Time — stack on mobile */}
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? "0" : "2rem",
                marginBottom: isMobile ? "0" : "2rem",
              }}>
                <div style={{ marginBottom: "1.75rem" }}>
                  <label style={labelStyle("service")}>Service</label>
                  <select name="service" value={form.service} onChange={handleChange} required
                    onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle("service"), cursor: "pointer" }}
                  >
                    <option value="" disabled style={{ background:"#161618" }}>Select service</option>
                    {SERVICES.map(s => <option key={s} value={s} style={{ background:"#161618" }}>{s}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: "1.75rem" }}>
                  <label style={labelStyle("time")}>Preferred Time</label>
                  <select name="time" value={form.time} onChange={handleChange}
                    onFocus={() => setFocused("time")} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle("time"), cursor: "pointer" }}
                  >
                    <option value="" disabled style={{ background:"#161618" }}>Select time</option>
                    {TIMES.map(t => <option key={t} value={t} style={{ background:"#161618" }}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: "2.5rem" }}>
                <label style={labelStyle("message")}>Additional Notes</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                  placeholder="Any special requests or notes..."
                  onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                  style={{ ...inputStyle("message"), resize: "none", lineHeight: 1.6 }}
                />
              </div>

              {/* Submit */}
              <button type="submit" disabled={sending}
                style={{
                  width: "100%", padding: "1.1rem",
                  background: "#c5a880", color: "#0d0d0e",
                  border: "none", borderRadius: 0,
                  fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase",
                  fontWeight: 600, cursor: sending ? "wait" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
                  // Full rounded on mobile for a softer feel
                  ...(isMobile && { borderRadius: 4 }),
                }}
              >
                {sending ? "Processing..." : "Confirm Appointment"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── FOOTER STRIP ─────────────────────────────────────────── */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.03)",
        background: "#09090a",
        padding: isMobile ? "1.5rem 1.25rem" : "2rem 2.5rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: isMobile ? "1rem" : "2.5rem",
        flexWrap: "wrap",
      }}>
        {["Hazratganj", "Gomti Nagar", "Alambagh"].map((loc, i) => (
          <div key={loc} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            {i > 0 && !isMobile && <span style={{ color: "rgba(197,168,128,0.15)", fontSize: 14 }}>·</span>}
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              {i === 0 && (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#c5a880" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              )}
              <span style={{
                fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase",
                color: i === 0 ? "#c5a880" : "#71717a",
                fontWeight: i === 0 ? 500 : 400,
              }}>
                {loc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}