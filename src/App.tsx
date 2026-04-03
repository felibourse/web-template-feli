import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // ── Inicializar Lenis (smooth scroll) ──────────────────────────
    const lenis = new Lenis()
    lenisRef.current = lenis

    // Conectar Lenis con ScrollTrigger — orden obligatorio
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => { lenis.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)

    // Refresh después de que Lenis inicialice
    setTimeout(() => ScrollTrigger.refresh(), 300)

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <main>
      {/* ── Secciones del proyecto van acá ── */}
      <section className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">
          Template listo ✓
        </h1>
      </section>
    </main>
  )
}

export default App
