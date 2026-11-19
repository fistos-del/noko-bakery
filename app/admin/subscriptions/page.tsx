import { prisma } from "@/lib/prisma";
import { getCurrentUserWithAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminSubscriptionsPage() {
  const user = await getCurrentUserWithAdmin();
  if (!user || !user.isAdmin) redirect("/login");

  const subs = await prisma.subscription.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: true },
  });

  const activeCount = subs.filter(s => s.status === "ACTIVE").length;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: "#111" }}>Subscriptions</h1>
        <p style={{ fontSize: 14, color: "#666", marginTop: 8 }}>
          {subs.length} total &middot; {activeCount} active
        </p>
      </div>

      {subs.length === 0 ? (
        <div style={{ padding: 40, background: "#FFF", borderRadius: 16, textAlign: "center", color: "#888", border: "1px dashed #CCC" }}>
          No subscriptions yet. Customers can subscribe at <strong>/subscription</strong>.
        </div>
      ) : (
        <div style={{ background: "#FFF", borderRadius: 16, overflow: "hidden", border: "1px solid #EEE" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: 16, padding: "16px 24px", background: "#FAFAFA", borderBottom: "1px solid #EEE", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#666" }}>
            <div>Customer</div>
            <div>Plan</div>
            <div>Price/wk</div>
            <div>Status</div>
            <div>Next Delivery</div>
          </div>

          {subs.map((s) => (
            <div key={s.id} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: 16, padding: "16px 24px", borderTop: "1px solid #F5F5F5", fontSize: 14, alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700, color: "#111" }}>{s.customer.name}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{s.customer.email}</div>
              </div>
              <div style={{ fontWeight: 600, color: "#111" }}>{s.plan}</div>
              <div style={{ color: "#111" }}>R {s.pricePerWeek}</div>
              <div>
                <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: 4, fontSize: 11, fontWeight: 800, letterSpacing: 0.5, background: s.status === "ACTIVE" ? "#dcfce7" : "#fee", color: s.status === "ACTIVE" ? "#166534" : "#991b1b" }}>
                  {s.status}
                </span>
              </div>
              <div style={{ color: "#666", fontSize: 12 }}>{new Date(s.nextDelivery).toLocaleDateString("en-ZA")}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
