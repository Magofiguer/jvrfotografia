import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageLayout } from "@/components/layout/PageLayout";

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "522213498865";

function buildWhatsAppLink(packageTitle: string) {
  const text = encodeURIComponent(
    `Hola, me interesa el paquete "${packageTitle}" que vi en la página de Javier Figueroa. ¿Me puedes compartir más información?`
  );
  return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
}

export default async function PackagesPublicPage() {
  const categories = await prisma.packageCategory.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: {
      packages: {
        where: { isActive: true },
        orderBy: [{ order: "asc" }, { title: "asc" }],
      },
    },
  });

  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-16 text-slate-50">
        <div className="mx-auto max-w-6xl px-4 space-y-10">
          {/* Header */}
          <header className="space-y-3 max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A76A]/80">
              Paquetes
            </p>
            <h1 className="text-2xl font-semibold">
              Paquetes pensados para cada historia.
            </h1>
            <p className="text-sm text-slate-300">
              Javier arma cada paquete para que tengas la cobertura justa:
              tiempo, lugares clave y entrega de imágenes, sin complicaciones.
              Todo se ajusta por WhatsApp según tus necesidades.
            </p>
          </header>

          {categories.length === 0 ? (
            <p className="text-sm text-slate-300">
              Próximamente verás aquí los paquetes disponibles.
            </p>
          ) : (
            <div className="space-y-8">
              {categories.map((cat) =>
                cat.packages.length === 0 ? null : (
                  <section key={cat.id} className="space-y-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <h2 className="text-sm font-semibold text-slate-50">
                        {cat.name}
                      </h2>
                      {cat.description && (
                        <p className="text-[11px] text-slate-400 max-w-md text-right">
                          {cat.description}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {cat.packages.map((p) => (
                          <div
                            key={p.id}
                            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 hover:border-[#C8A76A]/80 hover:bg-slate-900/80 transition"
                          >
                            {/* “Header” de la tarjeta, similar a las de portafolio */}
                            <Link
                              href={`/paquetes/${p.slug}`}
                              className="flex flex-col border-b border-slate-800/80 bg-slate-900/80 px-4 py-3"
                            >
                              <p className="text-xs font-semibold text-slate-50">
                                {p.title}
                              </p>
                              {p.priceFrom && (
                                <p className="mt-1 text-[11px] text-[#C8A76A]">
                                  Desde{" "}
                                  <span className="font-semibold">
                                    ${p.priceFrom.toLocaleString("es-MX")}
                                  </span>{" "}
                                  MXN
                                </p>
                              )}
                            </Link>

                            {/* Cuerpo */}
                            <Link
                              href={`/paquetes/${p.slug}`}
                              className="flex flex-1 flex-col gap-2 px-4 py-3 text-[11px]"
                            >
                              {p.shortDescription && (
                                <p className="text-slate-300 line-clamp-3">
                                  {p.shortDescription}
                                </p>
                              )}
                              <div className="mt-auto flex items-center justify-between pt-2 text-slate-400">
                                <span className="text-[11px]">{cat.name}</span>
                                <span className="text-[#C8A76A] group-hover:translate-x-0.5 transition-transform">
                                  →
                                </span>
                              </div>
                            </Link>

                            {/* CTA WhatsApp */}
                            <a
                              href={buildWhatsAppLink(p.title)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="m-3 mt-0 inline-flex items-center justify-center rounded-full bg-[#C8A76A] px-4 py-2 text-[11px] font-semibold text-[#0A1A2F] shadow-md shadow-black/30 hover:bg-[#d3b781] transition"
                            >
                              Cotizar por WhatsApp
                            </a>
                          </div>
                        ))}
                      </div>
                    </section>
                  )
                )}
              </div>
            )}
          </div>
      </section>
    </PageLayout>
  );
}
