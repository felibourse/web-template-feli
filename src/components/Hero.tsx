import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { negocio } from '../data/info'

interface HeroProps {
  onReservar: () => void
}

const Hero = ({ onReservar }: HeroProps) => {
  const heroRef      = useRef<HTMLElement>(null)
  const wordsRef     = useRef<(HTMLSpanElement | null)[]>([])
  const subtitleRef  = useRef<HTMLParagraphElement>(null)
  const eyebrowRef   = useRef<HTMLParagraphElement>(null)
  const ctaRef       = useRef<HTMLDivElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)

  // Palabras del slogan para animación individual
  const words = negocio.slogan.split(' ')

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      // Eyebrow desde arriba, sutil
      tl.from(eyebrowRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.7,
        ease: 'power2.out',
      })

      // Cada palabra del título con dirección alternada + escala
      // Pares: desde abajo | Impares: desde arriba | Cada 3ra: desde izquierda
      wordsRef.current.forEach((word, i) => {
        if (!word) return
        const fromY = i % 2 === 0 ? 70 : -70
        const fromX = i % 3 === 2 ? -30 : 0
        tl.from(
          word,
          {
            opacity: 0,
            y: fromY,
            x: fromX,
            scale: 0.82,
            duration: 1.0,
            ease: 'power3.out',
          },
          `-=${i === 0 ? 0.2 : 0.75}` // overlap agresivo para que fluya
        )
      })

      // Subtítulo desde derecha
      tl.from(subtitleRef.current, {
        opacity: 0,
        x: 30,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5')

      // CTAs desde abajo con escala
      tl.from(ctaRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.97,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.4')

      // Scroll cue fade in
      tl.from(scrollCueRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.2')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-end pb-20 md:pb-28 overflow-hidden"
    >
      {/* Fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/selva1.jpg"
          alt="Selva Bar"
          className="w-full h-full object-cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/40 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-br from-verde/15 via-transparent to-bg/60" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <p
            ref={eyebrowRef}
            className="font-body text-[10px] text-verde/70 tracking-[0.35em] uppercase mb-6"
          >
            Bar · Coctelería · Karaoke — San Isidro
          </p>

          {/* Título palabra por palabra */}
          <h1 className="font-heading font-black text-cream leading-[0.88] tracking-tight mb-8 overflow-hidden">
            <span className="flex flex-wrap gap-x-[0.25em]">
              {words.map((word, i) => (
                <span
                  key={i}
                  ref={(el) => { wordsRef.current[i] = el }}
                  className="inline-block text-[clamp(56px,10vw,112px)]"
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>

          {/* Bajada */}
          <p
            ref={subtitleRef}
            className="font-body text-base md:text-lg text-muted max-w-md leading-relaxed mb-10"
          >
            Coctelería artesanal, gastronomía de autor y noches de karaoke en un ambiente único e irrepetible.
          </p>

          {/* CTAs — rounded-full */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onReservar}
              className="font-body text-sm font-medium text-bg bg-cream rounded-full px-8 py-3.5 tracking-[0.1em] uppercase hover:bg-verde hover:text-cream transition-colors duration-300"
            >
              Reservar mesa
            </button>
            <a
              href="#carta"
              className="font-body text-sm font-medium text-cream border border-cream/25 rounded-full px-8 py-3.5 tracking-[0.1em] uppercase hover:border-verde/60 hover:text-verde transition-colors duration-300 text-center"
            >
              Ver carta
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-8 right-8 md:right-10 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[9px] text-muted/50 tracking-[0.25em] uppercase rotate-90 origin-center mb-3">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-verde/40 to-transparent" />
      </div>
    </section>
  )
}

export default Hero
