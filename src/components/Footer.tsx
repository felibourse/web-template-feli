import { InstagramLogo } from '@phosphor-icons/react'
import { negocio } from '../data/info'

const Footer = () => (
  <footer className="bg-bg border-t border-border">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Logo + tagline */}
        <div>
          <img src="/images/selvalogo.png" alt="Selva Bar" className="h-10 w-auto object-contain mb-2" />
          <p className="font-body text-xs text-muted tracking-wide">
            Bar · Coctelería · Karaoke — {negocio.direccion}
          </p>
        </div>

        {/* Redes */}
        <div className="flex items-center gap-5">
          <a
            href={negocio.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-muted hover:text-verde transition-colors duration-200"
          >
            <InstagramLogo size={20} weight="light" />
          </a>
          <a
            href={negocio.instagramDM}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mensaje directo Instagram"
            className="text-muted hover:text-verde transition-colors duration-200"
          >
            <InstagramLogo size={20} weight="light" />
          </a>
        </div>
      </div>

      <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="font-body text-[11px] text-muted/40 tracking-wide">
          © {new Date().getFullYear()} Selva Bar. Todos los derechos reservados.
        </p>
        <p className="font-body text-[11px] text-muted/30 tracking-wide">
          Hecho con cariño en Buenos Aires 🌿
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
