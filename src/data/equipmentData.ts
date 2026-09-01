import { IndustrialEquipmentItem } from '../types';
import millingImg from '../assets/images/vodka_industrial_milling_1788232927724.jpg';
import fermentersImg from '../assets/images/vodka_industrial_fermenters_1788232893026.jpg';
import columnStillImg from '../assets/images/vodka_industrial_column_still_1788232879527.jpg';
import filtrationImg from '../assets/images/vodka_industrial_filtration_1788232904913.jpg';
import bottlingImg from '../assets/images/vodka_industrial_bottling_1788232916589.jpg';

export const INDUSTRIAL_EQUIPMENT_LIST: IndustrialEquipmentItem[] = [
  {
    id: 'hammer-mill',
    name: 'Molino de Martillos / Rodillos de Molienda Controlada',
    category: 'Preparación y Molienda',
    phaseNumber: 1,
    stageName: 'Recepción y Molienda de Granos',
    material: 'Acero al carbono antidesgaste Hardox 450 y Acero Inoxidable AISI 304',
    capacityRange: '2 a 15 Toneladas / hora',
    operatingParameters: {
      temperature: 'Ambiente (15°C - 25°C)',
      pressure: 'Atmosférica (1.0 bar)',
      throughputOrYield: 'Granulometría fina: 0.5 mm - 1.2 mm (tamiz vibratorio)',
    },
    functionDescription: 'Fraccionamiento mecánico del grano (trigo de invierno, centeno, maíz o cebada) para exponer el endospermo rico en gránulos de almidón.',
    workingPrinciple: 'Martillos rotativos de alta velocidad (2800 - 3000 RPM) rompen la cáscara del cereal por impacto contra placas de choque, seguidos por un clasificador neumático que extrae el polvo de harina sin generar calentamiento excesivo.',
    keyComponents: [
      'Tolva de alimentación con deschinador magnético para atrapar partículas metálicas',
      'Rotor balanceado dinámicamente con martillos de carburo de tungsteno',
      'Tamiz calibrado intercambiable de acero perforado',
      'Ciclón de aspiración neumática y filtro de mangas antipolvo ATEX'
    ],
    maintenanceAndSanitization: 'Inspección de desgaste de martillos cada 500 horas. Limpieza periódica en seco y aspiración para evitar explosiones por polvo según norma ATEX.',
    industrialDiagramDetails: [
      'Entrada de grano limpio por gravedad',
      'Impacto cinético en la cámara de molienda',
      'Clasificación por tamaño de partícula mediante malla tamiz',
      'Transporte por tornillo sinfín / soplador neumático hacia silos de pesaje'
    ],
    imagePlaceholderIcon: 'Cog',
    imageUrl: millingImg,
    imageAlt: 'Molino industrial de martillos y tolva de alimentación de grano para vodka',
    academicImportance: 'Una granulometría homogénea asegura que el agua y las enzimas hidrolíticas penetren eficazmente en la cocción sin crear grumos insolubles.'
  },
  {
    id: 'mash-cooker',
    name: 'Tanque de Maceración y Cocedor a Presión / Hidrolizador Enzimático',
    category: 'Maceración y Fermentación',
    phaseNumber: 2,
    stageName: 'Gelatinización y Sacarificación',
    material: 'Acero Inoxidable AISI 316L pulido sanitario Ra < 0.8 µm con aislamiento de lana de roca',
    capacityRange: '5,000 L a 60,000 L',
    operatingParameters: {
      temperature: '65°C - 90°C (según etapa: licuefacción 85°C, sacarificación 62°C)',
      pressure: 'Inyección de vapor a 2.0 - 4.5 bar o atmosférica presurizable',
      throughputOrYield: 'Eficiencia de conversión de almidón > 97%',
    },
    functionDescription: 'Gelatinización de los almidones del cereal y escisión enzimática mediante alfa-amilasa y glucoamilasa para transformarlos en azúcares fermentables (glucosa, maltosa).',
    workingPrinciple: 'Inyección directa de vapor saturado y agitación mecánica de alta potencia. Al alcanzar los 85°C el almidón se hidrata; se enfría a 62-65°C para dosificar enzimas biológicas exógenas que rompen los enlaces glucosídicos alfa-1,4 y alfa-1,6.',
    keyComponents: [
      'Agitador tipo turbina o ancla con raspadores de fondo para evitar quemado',
      'Camisa de vapor alveolar (dimple jacket) e inyectores de vapor directo silenciosos',
      'Sondas de temperatura PT100 múltiples y transmisor de pH en línea',
      'Intercambiador de calor de placas para enfriamiento rápido hacia fermentación'
    ],
    maintenanceAndSanitization: 'Ciclo CIP automático (Clean-in-Place): soda cáustica caliente (NaOH 2%) a 75°C, enjuague y desinfección con ácido peracético (PAA).',
    industrialDiagramDetails: [
      'Mezcla de harina de cereal con agua desmineralizada a 50°C',
      'Rampa térmica de licuefacción con inyección de vapor',
      'Dosificación de enzimas amilolíticas',
      'Enfriamiento flash a 30°C mediante intercambiador de espiral/placas'
    ],
    imagePlaceholderIcon: 'Flame',
    imageUrl: fermentersImg,
    imageAlt: 'Tanque de maceración y cocedor continuo en acero inoxidable sanitario',
    academicImportance: 'Determina el extracto fermentable (grados Brix / densidad original) y evita la producción excesiva de dextrinas no fermentables.'
  },
  {
    id: 'conical-fermenters',
    name: 'Fermentadores Cilíndrico-Cónicos Termorregulados (CCT)',
    category: 'Maceración y Fermentación',
    phaseNumber: 3,
    stageName: 'Fermentación Alcohólica Primaria',
    material: 'Acero Inoxidable AISI 304 / 316L con fondo cónico a 60° para purga de biomasa',
    capacityRange: '20,000 L a 250,000 L por tanque',
    operatingParameters: {
      temperature: '26°C - 32°C (control exacto con glicol a -4°C)',
      pressure: '0.2 - 0.5 bar (ligera sobrepresión para venteo de CO2)',
      targetAbv: '8.0% - 12.0% ABV (Beer / Wash)',
      throughputOrYield: 'Tiempo de residencia: 48 a 72 horas'
    },
    functionDescription: 'Conversión anaerobia de los azúcares fermentables en etanol y CO2 por la acción de cepas seleccionadas de levadura (Saccharomyces cerevisiae / bayanus).',
    workingPrinciple: 'Glicólisis anaerobia. El control de temperatura es crucial: temperaturas > 34°C estresan a la levadura produciendo aceites de fusel (alcoholes superiores), mientras que temperaturas muy frías detienen la cinética fermentativa.',
    keyComponents: [
      'Camisas de refrigeración independientes (cilindro y cono) para glicol',
      'Válvula de alivio de vacío y presión de seguridad (PVRV)',
      'Línea de recuperación y lavado de gas dióxido de carbono (CO2 Scrubber)',
      'Bolas de aspersión rotativas 360° para limpieza CIP sanitaria'
    ],
    maintenanceAndSanitization: 'Esterilización con vapor directo o nebulización de peracético antes de la inoculación del lote.',
    industrialDiagramDetails: [
      'Entrada del mosto enfriado y oxigenado a 28°C',
      'Inoculación del pie de cuba de levaduras activas',
      'Fase exponencial de fermentación con extracción constante de calor',
      'Sedimentación y purga de levadura por el vértice cónico'
    ],
    imagePlaceholderIcon: 'Activity',
    imageUrl: fermentersImg,
    imageAlt: 'Batería de tanques fermentadores cilíndrico-cónicos termorregulados',
    academicImportance: 'La limpieza de la fermentación define la carga inicial de congéneres (ésteres, aldehídos, alcoholes superiores) que la destilería deberá purificar.'
  },
  {
    id: 'beer-stripper-column',
    name: 'Columna de Agotamiento de Mosto (Beer Column / Wash Column)',
    category: 'Destilación y Rectificación',
    phaseNumber: 4,
    stageName: 'Destilación Primaria y Extracción de Vinazas',
    material: 'Acero Inoxidable AISI 316L en base y platos inferiores; aleaciones resistentes a abrasión',
    capacityRange: 'Columnas de 1.2 m a 3.5 m de diámetro; 20 a 35 platos de tamiz',
    operatingParameters: {
      temperature: 'Base: 104°C - 108°C | Cabeza: 92°C - 95°C',
      pressure: 'Ligeramente atmosférica o bajo suave vacío (0.9 - 1.2 bar abs)',
      targetAbv: 'Entrada: 10% ABV -> Salida de flegmas: 50% - 60% ABV'
    },
    functionDescription: 'Separación primaria rápida de todo el etanol disuelto en el mosto fermentado, descargando por el fondo los sólidos no volátiles y agua (vinaza agotada / stillage).',
    workingPrinciple: 'Alimentación continua de mosto por la parte superior-media. El vapor vivo inyectado por el fondo asciende calentando el mosto en contracorriente; el alcohol se evapora selectivamente debido a su mayor volatilidad y se extrae por la cabeza como flegmas crudos.',
    keyComponents: [
      'Platos perforados de paso libre antibloqueo (evitan incrustaciones de sólidos del cereal)',
      'Precalentador de mosto utilizando el calor residual de las vinazas (recuperación energética)',
      'Condensador de carcasa y tubos para flegmas primarios',
      'Válvula automática de descarga de vinaza con control de nivel piezométrico'
    ],
    maintenanceAndSanitization: 'Lavado químico quincenal con ácido nítrico/fosfórico para disolver depósitos de carbonatos y oxalatos de calcio en los platos.',
    industrialDiagramDetails: [
      'Inyección de mosto precalentado a 80°C',
      'Inyección de vapor de alta presión por el calderín de fondo',
      'Salida inferior de vinaza sin alcohol (< 0.05% ABV)',
      'Salida superior de vapores alcohólicos concentrados hacia la siguiente columna'
    ],
    imagePlaceholderIcon: 'Layers',
    imageUrl: columnStillImg,
    imageAlt: 'Columna de agotamiento primario (Wash Column) para extracción continua de etanol',
    academicImportance: 'Es el equipo con mayor consumo térmico de la destilería. Su eficiencia define la tasa de recuperación total de alcohol del mosto.'
  },
  {
    id: 'hydroselection-column',
    name: 'Columna de Hidroselección / Extracción Purificadora',
    category: 'Destilación y Rectificación',
    phaseNumber: 5,
    stageName: 'Extracción por Solubilidad y Purificación de Impurezas',
    material: 'Acero Inoxidable AISI 316L y Platos de Cobre Cu-DHP para neutralizar sulfuros',
    capacityRange: '30 a 50 platos de campana de burbujeo / válvulas fijas',
    operatingParameters: {
      temperature: 'Base: 98°C - 101°C | Cabeza: 82°C - 88°C',
      pressure: 'Operación continua a presión positiva moderada',
      targetAbv: 'Dilución del destilado al 15% - 20% ABV con agua caliente'
    },
    functionDescription: 'Inyección masiva de agua caliente desmineralizada para alterar drásticamente la volatilidad relativa de los ésteres y aceites de fusel, facilitando su extracción prematura.',
    workingPrinciple: 'Efecto de extracción por solvente (destilación extractiva). En soluciones acuosas muy diluidas, los congéneres hidrofóbicos (alcoholes isoamílicos, isobutanol) se vuelven muy volátiles y se desplazan hacia el domo superior de la columna, mientras que el etanol puro desciende con el agua hacia la base.',
    keyComponents: [
      'Anillo dosificador de agua caliente de alta pureza en el tercio superior',
      'Platos de alta retención de líquido (bubble cap trays)',
      'Enfriador y condensador de cabezas técnicas / subproductos',
      'Control PID en cascada de caudal mosto/agua'
    ],
    maintenanceAndSanitization: 'Pasivado con ácido cítrico para regenerar la capa protectora de cromo y limpieza de depósitos de cobre.',
    industrialDiagramDetails: [
      'Entrada de flegmas (55% ABV)',
      'Inyección de agua desmineralizada a 90°C (relación 3:1)',
      'Evaporación forzada de ésteres de bajo punto de ebullición',
      'Extracción de alcohol purificado y desengrasado por la base'
    ],
    imagePlaceholderIcon: 'Droplet',
    imageUrl: columnStillImg,
    imageAlt: 'Columna de hidroselección y extracción con platos de burbujeo de cobre',
    academicImportance: 'Es el secreto tecnológico de los vodkas ultra-premium. Permite eliminar impurezas que una columna convencional no puede separar debido a azeótropos binarios.'
  },
  {
    id: 'rectification-tower',
    name: 'Torre de Rectificación Multiplato de Alta Pureza (Rectifying Column)',
    category: 'Destilación y Rectificación',
    phaseNumber: 6,
    stageName: 'Concentración Azeotrópica y Fraccionamiento',
    material: 'Acero Inoxidable AISI 316L grado farmacéutico con aislamiento térmico aluminizado',
    capacityRange: 'Altura: 25 a 45 metros | Diámetro: 1.0 m a 2.8 m | 60 a 90 platos de rectificación',
    operatingParameters: {
      temperature: 'Base: 102°C | Tercio medio: 78.3°C | Cabeza: 78.1°C',
      pressure: 'Control preciso de reflujo (Relación de reflujo R/D = 3.5 a 5.0)',
      targetAbv: '96.0% - 96.5% ABV (Grado Neutro Farmacéutico / Grado Lux / Alpha)'
    },
    functionDescription: 'Concentración del etanol hasta el límite físico del azeótropo binario etanol-agua (96.4% masa / 96.5% volumen) con eliminación micrométrica de cabezas y colas.',
    workingPrinciple: 'Equilibrio líquido-vapor múltiple. Cada plato actúa como una micro-destilación independiente. El vapor enriquecido asciende y el condensado líquido (reflujo) desciende. Los alcoholes pesados (propanol, butanol, amílicos) se acumulan en zonas específicas y se purgan lateralmente, mientras el corazón neutro se extrae entre los platos 60 y 75.',
    keyComponents: [
      'Platos de válvulas móviles V1 o bandejas de burbujeo de alta eficiencia',
      'Reboiler termosifón con vapor indirecto (evita caramelización y olores quemados)',
      'Condensador principal y sub-enfriador de producto final con control de reflujo',
      'Puntos de extracción lateral múltiple (Side-draw) para alcohol neutro y aceites de fusel'
    ],
    maintenanceAndSanitization: 'Inspección boroscópica anual de platos interiores y pruebas de estanqueidad hidrostática.',
    industrialDiagramDetails: [
      'Alimentación continua de alcohol hidroseleccionado',
      'Fraccionamiento continuo a lo largo de 80 platos teóricos',
      'Purga superior de cabezas livianas (acetaldehído, acetato de etilo)',
      'Extracción de alcohol neutro ultrapuro (96.4% ABV) por plato lateral'
    ],
    imagePlaceholderIcon: 'Sliders',
    imageUrl: columnStillImg,
    imageAlt: 'Torre de rectificación industrial multiplato de 40 metros para alcohol neutro',
    academicImportance: 'Alcanza el grado de pureza química exigido por la normativa europea (Reglamento UE 2019/787: máximo 30 g de congéneres por hectolitro de alcohol puro).'
  },
  {
    id: 'demethanolizer-column',
    name: 'Columna Desmetilizadora / Pulidora Final (Demethanolizer)',
    category: 'Destilación y Rectificación',
    phaseNumber: 7,
    stageName: 'Eliminación Específica de Metanol y Aldehídos Ligeros',
    material: 'Acero Inoxidable AISI 316L con empaque estructurado Sulzer BX de alta área superficial',
    capacityRange: '30 a 45 platos teóricos o 12 metros de lecho empacado estructurado',
    operatingParameters: {
      temperature: 'Cabeza: 64.7°C - 78.0°C | Base: 78.4°C',
      pressure: 'Operación atmosférica / presión estabilizada (+/- 5 mbar)',
      targetAbv: '96.2% ABV con metanol residual < 1.0 mg/L'
    },
    functionDescription: 'Extracción selectiva de trazas infinitesimales de metanol (punto de ebullición 64.7°C) y acetaldehídos hipervolátiles que causan ardor en garganta.',
    workingPrinciple: 'El metanol tiene menor punto de ebullición que el etanol a altas concentraciones alcohólicas. El alcohol de 96% entra caliente a la columna; el metanol se vaporiza inmediatamente y se evacúa por la corona superior hacia condensación de residuos no aptos para consumo, mientras el vodka base ultra-puro drena por el fondo.',
    keyComponents: [
      'Empaque estructurado de malla de alambre corrugado para minimizar pérdida de carga',
      'Condensador de venteo con desgasificador de volátiles no condensables',
      'Transmisor analítico en línea por cromatografía de gases (GC) para monitoreo de metanol',
      'Bomba centrífuga sanitaria con sello mecánico lavado para trasiego de alcohol refinado'
    ],
    maintenanceAndSanitization: 'Purga periódica de gases inertes y calibración trimestral de sensores térmicos y cromatográficos.',
    industrialDiagramDetails: [
      'Alimentación de alcohol neutro de rectificación',
      'Vaporización flash de metanol y ésteres ultra-ligeros',
      'Escape superior de concentrado de cabezas técnicas',
      'Drenaje inferior de Alcohol Grado Alpha / Lux (Pureza > 99.9% base alcohol)'
    ],
    imagePlaceholderIcon: 'Sparkles',
    imageUrl: columnStillImg,
    imageAlt: 'Columna desmetilizadora con empaque estructurado Sulzer para purificación de metanol',
    academicImportance: 'Garantiza la ausencia de dolores de cabeza inducidos por metanol o aldehídos agresivos, cumpliendo los estándares de vodka medicinal y premium.'
  },
  {
    id: 'charcoal-filtration-battery',
    name: 'Batería de Columnas de Filtración con Carbón Activo de Abedul',
    category: 'Filtración y Purificación',
    phaseNumber: 8,
    stageName: 'Adsorción Molecular y Pulido Organoléptico',
    material: 'Acero Inoxidable AISI 316L pulido espejo interior con distribuidores radiales',
    capacityRange: 'Torres de 3 a 8 metros de altura; 500 kg a 5,000 kg de carbón activo por torre',
    operatingParameters: {
      temperature: '10°C - 15°C (baja temperatura maximiza la adsorción física)',
      pressure: '1.5 a 3.0 bar con flujo laminar ascendente lento',
      throughputOrYield: 'Velocidad de paso: 1.5 a 3.0 volúmenes de lecho por hora (BV/h)'
    },
    functionDescription: 'Adsorción de micro-trazas de ácidos grasos, terpenos y aldehídos, impartiendo una suavidad táctil inconfundible y eliminando cualquier aspereza residual.',
    workingPrinciple: 'Adsorción en fisisorción y quimisorción a través de la inmensa red de microporos del carbón activado de madera de abedul siberiano (área superficial de 1000 - 1400 m²/g). Los iones de potasio y minerales de la ceniza del abedul interactúan sutilmente con el destilado generando sales orgánicas que suavizan el pH.',
    keyComponents: [
      'Toberas de retención de acero micro-ranurado (Johnson screens) de 50 micras en base',
      'Sistema de inyección de vapor de alta temperatura para regeneración in-situ del carbón',
      'Filtro de seguridad trampa de partículas (Guard Filter) de 1 micrón aguas abajo',
      'Manómetros diferenciales para monitoreo de saturación del lecho'
    ],
    maintenanceAndSanitization: 'Regeneración térmica del carbón con vapor a 130°C cada 6 meses o reemplazo completo del lecho anualmente.',
    industrialDiagramDetails: [
      'Inyección del destilado diluido por el fondo de la columna (flujo ascendente)',
      'Contacto íntimo con micro-poros de carbón vegetal',
      'Adsorción selectiva de compuestos aromáticos no deseados',
      'Salida superior hacia filtros pulidores de cuarzo o cartuchos de polipropileno'
    ],
    imagePlaceholderIcon: 'ShieldCheck',
    imageUrl: filtrationImg,
    imageAlt: 'Batería industrial de columnas de carbón activado de abedul siberiano',
    academicImportance: 'Inventado por Johann Tobias Lowitz en 1785 en San Petersburgo; es el proceso definitorio que transforma un aguardiente neutro en un verdadero vodka suave.'
  },
  {
    id: 'reverse-osmosis-plant',
    name: 'Planta de Desmineralización y Purificación de Agua por Ósmosis Inversa (RO)',
    category: 'Filtración y Purificación',
    phaseNumber: 9,
    stageName: 'Preparación del Agua de Corte y Dilución (60% del producto)',
    material: 'Tuberías sanitarias de PVDF / Acero Inoxidable AISI 316L con uniones clamp orbitales',
    capacityRange: '5,000 L a 50,000 L / hora de agua tratada',
    operatingParameters: {
      temperature: '12°C - 18°C',
      pressure: '12 a 18 bar (presión osmótica sobre membranas poliméricas)',
      throughputOrYield: 'Conductividad final < 2.0 µS/cm | Dureza total: 0.0 °dH | pH: 6.8 - 7.2'
    },
    functionDescription: 'Desalinización y desmineralización total del agua de manantial o red para eliminar cationes de calcio, magnesio, hierro, cloruros y bacterias antes del corte alcohólico.',
    workingPrinciple: 'Filtración molecular a través de membranas semipermeables de poliamida enrolladas en espiral con poros de 0.0001 micras. Solo las moléculas de H2O atraviesan la membrana hacia el permeado; los minerales disueltos y sales se concentran y descartan por el rechazo.',
    keyComponents: [
      'Filtro de arena de sílice y filtro de carbón catalítico para decloración previa',
      'Bomba multietapa vertical de alta presión en acero inoxidable 316',
      'Módulos de membranas de ósmosis inversa de alto rechazo de sales (99.5%)',
      'Esterilizador UV germicida de 254 nm y pulidor por electro-desionización (EDI)'
    ],
    maintenanceAndSanitization: 'Limpieza química periódica de membranas (CIP) con ácido cítrico (escala mineral) y EDTA básico (materia orgánica).',
    industrialDiagramDetails: [
      'Entrada de agua cruda -> Prefiltración de 5 micras',
      'Presurización de alta presión hacia membranas RO',
      'Separación: Flujo de permeado ultrapuro vs rechazo salino',
      'Almacenamiento en tanque aséptico de agua con manto de nitrógeno'
    ],
    imagePlaceholderIcon: 'Droplets',
    imageUrl: filtrationImg,
    imageAlt: 'Planta de desmineralización de agua por ósmosis inversa y pulidor EDI',
    academicImportance: 'Dado que el vodka al 40% ABV está compuesto por un 60% de agua, la pureza y balance mineral de este equipo define directamente la sedosidad y brillo cristalino del producto.'
  },
  {
    id: 'blending-chilling-tank',
    name: 'Tanques de Matrimonio, Homogeneización y Estabilización en Frío (Chill Filtration)',
    category: 'Mezcla y Envasado',
    phaseNumber: 10,
    stageName: 'Dilución a 40% ABV y Cristalización en Frío',
    material: 'Acero Inoxidable AISI 316L con doble camisa aislada y agitador magnético de fondo',
    capacityRange: '10,000 L a 100,000 L',
    operatingParameters: {
      temperature: '-4°C a -8°C durante la estabilización | 15°C durante el corte',
      pressure: 'Atmosférica con inertización por Nitrógeno grado alimentario (N2)',
      throughputOrYield: 'Tiempo de reposo / maduración molecular: 3 a 7 días'
    },
    functionDescription: 'Mezcla íntima del alcohol rectificado (96%) con agua purificada hasta alcanzar con exactitud milimétrica el 40.0% ABV, seguida de enfriamiento criogénico para precipitar aceites y ceras.',
    workingPrinciple: 'Contracción volumétrica termodinámica exotérmica (fenómeno de Mendeléyev: 50 L alcohol + 50 L agua = aprox 96.3 L mezcla). A -6°C los micro-ésteres pesados insolubles floculan y se atrapan mediante placas filtrantes lenticulares de celulosa de 0.45 micras, evitando que el vodka se enturbie cuando el consumidor lo enfríe en el congelador.',
    keyComponents: [
      'Agitador de flujo axial de bajas revoluciones para no incorporar oxígeno',
      'Serpentín interior / camisa de glicol para choque térmico a -8°C',
      'Filtro de módulos lenticulares de profundidad con medios filtrantes de celulosa purificada',
      'Densímetro / Alcoholímetro digital de laboratorio en línea por tubo en U oscilante'
    ],
    maintenanceAndSanitization: 'Enjuague con alcohol neutro caliente y sanitización con vapor estéril de grado alimentario.',
    industrialDiagramDetails: [
      'Carga precisa de alcohol a 96% y agua desmineralizada',
      'Agitación homogénea y estabilización de la reacción exotérmica',
      'Refrigeración criogénica a -6°C durante 48 horas',
      'Filtración en frío a través de módulos lenticulares de celulosa estéril'
    ],
    imagePlaceholderIcon: 'Snowflake',
    imageUrl: bottlingImg,
    imageAlt: 'Tanque de matrimonio con camisa criogénica y filtración lenticular en frío',
    academicImportance: 'Garantiza la estabilidad coloidal del vodka (limpidez perfecta a temperaturas bajo cero) y permite que los enlaces de puente de hidrógeno agua-etanol alcancen el equilibrio termodinámico.'
  },
  {
    id: 'bottling-packaging-line',
    name: 'Línea de Envasado Isométrica, Purgado por Nitrógeno y Encapsulado Automático',
    category: 'Mezcla y Envasado',
    phaseNumber: 11,
    stageName: 'Enjuague, Llenado Aséptico, Tapado y Etiquetado',
    material: 'Chasis en Acero Inoxidable AISI 304; contacto con líquido en AISI 316L y PTFE grado FDA',
    capacityRange: '2,000 a 24,000 Botellas / hora (BPH)',
    operatingParameters: {
      temperature: '18°C - 20°C',
      pressure: 'Llenado por gravedad / depresión ligera controlada electro-neumáticamente',
      throughputOrYield: 'Precisión volumétrica de llenado: +/- 0.5 mL'
    },
    functionDescription: 'Enjuague de botellas con vodka neutro, llenado a nivel constante sin turbulencia, purga de oxígeno en el cuello con nitrógeno inerte, tapado hermético y etiquetado de alta velocidad.',
    workingPrinciple: 'Bloque monoblock rotativo. Las botellas de vidrio pasan por un carrusel de enjuague donde se inyecta alcohol para esterilizarlas; luego se llenan con válvulas dosificadoras electromagnéticas sin contacto. Antes de colocar el tapón de corcho sintético o rosca de aluminio, se inyecta un pulso de gas nitrógeno que expulsa el aire atmosférico.',
    keyComponents: [
      'Rinser rotativo con toberas de inyección de alcohol de enjuague recuperable',
      'Llenadora por nivel de vacío ligero con válvulas sanitarias antigoteo',
      'Dosificador de nitrógeno líquido en el espacio de cabeza (headspace)',
      'Torreta tapadora para corcho natural/sintético o tapón irrellenable Guala de seguridad',
      'Etiquetadora autoadhesiva servomotorizada con cámara de visión artificial 360°'
    ],
    maintenanceAndSanitization: 'Limpieza automática CIP de boquillas de llenado antes de cada cambio de lote con vapor a 110°C.',
    industrialDiagramDetails: [
      'Alimentación de botellas nuevas por mesa de acumulación',
      'Enjuague interno con destilado y escurrido automático',
      'Llenado gravimétrico continuo sin turbulencia',
      'Inertización con N2 -> Colocación de cápsula y sellado térmico',
      'Inspección por visión artificial de nivel de llenado y código de lote'
    ],
    imagePlaceholderIcon: 'Box',
    imageUrl: bottlingImg,
    imageAlt: 'Línea monoblock de embotellado rotativo aséptico con purga de nitrógeno',
    academicImportance: 'La purga con gas nitrógeno evita la oxidación de los delicados compuestos volátiles en botella, asegurando una vida útil ilimitada sin degradación organoléptica.'
  }
];

export const EQUIPMENT_CATEGORIES = [
  'Todos',
  'Preparación y Molienda',
  'Maceración y Fermentación',
  'Destilación y Rectificación',
  'Filtración y Purificación',
  'Mezcla y Envasado'
] as const;
