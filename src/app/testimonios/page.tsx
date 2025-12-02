import { PageLayout } from "@/components/layout/PageLayout";

export default function TestimonialsPage() {
  return (
    <PageLayout>
      <section className="bg-[#E8C9D8]/40 py-16 text-[#0A1A2F]">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-2xl font-semibold md:text-3xl">Testimonios</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-700">
            La confianza se construye con experiencias reales. Algunas
            familias han compartido sus palabras sobre el proceso y el
            resultado de su sesión.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-700">
                “Desde el primer mensaje por WhatsApp sentimos un trato
                respetuoso y cuidado. El resultado superó todo lo que
                imaginábamos para los XV de nuestra hija.”
              </p>
              <p className="mt-3 text-xs font-semibold text-[#0A1A2F]">
                – Familia Hernández
              </p>
            </article>

            <article className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-700">
                “Muy profesional, puntual y siempre atento a los detalles.
                Las fotos de nuestra boda son un tesoro para nosotros.”
              </p>
              <p className="mt-3 text-xs font-semibold text-[#0A1A2F]">
                – Ana & Carlos
              </p>
            </article>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
