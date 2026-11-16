import Link from "next/link";

export default function AccountPage() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--brand-bg)", padding: 24, overflow: "hidden" }}>
      
      {/* Decorative background blur */}
      <div style={{ position: "absolute", inset: -100, background: "var(--brand-muted)", opacity: 0.2, filter: "blur(100px)", borderRadius: "50%", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 420, background: "rgba(255,255,255,0.95)", borderRadius: 24, padding: 40, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: "var(--brand-plum)", textTransform: "uppercase", letterSpacing: 1 }}>
            Welcome Back
          </h1>
          <p style={{ fontSize: 14, color: "var(--brand-plum)", opacity: 0.8, marginTop: 8 }}>
            Log in to see your orders and subscriptions
          </p>
        </div>

        <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "var(--brand-plum)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Email</label>
            <input type="email" placeholder="name@example.com" style={{ width: "100%", padding: "14px 16px", borderRadius: 8, border: "1px solid rgba(100,28,64,0.2)", background: "white", color: "var(--brand-plum)", fontSize: 14 }} />
          </div>
          
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "var(--brand-plum)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Password</label>
            <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "14px 16px", borderRadius: 8, border: "1px solid rgba(100,28,64,0.2)", background: "white", color: "var(--brand-plum)", fontSize: 14 }} />
          </div>

          <button type="button" style={{ width: "100%", padding: 16, background: "var(--brand-plum)", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 900, textTransform: "uppercase", letterSpacing: 1, marginTop: 8, cursor: "pointer" }}>
            Log In →
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 32, fontSize: 13, color: "var(--brand-plum)", opacity: 0.8 }}>
          New here?{" "}
          <Link href="/register" style={{ color: "var(--brand-plum)", fontWeight: 800, textDecoration: "underline" }}>
            Create an account.
          </Link>
        </div>

      </div>
    </div>
  );
}
