export default function CustomersPage() {
  return (
    <div style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(20px)", padding: 40, borderRadius: 24, border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 10px 40px rgba(0,0,0,0.02)" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 8 }}>Customers</h1>
      <p style={{ color: "#666", marginBottom: 32 }}>View all registered and guest customers.</p>
      <div style={{ padding: 40, background: "#FFF", borderRadius: 16, textAlign: "center", color: "#888", border: "1px dashed #CCC" }}>
        Customer Table Coming Here
      </div>
    </div>
  );
}
