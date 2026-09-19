"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Category = "civil" | "horticulture" | "steel" | "logistics";

interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  category: Category;
  tagline: string;
  description: string;
  value?: string;
  tags: string[];
  color: string;
}

const PROJECTS: Project[] = [
  {
    id: "rdp-800",
    title: "800 RDP Houses — Rectification",
    client: "Servcon / Dept of Housing",
    year: "Multiple phases",
    category: "civil",
    tagline: "Fixing what others built wrong",
    description:
      "Rectified and improved poor workmanship on 800 RDP houses. Full scope included plastering, backwash, painting, and plumbing — plus sewer reticulation across all units.",
    tags: ["Plastering", "Plumbing", "Sewer reticulation", "Painting"],
    color: "#E85A24",
  },
  {
    id: "access-roads",
    title: "Access Roads & Walkways",
    client: "Dept of Public Works (via Quatroko)",
    year: "Recent",
    category: "civil",
    tagline: "Interlocking paving + stormwater",
    description:
      "Construction of access roads and pedestrian walkways using interlocking paving bricks, with full stormwater management systems.",
    tags: ["Interlocking paving", "Stormwater", "Walkways"],
    color: "#E85A24",
  },
  {
    id: "ekurhuleni-parks",
    title: "Ekurhuleni Metro Parks",
    client: "Ekurhuleni Municipality",
    year: "Ongoing",
    category: "horticulture",
    tagline: "Keeping public green spaces green",
    description:
      "Grass cutting, tree felling, and general maintenance of municipal parks, recreational areas, and public open spaces across the Ekurhuleni metro.",
    tags: ["Grass cutting", "Tree felling", "Park maintenance"],
    color: "#4E7A1F",
  },
  {
    id: "jhb-water",
    title: "Johannesburg Water — Grounds",
    client: "Johannesburg Water",
    year: "Ongoing",
    category: "horticulture",
    tagline: "Maintenance at water infrastructure",
    description:
      "Ongoing grass cutting and grounds maintenance at reservoirs, water treatment plants, and municipal vacant land managed by Johannesburg Water.",
    tags: ["Reservoir upkeep", "Treatment plants", "Vacant land"],
    color: "#4E7A1F",
  },
  {
    id: "csir-renovation",
    title: "CSIR Renovations & Partitioning",
    client: "CSIR",
    year: "R800K contract",
    category: "steel",
    tagline: "Office partitioning at national research institute",
    description:
      "Full office renovations and steel partition installations at CSIR facilities — including framing, drywall, and specialty finishes.",
    value: "R800,000",
    tags: ["Partitioning", "Office renovation", "Steel framing"],
    color: "#1B4965",
  },
  {
    id: "limpopo-kitchens",
    title: "Limpopo School Kitchen Apartments",
    client: "Limpopo Dept of Education",
    year: "Multiple schools",
    category: "steel",
    tagline: "Feeding schemes, built to spec",
    description:
      "Erection of kitchen apartment structures at various schools across Limpopo — steel frame construction, roofing, and installation.",
    tags: ["Steel erection", "School infrastructure", "Kitchens"],
    color: "#1B4965",
  },
  {
    id: "sab-cool",
    title: "Transport Services — SAB COOL",
    client: "SAB COOL",
    year: "Ongoing",
    category: "logistics",
    tagline: "National beverage logistics",
    description:
      "Ongoing national transport and distribution services for SAB COOL — long-haul and short-haul beverage movement across provinces.",
    tags: ["National transport", "Beverage logistics", "Long-haul"],
    color: "#C9A24B",
  },
  {
    id: "coleus-packing",
    title: "Coleus Packaging Renovation",
    client: "Coleus Packaging (SAB subsidiary)",
    year: "Completed",
    category: "civil",
    tagline: "Industrial facility renovation",
    description:
      "Full renovation of Coleus Packaging facilities — a subsidiary of SAB. Included structural repairs, flooring, and industrial fit-out.",
    tags: ["Industrial renovation", "Structural", "Flooring"],
    color: "#E85A24",
  },
];

const FILTERS: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "civil", label: "Civil" },
  { id: "horticulture", label: "Horticulture" },
  { id: "steel", label: "Steel" },
  { id: "logistics", label: "Logistics" },
];

