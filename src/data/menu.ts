// Carta completa de Selva Bar
// vegetarian: true → mostrar ícono hoja verde

export interface MenuItem {
  name: string
  description?: string
  price: number
  vegetarian?: boolean
}

export interface MenuCategory {
  id: string
  label: string
  items: MenuItem[]
}

// ── COMIDA ─────────────────────────────────────────────────────────────────

export const foodMenu: MenuCategory[] = [
  {
    id: 'entradas',
    label: 'Entradas',
    items: [
      { name: 'Panera', description: 'Pan con manteca de hierbas.', price: 3500, vegetarian: true },
      { name: 'Empanada de Carne Cortada a Pulso', description: 'Fritas/Horno.', price: 4500 },
      { name: 'Repollo al Horno de Barro', description: 'Repollo marinado 12 hs, asado con manteca especiada, provolone, babaganoush, crocante de maní, oliva y crema de ají amarillo.', price: 12500, vegetarian: true },
      { name: 'Provoleta', description: 'Provoleta al horno con tomates asados, batatas fritas y aceite verde.', price: 15500, vegetarian: true },
      { name: 'Papas Fritas', description: 'Papas fritas con piel.', price: 8000, vegetarian: true },
      { name: 'Falafels y Pickles', description: 'Falafels, ali oli, babaganoush y pickles.', price: 10000, vegetarian: true },
      { name: 'Vegetales Asados', description: 'Vegetales asados al horno de leña y ali oli.', price: 11500, vegetarian: true },
      { name: 'Croquetas de Asado de Búfalo', description: 'Asado de búfalo braseado con puré de papas, crema de ají amarillo y cebollas pickleadas.', price: 14500 },
      { name: 'Papas Cargadas', description: 'Papas doble cocción, pollo, panceta crispy, blend de sales, lactonesa de ajos asados, salsa de ají amarillo y ajíes pickles.', price: 14500 },
      { name: 'Choclitos Biri', description: 'Choclitos asados con manteca cítrica, aceite verde y parmesano.', price: 8000, vegetarian: true },
    ],
  },
  {
    id: 'horno',
    label: 'Horno y Freidora',
    items: [
      { name: 'Pesca para Compartir', description: 'Pesca del día al horno de barro, oliva y manteca cítrica. Sale con 2 guarniciones a elección.', price: 56500 },
      { name: 'Milanesa de Suprema de Pollo', description: 'Milanesa napolitana de pollo, tomate, pesto de albahaca. Sale con papas fritas.', price: 19500 },
      { name: 'Pizza Individual Mozzarella y Tomates Asados', description: 'Con tomates asados y mozzarella al horno de barro.', price: 13000, vegetarian: true },
      { name: 'Arroz Negro, Calamar y Panceta', description: 'Arroz al horno con calamares y panceta, más alioli.', price: 23500 },
      { name: 'Milanesa de Bife de Chorizo', description: 'Milanesa napolitana de bife de chorizo, mozzarella, tomate y pesto de albahaca. Sale con papas fritas.', price: 30500 },
      { name: 'Arroz, Bife Angosto, Maíz', description: 'Arroz al horno, bife de chorizo, maíz y chimichurri.', price: 19500 },
      { name: 'Truchón del Sur', description: 'Truchón al horno de barro con vegetales asados.', price: 29500 },
    ],
  },
  {
    id: 'plancha',
    label: 'Plancha',
    items: [
      { name: 'Brisket a la Plancha', description: 'Tapa de asado ahumada con base de pan lactal, cebolla a la plancha, pickles y mostaza. Sale con papas fritas.', price: 19000 },
      { name: 'BDH Burger', description: 'Doble medallón de ternera, queso tybo, cebollas a la plancha, tomates pickleados, lechuga iceberg y mayo bacon. Sale con papas fritas.', price: 19000 },
      { name: 'Menú Kids', description: 'Medallón de carne 100g, queso tybo y pan.', price: 13500 },
      { name: 'Lomito Completo', description: 'Lomito de vaca a la plancha, queso tybo, huevo frito, lechuga y tomate en pan de campo.', price: 22500 },
      { name: 'Pampeano Cheese Steak', description: 'Sandwich de carne braseada, mozzarella, criollita peruana y alioli.', price: 18000 },
    ],
  },
  {
    id: 'parrilla',
    label: 'Parrilla',
    items: [
      { name: '½ Pollo Asado', description: 'Medio pollo deshuesado a la parrilla, marinado en salmuera 24 hs. Sale con fritas y ensalada.', price: 24500 },
      { name: 'EOE Salchicha con Puré', description: 'Embutido de la casa grillado con puré de papa más espinaca, arvejas y maíz asado.', price: 23500 },
      { name: 'Ojo de Bife', description: 'Ojo de bife y chimichurri.', price: 33500 },
      { name: 'Asado Bandera', description: 'Tira de asado del centro cortada fina.', price: 40000 },
      { name: 'Ribs de Ternera Ahumados', description: 'Ribs de novillo ahumadas, Jim Beam sauce.', price: 36000 },
      { name: 'Entraña', description: 'Entraña asada vuelta y vuelta a fuego fuerte.', price: 40000 },
      { name: 'Brisket', description: 'Tapa de asado ahumada y asada en horno de barro a leña.', price: 29500 },
    ],
  },
  {
    id: 'ensaladas',
    label: 'Ensaladas',
    items: [
      { name: 'Ensalada Caesar', description: 'Mix de verdes, queso parmesano, crouton, aderezo caesar y pollo asado.', price: 17000 },
      { name: 'Tomates de Estación', description: 'Ensalada fresca con tomates de estación, pangrattato, oliva, albahaca fresca, parmesano y sal marina.', price: 17000, vegetarian: true },
    ],
  },
  {
    id: 'postres',
    label: 'Postres',
    items: [
      { name: 'Flan de Dulce de Leche', description: 'Flan de dulce de leche y crema neutra más garrapiñada de nuez.', price: 6500 },
      { name: 'Queso y Dulce', description: 'Dulce casero, queso cuartirolo, crema de cacao amargo y frutos secos.', price: 6000, vegetarian: true },
      { name: 'Crumble de Manzanas', description: 'Manzanas asadas con canela, crumble más helado de crema.', price: 6000, vegetarian: true },
      { name: 'Panqueque con Dulce de Leche y Banana', description: 'Crepe con dulce de leche y banana al horno de barro más helado de crema.', price: 6000, vegetarian: true },
    ],
  },
]

