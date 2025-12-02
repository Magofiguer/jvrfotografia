import { PageLayout } from "@/components/layout/PageLayout";
import Image from "next/image";

export default function QuienSoyPage() {
  const whatsappPhone =
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "522213498865";

  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-16 text-slate-50">
        <div className="mx-auto max-w-6xl px-4 flex flex-col gap-12 md:flex-row md:items-start lg:items-center">
          {/* Columna izquierda: texto principal */}
          <div className="flex-1 space-y-8">
            <header className="space-y-3 max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A76A]/80">
                Quién soy
              </p>
              <h1 className="text-2xl md:text-3xl font-semibold">
                Soy Javier Figueroa, fotógrafo de momentos importantes.
              </h1>
              <p className="text-sm md:text-base text-slate-300">
                Acompaño historias reales: XV años, bodas, sesiones familiares y
                retratos. Mi trabajo es documentar lo que pasa, sin forzar nada
                y con un profundo respeto por las personas frente a la cámara.
              </p>
            </header>

            <div className="space-y-6 text-sm md:text-base text-slate-200 leading-relaxed">
              <p>
                Para muchas familias, un XV años, una boda o una sesión en
                familia no es sólo una fecha en el calendario: es un antes y
                después. Yo entro ahí, en ese día que preparan durante meses,
                para dejarles algo que puedan volver a ver con calma, años
                después.
              </p>

              <p>
                Trabajo con una dirección suave: propongo, sugiero, acomodo la
                luz y el espacio, pero nunca fuerzo poses incómodas ni escenas
                que no van con ustedes. Prefiero capturar miradas auténticas,
                risas que de verdad suceden y detalles que normalmente pasarían
                desapercibidos.
              </p>

              <p className="font-semibold text-slate-100">
                Cuando se trata de fotografiar a chicas de XV años, mi prioridad
                es el respeto y la seguridad.
              </p>

              <p>
                Siempre trabajo con la presencia de madre, padre o tutor, y
                cuido que las poses, vestuario y ángulos sean adecuados para su
                edad. La idea es celebrar esta etapa como lo que es: un
                crecimiento, no una sexualización.
              </p>

              <p>
                En cada proyecto hablo antes con la familia para entender qué es
                importante para ustedes: si quieren algo más clásico, relajado,
                de revista, documental… y a partir de ahí armamos la sesión o la
                cobertura del evento.
              </p>

              <p>
                Toda la comunicación la manejo por WhatsApp, para que podamos
                resolver dudas rápido, compartir referencias y confirmar
                detalles de horario, locaciones y forma de entrega.
              </p>
            </div>
          </div>

          {/* Columna derecha: foto grande + Cómo trabajo debajo */}
          <div className="w-full md:w-auto md:flex md:flex-col md:items-end gap-6 space-y-6">
            {/* Foto */}
             <div className="relative mx-auto h-80 w-64 md:h-[460px] md:w-[340px] lg:h-[500px] lg:w-[380px]">
                <Image
                src="/images/about-javier.png"
                alt="Retrato de Javier Figueroa, fotógrafo"
                fill
                className="object-cover"
                />
            </div>

            {/* Cómo trabajo */}
            <aside className="mt-4 space-y-4 rounded-2xl border border-slate-700 bg-slate-950/60 p-5 text-xs md:text-sm w-full md:w-[320px] lg:w-[340px]">
              <h2 className="text-sm md:text-base font-semibold text-slate-50">
                Cómo trabajo
              </h2>
              <ul className="space-y-2 text-slate-200">
                <li>· Reunión previa por WhatsApp para entender lo que buscas.</li>
                <li>· Planeación de horarios y locaciones para aprovechar la luz.</li>
                <li>· Dirección suave durante la sesión o el evento.</li>
                <li>
                  · Entrega cuidada de las imágenes, lista para compartir o
                  imprimir.
                </li>
              </ul>

              <div className="pt-3">
                <a
                  href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                    "Hola Javier, vi tu sección 'Quién soy' y me gustaría platicar sobre una sesión / cobertura."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#C8A76A] px-5 py-2 text-[11px] font-semibold text-[#0A1A2F] shadow-md shadow-black/30 hover:bg-[#d3b781] transition"
                >
                  Escribir por WhatsApp
                </a>
              </div>

              <p className="text-[11px] text-slate-400">
                Si ya viste el portafolio y los paquetes, este es el siguiente
                paso: platicar lo que necesitas y revisar fechas disponibles.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
