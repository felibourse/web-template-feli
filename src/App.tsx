import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'

import Navbar           from './components/Navbar'
import Hero             from './components/Hero'
import LaExperiencia    from './components/LaExperiencia'
import ElLugar          from './components/ElLugar'
import Carta            from './components/Carta'
import Shows            from './components/Shows'
import Resenias         from './components/Resenias'
import Reservas         from './components/Reservas'
import Footer           from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import ReservationModal from './components/ReservationModal'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef   = useRef<Lenis | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const lenis = new Lenis()
    lenisRef.current = lenis

    // Integración Lenis + ScrollTrigger — orden obligatorio
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => { lenis.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)

    setTimeout(() => ScrollTrigger.refresh(), 300)

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
      <Navbar onReservar={() => setModalOpen(true)} />

      <main>
        <Hero       onReservar={() => setModalOpen(true)} />
        <LaExperiencia />
        <ElLugar />
        <Carta />
        <Shows />
        <Resenias />
        <Reservas   onReservar={() => setModalOpen(true)} />
      </main>

      <Footer />
      <FloatingWhatsApp />
      <ReservationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

export default App
