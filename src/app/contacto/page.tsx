import { PageLayout } from "@/components/layout/PageLayout";

export default function ContactPage() {
  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-2xl font-semibold md:text-3xl">
            Hablemos de tu sesión
          </h1>
          <p className="mt-3 max-w-xl text-sm text-slate-200">
            Toda la comunicación se realiza de forma directa y personalizada
            por WhatsApp. Cuéntame qué tipo de sesión te interesa y con
            gusto te ayudaré a planear cada detalle.
          </p>

          <a
            href="https://wa.me/XXXXXXXXXXX"
            className="mt-8 inline-flex items-center rounded-full bg-[#C8A76A] px-8 py-3 text-sm font-medium text-[#0A1A2F] shadow-lg"
          >
            Enviar mensaje por WhatsApp
          </a>

          <p className="mt-4 text-xs text-slate-300">
            Al escribir, por favor indica tu nombre, tipo de sesión (XV,
            boda, familia, etc.) y ciudad.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
