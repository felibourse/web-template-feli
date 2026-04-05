import { useEffect, useRef, useState } from 'react'
import { Leaf } from '@phosphor-icons/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { foodMenu, drinksMenu, type MenuCategory } from '../data/menu'

gsap.registerPlugin(ScrollTrigger)

const formatPrice = (price: number) => `$${price.toLocaleString('es-AR')}`

// Tabs pill estilo gallereee.com — rounded-full con scroll horizontal
const TabBar = ({
  tabs,
  active,
  onSelect,
}: {
  tabs: MenuCategory[]
  active: string
  onSelect: (id: string) => void
}) => (
  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
    {tabs.map((cat) => (
      <button
        key={cat.id}
        onClick={() => onSelect(cat.id)}
        className={`font-body text-[11px] tracking-[0.12em] uppercase whitespace-nowrap px-5 py-2 rounded-full transition-all duration-200 flex-shrink-0 ${
          active === cat.id
            ? 'text-bg bg-verde font-medium'
            : 'text-muted hover:text-cream border border-verde/25 hover:border-verde/60'
        }`}
      >
        {cat.label}
      </button>
    ))}
  </div>
)

const MenuGrid = ({ category }: { category: MenuCategory }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
    {category.items.map((item) => (
      <div
        key={item.name}
        className="bg-surface rounded-xl px-6 py-5 flex gap-4 group hover:bg-surface-2 transition-colors duration-200 border border-border"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-heading text-lg font-bold text-cream leading-snug">
              {item.name}
            </span>
            {item.vegetarian && (
              <Leaf size={13} weight="fill" className="text-verde flex-shrink-0" title="Apto vegetariano" />
            )}
          </div>
          {item.description && (
            <p className="font-body text-xs text-muted leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
        <span className="font-body text-sm font-medium text-verde flex-shrink-0 pt-0.5">
          {formatPrice(item.price)}
        </span>
      </div>
    ))}
  </div>
)

// Fotos del ambiente del menú — no mezclar con selva1-6 del resto de la página
const menuPhotos = [
  '/images/selvamenu1.jpg',
  '/images/selvamenu2.jpeg',
  '/images/selvamenu3.jpeg',
  '/images/selvamenu4.jpeg',
  '/images/selvamenu5.jpeg',
  '/images/selvamenu6.jpeg',
]

const Carta = () => {
  const [seccion, setSeccion]           = useState<'comida' | 'bebidas'>('comida')
  const [activeFood, setActiveFood]     = useState(foodMenu[0].id)
  const [activeDrinks, setActiveDrinks] = useState(drinksMenu[0].id)
  const sectionRef    = useRef<HTMLDivElement>(null)
  const photoWrapRef  = useRef<HTMLDivElement>(null)
  const photoStripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading: scale desde pequeño + fade
      gsap.set('.carta-heading', { opacity: 0, scale: 0.94, y: 20 })
      ScrollTrigger.create({
        trigger: '.carta-heading',
        start: 'top 75%',
        once: true,
        onEnter: () =>
          gsap.to('.carta-heading', { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'power3.out' }),
      })

      // Tira de fotos: slide horizontal scrub al scrollear
      const wrap  = photoWrapRef.current
      const strip = photoStripRef.current
      if (wrap && strip) {
        const getMaxX = () => -(strip.scrollWidth - wrap.offsetWidth)
        gsap.fromTo(strip,
          { x: 0 },
          {
            x: () => getMaxX(),
            ease: 'none',
            scrollTrigger: {
              trigger: wrap,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.8,
              invalidateOnRefresh: true,
            },
          }
        )
      }

      // Strip de tabs: sube desde abajo
      gsap.set('.carta-tabs', { opacity: 0, y: 30 })
      ScrollTrigger.create({
        trigger: '.carta-tabs',
        start: 'top 75%',
        once: true,
        onEnter: () =>
          gsap.to('.carta-tabs', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }),
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const activeCategory =
    seccion === 'comida'
      ? foodMenu.find((c) => c.id === activeFood)!
      : drinksMenu.find((c) => c.id === activeDrinks)!

  return (
    <section ref={sectionRef} id="carta" className="bg-bg py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="carta-heading mb-14">
          <p className="font-body text-[10px] text-verde/70 tracking-[0.35em] uppercase mb-4">
            Nuestra carta
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-black text-cream tracking-tight leading-tight">
            Comida & Bebidas
          </h2>
        </div>

        {/* Tira de fotos con slide horizontal scrubbeado al scroll */}
        <div ref={photoWrapRef} className="overflow-hidden mb-14 -mx-6 lg:-mx-10">
          <div ref={photoStripRef} className="flex gap-3 w-max px-6 lg:px-10">
            {menuPhotos.map((src, i) => (
              <div key={i} className="w-64 h-44 md:w-80 md:h-56 flex-shrink-0 rounded-2xl overflow-hidden">
                <img src={src} alt={`Selva Bar ambiente ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Toggle Comida / Bebidas — pill */}
        <div className="carta-tabs flex gap-3 mb-8">
          {(['comida', 'bebidas'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSeccion(s)}
              className={`font-heading text-xl md:text-2xl font-bold capitalize rounded-full px-7 py-2.5 transition-all duration-300 ${
                seccion === s
                  ? 'text-bg bg-cream'
                  : 'text-muted hover:text-cream border border-border hover:border-cream/30'
              }`}
            >
              {s === 'comida' ? 'Para Comer' : 'Para Beber'}
            </button>
          ))}
        </div>

        {/* Tab bar de categorías — pills */}
        {seccion === 'comida' ? (
          <>
            <TabBar tabs={foodMenu} active={activeFood} onSelect={setActiveFood} />
            <MenuGrid category={activeCategory} />
          </>
        ) : (
          <>
            <TabBar tabs={drinksMenu} active={activeDrinks} onSelect={setActiveDrinks} />
            <MenuGrid category={activeCategory} />
          </>
        )}

        {/* Leyenda vegetariano */}
        <div className="flex items-center gap-2 mt-6">
          <Leaf size={13} weight="fill" className="text-verde" />
          <span className="font-body text-xs text-muted">Apto vegetariano</span>
        </div>
      </div>
    </section>
  )
}

export default Carta
