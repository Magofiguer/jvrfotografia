import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { prisma } from "@/lib/prisma";

export default async function PackagesPage() {
  const categories = await prisma.packageCategory.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: {
      packages: {
        where: { isActive: true },
        orderBy: [{ order: "asc" }, { title: "asc" }],
      },
    },
  });

  const hasAnyActivePackage = categories.some(
    (cat) => cat.packages.length > 0
  );

  return (
    <PageLayout>
      <section className="bg-[#050814] py-16 text-slate-50">
        <div className="mx-auto max-w-5xl px-4 space-y-10">
          {/* Header público */}
          <header className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A76A]/80">
              Servicios · Paquetes
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Paquetes fotográficos
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Explora los diferentes paquetes para XV años, bodas, sesiones
              familiares y más. Cada paquete está pensado para adaptarse a
              distintos momentos y presupuestos.
            </p>
          </header>

          {!hasAnyActivePackage ? (
            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-6 text-sm text-slate-300">
              <p className="font-medium text-slate-100">
                Próximamente paquetes disponibles.
              </p>
              <p className="mt-2">
                Mientras tanto, puedes escribirme para armar una propuesta a la
                medida desde la sección de{" "}
                <Link
                  href="/contacto"
                  className="text-[#C8A76A] underline-offset-2 hover:underline"
                >
                  contacto
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {categories.map(
                (cat: {
                  id: number;
                  name: string;
                  description: string | null;
                  packages: {
                    id: number;
                    title: string;
                    slug: string;
                    shortDescription: string | null;
                    priceFrom: number | null;
                    isActive: boolean;
                  }[];
                }) =>
                  cat.packages.length === 0 ? null : (
                    <section key={cat.id} className="space-y-3">
                      <div className="flex items-baseline justify-between gap-2">
                        <div>
                          <h2 className="text-lg font-semibold text-slate-50">
                            {cat.name}
                          </h2>
                          {cat.description && (
                            <p className="mt-1 text-xs text-slate-300">
                              {cat.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        {cat.packages.map(
                          (pkg: {
                            id: number;
                            title: string;
                            slug: string;
                            shortDescription: string | null;
                            priceFrom: number | null;
                            isActive: boolean;
                          }) => (
                            <article
                              key={pkg.id}
                              className="group flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-slate-950/70 p-4 text-sm shadow-md shadow-black/20 transition hover:border-[#C8A76A]/80 hover:shadow-lg"
                            >
                              <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-50">
                                  {pkg.title}
                                </h3>
                                {pkg.shortDescription && (
                                  <p className="text-xs text-slate-300">
                                    {pkg.shortDescription}
                                  </p>
                                )}
                              </div>

                              <div className="mt-4 flex items-end justify-between gap-3 text-xs text-slate-300">
                                <div>
                                  {pkg.priceFrom && (
                                    <p className="text-[13px]">
                                      Desde{" "}
                                      <span className="font-semibold text-[#C8A76A]">
                                        $
                                        {pkg.priceFrom.toLocaleString("es-MX")}
                                      </span>
                                      {" MXN"}
                                    </p>
                                  )}
                                </div>

                                <Link
                                  href={`/paquetes/${pkg.slug}`}
                                  className="inline-flex items-center justify-center rounded-full bg-[#C8A76A] px-4 py-1.5 text-[11px] font-semibold text-[#050814] shadow-md shadow-black/30 transition group-hover:bg-[#d3b781]"
                                >
                                  Ver detalles
                                </Link>
                              </div>
                            </article>
                          )
                        )}
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
