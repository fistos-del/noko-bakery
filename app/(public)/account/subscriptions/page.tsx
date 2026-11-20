import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import CancelButton from "./CancelButton";

export const dynamic = "force-dynamic";

export default async function MySubscriptionsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/account");

  const subs = await prisma.subscription.findMany({
    where: { customerId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ background: "var(--brand-muted)", minHeight: "100vh", paddingTop: 120, paddingBottom: 80 }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px" }}>
        <Link href="/" style={{ fontSize: 13, color: "var(--brand-plum)", textDecoration: "none", opacity: 0.8 }}>
          &larr; Back to shop
        </Link>

        <h1 style={{ fontSize: 32, fontWeight: 900, color: "var(--brand-plum)", marginTop: 16, marginBottom: 32 }}>
          My Subscriptions
        </h1>

        {subs.length === 0 ? (
          <div style={{ background: "white", padding: 40, borderRadius: 16, textAlign: "center" }}>
            <p style={{ color: "var(--brand-plum)", opacity: 0.8, marginBottom: 24 }}>You don&apos;t have any subscriptions yet.</p>
            <Link href="/subscription" style={{ display: "inline-block", padding: "14px 28px", background: "var(--brand-plum)", color: "white", textDecoration: "none", borderRadius: 8, fontWeight: 800 }}>
              View plans
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {subs.map((s) => (
              <div key={s.id} style={{ background: "white", padding: 24, borderRadius: 16, boxShadow: "0 4px 12px rgba(100,28,64,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 900, color: "var(--brand-plum)", marginBottom: 4 }}>{s.plan} Box</h2>
                    <p style={{ fontSize: 13, color: "var(--brand-plum)", opacity: 0.7 }}>R {s.pricePerWeek}/week</p>
                  </div>
                  <span style={{ padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: 800, letterSpacing: 0.5, background: s.status === "ACTIVE" ? "#dcfce7" : "#fee", color: s.status === "ACTIVE" ? "#166534" : "#991b1b" }}>
                    {s.status}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: "var(--brand-plum)", opacity: 0.7, marginBottom: 16 }}>
                  Next delivery: {new Date(s.nextDelivery).toLocaleDateString("en-ZA")} &middot; Started {new Date(s.startDate).toLocaleDateString("en-ZA")}
                </p>
                {s.status === "ACTIVE" && <CancelButton id={s.id} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
