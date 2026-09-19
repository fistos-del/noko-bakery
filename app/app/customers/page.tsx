import { pageMeta } from "@/lib/metadata";
export const metadata = pageMeta("Customers", "B2B customer directory");
import { prisma } from "@/lib/prisma";
import Card from "@/components/Card";
import { formatZAR } from "@/lib/stock";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    include: { orders: true },
    orderBy: { name: "asc" },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Customers</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>
          {customers.length} B2B customers
        </p>
      </div>

      <div
        className="customers-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
        }}
      >
        {customers.map((c) => {
          const totalValue = c.orders.reduce((s, o) => s + o.totalValue, 0);
          return (
            <Card key={c.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{c.name}</div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--accent)",
                      marginTop: 2,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    {c.type.replace(/_/g, " ")}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {c.region}
                </div>
              </div>

              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  fontSize: 13,
                }}
              >
                <div>👤 {c.contactName}</div>
                <div>📞 {c.phone}</div>
                <div>✉️ {c.email}</div>
                <div>📍 {c.address}</div>
              </div>

              <div
                style={{
                  marginTop: 16,
                  paddingTop: 16,
                  borderTop: "1px solid var(--border)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 12,
                }}
              >
                <Stat label="Orders" value={`${c.orders.length}`} />
                <Stat label="Total Value" value={formatZAR(totalValue)} />
                <Stat label="Credit Limit" value={formatZAR(c.creditLimit)} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{value}</div>
    </div>
  );
}