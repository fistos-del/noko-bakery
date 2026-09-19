import type { Metadata } from "next";

export function pageMeta(title: string, description?: string): Metadata {
  return {
    title: `${title} | Hyamatla FertiTrack`,
    description: description ?? `Hyamatla FertiTrack — ${title}`,
  };
}