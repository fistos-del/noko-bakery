"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CREDENTIALS = [
  { label: "CIDB Registration", value: "221273 · GB, CE, SH", ok: true },
  { label: "NHBRC Registration", value: "1-37979997", ok: true },
  { label: "B-BBEE Level", value: "Level 3 Contributor", ok: true },
  { label: "Ownership", value: "100% Black Owned & Managed", ok: true },
  { label: "Tax Clearance", value: "SARS compliant", ok: true },
  { label: "COIDA", value: "Registered", ok: true },
];

const RECENT_PROJECTS = [
  {
    title: "800 RDP Houses — Rectification",
    client: "Servcon / Dept of Housing",
    value: "Multi-phase",
  },
  {
    title: "CSIR Renovations & Partitioning",
    client: "CSIR",
    value: "R800,000",
  },
  {
    title: "Access Roads & Walkways",
    client: "Dept of Public Works",
    value: "Subcontracted",
  },
];

export default function TenderPortal() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      // Generate a simple text capability statement as a .txt file
      // (In production, this would be a real PDF)
      const content = generateCapabilityStatement();
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Jorud-Solutions-Capability-Statement.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 4000);
    }, 800);
  };

  return (
    <section
      id="tender"
      style={{
        padding: "120px 40px",
        background: "var(--charcoal-dark)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Diagonal stripes */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(232, 90, 36, 0.04) 0px, rgba(232, 90, 36, 0.04) 1px, transparent 1px, transparent 40px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 60, maxWidth: 800 }}
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
            Procurement · Tenders · Government
          </div>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 900,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              color: "white",
              marginBottom: 20,
            }}
          >
            Tender-ready.{" "}
            <span style={{ color: "var(--primary)" }}>Every document.</span>
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.75)",
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 640,
            }}
          >
            All credentials, registrations, and reference documents in one
            place. Download our capability statement or contact us directly for
            tender submissions.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div
          className="tender-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 24,
          }}
        >
          {/* Left: Credentials checklist */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              padding: 40,
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 20,
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
              Compliance Credentials
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {CREDENTIALS.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 0",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: 14,
                        fontWeight: 900,
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "white",
                          letterSpacing: -0.2,
                        }}
                      >
                        {c.label}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "rgba(255, 255, 255, 0.55)",
                          marginTop: 2,
                          fontWeight: 500,
                        }}
                      >
                        {c.value}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download CTA */}
            <div style={{ marginTop: 32 }}>
              <button
                onClick={handleDownload}
                disabled={downloading}
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  background: downloaded ? "var(--secondary)" : "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  cursor: downloading ? "wait" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  transition: "background 0.3s",
                }}
              >
                {downloading ? (
                  <>
                    <span>⏳</span> Generating...
                  </>
                ) : downloaded ? (
                  <>
                    <span>✓</span> Downloaded
                  </>
                ) : (
                  <>
                    <span>📄</span> Download Capability Statement
                  </>
                )}
              </button>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255, 255, 255, 0.5)",
                  textAlign: "center",
                  marginTop: 10,
                  fontWeight: 500,
                }}
              >
                Includes registrations, references, and B-BBEE certificate
              </div>
            </div>
          </motion.div>

          {/* Right: Recent projects + contact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            {/* Recent projects */}
            <div
              style={{
                padding: 32,
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 20,
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
                Reference Projects
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {RECENT_PROJECTS.map((p) => (
                  <div
                    key={p.title}
                    style={{
                      paddingBottom: 16,
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "white",
                        marginBottom: 4,
                        letterSpacing: -0.2,
                        lineHeight: 1.3,
                      }}
                    >
                      {p.title}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 11,
                        color: "rgba(255, 255, 255, 0.55)",
                        fontWeight: 600,
                        letterSpacing: 0.3,
                      }}
                    >
                      <span>{p.client}</span>
                      <span style={{ color: "var(--primary)" }}>{p.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tender contact card */}
            <div
              style={{
                padding: 32,
                background: "var(--primary)",
                borderRadius: 20,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  fontWeight: 800,
                  marginBottom: 16,
                  color: "rgba(255, 255, 255, 0.85)",
                }}
              >
                Tender Contact
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: "white",
                  marginBottom: 4,
                  letterSpacing: -0.3,
                }}
              >
                Matome Malatjie
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255, 255, 255, 0.8)",
                  marginBottom: 16,
                  fontWeight: 600,
                }}
              >
                Owner · Jorud Solutions cc
              </div>

              <div
                style={{
                  fontSize: 13,
                  color: "white",
                  lineHeight: 1.8,
                  fontWeight: 500,
                }}
              >
                <div>
                  <strong style={{ fontWeight: 800 }}>Direct:</strong>{" "}
                  082 781 5071
                </div>
                <div>
                  <strong style={{ fontWeight: 800 }}>Office:</strong>{" "}
                  086 579 5371
                </div>
                <div>
                  <strong style={{ fontWeight: 800 }}>Email:</strong>{" "}
                  info@jorudsolution.co.za
                </div>
                <div
                  style={{
                    fontSize: 12,
                    marginTop: 8,
                    paddingTop: 8,
                    borderTop: "1px solid rgba(255, 255, 255, 0.25)",
                    color: "rgba(255, 255, 255, 0.85)",
                  }}
                >
                  13 Huilboom Street, Moreleta Park
                  <br />
                  Pretoria, Gauteng 0140
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .tender-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function generateCapabilityStatement(): string {
  return `═══════════════════════════════════════════════════════════════
                    JORUD SOLUTIONS CC
              CAPABILITY STATEMENT — 2025
═══════════════════════════════════════════════════════════════

COMPANY OVERVIEW
────────────────────────────────────────────────────────────────
Jorud Solutions cc was founded in 1999 with a primary interest
in transport and logistics. The company has since diversified
into civil and general construction, horticulture, and steel
engineering — delivering a fully integrated, one-stop service.

Ownership:      100% Black Owned, Controlled, Operated, Managed
B-BBEE:         Level 3 Contributor (Verified)
Established:    1999
Head Office:    13 Huilboom Street, Moreleta Park
                Pretoria, Gauteng 0140, South Africa

────────────────────────────────────────────────────────────────
REGISTRATIONS & CERTIFICATIONS
────────────────────────────────────────────────────────────────
CIDB:           221273 — Category: GB, CE, SH
NHBRC:          1-37979997
COIDA:          Registered
Tax Clearance:  SARS compliant

────────────────────────────────────────────────────────────────
SERVICES
────────────────────────────────────────────────────────────────
1. CIVIL & GENERAL BUILDING
   - Water reticulation & pipework
   - Civil structures (bridges, culverts)
   - Roads, paving, stormwater
   - Residential & commercial building
   - RDP housing rectification

2. HORTICULTURE & GROUNDS MAINTENANCE
   - Grass cutting & land clearing
   - Tree felling & vegetation control
   - Landscaping & grounds maintenance
   - Reservoir & treatment plant upkeep

3. STEEL ENGINEERING & FABRICATION
   - Structural steel fabrication
   - School & factory installations
   - Partitioning & mezzanine floors
   - Industrial kitchen & equipment erection

4. LOGISTICS & TRANSPORT
   - National long-haul transport
   - Bulk & palletized distribution
   - Industrial client contracts
   - Cross-province logistics

────────────────────────────────────────────────────────────────
REFERENCE PROJECTS
────────────────────────────────────────────────────────────────
▸ 800 RDP Houses — Rectification
  Client: Servcon / Dept of Housing
  Scope: Plastering, plumbing, painting, sewer reticulation

▸ CSIR Renovations & Partitioning
  Client: CSIR — Contract value: R800,000

▸ Access Roads & Walkways
  Client: Dept of Public Works (via Quatroko)
  Scope: Interlocking paving, stormwater management

▸ Ekurhuleni Metro Parks — Grounds Maintenance
  Client: Ekurhuleni Municipality

▸ Johannesburg Water — Grounds Maintenance
  Client: Johannesburg Water

▸ Transport Services — SAB COOL
  Client: SAB COOL — National beverage logistics

▸ Limpopo School Kitchen Apartments
  Client: Limpopo Dept of Education

▸ Coleus Packaging Renovation
  Client: Coleus Packaging (SAB subsidiary)

────────────────────────────────────────────────────────────────
SOCIAL RESPONSIBILITY
────────────────────────────────────────────────────────────────
Jorud Solutions co-funds tertiary education for 10 students
from Mphakane Village through the Mphakane Educational Trust
Fund — empowering gifted young people to pursue their careers
and grow our future economy.

────────────────────────────────────────────────────────────────
CONTACT
────────────────────────────────────────────────────────────────
Matome Malatjie (Owner)
Direct:  082 781 5071
Office:  086 579 5371
Email:   info@jorudsolution.co.za
Website: www.jorudsolution.co.za

═══════════════════════════════════════════════════════════════
        Building South Africa's infrastructure since 1999.
═══════════════════════════════════════════════════════════════
`;
}