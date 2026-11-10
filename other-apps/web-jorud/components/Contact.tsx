"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const SERVICES = [
  "Civil & General Building",
  "Horticulture & Grounds",
  "Steel Engineering",
  "Logistics & Transport",
  "Tender / Procurement",
  "Other",
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !message) {
      setError("Please fill in name, email, and message");
      return;
    }

    setSubmitting(true);

    // Demo: simulate sending for 1.2 seconds, then show success
    // In production: POST to /api/contact which emails info@jorudsolution.co.za
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section
      id="contact"
      style={{
        padding: "120px 40px",
        background: "var(--bg)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginBottom: 60,
            maxWidth: 780,
            textAlign: "center",
            margin: "0 auto 60px",
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "var(--primary)",
              letterSpacing: 2.5,
              textTransform: "uppercase",
              marginBottom: 16,
              fontWeight: 800,
            }}
          >
            Get in Touch
          </div>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 900,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              color: "var(--text)",
              marginBottom: 20,
            }}
          >
            Let&apos;s build{" "}
            <span style={{ color: "var(--primary)" }}>something together.</span>
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            Quote requests, tender submissions, partnership enquiries — reach us
            on WhatsApp for a same-day response.
          </p>
        </motion.div>

        {/* Grid: form + info */}
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 24,
          }}
        >
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              padding: 40,
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: 20,
              boxShadow: "0 12px 40px rgba(26, 29, 32, 0.06)",
            }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                }}
              >
                <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
                <h3
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: "var(--text)",
                    letterSpacing: -0.5,
                    marginBottom: 12,
                  }}
                >
                  Message received.
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    maxWidth: 400,
                    margin: "0 auto 28px",
                  }}
                >
                  Thank you {name.split(" ")[0]}. We&apos;ll respond within one
                  business day. For urgent enquiries, WhatsApp us directly.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <a
                    href="https://wa.me/27827815071"
                    target="_blank"
                    rel="noopener"
                    style={{
                      padding: "12px 24px",
                      background: "#25D366",
                      color: "white",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 800,
                      letterSpacing: 0.5,
                    }}
                  >
                    💬 WhatsApp Now
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setEmail("");
                      setPhone("");
                      setMessage("");
                    }}
                    style={{
                      padding: "12px 24px",
                      background: "transparent",
                      color: "var(--text)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Send another
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div
                  className="form-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    marginBottom: 18,
                  }}
                >
                  <Field label="Full Name" required>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      style={inputStyle}
                      required
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.co.za"
                      style={inputStyle}
                      required
                    />
                  </Field>
                </div>

                <div
                  className="form-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    marginBottom: 18,
                  }}
                >
                  <Field label="Phone">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="082 000 0000"
                      style={inputStyle}
                    />
                  </Field>
                  <Field label="Service of Interest" required>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Message" required>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Tell us about your project, timeline, and scope..."
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      fontFamily: "inherit",
                    }}
                    required
                  />
                </Field>

                {error && (
                  <div
                    style={{
                      padding: 12,
                      background: "rgba(192, 57, 43, 0.1)",
                      border: "1px solid var(--danger)",
                      borderRadius: 8,
                      color: "var(--danger)",
                      fontSize: 13,
                      marginBottom: 16,
                      fontWeight: 600,
                    }}
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: "100%",
                    padding: "16px 24px",
                    background: submitting
                      ? "var(--text-soft)"
                      : "var(--primary)",
                    color: "white",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    cursor: submitting ? "wait" : "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  {submitting ? "Sending..." : "Send Message →"}
                </button>

                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-soft)",
                    textAlign: "center",
                    marginTop: 12,
                    fontWeight: 500,
                  }}
                >
                  Or WhatsApp us directly at{" "}
                  <a
                    href="https://wa.me/27827815071"
                    target="_blank"
                    rel="noopener"
                    style={{
                      color: "var(--primary)",
                      fontWeight: 800,
                    }}
                  >
                    082 781 5071
                  </a>
                </div>
              </form>
            )}
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            {/* WhatsApp CTA card */}
            <div
              style={{
                padding: 28,
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                borderRadius: 16,
                color: "white",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>💬</div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  letterSpacing: -0.3,
                  marginBottom: 8,
                  lineHeight: 1.3,
                }}
              >
                Fastest way to reach us
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255, 255, 255, 0.9)",
                  marginBottom: 20,
                  lineHeight: 1.6,
                }}
              >
                WhatsApp us for instant quotes, photos of past work, and
                availability. Same-day response during business hours.
              </div>
              <a
                href="https://wa.me/27827815071"
                target="_blank"
                rel="noopener"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: "14px 20px",
                  background: "white",
                  color: "#128C7E",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 900,
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                }}
              >
                Open WhatsApp · 082 781 5071
              </a>
            </div>

            {/* Contact details card */}
            <div
              style={{
                padding: 28,
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: 16,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "var(--primary)",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  fontWeight: 800,
                  marginBottom: 20,
                }}
              >
                Direct Contact
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <ContactRow
                  icon="👤"
                  label="Owner"
                  value="Matome Malatjie"
                />
                <ContactRow
                  icon="📱"
                  label="Direct"
                  value="082 781 5071"
                  href="tel:+27827815071"
                />
                <ContactRow
                  icon="☎️"
                  label="Office"
                  value="086 579 5371"
                  href="tel:+27865795371"
                />
                <ContactRow
                  icon="✉️"
                  label="Email"
                  value="info@jorudsolution.co.za"
                  href="mailto:info@jorudsolution.co.za"
                />
                <ContactRow
                  icon="📍"
                  label="Address"
                  value="13 Huilboom Street, Moreleta Park, Pretoria, 0140"
                />
              </div>
            </div>

            {/* Map */}
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid var(--border)",
                background: "white",
                position: "relative",
                height: 260,
              }}
            >
              <iframe
                title="Jorud Solutions Location"
                src="https://www.google.com/maps?q=13+Huilboom+Street,+Moreleta+Park,+Pretoria,+0140&output=embed"
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 11,
          color: "var(--text-soft)",
          marginBottom: 6,
          textTransform: "uppercase",
          letterSpacing: 1,
          fontWeight: 800,
        }}
      >
        {label}
        {required && <span style={{ color: "var(--primary)" }}> *</span>}
      </label>
      {children}
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div
      style={{
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
      }}
    >
      <div style={{ fontSize: 18, lineHeight: 1, marginTop: 2 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 10,
            color: "var(--text-soft)",
            textTransform: "uppercase",
            letterSpacing: 1,
            fontWeight: 800,
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 13.5,
            fontWeight: 700,
            color: href ? "var(--primary)" : "var(--text)",
            lineHeight: 1.4,
            letterSpacing: -0.1,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        style={{
          textDecoration: "none",
          transition: "opacity 0.2s",
        }}
      >
        {content}
      </a>
    );
  }

  return content;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  background: "var(--surface-2)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  color: "var(--text)",
  fontSize: 14,
  fontWeight: 500,
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.2s",
};