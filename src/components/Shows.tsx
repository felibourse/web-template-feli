import { useEffect, useRef } from 'react'
import { MicrophoneStage, MusicNote, Star } from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const noches = [
  {
    icon: MicrophoneStage,
    dia: 'Miércoles y Jueves',
    titulo: 'Karaoke Night',
    desc: 'La noche más esperada de la semana. Subí al escenario, elegí tu tema y cantá con toda la selva.',
  },
  {
    icon: MusicNote,
    dia: 'Viernes',
    titulo: 'DJ Night',
    desc: 'Música tropical, electrónica y todo lo que mueve. La noche arranca y no para.',
  },
  {
    icon: Star,
    dia: 'Sábado',
    titulo: 'Selva Night',
    desc: 'Karaoke + DJ + sorpresas. La noche más grande de la semana, donde pasan todas las cosas.',
  },
]

const Shows = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading: desde abajo + scale
      gsap.set('.shows-heading', { opacity: 0, y: 40, scale: 0.96 })
      ScrollTrigger.create({
        trigger: '.shows-heading',
        start: 'top 75%',
        once: true,
        onEnter: () =>
          gsap.to('.shows-heading', { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out' }),
      })

      // Cards: entrada en cascada con leve rotación (tipo cartas cayendo)
      const cards = gsap.utils.toArray<HTMLElement>('.show-card')
      cards.forEach((card, i) => {
        // Rotación alternada: -2.5°, 0°, +2.5°
        const rot = i === 0 ? -2.5 : i === 1 ? 0 : 2.5
        gsap.set(card, { opacity: 0, y: 60, rotation: rot, transformOrigin: 'bottom center' })
      })
      ScrollTrigger.create({
        trigger: '.shows-grid',
        start: 'top 75%',
        once: true,
        onEnter: () => {
          cards.forEach((card, i) => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              rotation: 0,
              duration: 0.9,
              delay: i * 0.18,
              ease: 'power3.out',
            })
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="shows" className="bg-surface py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="shows-heading mb-16">
          <p className="font-body text-[10px] text-verde/70 tracking-[0.35em] uppercase mb-4">
            Agenda
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-black text-cream tracking-tight leading-tight max-w-xl">
            La noche en Selva siempre{' '}
            <em className="not-italic italic text-verde">tiene algo</em>
          </h2>
        </div>

        {/* Cards — rounded-2xl con gap real */}
        <div className="shows-grid grid grid-cols-1 md:grid-cols-3 gap-4">
          {noches.map(({ icon: Icon, dia, titulo, desc }) => (
            <div
              key={dia}
              className="show-card bg-bg rounded-2xl p-10 md:p-12 hover:bg-surface-2 transition-colors duration-300 border border-border"
            >
              <p className="font-body text-[10px] text-verde/70 tracking-[0.3em] uppercase mb-6">
                {dia}
              </p>
              <Icon size={32} weight="light" className="text-verde mb-5" />
              <h3 className="font-heading text-3xl font-bold text-cream mb-4 leading-snug">
                {titulo}
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Nota */}
        <p className="font-body text-xs text-muted/50 mt-8 tracking-wide">
          * La programación puede variar. Seguinos en{' '}
          <a
            href="https://instagram.com/selvabar.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-verde/70 hover:text-verde transition-colors"
          >
            @selvabar.ar
          </a>{' '}
          para la agenda semanal.
        </p>
      </div>
    </section>
  )
}

export default Shows
