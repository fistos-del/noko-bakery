import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserWithAdmin } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const user = await getCurrentUserWithAdmin();
  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary not configured. Add CLOUDINARY_* to .env" },
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
      return NextResponse.json({ error: "Only image files allowed" }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be under 5MB" }, { status: 400 });
    }

    // Upload to Cloudinary using unsigned-style signed upload
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "noko-bakery/products";
    const signatureString = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = require("crypto")
      .createHash("sha1")
      .update(signatureString)
      .digest("hex");

    const cloudForm = new FormData();
    cloudForm.append("file", file);
    cloudForm.append("api_key", apiKey);
    cloudForm.append("timestamp", String(timestamp));
    cloudForm.append("folder", folder);
    cloudForm.append("signature", signature);

    const cloudRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: cloudForm }
    );

    if (!cloudRes.ok) {
      const errText = await cloudRes.text();
      console.error("Cloudinary error:", errText);
      return NextResponse.json({ error: "Upload failed", details: errText }, { status: 500 });
    }

    const data = await cloudRes.json();
    return NextResponse.json({ url: data.secure_url, publicId: data.public_id });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed", details: String(error) }, { status: 500 });
  }
}
