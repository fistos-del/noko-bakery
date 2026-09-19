"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

interface PipelineItem {
  stage: string;
  tons: number;
  color: string;
}

interface StatusCount {
  status: string;
  count: number;
}

interface CustomerRevenue {
  name: string;
  value: number;
}

interface ProductStock {
  name: string;
  stock: number;
  min: number;
}

interface ReportData {
  pipeline: PipelineItem[];
  statusCounts: StatusCount[];
  topCustomers: CustomerRevenue[];
  productStock: ProductStock[];
}

export default function ReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);

  useEffect(() => {
    fetch("/api/reports/stock")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: 14,
        }}
      >
        Loading reports...
      </div>
    );
  }

  const totalHarvested = data.pipeline[0]?.tons ?? 0;
  const totalShipped = data.pipeline[3]?.tons ?? 0;
  const efficiency =
    totalHarvested > 0 ? Math.round((totalShipped / totalHarvested) * 100) : 0;

  const totalRevenue = data.topCustomers.reduce((s, c) => s + c.value, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: -0.5,
            color: "var(--text)",
          }}
        >
          Reports
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 14,
            marginTop: 4,
          }}
        >
          Production throughput, order funnel, and customer analytics
        </p>
      </div>

      {/* Top stat cards */}
      <div
        className="summary-cards-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
        <StatCard
          label="Hyacinth in Stock"
          value={`${Math.round(totalHarvested)}t`}
          sub="Awaiting mineralisation"
          color="#3D7A8F"
        />
        <StatCard
          label="Finished Hya Power"
          value={`${Math.round(data.pipeline[2]?.tons ?? 0)}t`}
          sub="Bagged & ready"
          color="#8CC63F"
        />
        <StatCard
          label="Shipped This Cycle"
          value={`${Math.round(totalShipped)}t`}
          sub={`${efficiency}% throughput`}
          color="#C07F3E"
        />
        <StatCard
          label="Revenue (top 5)"
          value={`R ${Math.round(totalRevenue / 1000)}K`}
          sub="From key customers"
          color="#2E4A2E"
        />
      </div>

      {/* Production Pipeline */}
      <Card title="🌿 Production Pipeline — Harvest → Ship">
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <BarChart data={data.pipeline}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(140, 198, 63, 0.1)"
              />
              <XAxis
                dataKey="stage"
                stroke="var(--text-muted)"
                fontSize={12}
                fontWeight={600}
              />
              <YAxis
                stroke="var(--text-muted)"
                fontSize={12}
                fontWeight={600}
                label={{
                  value: "Tons",
                  angle: -90,
                  position: "insideLeft",
                  fill: "var(--text-muted)",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "var(--text)",
                }}
                cursor={{ fill: "rgba(140, 198, 63, 0.08)" }}
                formatter={(value: number) => [`${value.toFixed(1)}t`, "Volume"]}
              />
              <Bar dataKey="tons" radius={[6, 6, 0, 0]}>
                {data.pipeline.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTop: "1px solid var(--border)",
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            fontSize: 12,
            color: "var(--text-muted)",
          }}
        >
          {data.pipeline.map((item) => (
            <div
              key={item.stage}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: item.color,
                }}
              />
              <span style={{ fontWeight: 600 }}>{item.stage}:</span>
              <span>{Math.round(item.tons)}t</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Two-column: Orders funnel + Top customers */}
      <div
        className="grid-stack-mobile"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        <Card title="📋 Order Funnel">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data.statusCounts.map((s) => {
              const max = Math.max(...data.statusCounts.map((x) => x.count), 1);
              const width = (s.count / max) * 100;
              const colors: Record<string, string> = {
                PENDING: "#F59E0B",
                CONFIRMED: "#3B82F6",
                READY: "#06B6D4",
                "OUT FOR DELIVERY": "#F97316",
                DELIVERED: "#10B981",
                INVOICED: "#6366F1",
                PAID: "#059669",
              };
              const color = colors[s.status] || "#666";
              return (
                <div
                  key={s.status}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 12,
                  }}
                >
                  <div
                    style={{
                      width: 120,
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    {s.status}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: 24,
                      background: "var(--surface-2)",
                      borderRadius: 6,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: `${width}%`,
                        height: "100%",
                        background: color,
                        borderRadius: 6,
                        transition: "width 0.5s ease",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: 11,
                        fontWeight: 800,
                        color: "var(--text)",
                      }}
                    >
                      {s.count}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="👥 Top Customers by Revenue">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {data.topCustomers.length === 0 ? (
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  textAlign: "center",
                  padding: 20,
                }}
              >
                No customer revenue yet
              </div>
            ) : (
              data.topCustomers.map((c, i) => {
                const max = data.topCustomers[0].value;
                const width = (c.value / max) * 100;
                const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];
                return (
                  <div key={c.name}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 12,
                        marginBottom: 6,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span style={{ fontSize: 14 }}>{medals[i]}</span>
                        <span
                          style={{
                            fontWeight: 700,
                            color: "var(--text)",
                          }}
                        >
                          {c.name}
                        </span>
                      </div>
                      <span
                        style={{
                          fontWeight: 800,
                          color: "var(--primary)",
                          fontSize: 13,
                        }}
                      >
                        R {(c.value / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div
                      style={{
                        height: 6,
                        background: "var(--surface-2)",
                        borderRadius: 100,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${width}%`,
                          height: "100%",
                          background:
                            "linear-gradient(90deg, #8CC63F, #C07F3E)",
                          borderRadius: 100,
                          transition: "width 0.5s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>

      {/* Product stock vs minimum */}
      <Card title="📦 Stock Levels vs Minimum Threshold">
        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <BarChart data={data.productStock}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(140, 198, 63, 0.1)"
              />
              <XAxis
                dataKey="name"
                stroke="var(--text-muted)"
                fontSize={11}
                angle={-15}
                textAnchor="end"
                height={70}
                fontWeight={600}
              />
              <YAxis
                stroke="var(--text-muted)"
                fontSize={11}
                fontWeight={600}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "var(--text)",
                }}
                cursor={{ fill: "rgba(140, 198, 63, 0.08)" }}
              />
              <Bar
                dataKey="stock"
                fill="#8CC63F"
                name="Current Stock (t)"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="min"
                fill="#C07F3E"
                name="Minimum (t)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div
      style={{
        padding: 20,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderTop: `3px solid ${color}`,
        borderRadius: 12,
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: "var(--text-soft)",
          textTransform: "uppercase",
          letterSpacing: 1.2,
          fontWeight: 800,
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color,
          letterSpacing: -1,
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          color: "var(--text-muted)",
          fontWeight: 500,
        }}
      >
        {sub}
      </div>
    </div>
  );
}