export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-[#06111F] py-8 text-sm text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} JVR Fotografía. Todos los derechos reservados.</p>
        <p className="text-xs text-slate-400">
          Toda la comunicación se realiza exclusivamente por WhatsApp.
        </p>
      </div>
    </footer>
  );
}
