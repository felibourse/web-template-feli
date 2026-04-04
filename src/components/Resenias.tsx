import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { negocio, reviews } from '../data/info'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: parseFloat(negocio.rating), suffix: '/5', label: 'Calificación Google', decimals: 1 },
  { value: parseInt(negocio.totalReviews), suffix: '+', label: 'Reseñas', decimals: 0 },
  { value: 3, suffix: '', label: 'Años en San Isidro', decimals: 0 },
]

const Resenias = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading: desde la izquierda + escala
      gsap.set('.res-heading', { opacity: 0, x: -40, scale: 0.97 })
      ScrollTrigger.create({
        trigger: '.res-heading',
        start: 'top 75%',
        once: true,
        onEnter: () =>
          gsap.to('.res-heading', { opacity: 1, x: 0, scale: 1, duration: 1.0, ease: 'power3.out' }),
      })

      // Stats: scale dramático desde 0.6 + bounce sutil
      const statBlocks = gsap.utils.toArray<HTMLElement>('.stat-block')
      statBlocks.forEach((el) => {
        gsap.set(el, { opacity: 0, scale: 0.6, y: 30 })
      })
      ScrollTrigger.create({
        trigger: '.stats-grid',
        start: 'top 75%',
        once: true,
        onEnter: () => {
          statBlocks.forEach((el, i) => {
            gsap.to(el, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.9,
              delay: i * 0.15,
              ease: 'back.out(1.4)',
            })
          })

          // Contadores animados
          const counters = gsap.utils.toArray<HTMLElement>('.stat-number')
          counters.forEach((el, i) => {
            const s = stats[i]
            const obj = { val: 0 }
            gsap.to(obj, {
              val: s.value,
              duration: 2.5,
              ease: 'power2.out',
              delay: i * 0.15 + 0.2,
              onUpdate: () => {
                el.textContent = s.decimals
                  ? obj.val.toFixed(s.decimals) + s.suffix
                  : Math.floor(obj.val).toLocaleString('es-AR') + s.suffix
              },
            })
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-bg py-24 md:py-32">
      {/* Heading */}
      <div className="res-heading px-6 lg:px-10 max-w-7xl mx-auto mb-16">
        <p className="font-body text-[10px] text-verde/70 tracking-[0.35em] uppercase mb-4">
          Lo que dicen
        </p>
        <h2 className="font-heading text-5xl md:text-6xl font-black text-cream tracking-tight">
          Reseñas
        </h2>
      </div>

      {/* Stats — rounded-2xl */}
      <div className="stats-grid max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-3 gap-4 mb-16">
        {stats.map((s, i) => (
          <div
            key={i}
            className="stat-block bg-surface rounded-2xl px-3 py-8 md:px-6 md:py-12 text-center border border-border"
          >
            <span className="stat-number font-heading text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black text-verde block leading-none">
              0
            </span>
            <p className="font-body text-[9px] sm:text-xs text-muted mt-3 md:mt-4 tracking-[0.1em] md:tracking-[0.2em] uppercase leading-tight">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-border py-5">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...reviews, ...reviews].map((r, i) => (
            <span key={i} className="font-body text-sm text-muted inline-flex items-center gap-10 mx-8">
              <span className="text-verde/40 text-base">—</span>
              <span>{r}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Resenias
