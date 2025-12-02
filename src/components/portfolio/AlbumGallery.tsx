/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

type Image = {
  id: number;
  url: string;
  alt: string | null;
};

type Props = {
  images: Image[];
};

export function AlbumGallery({ images }: Props) {
  const [active, setActive] = useState<Image | null>(null);

  if (images.length === 0) {
    return (
      <p className="text-xs text-slate-300">
        Aún no hay imágenes cargadas para este álbum.
      </p>
    );
  }

  return (
    <>
      {/* Masonry simple por columnas */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 [column-fill:_balance]">
        {images.map((img) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActive(img)}
            className="mb-3 w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/70 hover:border-[#C8A76A]/70 hover:bg-slate-900/80 transition"
          >
            <img
              src={img.url}
              alt={img.alt ?? ""}
              className="w-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-slate-950"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 rounded-full bg-black/70 px-2 py-1 text-[11px] text-slate-100 hover:bg-black"
            >
              Cerrar ✕
            </button>
            <img
              src={active.url}
              alt={active.alt ?? ""}
              className="max-h-[80vh] w-full object-contain bg-black"
            />
            {active.alt && (
              <p className="border-t border-slate-800 px-4 py-3 text-[11px] text-slate-200">
                {active.alt}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
