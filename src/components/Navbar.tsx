import { useEffect, useRef, useState } from 'react'
import { List, X } from '@phosphor-icons/react'
import gsap from 'gsap'

const navLinks = [
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'El Lugar',    href: '#lugar' },
  { label: 'Carta',       href: '#carta' },
  { label: 'Shows',       href: '#shows' },
  { label: 'Reservas',    href: '#reservas' },
]

const Navbar = ({ onReservar }: { onReservar: () => void }) => {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      gsap.set(overlay, { display: 'flex' })
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.fromTo(
        overlay.querySelectorAll('.mobile-link'),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power3.out', delay: 0.1 }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => gsap.set(overlay, { display: 'none' }),
      })
    }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-bg/90 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 md:h-20">
          <a href="#">
            <img
              src="/images/selvalogo.png"
              alt="Selva Bar"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </a>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-[11px] font-medium text-muted tracking-[0.14em] uppercase hover:text-cream transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA desktop — rounded-full + verde */}
          <button
            onClick={onReservar}
            className="hidden md:block font-body text-[11px] font-medium text-cream border border-verde/50 rounded-full px-5 py-2 tracking-[0.12em] uppercase hover:bg-verde/15 hover:border-verde transition-colors duration-200"
          >
            Reservar
          </button>

          {/* Hamburguesa mobile */}
          <button
            className="md:hidden text-cream p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <List size={24} weight="light" />
          </button>
        </div>
      </nav>

      {/* Overlay mobile */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-bg/98 backdrop-blur-xl flex-col items-center justify-center gap-8"
        style={{ display: 'none' }}
      >
        <button
          className="absolute top-5 right-6 text-muted hover:text-cream transition-colors p-2"
          onClick={() => setMobileOpen(false)}
          aria-label="Cerrar menú"
        >
          <X size={28} weight="light" />
        </button>

        <img src="/images/selvalogo.png" alt="Selva Bar" className="mobile-link h-16 w-auto object-contain" />

        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-link font-heading text-3xl font-bold text-muted hover:text-cream transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </a>
        ))}

        <button
          className="mobile-link font-body text-sm font-medium text-cream border border-verde/50 rounded-full px-8 py-3 tracking-widest uppercase mt-2 hover:bg-verde/15 transition-colors duration-200"
          onClick={() => { setMobileOpen(false); onReservar() }}
        >
          Reservar
        </button>
      </div>
    </>
  )
}

export default Navbar
