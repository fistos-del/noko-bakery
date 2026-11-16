import AdminProductForm from "@/components/AdminProductForm";
import { getCurrentUserWithAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function NewProductPage() {
  const user = await getCurrentUserWithAdmin();
  if (!user || !user.isAdmin) redirect("/login");

  return (
    <div>
      <Link href="/admin/products" style={{ fontSize: 13, color: "#666", textDecoration: "none" }}>
        &larr; Back to products
      </Link>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111", marginTop: 16, marginBottom: 40 }}>
        Add New Product
      </h1>
      <AdminProductForm />
    </div>
  );
}
