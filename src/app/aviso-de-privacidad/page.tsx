import { PageLayout } from "@/components/layout/PageLayout";

export default function AvisoDePrivacidadPage() {
  return (
    <PageLayout>
      <section className="bg-[#0A1A2F] py-16 text-slate-50">
        <div className="mx-auto max-w-4xl px-4 space-y-6 text-sm text-slate-200">
          <header className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A76A]/80">
              Aviso de privacidad
            </p>
            <h1 className="text-2xl font-semibold">Aviso de privacidad</h1>
            <p className="text-xs text-slate-400">
              Este texto es de carácter informativo y debe ser revisado y
              ajustado por un profesional legal para cumplir plenamente con la
              legislación aplicable en México.
            </p>
          </header>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-50">
              Responsable del tratamiento de datos personales
            </h2>
            <p>
              Javier Figueroa (en adelante, &quot;el Responsable&quot;), con
              actividad profesional de servicios de fotografía, es responsable
              del tratamiento de sus datos personales que sean recabados a
              través del sitio web y de los medios de contacto puestos a
              disposición, como WhatsApp y correo electrónico.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-50">
              Datos personales que se recaban
            </h2>
            <p>Los datos personales que se pueden recabar incluyen, de manera enunciativa:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Nombre completo.</li>
              <li>Datos de contacto (teléfono, correo electrónico).</li>
              <li>
                Información relacionada con el evento o sesión (fecha, tipo de
                evento, locación).
              </li>
              <li>
                Imágenes fotográficas y audiovisuales capturadas durante la
                sesión o evento.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-50">
              Finalidades del tratamiento
            </h2>
            <p>Las finalidades principales del tratamiento de datos son:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Agendar y coordinar sesiones o coberturas de eventos.</li>
              <li>
                Elaborar propuestas de servicio, cotizaciones y confirmar
                disponibilidad.
              </li>
              <li>
                Realizar la cobertura fotográfica y entregar el material
                contratado.
              </li>
              <li>
                Dar seguimiento a dudas y aclaraciones relacionadas con el
                servicio.
              </li>
            </ul>

            <p className="mt-2">
              De manera adicional, y sólo con su consentimiento, algunas
              imágenes podrían utilizarse con fines de portafolio o promoción en
              medios digitales del Responsable (por ejemplo, sitio web y redes
              sociales). En estos casos se solicitará autorización específica.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-50">
              Transferencias y conservación de datos
            </h2>
            <p>
              Sus datos personales no serán vendidos ni cedidos a terceros
              ajenos al servicio. Únicamente podrán compartirse con proveedores
              tecnológicos necesarios para la operación (por ejemplo, servicios
              de almacenamiento en la nube), siempre bajo medidas razonables de
              seguridad.
            </p>
            <p>
              Los datos se conservarán por el tiempo necesario para cumplir con
              las finalidades descritas y las obligaciones legales aplicables.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-50">
              Derechos ARCO
            </h2>
            <p>
              Usted tiene derecho a acceder, rectificar, cancelar u oponerse al
              tratamiento de sus datos personales (derechos ARCO). Para
              ejercerlos, puede enviar una solicitud a través de los medios de
              contacto proporcionados en este sitio (por ejemplo, WhatsApp o
              correo electrónico).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-50">
              Uso de cookies
            </h2>
            <p>
              Este sitio puede utilizar cookies con fines estrictamente
              funcionales y analíticos básicos para mejorar la experiencia de
              navegación. No se utilizan cookies para perfilar usuarios ni para
              publicidad personalizada.
            </p>
            <p>
              Usted puede administrar el uso de cookies desde la configuración
              de su navegador.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-50">
              Actualizaciones al presente aviso
            </h2>
            <p>
              El presente Aviso de privacidad puede ser modificado o actualizado
              en cualquier momento. Cualquier cambio sustancial se publicará en
              esta misma sección del sitio web.
            </p>
          </section>
        </div>
      </section>
    </PageLayout>
  );
}