export default function Projects() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const visible =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      style={{
        padding: "120px 40px",
        background: "var(--bg-alt)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 40, maxWidth: 780 }}
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
            Recent Work
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
            25 years of{" "}
            <span style={{ color: "var(--primary)" }}>real projects.</span>
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 640,
            }}
          >
            From municipal infrastructure to national logistics — a selection
            of projects delivered for public sector, corporate, and industrial
            clients.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 40,
            paddingBottom: 24,
            borderBottom: "1px solid var(--border)",
          }}
        >
          {FILTERS.map((f) => {
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 100,
                  border: `1px solid ${
                    isActive ? "var(--primary)" : "var(--border)"
                  }`,
                  background: isActive ? "var(--primary)" : "white",
                  color: isActive ? "white" : "var(--text-muted)",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {f.label}
              </button>
            );
          })}
          <div
            style={{
              marginLeft: "auto",
              fontSize: 12,
              color: "var(--text-soft)",
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              alignSelf: "center",
            }}
          >
            {visible.length} {visible.length === 1 ? "project" : "projects"}
          </div>
        </motion.div>

        {/* Grid */}
        <div
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
          }}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ProjectCard
                  project={p}
                  expanded={expanded === p.id}
                  onToggle={() =>
                    setExpanded(expanded === p.id ? null : p.id)
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({
  project,
  expanded,
  onToggle,
}: {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      onClick={onToggle}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      style={{
        background: "white",
        border: `1px solid ${expanded ? project.color : "var(--border)"}`,
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: expanded
          ? `0 20px 40px ${project.color}22`
          : "0 2px 8px rgba(26, 29, 32, 0.04)",
        transition: "border-color 0.3s, box-shadow 0.3s",
        position: "relative",
      }}
    >
      {/* Colored top strip */}
      <div style={{ height: 4, background: project.color }} />

      {/* Placeholder visual banner */}
      <div
        style={{
          height: 100,
          background: `linear-gradient(135deg, ${project.color}22 0%, ${project.color}08 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle diagonal stripes */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(45deg, ${project.color}10 0px, ${project.color}10 1px, transparent 1px, transparent 20px)`,
          }}
        />
        <div
          style={{
            fontSize: 40,
            opacity: 0.8,
            position: "relative",
            zIndex: 1,
          }}
        >
          {project.category === "civil" && "🏗️"}
          {project.category === "horticulture" && "🌿"}
          {project.category === "steel" && "⚙️"}
          {project.category === "logistics" && "🚛"}
        </div>
        {/* Category badge top-right */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            padding: "4px 10px",
            background: "white",
            border: `1px solid ${project.color}66`,
            borderRadius: 100,
            fontSize: 9,
            fontWeight: 900,
            color: project.color,
            letterSpacing: 1,
            textTransform: "uppercase",
            zIndex: 2,
          }}
        >
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 24 }}>
        {/* Client + year */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "var(--text-soft)" }}>{project.client}</span>
          <span style={{ color: project.color }}>{project.year}</span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: -0.4,
            lineHeight: 1.25,
            color: "var(--text)",
            marginBottom: 8,
          }}
        >
          {project.title}
        </h3>

        {/* Tagline */}
        <div
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            fontStyle: "italic",
            marginBottom: 16,
            fontWeight: 500,
          }}
        >
          {project.tagline}
        </div>

        {/* Expand hint */}
        <div
          style={{
            fontSize: 11,
            color: project.color,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {expanded ? "− Close" : "+ View details"}
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  paddingTop: 20,
                  marginTop: 20,
                  borderTop: "1px solid var(--border)",
                }}
              >
                <p
                  style={{
                    fontSize: 13.5,
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    marginBottom: 16,
                  }}
                >
                  {project.description}
                </p>

                {project.value && (
                  <div
                    style={{
                      display: "inline-block",
                      padding: "6px 12px",
                      background: `${project.color}15`,
                      border: `1px solid ${project.color}44`,
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 900,
                      color: project.color,
                      letterSpacing: 0.5,
                      marginBottom: 16,
                    }}
                  >
                    Contract value: {project.value}
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                  }}
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 10.5,
                        fontWeight: 700,
                        padding: "4px 10px",
                        background: "var(--surface-2)",
                        color: "var(--text-muted)",
                        borderRadius: 100,
                        letterSpacing: 0.3,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}