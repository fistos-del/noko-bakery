import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserWithAdmin } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const user = await getCurrentUserWithAdmin();
  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return NextResponse.json(
      { error: "Cloudinary not configured" },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only images allowed" }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Max 5MB" }, { status: 400 });
    }

    const cloudForm = new FormData();
    cloudForm.append("file", file);
    cloudForm.append("upload_preset", uploadPreset);

    const cloudRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: cloudForm }
    );

    const data = await cloudRes.json();

    if (!cloudRes.ok) {
      console.error("Cloudinary error:", JSON.stringify(data));
      return NextResponse.json(
        { error: data.error?.message || "Upload failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: data.secure_url, publicId: data.public_id });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
