"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageDropzone({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        onChange(data.url);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif"] },
    maxFiles: 1,
    disabled: uploading,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: `2px dashed ${isDragActive ? "var(--primary)" : "var(--border)"}`,
          borderRadius: 12,
          padding: 24,
          textAlign: "center",
          cursor: uploading ? "wait" : "pointer",
          background: isDragActive ? "var(--primary)11" : "var(--bg-alt)",
          transition: "all 0.15s",
        }}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Uploading...</div>
        ) : isDragActive ? (
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)" }}>Drop the image here</div>
        ) : (
          <div>
            <div style={{ fontSize: 32, marginBottom: 8, opacity: 0.6 }}>📸</div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Drag & drop an image, or click to browse</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>JPG, PNG, WEBP — max 5MB</div>
          </div>
        )}
      </div>

      {error && (
        <div style={{ marginTop: 8, fontSize: 12, color: "var(--danger)" }}>{error}</div>
      )}

      {value && (
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12, padding: 12, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8 }}>
          <img
            src={value}
            alt="Preview"
            style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6 }}
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.3"; }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1, fontWeight: 800, marginBottom: 2 }}>Image URL</div>
            <div style={{ fontSize: 11, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            style={{ padding: "6px 12px", background: "transparent", border: "1px solid var(--border)", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer", color: "var(--text-muted)" }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
