import { Article, RawMaterialProfile, DistillationStep, HistoryMilestone, PresentationSlide, QuizQuestion } from '../types';

export const RAW_MATERIALS: RawMaterialProfile[] = [
  {
    id: 'wheat',
    name: 'Winter Wheat',
    nameEs: 'Trigo de Invierno',
    iconName: 'Wheat',
    texture: 'Sedosa, aterciopelada y ligera',
    flavorProfile: 'Toques sutiles de pan fresco, anís suave, cítricos y final dulce limpio',
    sweetnessLevel: 3,
    bodyWeight: 'Pleno y Sedoso',
    aromaNotes: ['Pan brioche', 'Anís estrellado', 'Piel de limón', 'Miel suave'],
    keyBrands: ['Absolut (Suecia)', 'Grey Goose (Francia)', 'Ketel One (Países Bajos)', 'Russian Standard (Rusia)'],
    originRegion: 'Rusia, Suecia, Francia, Países Bajos',
    chemistryNotes: 'El alto contenido de almidón limpio produce un destilado con bajo contenido de congéneres pesados, dando una sensación en boca sumamente suave y neutra.'
  },
  {
    id: 'rye',
    name: 'Rye',
    nameEs: 'Centeno',
    iconName: 'Sparkles',
    texture: 'Firme, estructurada, picante y vigorosa',
    flavorProfile: 'Pimienta blanca, pan de centeno tostado, almendra y un retrogusto especiado cálido',
    sweetnessLevel: 2,
    bodyWeight: 'Medio',
    aromaNotes: ['Pimienta negra', 'Pan de centeno (pumpernickel)', 'Nuez moscada', 'Hierbas secas'],
    keyBrands: ['Belvedere (Polonia)', 'Sobieski (Polonia)', 'Wyborowa (Polonia)', 'Potocki (Polonia)'],
    originRegion: 'Polonia, Países Bálticos, Rusia occidental',
    chemistryNotes: 'El centeno aporta compuestos fenólicos y ésteres especiados que sobreviven a la rectificación, otorgando el perfil más robusto e histórico del vodka eslavo.'
  },
  {
    id: 'potato',
    name: 'Potato',
    nameEs: 'Patata / Papa',
    iconName: 'Boxes',
    texture: 'Sumamente cremosa, densa, untuosa y pesada en lengua',
    flavorProfile: 'Mantequilla fresca, tierra húmeda suave, vainilla terrosa y un final redondo y dulce',
    sweetnessLevel: 4,
    bodyWeight: 'Cremoso / Untuoso',
    aromaNotes: ['Mantequilla', 'Tierra fresca', 'Puré de manzana', 'Castaña asada'],
    keyBrands: ['Chopin Potato (Polonia)', 'Luksusowa (Polonia)', 'Monopolowa (Austria)', 'Karlsson\'s Gold (Suecia)'],
    originRegion: 'Polonia, Austria, Escandinavia',
    chemistryNotes: 'La patata requiere enzimas adicionales para sacarificar sus almidones. Genera cadenas moleculares y lípidos que otorgan una viscosidad excepcional al líquido.'
  },
  {
    id: 'corn',
    name: 'Corn / Maize',
    nameEs: 'Maíz',
    iconName: 'Sun',
    texture: 'Suave, ligeramente oleosa y con marcada dulzura inicial',
    flavorProfile: 'Dulzura de maíz dulce, palomitas de maíz mantecosas y final muy limpio y dócil',
    sweetnessLevel: 5,
    bodyWeight: 'Medio',
    aromaNotes: ['Maíz tostado', 'Azúcar moreno', 'Vainilla suave', 'Cereal dulce'],
    keyBrands: ['Tito\'s Handmade Vodka (EE.UU.)', 'Crystal Head (Canadá)', 'Smirnoff (bases de maíz en EE.UU.)'],
    originRegion: 'Norteamérica',
    chemistryNotes: 'Gluten-free por naturaleza. Su alto rendimiento de azúcares fermentables aporta un perfil dulce natural sin necesidad de aromatizantes añadidos.'
  },
  {
    id: 'grape',
    name: 'Grapes',
    nameEs: 'Uvas Francesas',
    iconName: 'Grape',
    texture: 'Brillante, vivaz, casi cítrica y floral en boca',
    flavorProfile: 'Frescura frutal, manzana verde, flores blancas y un toque crujiente muy aromático',
    sweetnessLevel: 4,
    bodyWeight: 'Ligero',
    aromaNotes: ['Flor de saúco', 'Pera blanca', 'Cáscara de lima', 'Uva blanca'],
    keyBrands: ['Cîroc (Francia)', 'Guild (Francia)'],
    originRegion: 'Gaillac y Cognac, Francia',
    chemistryNotes: 'Destilado a partir de vino mediante maceración y destilación en frío, reteniendo terpenos y aromas florales imposibles de obtener a partir de granos.'
  }
];

