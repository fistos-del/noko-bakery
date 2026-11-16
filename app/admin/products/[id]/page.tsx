import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getCurrentUserWithAdmin } from "@/lib/auth";
import AdminProductForm from "@/components/AdminProductForm";
import Link from "next/link";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUserWithAdmin();
  if (!user || !user.isAdmin) redirect("/login");

  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) notFound();

  return (
    <div>
      <Link href="/admin/products" style={{ fontSize: 13, color: "#666", textDecoration: "none" }}>
        &larr; Back to products
      </Link>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111", marginTop: 16, marginBottom: 40 }}>
        Edit Product
      </h1>
      <AdminProductForm initialData={product} />
    </div>
  );
}
