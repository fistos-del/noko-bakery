"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProductData = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  allergens: string;
  imageUrl: string;
  contents: string;
  inStock: boolean;
  isSeasonal: boolean;
};

export default function AdminProductForm({ initialData }: { initialData?: ProductData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<ProductData>(
    initialData || {
      name: "",
      slug: "",
      description: "",
      price: 0,
      category: "BREAD",
      allergens: "",
      imageUrl: "",
      contents: "[]",
      inStock: true,
      isSeasonal: false,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const slug = initialData
      ? form.slug
      : form.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

    let contentsString = form.contents;
    try {
      JSON.parse(form.contents);
    } catch {
      contentsString = "[]";
    }

    const payload = {
      name: form.name,
      slug,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      allergens: form.allergens,
      contents: contentsString,
      imageUrl: form.imageUrl,
      inStock: form.inStock,
      isSeasonal: form.isSeasonal,
    };

    const url = initialData ? `/api/admin/products/${initialData.id}` : "/api/admin/products";
    const method = initialData ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to save product");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;

    const confirmed = window.confirm(
      `Delete "${form.name}" permanently?\n\nIf this product has already been ordered, it can't be deleted — turn off "In Stock" instead to hide it from the shop.`
    );
    if (!confirmed) return;

    setDeleting(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/products/${initialData.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 500 && data.error?.includes("orders")) {
          throw new Error(
            "This product has been ordered before and can't be deleted. Turn off \"In Stock\" to hide it from the shop instead."
          );
        }
        throw new Error(data.error || "Failed to delete product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
      setDeleting(false);
    }
  };

  const labelStyle = { display: "block", fontWeight: 800, marginBottom: 8, fontSize: 12, textTransform: "uppercase" as const, letterSpacing: 1, color: "var(--brand-plum)" };
  const inputStyle = { width: "100%", padding: 12, border: "1px solid rgba(100,28,64,0.2)", borderRadius: 8, fontSize: 14 };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 600 }}>
      {error && (
        <div style={{ padding: 12, background: "#fee", color: "#900", borderRadius: 8, fontSize: 14, lineHeight: 1.5 }}>
          {error}
        </div>
      )}

      <div>
        <label style={labelStyle}>Name</label>
        <input required name="name" value={form.name} onChange={handleChange} style={inputStyle} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={labelStyle}>Price (R)</label>
          <input required type="number" step="0.01" name="price" value={form.price} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Category</label>
          <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
            <option value="BREAD">Bread / Focaccia</option>
            <option value="BAGEL">Bagel</option>
            <option value="PASTRY">Pastry</option>
            <option value="BOX">Box</option>
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Description</label>
        <textarea required name="description" value={form.description} onChange={handleChange} rows={4} style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle}>Allergens (comma separated)</label>
        <input name="allergens" value={form.allergens} onChange={handleChange} placeholder="Gluten, Dairy, Egg" style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle}>Image URL (paste a link)</label>
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle}>Contents (JSON array, leave [] for single items)</label>
        <textarea name="contents" value={form.contents} onChange={handleChange} rows={3} style={{ ...inputStyle, fontFamily: "monospace", fontSize: 12 }} placeholder='["1 loaf", "1 focaccia"]' />
      </div>

      <div style={{ display: "flex", gap: 24 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700 }}>
          <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} />
          In Stock
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700 }}>
          <input type="checkbox" name="isSeasonal" checked={form.isSeasonal} onChange={handleChange} />
          Seasonal
        </label>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <button
          type="submit"
          disabled={loading || deleting}
          style={{ flex: 1, padding: 16, background: "var(--brand-plum)", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 900, textTransform: "uppercase", letterSpacing: 1, cursor: loading || deleting ? "not-allowed" : "pointer", opacity: loading || deleting ? 0.7 : 1 }}
        >
          {loading ? "Saving..." : "Save Product"}
        </button>

        {initialData?.id && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading || deleting}
            style={{ padding: "16px 24px", background: "#dc2626", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 900, textTransform: "uppercase", letterSpacing: 1, cursor: loading || deleting ? "not-allowed" : "pointer", opacity: loading || deleting ? 0.7 : 1 }}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    </form>
  );
}
