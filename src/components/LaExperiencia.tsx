import { useEffect, useRef } from 'react'
import { Martini, MicrophoneStage, Flame, Plant } from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pilares = [
  {
    icon: Martini,
    titulo: 'Coctelería Artesanal',
    texto: 'Más de 30 cócteles diseñados con rones premium, gins botánicos y sabores tropicales que no encontrás en otro lugar.',
  },
  {
    icon: Flame,
    titulo: 'Gastronomía de Autor',
    texto: 'Horno de barro a leña, parrilla y plancha. Desde milanesas gourmet hasta cortes de parrilla con guarniciones creativas.',
  },
  {
    icon: MicrophoneStage,
    titulo: 'Karaoke & Shows',
    texto: 'Las noches cobran vida con sesiones de karaoke, DJs y shows en vivo. El lugar donde la noche se prolonga sola.',
  },
  {
    icon: Plant,
    titulo: 'Ambiente Único',
    texto: 'Una atmósfera tropical, cálida y envolvente que te transporta lejos de la ciudad sin salir de San Isidro.',
  },
]

const LaExperiencia = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading: desde la izquierda + scale
      gsap.set('.exp-heading', { opacity: 0, x: -50, scale: 0.97 })
      ScrollTrigger.create({
        trigger: '.exp-heading',
        start: 'top 75%',
        once: true,
        onEnter: () =>
          gsap.to('.exp-heading', { opacity: 1, x: 0, scale: 1, duration: 1.0, ease: 'power3.out' }),
      })

      // Cards: impares desde izquierda, pares desde derecha, con stagger
      const cards = gsap.utils.toArray<HTMLElement>('.exp-card')
      cards.forEach((card, i) => {
        const fromX = i % 2 === 0 ? -60 : 60
        gsap.set(card, { opacity: 0, x: fromX, y: 20 })
      })
      ScrollTrigger.create({
        trigger: '.exp-grid',
        start: 'top 75%',
        once: true,
        onEnter: () => {
          cards.forEach((card, i) => {
            gsap.to(card, {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.85,
              delay: i * 0.12,
              ease: 'power3.out',
            })
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experiencia" className="bg-bg py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="exp-heading mb-16 md:mb-20">
          <p className="font-body text-[10px] text-verde/70 tracking-[0.35em] uppercase mb-4">
            Por qué Selva
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-black text-cream leading-tight tracking-tight max-w-xl">
            Una experiencia que no se explica,{' '}
            <em className="not-italic text-verde">se vive</em>
          </h2>
        </div>

        {/* Grid de pilares — rounded-2xl con gap real */}
        <div className="exp-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pilares.map(({ icon: Icon, titulo, texto }) => (
            <div
              key={titulo}
              className="exp-card bg-surface rounded-2xl p-8 md:p-10 group hover:bg-surface-2 transition-colors duration-300 border border-border"
            >
              <Icon
                size={28}
                weight="light"
                className="text-verde mb-6 group-hover:scale-110 transition-transform duration-300"
              />
              <h3 className="font-heading text-xl font-bold text-cream mb-3 leading-snug">
                {titulo}
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                {texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LaExperiencia
