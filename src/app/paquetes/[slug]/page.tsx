import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageLayout } from "@/components/layout/PageLayout";

const WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "522213498865";

function buildWhatsAppLink(packageTitle: string) {
  const text = encodeURIComponent(
    `Hola, me interesa el paquete "${packageTitle}" que vi en la página de Javier Figueroa. ¿Me puedes compartir más información?`
  );
  return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;

  const pkg = await prisma.package.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!pkg || !pkg.isActive) {
    notFound();
  }

  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-16 text-slate-50">
        <div className="mx-auto max-w-4xl px-4 space-y-8">
          {/* Volver */}
          <Link
            href="/paquetes"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-[#C8A76A] transition"
          >
            <span className="text-base">←</span>
            <span>Ver todos los paquetes</span>
          </Link>

          {/* Header */}
          <header className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A76A]/80">
              Paquetes · {pkg.category?.name ?? "Sesión"}
            </p>
            <h1 className="text-2xl font-semibold">{pkg.title}</h1>

            {pkg.priceFrom && (
              <p className="text-sm text-[#C8A76A]">
                Desde{" "}
                <span className="font-semibold">
                  ${pkg.priceFrom.toLocaleString("es-MX")}
                </span>{" "}
                MXN
              </p>
            )}

            {pkg.shortDescription && (
              <p className="text-sm text-slate-300 max-w-2xl">
                {pkg.shortDescription}
              </p>
            )}
          </header>

          {/* Cuerpo */}
          <div className="space-y-4 rounded-2xl border border-slate-700 bg-slate-900/60 p-6 text-sm text-slate-200">
            {pkg.description ? (
              <p className="whitespace-pre-line">{pkg.description}</p>
            ) : (
              <p>
                Este paquete se ajusta a tus necesidades de cobertura. Escríbele
                a Javier por WhatsApp para afinar horarios, ubicaciones y
                detalles de entrega.
              </p>
            )}

            <div className="pt-2">
              <a
                href={buildWhatsAppLink(pkg.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#C8A76A] px-5 py-2 text-[11px] font-semibold text-[#0A1A2F] shadow-md shadow-black/30 hover:bg-[#d3b781] transition"
              >
                Cotizar este paquete por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
