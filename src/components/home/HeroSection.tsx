import Image from "next/image";

export function HeroSection() {
  return (
    <section className="bg-[#0A1A2F] py-20 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-center">
        <div className="flex-1">
          <p className="text-xs tracking-[0.35em] text-[#C8A76A]">
            JAVIER FIGUEROA FOTOGRAFÍA
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
            Fotografía que guarda lo que tu corazón no quiere olvidar.
          </h1>
          <p className="mt-4 max-w-xl text-sm text-slate-200 md:text-base">
            Momentos reales, emociones sinceras y una experiencia respetuosa y
            profesional, pensada para ti y tu familia.
          </p>
          <a
            href="https://wa.me/XXXXXXXXXXX"
            className="mt-8 inline-flex items-center rounded-full bg-[#C8A76A] px-8 py-3 text-sm font-medium text-[#0A1A2F] shadow-lg"
          >
            Agenda por WhatsApp
          </a>
        </div>
        <div className="flex-1">
  <div className="relative aspect-[4/5] w-full">
    <div
      className="
        relative h-full w-full
        rounded-3xl
        shadow-2xl shadow-black/50
        ring-1 ring-white/5
        bg-slate-900/40
        overflow-hidden
        translate-y-1
        transition
        duration-500
        ease-out
        hover:-translate-y-1.5 hover:scale-[1.01]
        hover:shadow-[0_35px_60px_-25px_rgba(0,0,0,0.9)]
      "
    >
      <Image
        src="/images/hero-javier-02.png"
        alt="Sesión fotográfica de XV años por Javier Figueroa"
        fill
        className="object-cover"
        priority
      />
    </div>
  </div>
</div>
      </div>
    </section>
  );
}
