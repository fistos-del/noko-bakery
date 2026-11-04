export default function ProductsPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 8 }}>Manage Products</h1>
          <p style={{ color: "#666", fontSize: 14 }}>Add, edit, or remove items from your bakery menu.</p>
        </div>
        <button style={{ padding: "10px 20px", background: "#111", color: "#FFF", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>+ Add Product</button>
      </div>

      <div style={{ padding: 40, background: "#FFF", borderRadius: 16, textAlign: "center", color: "#888", border: "1px dashed #CCC" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🥖</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>Product Editor Coming Here</h3>
        <p style={{ fontSize: 14 }}>This is where the form for adding new breads will go.</p>
      </div>
    </div>
  );
}
