import { InstagramLogo } from '@phosphor-icons/react'
import { negocio } from '../data/info'

const FloatingInstagram = () => (
  <a
    href={negocio.instagramDM}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contactar por Instagram"
    className="fixed bottom-6 right-6 z-[150] bg-verde rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:bg-verde-light active:scale-95 transition-all duration-200"
    style={{ width: 52, height: 52 }}
  >
    <InstagramLogo size={24} weight="fill" className="text-bg" />
  </a>
)

export default FloatingInstagram
