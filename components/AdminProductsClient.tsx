"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  contents: string[];
  allergens: string;
  inStock: boolean;
  isSeasonal: boolean;
}

export default function AdminProductsClient({
  products: initialProducts,
}: {
  products: Product[];
}) {
  const router = useRouter();
  const [products] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <>
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => {
            setEditingId(null);
            setShowForm(true);
          }}
          style={{
            padding: "12px 24px",
            background: "var(--primary)",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 900,
            letterSpacing: 1,
            textTransform: "uppercase",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(181, 56, 143, 0.3)",
          }}
        >
          + New Product
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              padding: 20,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div style={{ flex: 1, minWidth: 200 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 4,
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 900 }}>
                  {product.name}
                </span>
                {product.isSeasonal && (
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 900,
                      padding: "2px 8px",
                      background: "var(--accent)",
                      color: "#2A1B2D",
                      borderRadius: 100,
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                    }}
                  >
                    Seasonal
                  </span>
                )}
                {!product.inStock && (
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 900,
                      padding: "2px 8px",
                      background: "rgba(192, 57, 43, 0.2)",
                      color: "var(--danger)",
                      borderRadius: 100,
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                    }}
                  >
                    Out of Stock
                  </span>
                )}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                /shop/{product.slug} · {product.contents.length} items ·{" "}
                {product.allergens}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: "var(--primary-light)",
                }}
              >
                R {product.price}
              </span>
              <button
                onClick={() => {
                  setEditingId(product.id);
                  setShowForm(true);
                }}
                style={{
                  padding: "8px 16px",
                  background: "transparent",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <ProductFormModal
            product={editingId ? products.find((p) => p.id === editingId) : undefined}
            onClose={() => {
              setShowForm(false);
              setEditingId(null);
            }}
            onSaved={() => {
              setShowForm(false);
              setEditingId(null);
              router.refresh();
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ProductFormModal({
  product,
  onClose,
  onSaved,
}: {
  product?: Product;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    price: product?.price.toString() || "",
    category: product?.category || "BOX",
    contents: product?.contents.join("\n") || "",
    allergens: product?.allergens || "Gluten, Dairy, Egg",
    inStock: product?.inStock ?? true,
    isSeasonal: product?.isSeasonal ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        contents: form.contents
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const url = product
        ? `/api/admin/products/${product.id}`
        : "/api/admin/products";
      const method = product ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(15, 8, 15, 0.7)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          maxWidth: 560,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          padding: 32,
        }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: 900,
            marginBottom: 20,
            letterSpacing: -0.5,
          }}
        >
          {product ? "Edit Product" : "New Product"}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Name">
            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                  slug:
                    product?.slug ||
                    e.target.value.toLowerCase().replace(/\s+/g, "-"),
                })
              }
              style={inputStyle}
            />
          </Field>

          <Field label="URL slug">
            <input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              style={inputStyle}
              disabled={!!product}
            />
            <div style={{ fontSize: 10, color: "var(--text-soft)", marginTop: 4 }}>
              /shop/{form.slug || "..."}
            </div>
          </Field>

          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={2}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
            />
          </Field>

          <Field label="Price (R)">
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              style={inputStyle}
            />
          </Field>

          <Field label="Contents (one per line)">
            <textarea
              value={form.contents}
              onChange={(e) => setForm({ ...form, contents: e.target.value })}
              rows={4}
              placeholder="1 loaf of bread&#10;1 focaccia"
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
            />
          </Field>

          <Field label="Allergens">
            <input
              value={form.allergens}
              onChange={(e) => setForm({ ...form, allergens: e.target.value })}
              style={inputStyle}
            />
          </Field>

          <div style={{ display: "flex", gap: 20, marginTop: 6 }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: "var(--text)",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={form.inStock}
                onChange={(e) =>
                  setForm({ ...form, inStock: e.target.checked })
                }
              />
              In Stock
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: "var(--text)",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={form.isSeasonal}
                onChange={(e) =>
                  setForm({ ...form, isSeasonal: e.target.checked })
                }
              />
              Seasonal
            </label>
          </div>
        </div>

        {error && (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              background: "rgba(192, 57, 43, 0.1)",
              border: "1px solid var(--danger)",
              borderRadius: 8,
              fontSize: 12,
              color: "var(--danger)",
              fontWeight: 600,
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button
            onClick={onClose}
            disabled={saving}
            style={{
              flex: 1,
              padding: 14,
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: 10,
              color: "var(--text)",
              fontSize: 13,
              fontWeight: 700,
              cursor: saving ? "wait" : "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              flex: 2,
              padding: 14,
              background: "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              cursor: saving ? "wait" : "pointer",
            }}
          >
            {saving ? "Saving..." : product ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 10,
          color: "var(--text-soft)",
          marginBottom: 6,
          textTransform: "uppercase",
          letterSpacing: 1.2,
          fontWeight: 800,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  background: "var(--surface-2)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  color: "var(--text)",
  fontSize: 13,
  fontWeight: 500,
  fontFamily: "inherit",
  outline: "none",
};
