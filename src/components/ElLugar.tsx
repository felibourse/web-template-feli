import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const fotos = [
  { src: '/images/selva1.jfif', alt: 'Selva Bar — Interior' },
  { src: '/images/selva2.jpg',  alt: 'Selva Bar — Barra' },
  { src: '/images/selva3.jfif', alt: 'Selva Bar — Ambiente' },
  { src: '/images/selva4.jfif', alt: 'Selva Bar — Cócteles' },
  { src: '/images/selva5.jpg',  alt: 'Selva Bar — Exterior' },
  { src: '/images/selva6.avif', alt: 'Selva Bar — Karaoke' },
]

const ElLugar = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stripRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading: desde la DERECHA (firma distinta al resto)
      gsap.set('.lugar-heading', { opacity: 0, x: 60 })
      ScrollTrigger.create({
        trigger: '.lugar-heading',
        start: 'top 75%',
        once: true,
        onEnter: () =>
          gsap.to('.lugar-heading', { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' }),
      })

      // Scroll horizontal
      const strip   = stripRef.current
      const section = sectionRef.current
      if (!strip || !section) return

      const getMax = () => -(strip.scrollWidth - section.offsetWidth + 80)

      if (window.innerWidth >= 768) {
        gsap.set(strip, { x: () => getMax() })
        gsap.fromTo(
          strip,
          { x: () => getMax() },
          {
            x: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'bottom 20%',
              scrub: 1.8,
              invalidateOnRefresh: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="lugar" className="bg-surface py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading — alineado a la derecha para reforzar la dirección */}
        <div className="lugar-heading mb-14 text-right">
          <p className="font-body text-[10px] text-verde/70 tracking-[0.35em] uppercase mb-4">
            El lugar
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-black text-cream tracking-tight leading-tight">
            Entrá a la selva
          </h2>
        </div>
      </div>

      {/* Strip de fotos */}
      <div className="md:pl-[calc((100vw-80rem)/2+2.5rem)] pl-6">
        {/* Desktop: scroll horizontal con fotos rounded-3xl */}
        <div ref={stripRef} className="hidden md:flex gap-4 w-max">
          {fotos.map((foto, i) => (
            <div
              key={i}
              className="relative overflow-hidden flex-shrink-0 rounded-3xl"
              style={{ width: i === 0 ? '520px' : '320px', height: i === 0 ? '480px' : '230px' }}
            >
              <img
                src={foto.src}
                alt={foto.alt}
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 hover:scale-105 transition-all duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent && !parent.querySelector('.foto-placeholder')) {
                    const ph = document.createElement('div')
                    ph.className = 'foto-placeholder w-full h-full bg-surface-2 flex items-center justify-center'
                    ph.innerHTML = `<span style="color:rgba(74,158,63,0.4);font-size:12px;letter-spacing:0.2em;font-family:Inter,sans-serif;text-transform:uppercase">Foto ${i + 1}</span>`
                    parent.appendChild(ph)
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Mobile: grid 2 columnas con rounded-2xl */}
        <div className="md:hidden grid grid-cols-2 gap-3 pr-6">
          {fotos.slice(0, 6).map((foto, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2' : ''}`}
              style={{ height: i === 0 ? '240px' : '160px' }}
            >
              <img
                src={foto.src}
                alt={foto.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent && !parent.querySelector('.foto-placeholder')) {
                    const ph = document.createElement('div')
                    ph.className = 'foto-placeholder w-full h-full bg-surface-2 flex items-center justify-center'
                    ph.innerHTML = `<span style="color:rgba(74,158,63,0.4);font-size:11px;font-family:Inter,sans-serif">Foto ${i + 1}</span>`
                    parent.appendChild(ph)
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/30 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ElLugar