export const DISTILLATION_STEPS: DistillationStep[] = [
  {
    step: 1,
    title: 'Selección y Maceración (Mashing)',
    duration: '2 - 4 horas',
    temp: '65°C - 75°C',
    abvOutput: '0% ABV (Mosto dulce)',
    description: 'Los granos (trigo, centeno) o patatas se muelen finamente y se mezclan con agua caliente desmineralizada para activar las enzimas (alfa y beta amilasas) que transforman el almidón complejo en azúcares fermentables (maltosa y glucosa).',
    chemicalReaction: 'Almidón + H₂O —(Amilasa 65°C)→ Maltosa + Dextrinas',
    icon: 'Flame',
    details: [
      'Control riguroso de pH (5.2 - 5.5) para maximizar la actividad enzimática.',
      'En el caso de patatas, se requiere cocción a presión para gelatinizar el almidón.',
      'El mosto resultante se filtra para retirar los bagazos sólidos antes de la fermentación.'
    ]
  },
  {
    step: 2,
    title: 'Fermentación Biológica',
    duration: '48 - 72 horas',
    temp: '22°C - 28°C',
    abvOutput: '8% - 12% ABV (Vino de malta)',
    description: 'Se inoculan cepas de levadura especialmente seleccionadas (Saccharomyces cerevisiae) en tanques de acero inoxidable. Las levaduras consumen los azúcares y producen etanol, dióxido de carbono y congéneres aromáticos secundarios.',
    chemicalReaction: 'C₆H₁₂O₆ (Glucosa) —(Levadura)→ 2 C₂H₅OH (Etanol) + 2 CO₂ + Calor',
    icon: 'Beaker',
    details: [
      'Monitoreo térmico constante para evitar que la levadura sufra estrés por temperatura.',
      'El resultado es un líquido turbio llamado "beer wash" o caldo de fermentación.',
      'Se generan ésteres finos que determinarán las notas primarias del vodka.'
    ]
  },
  {
    step: 3,
    title: 'Destilación Continua en Multi-Columnas de Rectificación',
    duration: 'Continuo',
    temp: '78.3°C (Punto de ebullición del etanol)',
    abvOutput: '96.0% - 96.5% ABV (Alcohol Neutro de Grado Rectificado)',
    description: 'El caldo pasa por un tren de columnas de fraccionamiento continuo (Columna de Agotamiento / Stripper, Columna Rectificadora y Columna Purificadora / Hidroselección). El alcohol se vaporiza y condensa cientos de veces hasta separar completamente cabezas (metanol, acetato) y colas (aceites de fusel).',
    chemicalReaction: 'Fraccionamiento termodinámico continuo según puntos de ebullición',
    icon: 'Layers',
    details: [
      'Alcanza el límite azeotrópico del etanol-agua (96.4% ABV).',
      'Las columnas industriales modernas superan los 30 a 50 metros de altura con más de 60 platos de destilación.',
      'Se eliminan más del 99.9% de impurezas tóxicas y congéneres agresivos.'
    ]
  },
  {
    step: 4,
    title: 'Filtración Extrema y Purificación Molecular',
    duration: '12 - 24 horas de flujo lento',
    temp: '10°C - 15°C',
    abvOutput: '96% ABV (Purificado)',
    description: 'El alcohol rectificado pasa a través de lechos densos de carbón activo de abedul siberiano, plata coloidal, arena de cuarzo o cristales. El carbón adsorbe compuestos aromáticos residuales de azufre y ácidos grasos por atracción electrostática.',
    chemicalReaction: 'Adsorción física en micro-poros de carbón activo (superficie de 1000 m²/g)',
    icon: 'Filter',
    details: [
      'El carbón de abedul plateado neutraliza asperezas y genera un brillo cristalino inimitable.',
      'Algunas marcas ultra-premium usan filtración a través de polvo de diamante o capas de celulosa.',
      'La filtración en frío (Chill Filtration a -5°C) precipita ácidos grasos para evitar turbidez al congelar.'
    ]
  },
  {
    step: 5,
    title: 'Hidratación con Agua Pura y Matrimonio (Blending)',
    duration: '2 - 7 días de reposo',
    temp: '18°C',
    abvOutput: '37.5% - 40.0% ABV (Estándar internacional)',
    description: 'El alcohol al 96% se diluye meticulosamente con agua desmineralizada de glaciar, manantial artesiano o filtrada por ósmosis inversa. El vodka descansa para que las moléculas de agua y etanol creen puentes de hidrógeno estables.',
    chemicalReaction: 'Formación de clústeres moleculares de hidratación [Etanol · (H₂O)ₙ]',
    icon: 'Droplets',
    details: [
      'El agua representa el 60% del volumen del vodka embotellado: su perfil mineral es el verdadero secreto.',
      'El reposo (resting period) suaviza la pungencia alcohólica en boca.',
      'Ajuste final del grado alcohólico a exactamente 40% (o 37.5% según la norma de la UE).'
    ]
  },
  {
    step: 6,
    title: 'Microfiltración Final y Embotellado Aséptico',
    duration: 'Inmediato',
    temp: 'Ambiente',
    abvOutput: '40.0% ABV',
    description: 'Paso por membranas de microfiltración de 0.2 micras para garantizar una transparencia óptica del 100%. Se embotella en recipientes de vidrio soplado esterilizados y se sella herméticamente.',
    chemicalReaction: 'Control de limpidez óptica y ausencia de partículas coloidales',
    icon: 'ShieldCheck',
    details: [
      'Inspección visual láser para comprobar ausencia de micropartículas.',
      'Sellado con corcho natural o tapón de seguridad antifalsificación.',
      'Listo para distribución global y degustación profesional.'
    ]
  }
];

