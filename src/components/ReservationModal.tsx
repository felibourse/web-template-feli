import { useEffect, useRef, useState } from 'react'
import { X } from '@phosphor-icons/react'
import gsap from 'gsap'
import { negocio } from '../data/info'

interface Props {
  open: boolean
  onClose: () => void
}

const generarHoras = () => {
  const horas: string[] = []
  for (let h = 18; h <= 25; h++) {
    const hora = h % 24
    horas.push(`${String(hora).padStart(2, '0')}:00`)
    if (h < 25) horas.push(`${String(hora).padStart(2, '0')}:30`)
  }
  return horas
}
const HORAS = generarHoras()

const ReservationModal = ({ open, onClose }: Props) => {
  const backdropRef = useRef<HTMLDivElement>(null)
  const modalRef    = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({
    nombre:   '',
    fecha:    '',
    hora:     '20:00',
    personas: '2',
    nota:     '',
  })

  useEffect(() => {
    const backdrop = backdropRef.current
    const modal    = modalRef.current
    if (!backdrop || !modal) return

    if (open) {
      document.body.style.overflow = 'hidden'
      gsap.set(backdrop, { display: 'flex' })
      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.fromTo(modal,
        { opacity: 0, y: 32, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => gsap.set(backdrop, { display: 'none' }),
      })
    }
  }, [open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre || !form.fecha) return
    window.open(negocio.instagramDM, '_blank')
    onClose()
  }

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[200] bg-bg/80 backdrop-blur-md items-end sm:items-center justify-center p-4 sm:p-6"
      style={{ display: 'none' }}
      onClick={(e) => { if (e.target === backdropRef.current) onClose() }}
    >
      <div
        ref={modalRef}
        className="bg-surface w-full max-w-lg border border-border rounded-3xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-border">
          <h3 className="font-heading text-2xl font-bold text-cream">Reservar mesa</h3>
          <button
            onClick={onClose}
            className="text-muted hover:text-cream transition-colors p-1"
            aria-label="Cerrar"
          >
            <X size={22} weight="light" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[10px] text-muted/60 tracking-[0.2em] uppercase">
              Nombre *
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
              className="bg-bg border border-border rounded-xl text-cream font-body text-sm px-4 py-3 placeholder:text-muted/30 focus:outline-none focus:border-verde/50 transition-colors [color-scheme:dark]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-[10px] text-muted/60 tracking-[0.2em] uppercase">
                Fecha *
              </label>
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="bg-bg border border-border rounded-xl text-cream font-body text-sm px-4 py-3 focus:outline-none focus:border-verde/50 transition-colors [color-scheme:dark]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-[10px] text-muted/60 tracking-[0.2em] uppercase">
                Hora
              </label>
              <select
                name="hora"
                value={form.hora}
                onChange={handleChange}
                className="bg-bg border border-border rounded-xl text-cream font-body text-sm px-4 py-3 focus:outline-none focus:border-verde/50 transition-colors [color-scheme:dark]"
              >
                {HORAS.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[10px] text-muted/60 tracking-[0.2em] uppercase">
              Personas
            </label>
            <select
              name="personas"
              value={form.personas}
              onChange={handleChange}
              className="bg-bg border border-border rounded-xl text-cream font-body text-sm px-4 py-3 focus:outline-none focus:border-verde/50 transition-colors [color-scheme:dark]"
            >
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'].map((n) => (
                <option key={n} value={n}>{n} {n === '1' ? 'persona' : 'personas'}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[10px] text-muted/60 tracking-[0.2em] uppercase">
              Aclaración (opcional)
            </label>
            <textarea
              name="nota"
              value={form.nota}
              onChange={handleChange}
              placeholder="Cumpleaños, zona preferida, etc."
              rows={2}
              className="bg-bg border border-border rounded-xl text-cream font-body text-sm px-4 py-3 placeholder:text-muted/30 focus:outline-none focus:border-verde/50 transition-colors resize-none [color-scheme:dark]"
            />
          </div>

          <button
            type="submit"
            className="font-body text-sm font-medium text-bg bg-cream rounded-full px-6 py-3.5 tracking-[0.1em] uppercase hover:bg-verde hover:text-cream transition-colors duration-300 mt-1"
          >
            Reservar por Instagram
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReservationModal
