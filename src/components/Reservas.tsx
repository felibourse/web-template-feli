import { useEffect, useRef } from 'react'
import { MapPin, Clock, InstagramLogo, PaperPlaneTilt } from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { negocio } from '../data/info'

gsap.registerPlugin(ScrollTrigger)

interface ReservasProps {
  onReservar: () => void
}

const Reservas = ({ onReservar }: ReservasProps) => {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)
  const mapaRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Columna izquierda (info): desde la izquierda
      gsap.set(contentRef.current, { opacity: 0, x: -50 })
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () =>
          gsap.to(contentRef.current, { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' }),
      })

      // Columna derecha (mapa): desde la derecha, con delay
      gsap.set(mapaRef.current, { opacity: 0, x: 50 })
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () =>
          gsap.to(mapaRef.current, { opacity: 1, x: 0, duration: 1.0, delay: 0.2, ease: 'power3.out' }),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="reservas" className="bg-surface py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Info — izquierda */}
          <div ref={contentRef} className="flex flex-col gap-8">
            <div>
              <p className="font-body text-[10px] text-verde/70 tracking-[0.35em] uppercase mb-4">
                Encontranos
              </p>
              <h2 className="font-heading text-5xl md:text-6xl font-black text-cream tracking-tight leading-tight mb-6">
                Vení a la selva
              </h2>
              <p className="font-body text-sm text-muted leading-relaxed max-w-sm">
                Hacé tu reserva y asegurate el mejor lugar. También podés visitarnos directamente — siempre hay lugar en la barra.
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <MapPin size={20} weight="light" className="text-verde flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-body text-xs text-muted/60 tracking-[0.15em] uppercase mb-1">Dirección</p>
                <p className="font-body text-sm text-cream">{negocio.direccion}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock size={20} weight="light" className="text-verde flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-body text-xs text-muted/60 tracking-[0.15em] uppercase mb-2">Horarios</p>
                <div className="flex flex-col gap-1.5">
                  {negocio.horarios.map((h) => (
                    <div key={h.dias} className="flex gap-4 items-baseline">
                      <span className="font-body text-xs text-muted w-36 flex-shrink-0">{h.dias}</span>
                      <span className="font-body text-sm text-cream">{h.horario}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <InstagramLogo size={20} weight="light" className="text-verde flex-shrink-0" />
              <a
                href={negocio.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-cream hover:text-verde transition-colors"
              >
                @selvabar.ar
              </a>
            </div>

            <div className="flex gap-4 items-center">
              <PaperPlaneTilt size={20} weight="light" className="text-verde flex-shrink-0" />
              <a
                href={negocio.instagramDM}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-cream hover:text-verde transition-colors"
              >
                Mensaje directo
              </a>
            </div>

            {/* CTAs — rounded-full */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onReservar}
                className="font-body text-sm font-medium text-bg bg-cream rounded-full px-8 py-3.5 tracking-[0.1em] uppercase hover:bg-verde hover:text-cream transition-colors duration-300"
              >
                Reservar mesa
              </button>
              <a
                href={negocio.instagramDM}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm font-medium text-cream border border-cream/25 rounded-full px-8 py-3.5 tracking-[0.1em] uppercase hover:border-verde/60 hover:text-verde transition-colors duration-300 text-center"
              >
                Instagram DM
              </a>
            </div>
          </div>

          {/* Mapa — derecha */}
          <div ref={mapaRef} className="w-full h-80 lg:h-auto min-h-[360px] bg-surface-2 overflow-hidden rounded-3xl">
            <iframe
              src={negocio.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.5)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Selva Bar en el mapa"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reservas