export const HISTORY_MILESTONES: HistoryMilestone[] = [
  {
    era: 'Siglos VIII - XIV',
    year: 'c. 1405',
    region: 'Polonia y Rusia Antigua',
    title: 'El Nacimiento del "Voda" (Agüita de Vida)',
    description: 'La palabra "vodka" es el diminutivo eslavo de "voda" (agua), significando literalmente "agüita". Los primeros registros escritos datan de 1405 en los tribunales de Sandomierz en Polonia. Originalmente se destilaba en alambiques simples de cobre (alembics) como medicina y elixir desinfectante.',
    historicalFact: 'Se le conocía como "Gorzałka" en polaco (del verbo arder) o "vino de pan" (Polugar) en el principado de Moscú.',
    culturalImpact: 'La destilación fue introducida por médicos árabes e italianos y adoptada por monjes de claustros en Cracovia y Moscú.',
    icon: 'Scroll'
  },
  {
    era: 'Siglo XVI',
    year: '1533 - 1584',
    region: 'Rusia Zarista',
    title: 'El Monopolio Imperial de Iván el Terrible',
    description: 'El Zar Iván IV "el Terrible" prohibió la destilación privada e inauguró la primera "Kabak" (taberna del estado zarista) en Moscú. El vodka se convirtió en la principal fuente de ingresos tributarios para la corona rusa, financiando campañas militares imperiales.',
    historicalFact: 'En el siglo XVIII, Catalina la Grande otorgó el privilegio exclusivo de destilar vodka únicamente a los aristócratas boyardos rusos.',
    culturalImpact: 'Nace la tradición del brindis imperial y las primeras recetas aromatizadas con hierbas, bayas y especias para disimular impurezas.',
    icon: 'Crown'
  },
  {
    era: 'Siglo XIX (1869-1894)',
    year: '1894',
    region: 'San Petersburgo, Rusia',
    title: 'La Ciencia del Vodka y el Mito de Mendeleev',
    description: 'En 1894 el gobierno zarista estableció el estándar imperial ruso de 40% ABV. Aunque la cultura popular atribuye falsamente a Dmitry Mendeleev (creador de la tabla periódica) haber inventado el 40%, su tesis doctoral estudió las combinaciones de alcohol y agua a nivel molecular. La cifra de 40% fue adoptada principalmente por razones fiscales y termodinámicas.',
    historicalFact: 'Piotr Smirnov introdujo la filtración con carbón de abedul, convirtiendo su marca en Proveedor Oficial de la Corte de los Zares.',
    culturalImpact: 'El vodka ruso pasa de ser una bebida rústica a un estándar científico de pureza química.',
    icon: 'Atom'
  },
  {
    era: 'Siglo XX (1917-1950)',
    year: '1917 - 1941',
    region: 'Rusia → París → Hollywood (EE.UU.)',
    title: 'El Exilio de Smirnoff y la Revolución del Cóctel',
    description: 'Tras la Revolución Rusa de 1917, Vladimir Smirnov huyó a París y vendió los derechos a Rudolph Kunett en EE.UU. Aunque al inicio los estadounidenses lo rechazaban llamándolo "whisky blanco sin sabor", la invención del Moscow Mule en 1941 (vodka + ginger beer + lima servido en jarra de cobre) detonó el mayor auge de coctelería de la historia.',
    historicalFact: 'El eslogan de Smirnoff en EE.UU. fue legendario: "Smirnoff te deja sin aliento; no huele, no delata".',
    culturalImpact: 'Nacieron el Vodka Martini (popularizado por James Bond), el Bloody Mary, el Cosmopolitan y el Black Russian.',
    icon: 'GlassWater'
  },
  {
    era: 'Siglo XXI',
    year: '1990 - Presente',
    region: 'Global',
    title: 'La Era del Vodka Ultra-Premium y Artesanal (Craft)',
    description: 'El lanzamiento de marcas de lujo como Belvedere (1993), Grey Goose (1997) y Chopin revolucionó la percepción del vodka, demostrando que el terroir, el tipo de cereal, el agua de glaciar y la microdestilación otorgan notas de cata complejas y diferenciadas.',
    historicalFact: 'La Unión Europea decretó en 2007 que el vodka puede elaborarse de cualquier materia prima agrícola siempre que se especifique en la etiqueta si no es grano o patata.',
    culturalImpact: 'El vodka es hoy el destilado más vendido del planeta por volumen y la base indiscutible de la mixología contemporánea.',
    icon: 'Award'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'historia-completa-vodka',
    title: 'De Elixir Medieval a Ícono Global: La Verdadera Historia del Vodka',
    subtitle: 'Un recorrido apasionante por las tabernas de Cracovia, los monopolios zaristas y el mito de Mendeleev para tu presentación de clase.',
    category: 'Historia',
    readTime: '7 min de lectura',
    author: 'Prof. Sommelier C. Vane',
    date: '31 de Agosto, 2026',
    tags: ['Historia', 'Polonia', 'Rusia', 'Mendeleev', 'Zares', 'Smirnoff'],
    excerpt: '¿Sabías que el vodka no nació con 40 grados ni fue inventado por Dmitry Mendeleev? Descubre los orígenes disputados entre Polonia y Rusia y su fascinante salto a Hollywood.',
    keyTakeaways: [
      'Etimología: "Vodka" proviene del término eslavo "voda" (agua), con sufijo diminutivo de afecto ("agüita").',
      'Polonia vs Rusia: Primeros documentos registrados en 1405 (Sandomierz, Polonia) frente al "vino de pan" ruso del siglo XV.',
      'El mito del 40%: Dmitry Mendeleev investigó la densidad molar etanol-agua, pero el estándar fiscal ruso de 40% fue adoptado en 1894 para simplificar el cobro de impuestos.',
      'El Moscow Mule de 1941 salvó la categoría en América e inauguró la era de oro de la coctelería.'
    ],
    academicNotes: [
      'Cita académica para diapositivas: Pokhlebkin, William (1992). A History of Vodka. Verso Books.',
      'Pregunta para debatir en clase: ¿Cómo influyó el monopolio estatal del alcohol en la caída del régimen zarista?'
    ],
    contentHtml: `
      <h2>1. El Misterio de los Orígenes: Polonia vs. Rusia</h2>
      <p>Pocas controversias gastronómicas son tan apasionadas como el debate sobre la cuna del vodka. Tanto Polonia como Rusia reclaman la paternidad del destilado más popular del planeta.</p>
      <p>En Polonia, el término <strong>"wódka"</strong> aparece por primera vez en un documento jurídico oficial en <strong>1405</strong>, en los archivos judiciales de la corte de <em>Sandomierz</em>. En aquella época, el destilado no se consumía en fiestas: se empleaba en boticas y monasterios como desinfectante, base para ungüentos y tónico digestivo.</p>
      <p>Por su parte, en el Gran Ducado de Moscú, los monjes del Monasterio de Chúdov en el Kremlin comenzaron a destilar alcohol de grano alrededor de 1430, llamándolo <em>"Polugar"</em> (vino quemado a la mitad) o <em>"Khlebnoe Vino"</em> (vino de pan).</p>

      <h2>2. El Monopolio Zarista y las Tabernas Imperiales</h2>
      <p>Durante el reinado de <strong>Iván el Terrible (1533-1584)</strong>, la corona se percató del descomunal poder económico del alcohol. El zar prohibió la destilación en hogares campesinos y estableció la primera <em>Kabak</em> (taberna estatal) en Moscú.</p>
      <p>Hacia el siglo XIX, los impuestos derivados del vodka representaban más de un <strong>40% de los ingresos totales del tesoro imperial ruso</strong>. El vodka literalmente financió guerras, palacios y ferrocarriles imperiales.</p>

      <h2>3. Desmintiendo el Mito: ¿Mendeleev inventó el Vodka de 40º?</h2>
      <p>Uno de los mitos más extendidos en internet afirma que el genial químico <strong>Dmitry Mendeleev</strong>, creador de la tabla periódica de los elementos, descubrió que la proporción óptima del vodka era exactamente 40% ABV en su tesis de 1865 titulada <em>"Sobre las combinaciones del alcohol con el agua"</em>.</p>
      <p><strong>La realidad científica e histórica:</strong> Mendeleev investigaba la contracción de volumen volumétrico y los enlaces moleculares de disolución entre etanol y agua pura. La decisión de fijar el vodka en 40 grados la tomó el Ministro de Finanzas ruso en 1894 por un motivo puramente burocrático: a 40% ABV el cálculo del gravamen fiscal por litro era mucho más exacto que el estándar previo de 38%.</p>

      <h2>4. La Diáspora de Smirnoff y el Triunfo del Cóctel en América</h2>
      <p>Con el triunfo de los bolcheviques en la Revolución Rusa de 1917, la fábrica de Piotr Smirnov fue confiscada. Su hijo, Vladimir Smirnov, logró escapar con la receta original cosida en el forro de su abrigo.</p>
      <p>Al llegar a Estados Unidos, el vodka era prácticamente desconocido. En 1941, en el bar Cock 'n Bull de Hollywood, se unieron el dueño de Smirnoff, un fabricante de cerveza de jengibre (ginger beer) con exceso de stock y una empresaria con miles de jarras de cobre. Juntos inventaron el <strong>Moscow Mule</strong>, desatando una fiebre que luego daría lugar al <strong>Vodka Martini de James Bond</strong> y al <strong>Cosmopolitan</strong> de los años 90.</p>
    `
  },
  {
    id: 'proceso-destilacion-quimica',
    title: 'La Ciencia de la Pureza: Proceso de Fabricación Paso a Paso',
    subtitle: 'Columnas de rectificación continua a 96% ABV, filtración con carbón de abedul y el rol crítico del agua.',
    category: 'Fabricación',
    readTime: '9 min de lectura',
    author: 'Ing. Químico D. Alchemist',
    date: '31 de Agosto, 2026',
    tags: ['Destilación', 'Química', 'Rectificación', 'Filtración', 'Agua de Glaciar', 'Azeótropo'],
    excerpt: 'Una explicación didáctica con diagramas químicos y físicos sobre cómo se transforma un grano en el destilado más cristalino del mundo.',
    keyTakeaways: [
      'Límite Azeotrópico: No es posible superar 96.4% ABV mediante destilación simple debido al azeótropo etanol-agua.',
      'Eliminación de Congéneres: Las cabezas (metanol, acetaldehído) y colas (aceites de fusel) se purgan en columnas continuas.',
      'El Carbón de Abedul: Adsorbe selectivamente impurezas con una superficie molecular gigantesca (1 gramo = 1,000 m²).',
      'El Agua es el 60%: El vodka de alta gama depende de la pureza mineral de acuíferos profundos y deshielos glaciares.'
    ],
    academicNotes: [
      'Punto clave para la pizarra: Explicar la diferencia entre un alambique pot still discontinuo y una columna continua multi-torre.',
      'Fórmula química fundamental: C6H12O6 -> 2 C2H5OH + 2 CO2.'
    ],
    contentHtml: `
      <h2>1. De la Materia Prima al Mosto Fermentable</h2>
      <p>A diferencia de otros licores que exigen una base botánica fija (como el tequila de agave azul o el coñac de uva), el vodka puede nacer de cualquier vegetal rico en almidón o azúcar: <strong>trigo de invierno, centeno, patata, maíz, cebada o incluso uvas y remolacha</strong>.</p>
      <p>El grano se tritura y se calienta con agua caliente a 65°C para que las enzimas amilasas descompongan las largas cadenas de almidón en azúcares simples. Luego, las levaduras <em>Saccharomyces cerevisiae</em> transforman el mosto en un caldo alcohólico de 8% a 12% ABV tras 72 horas de fermentación anaeróbica.</p>

      <h2>2. Columnas de Rectificación: Desafiando la Termodinámica</h2>
      <p>El caldo entra en torres industriales de acero inoxidable de hasta 40 metros de altura provistas de platos perforados. En estas columnas:</p>
      <ul>
        <li><strong>Columna Analizadora (Beer Stripper):</strong> Separa los vapores alcohólicos de los residuos sólidos.</li>
        <li><strong>Columna Rectificadora:</strong> El vapor asciende y el condensado desciende, enriqueciendo la concentración alcohólica en cada plato hasta alcanzar el <strong>96% ABV</strong>.</li>
        <li><strong>Columna Purificadora (Demethanizer):</strong> Se inyecta agua purificada para arrastrar las fracciones volátiles de cabeza (metanol, acetatos) y expulsar los aceites de fusel por la base.</li>
      </ul>

      <h2>3. La Magia de la Filtración por Carbón y Metales Preciosos</h2>
      <p>Incluso al 96% ABV, existen microtrazas de compuestos orgánicos volátiles. La filtración no es un simple colador mecánico, sino un fenómeno de <strong>adsorción física y química</strong>.</p>
      <p>El carbón activado de madera de abedul siberiano contiene billones de micro-poros. Un solo gramo de este carbón tiene una superficie equivalente a dos campos de fútbol. Al fluir lentamente a baja temperatura, las impurezas se quedan adheridas a la superficie del carbón, aportando una suavidad sedosa al destilado.</p>

      <h2>4. El Papel del Agua: El 60% que Define la Corona</h2>
      <p>Cuando un vodka se embotella a 40% ABV, significa que el <strong>60% del contenido de la botella es agua</strong>. El tipo de agua define el alma del vodka:</p>
      <ul>
        <li><strong>Agua Glaciar / Manantial Artesiano:</strong> Muy baja en sales pesadas, confiere una sensación táctil fresca y ligera (ej. Grey Goose, Finlandia).</li>
        <li><strong>Agua Desmineralizada por Ósmosis Inversa:</strong> Máxima neutralidad química.</li>
        <li><strong>Período de Descanso (Resting):</strong> Tras la mezcla de agua y alcohol, se deja reposar de 3 a 10 días para que las moléculas formen puentes de hidrógeno estables y no generen sensación de "picotazo" alcohólico.</li>
      </ul>
    `
  },
  {
    id: 'guia-cata-sensorial',
    title: 'Guía Maestra de Catas: Cómo Evaluar un Vodka como un Sommelier',
    subtitle: 'Desmitificando el "sabor a nada": técnica de tres pasos, rueda de aromas, temperatura y cristalería.',
    category: 'Cata',
    readTime: '8 min de lectura',
    author: 'Sommelier Internacional J. Martell',
    date: '31 de Agosto, 2026',
    tags: ['Cata Profesional', 'Sommelier', 'Rueda de Aromas', 'Copas', 'Sensorial', 'Maridaje'],
    excerpt: 'El gran error del principiante es beber el vodka congelado en chupito de un solo trago. Aprende a catar visualmente, olfativamente y en paladar para distinguir cereales y texturas.',
    keyTakeaways: [
      'Temperatura Óptima: Entre 4°C y 8°C para apreciar los matices aromáticos; el congelador a -18°C adormece las papilas gustativas.',
      'Cristalería: Utilizar copa tulipa o copa de degustación ISO para concentrar vapores sin quemar la mucosa nasal.',
      'Fase Táctil: El vodka se juzga primordialmente por su textura (sedosidad, untuosidad, peso, calor) y no por colorantes ni azúcares.',
      'Maridaje Clásico: Salmón ahumado, arenques marinados, caviar, pepinillos encurtidos y pan de centeno.'
    ],
    academicNotes: [
      'Ejercicio para la clase: Realizar una cata a ciegas comparativa entre un vodka de trigo (Absolut/Grey Goose), uno de centeno (Belvedere) y uno de patata (Chopin).',
      'Vocabulario técnico: Lágrimas/piernas, limpidez, astringencia, untuosidad, retrogusto.'
    ],
    contentHtml: `
      <h2>1. Rompiendo el Mito del "Alcohol sin Olor ni Sabor"</h2>
      <p>La antigua definición de la TTB en EE.UU. calificaba al vodka como <em>"un espíritu neutral sin carácter distintivo, aroma, sabor ni color"</em>. Sin embargo, en 2020 esta regulación fue derogada gracias a la evidencia de que las distintas materias primas y métodos de destilación crean perfiles organolépticos radicalmente distintos.</p>

      <h2>2. La Técnica de Cata en 3 Fases</h2>

      <h3>Fase 1: Examen Visual</h3>
      <p>Sostén la copa contra un fondo blanco bien iluminado. Evalúa:</p>
      <ul>
        <li><strong>Limpidez y Brillo:</strong> Debe ser impecablemente transparente, sin turbidez ni partículas en suspensión.</li>
        <li><strong>Viscosidad (Lágrimas o Piernas):</strong> Gira suavemente la copa. Los vodkas de patata y centeno formarán lágrimas densas y lentas debido a su mayor densidad coloidal y glicerol natural.</li>
      </ul>

      <h3>Fase 2: Examen Olfativo (Sin quemar la nariz)</h3>
      <p>Dado que el vodka tiene 40% ABV, <strong>nunca introduzcas la nariz profundamente en la copa</strong> como harías con un vino. Mantén la copa a 3-5 cm de distancia e inhala suavemente con la boca entreabierta para no saturar los receptores olfativos.</p>
      <ul>
        <li><strong>Trigo:</strong> Notas sutiles de grano verde, masa de pan, flor blanca y ralladura de limón.</li>
        <li><strong>Centeno:</strong> Notas de pimienta blanca, pan de molde tostado y frutos secos.</li>
        <li><strong>Patata:</strong> Notas cremosas de mantequilla, vainilla y tierra mojada.</li>
      </ul>

      <h3>Fase 3: Examen Gustativo y Táctil</h3>
      <p>Toma un pequeño sorbo de 5 ml y hazlo circular por toda la cavidad bucal durante 3 a 5 segundos antes de tragar. Evalúa:</p>
      <ul>
        <li><strong>Ataque:</strong> ¿Es dulce y suave o cortante y fresco?</li>
        <li><strong>Mouthfeel (Textura):</strong> ¿Se siente acuoso, sedoso como la seda o untuoso como el aceite de oliva ligero?</li>
        <li><strong>Calor Alcohólico:</strong> Debe ser un calor agradable en el pecho, nunca una quemazón química estridente en la garganta.</li>
        <li><strong>Retrogusto y Persistencia:</strong> ¿Qué sabores quedan 15 segundos después de tragar?</li>
      </ul>

      <h2>3. Temperatura y Servicio</h2>
      <p>Para fiestas recreativas el vodka se sirve a menudo a -18°C (directo del congelador), lo que espesa el líquido pero silencia el 90% de sus aromas. Para una <strong>cata académica</strong>, la temperatura ideal es de <strong>6°C a 8°C</strong>.</p>
    `
  },
  {
    id: 'mixologia-cocteleria-icono',
    title: 'Mixología Clásica: Los 5 Cócteles que Transformaron la Historia del Vodka',
    subtitle: 'Moscow Mule, Vodka Martini, Bloody Mary, Cosmopolitan y Espresso Martini con sus proporciones exactas.',
    category: 'Mixología',
    readTime: '6 min de lectura',
    author: 'Head Bartender S. Rossi',
    date: '31 de Agosto, 2026',
    tags: ['Coctelería', 'Martini', 'Moscow Mule', 'Mixología', 'Espresso Martini', 'Recetas'],
    excerpt: 'Cómo la neutralidad y versatilidad del vodka lo convirtieron en el lienzo predilecto de los mejores bartenders del mundo.',
    keyTakeaways: [
      'El Vodka Martini: ¿Agitado o Mezclado? Agitar (Shaken) añade micro-burbujas de aire y mayor dilución; mezclar (Stirred) mantiene la textura cristalina y sedosa.',
      'La Jarra de Cobre del Moscow Mule: El cobre conduce el frío de forma instantánea y acentúa la efervescencia del ácido cítrico y el jengibre.',
      'El Espresso Martini (Dick Bradsell, 1983): La emulsión entre el aceite del café espresso y el vodka genera una espuma cremosa insuperable.'
    ],
    academicNotes: [
      'Concepto de balance en coctelería: Espíritu base (fuerza) + Modificador (acidez/amargor) + Agente endulzante.',
      'Ejercicio de clase: Calcular la dilución alcohólica final tras 15 segundos de agitación con hielo macizo.'
    ],
    contentHtml: `
      <h2>1. El Lienzo Perfecto de la Coctelería Mundial</h2>
      <p>A diferencia de licores con fuerte identidad botánica como la ginebra o añejados en madera como el whisky, el vodka actúa como un amplificador sensorial de los ingredientes con los que se combina, aportando estructura alcohólica y textura sin distorsionar el balance aromático.</p>

      <h2>2. Los 5 Pilares de la Coctelería con Vodka</h2>

      <h3>1. Vodka Martini (El debate Shaken vs Stirred)</h3>
      <ul>
        <li><strong>Fórmula:</strong> 60 ml Vodka de trigo o centeno + 10 ml Vermut seco francés (Dolin / Noilly Prat) + Twist de limón o 3 aceitunas verdes.</li>
        <li><strong>Técnica:</strong> Remover con hielo en vaso mezclador durante 30 segundos y colar en copa Martini helada.</li>
      </ul>

      <h3>2. Moscow Mule (1941)</h3>
      <ul>
        <li><strong>Fórmula:</strong> 50 ml Vodka + 15 ml Zumo de lima recién exprimido + 120 ml Ginger Beer artesanal + Rodaja de lima y rama de menta.</li>
        <li><strong>Servicio:</strong> En la icónica taza de cobre con abundante hielo picado.</li>
      </ul>

      <h3>3. Espresso Martini (Londres, 1983)</h3>
      <ul>
        <li><strong>Fórmula:</strong> 50 ml Vodka + 30 ml Café Espresso recién extraído caliente + 20 ml Licor de café (Kahlúa o Mr. Black) + 5 ml Sirope simple.</li>
        <li><strong>Técnica:</strong> Agitar con máxima fuerza (hard shake) con hielo para generar la corona de espuma perfecta. Decorar con 3 granos de café (salud, riqueza y felicidad).</li>
      </ul>

      <h3>4. Bloody Mary (París / Nueva York)</h3>
      <ul>
        <li><strong>Fórmula:</strong> 50 ml Vodka + 100 ml Zumo de tomate + 15 ml Zumo de limón + 4 golpes de salsa Worcestershire + 2 gotas de Tabasco + Sal de apio y pimienta negra molida.</li>
      </ul>

      <h3>5. Cosmopolitan (Nueva York, finales de los 80)</h3>
      <ul>
        <li><strong>Fórmula:</strong> 45 ml Vodka aromatizado con cítricos + 15 ml Cointreau (Triple Sec) + 15 ml Zumo de lima fresca + 30 ml Zumo de arándanos (cranberry).</li>
      </ul>
    `
  }
];

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  {
    id: 1,
    title: 'El Mundo del Vodka: Historia, Ciencia y Cata',
    section: 'Introducción General',
    badgeText: 'Portada Académica',
    bullets: [
      'Presentación académica elaborada por: David Taylor, Elvin Martinez y Sahiry Villareal.',
      'El destilado más consumido y versátil del planeta.',
      'Definición legal: Mínimo 37.5% ABV (UE) o 40% ABV (Estándar Internacional).',
      'Objetivo de la sesión: Desmitificar la falsa creencia de que "todos los vodkas son iguales y no tienen sabor".'
    ],
    speakerNotes: 'Iniciar presentándonos a la clase: David Taylor, Elvin Martinez y Sahiry Villareal. Destacar que el vodka no es un simple alcohol blanco, sino una obra maestra de ingeniería termodinámica y tradición cultural de más de 600 años.',
    iconName: 'GraduationCap',
    quote: '"El vodka es agua con alma ardiente." — Presentación por David Taylor, Elvin Martinez y Sahiry Villareal',
    stat: { value: '600+', label: 'Años de historia documentada' }
  },
  {
    id: 2,
    title: 'Orígenes y Geopolítica del "Voda"',
    section: 'Historia y Tradición',
    badgeText: 'Polonia vs Rusia',
    bullets: [
      'Etimología: "Voda" (agua en lenguas eslavas) + diminutivo cariñoso = "Agüita".',
      'Primer registro histórico: Año 1405 en Sandomierz, Polonia.',
      'Monopolio de Iván el Terrible: El vodka financió el 40% del tesoro imperial ruso.',
      'Mito de Mendeleev: Investigó densidades de mezclas, pero los 40º se fijaron por decreto fiscal en 1894.'
    ],
    speakerNotes: 'Explicar a los compañeros cómo el clima gélido del norte de Europa obligó a buscar cultivos resistentes como el centeno y la patata, convirtiendo la destilación en un método de conservación calórica y comercial.',
    iconName: 'Scroll',
    quote: 'De medicina monacal a motor económico imperial.',
    stat: { value: '1405', label: 'Año de la primera mención escrita' }
  },
  {
    id: 3,
    title: 'Materias Primas: La Huella Dactilar del Grano',
    section: 'Materia Prima y Terroir',
    badgeText: 'Química Botánica',
    bullets: [
      'Trigo de Invierno: Textura sedosa, toque de pan brioche y cítrico (ej. Grey Goose, Absolut).',
      'Centeno: Perfil estructurado, especiado, pimienta blanca y pan tostado (ej. Belvedere).',
      'Patata: Untuosa, cremosa, notas terrosas y mantecosas (ej. Chopin Potato).',
      'Maíz: Dulce natural, libre de gluten (ej. Tito\'s).',
      'Uvas: Aromas frescos y florales (ej. Cîroc).'
    ],
    speakerNotes: 'Hacer énfasis en cómo el tipo de almidón y los lípidos remanentes tras la destilación marcan la textura final en lengua (mouthfeel), que es el criterio número 1 del sommelier.',
    iconName: 'Wheat',
    stat: { value: '5', label: 'Familias botánicas principales' }
  },
  {
    id: 4,
    title: 'La Columna de Rectificación y el Límite Azeotrópico',
    section: 'Proceso de Fabricación',
    badgeText: 'Ingeniería Química',
    bullets: [
      'Maceración: Conversión de almidón en maltosa a 65°C con enzimas amilasas.',
      'Fermentación: Saccharomyces cerevisiae genera un caldo alcohólico de 10% ABV en 72 horas.',
      'Destilación Continua: Columnas de hasta 40 metros con 60 platos fraccionadores.',
      'Límite de 96.4% ABV: Separación total de metanol, acetaldehído y aceites de fusel.'
    ],
    speakerNotes: 'Mostrar en la diapositiva cómo las columnas de destilación funcionan en bucle continuo, evaporando y condensando el vapor cientos de veces hasta purificar el etanol al máximo.',
    iconName: 'Flame',
    stat: { value: '96.4%', label: 'Punto azeotrópico de pureza máxima' }
  },
  {
    id: 5,
    title: 'Filtración y el Misterio del Agua (60% del Volumen)',
    section: 'Purificación e Hidratación',
    badgeText: 'Química Molecular',
    bullets: [
      'Carbón de Abedul: Adsorbe micro-impurezas (1 gramo = 1,000 m² de superficie de contacto).',
      'Filtraciones especiales: Plata coloidal, arena de cuarzo, diamantes y filtros de celulosa.',
      'Agua de Manantial / Glaciar: Aporta los minerales esenciales y la suavidad en paladar.',
      'Matrimonio (Resting): Reposo de 3 a 7 días para formar clústeres estables de agua-etanol.'
    ],
    speakerNotes: 'Recordar que el agua no es solo un diluyente, sino el 60% del líquido que el consumidor bebe. El agua artesiana de deshielo glacial marca la diferencia entre un vodka barato y uno de lujo.',
    iconName: 'Droplets',
    stat: { value: '60%', label: 'Porcentaje de agua en la botella' }
  },
  {
    id: 6,
    title: 'Metodología de Cata Sensorial de Vodka',
    section: 'Evaluación Organoléptica',
    badgeText: 'Análisis Sensorial',
    bullets: [
      'Temperatura ideal de cata: 6°C a 8°C (no a -18°C del congelador).',
      'Copa Tulipa o ISO: Evita la evaporación agresiva de vapores de alcohol.',
      'Fase Visual: Limpidez diamantina y viscosidad de las lágrimas.',
      'Fase Olfativa: A 3 cm de la nariz, inhalar con boca abierta para captar notas sutiles de cereal.',
      'Fase Gustativa: Evaluar textura (sedosa vs cremosa), calor en pecho y persistencia final.'
    ],
    speakerNotes: 'Guiar a los compañeros en una demostración visual: cómo observar las lágrimas en la copa, cómo oler sin saturar la nariz y qué buscar en el retrogusto.',
    iconName: 'Wine',
    quote: 'En el vodka no se busca la intensidad de la madera, sino la elegancia de la pureza y la textura en boca.',
    stat: { value: '6°C - 8°C', label: 'Temperatura ideal de degustación' }
  },
  {
    id: 7,
    title: 'Coctelería Icónica y Conclusiones de la Clase',
    section: 'Mixología y Cierre',
    badgeText: 'Resumen Ejecutivo',
    bullets: [
      'El Moscow Mule (1941): El cóctel en jarra de cobre que popularizó el vodka en Occidente.',
      'Vodka Martini: Agitado (más frío y aireado) vs Mezclado (más cristalino y sedoso).',
      'Espresso Martini: Emulsión de crema de café y vodka.',
      'Conclusión: El vodka es la cumbre de la precisión destiladora y el rey indiscutible de la coctelería mundial.'
    ],
    speakerNotes: 'Cerrar la exposición invitando a preguntas y animando a los compañeros a participar en el cuestionario interactivo de la clase.',
    iconName: 'GlassWater',
    stat: { value: '#1', label: 'Destilado más consumido a nivel global' }
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Cuál es el significado etimológico original de la palabra "Vodka"?',
    options: [
      'Fuego sagrado de los bosques',
      'Diminutivo de "Voda", que significa "Agüita" en lenguas eslavas',
      'Vino blanco de trigo quemado',
      'Alcohol medicinal de monasterio'
    ],
    correctIndex: 1,
    explanation: 'La palabra vodka deriva de "voda" (agua), añadiendo el sufijo diminutivo cariñoso "-ka", significando literalmente "agüita" o "pequeña agua".',
    category: 'Historia'
  },
  {
    id: 2,
    question: '¿En qué año se tiene el primer registro escrito oficial de la palabra "Wódka" en Polonia?',
    options: [
      'En el año 1405 en los tribunales de Sandomierz',
      'En el año 1789 tras la Revolución Francesa',
      'En el año 1917 con la Revolución Rusa',
      'En el año 1066 durante la conquista normanda'
    ],
    correctIndex: 0,
    explanation: 'El primer registro documental fechado se localizó en las actas notariales de 1405 en el tribunal de Sandomierz, Polonia.',
    category: 'Historia'
  },
  {
    id: 3,
    question: '¿Es verdad que Dmitry Mendeleev inventó el vodka de 40% ABV?',
    options: [
      'Sí, descubrió la receta en su laboratorio en 1865',
      'No, Mendeleev investigó enlaces moleculares etanol-agua; los 40º fueron fijados por decreto fiscal ruso en 1894',
      'Sí, lo patentó junto a la tabla periódica',
      'No, el vodka siempre tuvo 55% ABV'
    ],
    correctIndex: 1,
    explanation: 'Es un mito popular. Mendeleev estudió la contracción de volumen molar en su tesis doctoral, pero el gobierno ruso adoptó los 40º en 1894 para simplificar el cobro de impuestos por volumen.',
    category: 'Historia'
  },
  {
    id: 4,
    question: '¿Hasta qué graduación alcohólica se rectifica el vodka durante la destilación continua?',
    options: [
      'Alrededor de 40% ABV',
      'Entre 60% y 70% ABV',
      'Alcanza el límite azeotrópico de 96.0% a 96.5% ABV',
      'Llega al 100% de alcohol absoluto'
    ],
    correctIndex: 2,
    explanation: 'Para eliminar congéneres indeseables y alcanzar el estándar legal de alcohol neutro, se rectifica hasta aproximadamente el 96% ABV antes de ser diluido con agua pura.',
    category: 'Química'
  },
  {
    id: 5,
    question: '¿Qué materia prima aporta la textura más untuosa, cremosa y densa en lengua?',
    options: [
      'El maíz dulce',
      'La uva blanca',
      'La patata (papa)',
      'El arroz blanco'
    ],
    correctIndex: 2,
    explanation: 'Los vodkas de patata (como Chopin Potato o Luksusowa) destacan en la cata sensorial por su notable viscosidad, cremosidad y sensación mantecosa en paladar.',
    category: 'Cata'
  },
  {
    id: 6,
    question: '¿Qué material de filtración tradicional fue introducido por Piotr Smirnov para purificar el vodka?',
    options: [
      'Arena de playa volcánica',
      'Carbón activo de madera de abedul siberiano',
      'Filtros de lana de oveja',
      'Tierra de diatomeas marinas'
    ],
    correctIndex: 1,
    explanation: 'El carbón activo de abedul cuenta con una enorme área superficial que adsorbe impurezas y ácidos grasos volátiles, otorgando una suavidad legendaria.',
    category: 'Química'
  },
  {
    id: 7,
    question: '¿A qué temperatura se recomienda realizar una cata profesional para apreciar aromas y texturas?',
    options: [
      'A -18°C directo del congelador',
      'A 6°C - 8°C en copa de degustación',
      'A 45°C hirviendo',
      'A temperatura ambiente tropical de 30°C'
    ],
    correctIndex: 1,
    explanation: 'A 6°C - 8°C el vodka revela sus delicadas notas de cereal, pan, pimienta y frutas sin que el frío extremo del congelador adormezca las papilas gustativas.',
    category: 'Cata'
  },
  {
    id: 8,
    question: '¿Qué cóctel histórico de 1941 popularizó el consumo de vodka en EE.UU. servido en jarra de cobre?',
    options: [
      'El Moscow Mule',
      'El Mojito',
      'El Dry Martini clásico',
      'La Piña Colada'
    ],
    correctIndex: 0,
    explanation: 'El Moscow Mule (vodka + ginger beer + zumo de lima servido en jarra de cobre) fue la genial campaña de marketing que abrió el mercado estadounidense al vodka.',
    category: 'Coctelería'
  },
  {
    id: 9,
    question: 'Aproximadamente, ¿qué porcentaje de una botella de vodka al 40% ABV corresponde a agua?',
    options: [
      'El 10%',
      'El 40%',
      'El 60%',
      'El 90%'
    ],
    correctIndex: 2,
    explanation: 'Si el alcohol es 40% en volumen, el 60% restante es agua purificada de manantial, glaciar o desmineralizada, razón por la cual la calidad del agua es decisiva.',
    category: 'Química'
  },
  {
    id: 10,
    question: '¿Qué diferencia sensorial genera un vodka de centeno (Rye) frente a uno de trigo?',
    options: [
      'El centeno aporta un perfil más especiado, con notas de pimienta blanca y mayor estructura',
      'El centeno no tiene ningún tipo de sabor',
      'El centeno siempre tiene color rojo oscuro',
      'El centeno tiene sabor a caramelo y chocolate dulce'
    ],
    correctIndex: 0,
    explanation: 'El centeno es conocido en el mundo eslavo por otorgar un carácter brioso, notas de pimienta blanca, pan de centeno tostado y un final persistente y especiado.',
    category: 'Cata'
  }
];

