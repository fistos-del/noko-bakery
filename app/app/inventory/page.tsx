import { pageMeta } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
import Card from "@/components/Card";
import { stockStatus, formatZAR } from "@/lib/stock";

export const metadata = pageMeta(
  "Inventory",
  "Raw materials and finished goods"
);

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const [rawMaterials, products] = await Promise.all([
    prisma.rawMaterial.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Inventory</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>
          Raw materials and finished goods stock levels
        </p>
      </div>

      <Card title="🧪 Raw Materials">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <Th>Material</Th>
                <Th>Current (t)</Th>
                <Th>Minimum (t)</Th>
                <Th>Status</Th>
                <Th>Supplier</Th>
                <Th>Lead Time</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {rawMaterials.map((m) => {
                const s = stockStatus(m.currentTons, m.minTons);
                return (
                  <tr key={m.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <Td>
                      <strong>{m.name}</strong>
                    </Td>
                    <Td>{m.currentTons}</Td>
                    <Td>{m.minTons}</Td>
                    <Td>
                      <span style={{ color: s.color, fontWeight: 600 }}>
                        {s.icon} {s.label}
                      </span>
                    </Td>
                    <Td>{m.supplier}</Td>
                    <Td>{m.leadTimeDays} days</Td>
                    <Td>
                      {s.label !== "OK" && (
                        <button
                          style={{
                            background: "var(--primary)",
                            color: "white",
                            border: "none",
                            padding: "4px 10px",
                            borderRadius: 6,
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                        >
                          Reorder
                        </button>
                      )}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="📦 Finished Goods">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <Th>Product</Th>
                <Th>N-P-K</Th>
                <Th>Stock (t)</Th>
                <Th>Minimum (t)</Th>
                <Th>Status</Th>
                <Th>Price / t</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const s = stockStatus(p.stockTons, p.minStockTons);
                return (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <Td>
                      <strong>{p.name}</strong>
                    </Td>
                    <Td>{p.npk}</Td>
                    <Td>{p.stockTons}</Td>
                    <Td>{p.minStockTons}</Td>
                    <Td>
                      <span style={{ color: s.color, fontWeight: 600 }}>
                        {s.icon} {s.label}
                      </span>
                    </Td>
                    <Td>{formatZAR(p.pricePerTon)}</Td>
                    <Td>
                      {s.label !== "OK" && (
                        <button
                          style={{
                            background: "var(--primary)",
                            color: "white",
                            border: "none",
                            padding: "4px 10px",
                            borderRadius: 6,
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                        >
                          Produce
                        </button>
                      )}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: "8px 12px",
        color: "var(--text-muted)",
        fontWeight: 500,
        fontSize: 11,
        textTransform: "uppercase",
      }}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: "10px 12px" }}>{children}</td>;
}