// ── BEBIDAS ────────────────────────────────────────────────────────────────

export const drinksMenu: MenuCategory[] = [
  {
    id: 'clasicos-tropicales',
    label: 'Clásicos Tropicales',
    items: [
      { name: 'Mojito Tropical', description: 'De maracuyá o ananá. Ron Flor de Caña, jugo de limón, almíbar simple, menta y soda. Fresco y equilibrado.', price: 10500 },
      { name: 'Daiquiri Clásico', description: 'De coco, maracuyá o ananá. Flor de Caña extra seco, jugo de limón y almíbar simple. Caribeño, frutal y equilibrado.', price: 10500 },
      { name: 'Ron Fashioned de la Selva', description: 'Havana 7 años, azúcar, Bitter Gibson y Giffard Premium Liqueur Banane du Brésil. Intenso, agradable y especiado.', price: 13500 },
      { name: 'Mai-Tai', description: 'Flor de Caña, triple sec, amaretto, almíbar simple, jugo de lima, float de Havana 7. Fresco, intenso y exótico.', price: 12000 },
      { name: 'Not a Painkiller', description: 'Ron claro, ron oscuro, ron 7 años, leche de coco, almíbar simple, ananá y mandarina.', price: 10000 },
      { name: 'Queen\'s Park Swizzle', description: 'Ron Negrita y Flor de Caña 4, canela, mix de cítricos, Giffards crème de cacao, falernum, bitter chocolate. Intenso pero amable.', price: 14000 },
      { name: 'Gorilla Spritz', description: 'Ron Flor de Caña oro, Banana del Brasil, Aperol, Jugo de Limón, Almíbar y Espumante. Tropical, dulce y refrescante.', price: 12000 },
      { name: 'Jungle Bird', description: 'Flor de Caña 4 años, Campari, ananá, lima.', price: 11000 },
      { name: 'Zombie', description: 'Blend de rones, Don\'s mix, falernum, jugo de limón, licor de cassis, kummel y absenta. Especiado, tropical, poderoso.', price: 12000 },
      { name: 'Água de Coco', description: 'Blend de rones, Malibú, ananá, lima, orange curaçao, Angostura bitters.', price: 11500 },
    ],
  },
  {
    id: 'tiki-selva',
    label: 'Tiki Selva',
    items: [
      { name: 'Canto del Iberá', description: 'Heredero Gin, mix de jugos cítricos y miel de huacatay. Fresco, equilibrado y cítrico.', price: 9500 },
      { name: 'Krakatoa', description: 'Flor de Caña 7 años, lima, menta y Angostura Bitter\'s.', price: 12000 },
      { name: 'Heredero del Gauchito', description: 'Heredero Gin, miel de yerba mate y cedrón, jugo de lima y pomelo. Herbal, cítrico, fresco y equilibrado.', price: 9500 },
      { name: 'Polynesian Spell', description: 'Heredero Gin, Golden Age Orange Curaçao, Golden Age Apricot Brandy, jugo de limón, jugo de uva, almíbar simple. Frutal, amable, refrescante.', price: 9500 },
      { name: 'Alalakeiki', description: 'Sernova vodka de vainilla, ananá natural, allspice, crème de cassis, limón, pomelo. Ligero, dulce, amable, frutal.', price: 10500 },
      { name: 'Conselho', description: 'Cachaça, kiwi, acaí, lima y mucho hielo. Tropical y refrescante.', price: 9500 },
      { name: 'Mbareté Arapý', description: 'Heredero Gin de mandarina, ananá, jugo de naranja, miel de huacatay y limón.', price: 11000 },
    ],
  },
  {
    id: 'clasicos-con-redbull',
    label: 'Con Red Bull',
    items: [
      { name: 'Tropical Gin', description: 'Red Bull Tropical, Gin, Naranja.', price: 15000 },
      { name: 'Vodka Sandía', description: 'Red Bull Red, Sernova.', price: 17500 },
    ],
  },
  {
    id: 'mocktails',
    label: 'Sin Alcohol',
    items: [
      { name: 'Limonada Selvática (1lt)', description: 'Jugo de limón, almíbar, ananá natural y leche de coco.', price: 6500 },
      { name: 'Agua de Jamaica (1lt)', description: 'Flor de hibiscus, jugo de pomelo, jugo de limón y almíbar.', price: 6500 },
      { name: 'Tropicalísimo', description: 'Cocktail sin alcohol de acaí, pomelo, canela y ananá.', price: 6500 },
      { name: 'Mesopotámico', description: 'Cocktail sin alcohol de pomelo, miel de huacatay, mandarina, yerba mate y limón.', price: 6500 },
      { name: 'Agua con/sin gas', price: 3500 },
      { name: 'Red Bull Tropical Edition', price: 6000 },
      { name: 'Red Bull Red Edition', price: 6000 },
    ],
  },
  {
    id: 'cervezas',
    label: 'Cervezas',
    items: [
      { name: 'Porrón Miller 330ml', price: 4000 },
      { name: 'Media Pinta Imperial IPA', price: 4000 },
      { name: 'Pinta Imperial IPA', price: 5500 },
      { name: 'Media Pinta Imperial APA', price: 4000 },
      { name: 'Pinta Imperial APA', price: 5500 },
      { name: 'Pinta Grolsch', price: 7000 },
      { name: 'Media Pinta Amstel', price: 4000 },
      { name: 'Pinta Amstel', price: 7000 },
    ],
  },
  {
    id: 'vinos',
    label: 'Vinos',
    items: [
      { name: 'El Salvaje Orgánico', description: 'Skin contact 2021. 80% Torrontés, 10% Chardonnay, 10% Sauvignon Blanc. IG Los Chacayes. Tunuyán, Valle de Uco, Mendoza 1280mts.', price: 39000 },
      { name: 'Cabernet Franc', description: 'Orgánico 2022. IG Los Chacayes. Valle de Uco, Mendoza, Argentina.', price: 39000 },
    ],
  },
]