export const BLOGGER_TEMPLATE_SAMPLE = `<!-- ENTRADA DE BLOGGER: GUÍA MAESTRA DEL VODKA PARA CLASE -->
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.7; color: #2d3748; max-width: 800px; margin: 0 auto; padding: 20px;">
  
  <header style="text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 24px; margin-bottom: 30px;">
    <span style="background: #e2e8f0; color: #4a5568; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
      Guía Académica y Enológica
    </span>
    <h1 style="color: #1a202c; font-size: 32px; font-weight: 800; margin: 16px 0 8px 0; line-height: 1.25;">
      El Arte del Vodka: De la Alquimia Medieval a la Ciencia de la Destilación
    </h1>
    <p style="color: #718096; font-size: 16px; margin: 0;">
      Una exploración visual y descriptiva sobre historia, química de rectificación y cata sensorial profesional.
    </p>
  </header>

  <!-- Resumen Destacado -->
  <div style="background: #f7fafc; border-left: 4px solid #3182ce; padding: 18px 20px; border-radius: 0 8px 8px 0; margin-bottom: 30px;">
    <h3 style="margin-top: 0; color: #2b6cb0; font-size: 18px;">💡 Puntos Clave para la Exposición</h3>
    <ul style="margin: 0; padding-left: 20px; color: #4a5568;">
      <li><strong>Etimología:</strong> Del eslavo <em>"voda"</em> (agua), con diminutivo afectuoso <em>"agüita"</em>.</li>
      <li><strong>Proceso:</strong> Rectificación en columnas continuas hasta alcanzar <strong>96.4% ABV</strong> para purgar congéneres.</li>
      <li><strong>El Secreto:</strong> El 60% del volumen del vodka es agua purificada; su origen define la suavidad.</li>
      <li><strong>Cata:</strong> No se juzga por dulzor artificial sino por su <strong>textura (mouthfeel)</strong>: sedoso (trigo), especiado (centeno) o cremoso (patata).</li>
    </ul>
  </div>

  <h2 style="color: #2d3748; border-bottom: 1px solid #edf2f7; padding-bottom: 8px;">1. Historia Milenaria: La Gran Disputa Eslava</h2>
  <p>Durante siglos, Polonia y Rusia han debatido la paternidad del destilado. Mientras los registros judiciales polacos de <strong>1405</strong> mencionan por primera vez el término <em>"wódka"</em> para usos medicinales en Sandomierz, en Rusia los monjes del Kremlin perfeccionaban el <em>"vino de pan"</em> (Polugar).</p>
  <p>En el siglo XVI, el zar Iván el Terrible estableció las primeras tabernas imperiales (<em>kabaks</em>), convirtiendo el vodka en la base financiera de los zares rusos.</p>

  <h2 style="color: #2d3748; border-bottom: 1px solid #edf2f7; padding-bottom: 8px;">2. El Proceso de Fabricación y la Química de la Pureza</h2>
  <p>El vodka se somete a una destilación fraccionada de alta precisión:</p>
  <ol style="color: #4a5568; padding-left: 20px;">
    <li><strong>Maceración:</strong> Enzimas amilasas convierten almidones en azúcares a 65°C.</li>
    <li><strong>Fermentación:</strong> Levaduras <em>Saccharomyces</em> generan mosto alcohólico de 10% ABV.</li>
    <li><strong>Rectificación Continua:</strong> Múltiples columnas eliminan metanol y aceites de fusel hasta 96% ABV.</li>
    <li><strong>Filtración Molecular:</strong> Lechos de carbón activo de abedul adsorben impurezas.</li>
    <li><strong>Hidratación y Reposo:</strong> Mezcla con agua pura de manantial y reposo molecular de 5 días.</li>
  </ol>

  <!-- Tabla Comparativa -->
  <h2 style="color: #2d3748; border-bottom: 1px solid #edf2f7; padding-bottom: 8px;">3. Comparativa de Materias Primas</h2>
  <div style="overflow-x: auto; margin-bottom: 30px;">
    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
      <thead>
        <tr style="background: #edf2f7; color: #2d3748;">
          <th style="padding: 12px; border: 1px solid #cbd5e0;">Materia Prima</th>
          <th style="padding: 12px; border: 1px solid #cbd5e0;">Textura en Boca</th>
          <th style="padding: 12px; border: 1px solid #cbd5e0;">Notas Aromáticas</th>
          <th style="padding: 12px; border: 1px solid #cbd5e0;">Marcas de Referencia</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Trigo de Invierno</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">Sedosa y ligera</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">Pan brioche, anís, cítricos</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">Absolut, Grey Goose</td>
        </tr>
        <tr style="background: #f7fafc;">
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Centeno (Rye)</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">Estructurada y firme</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">Pimienta blanca, pan tostado</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">Belvedere, Sobieski</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Patata (Papa)</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">Cremosa y untuosa</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">Mantequilla, tierra, vainilla</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">Chopin Potato, Luksusowa</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 style="color: #2d3748; border-bottom: 1px solid #edf2f7; padding-bottom: 8px;">4. Cómo Realizar la Cata Sensorial en Clase</h2>
  <p>Para la presentación en el aula, se recomienda servir a <strong>6°C - 8°C</strong> en copa tulipa. Analizar primero la limpidez y la formación de lágrimas en el cristal; luego inhalar suavemente a 3 cm con la boca semiabierta, y finalmente saborear un sorbo de 5 ml evaluando la textura, el calor y la longitud del retrogusto.</p>

  <footer style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0; font-size: 13px; color: #a0aec0; text-align: center;">
    Presentación y publicación elaborada por David Taylor, Elvin Martinez y Sahiry Villareal • Clase de Cultura Gastronómica y Enología
  </footer>
</div>`;
