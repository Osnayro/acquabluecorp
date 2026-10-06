/**
 * AcQuaBlue International Corp. - Corporate Interactive & AI Agent Engine
 * Features:
 * - Bilingual i18n Engine (EN / ES) with complete technical vocabulary
 * - Advanced AI Chat Engine with 26+ Grounded Intents & Lead Qualification
 * - Toast Notification System (replaces native alert popups)
 * - IntersectionObserver Scroll Reveal & Dynamic Metric Counters
 * - Back to Top smooth navigation
 * - Technical Datasheets Modal with Authentic US Brand Specs (DuPont, Rockwell, Hach, Goulds, ERI)
 * - Accessible Modal & Drawer Management
 */

// BUG-06: Restore language from localStorage
let currentLang = localStorage.getItem('acquablue_lang') || 'EN';

// AI Agent State Machine
let chatState = {
  userLanguage: currentLang,
  history: [],
  leadData: {
    name: null,
    company: null,
    email: null,
    phone: null,
    matrix: null,
    flowRate: null,
    intent: null,
    summary: null
  },
  stage: 'GREETING' // GREETING -> DISCOVERY -> REQUIREMENT -> CONTACT_CAPTURE -> CONFIRMED
};

// BUG-10: Rate-limit state for chat
let lastChatMessageTime = 0;

// Comprehensive Internationalization (i18n) Dictionary
const i18n = {
  EN: {
    // Navigation & Topbar
    "topbar.location": "U.S. HQ: Miami, Florida â€¢ Global Operations & Export Solutions",
    "nav.about": "Company",
    "nav.solutions": "Solutions & Products",
    "nav.services": "Engineering Services",
    "nav.configurations": "Treatment Schemes",
    "nav.projects": "Case Studies",
    "nav.tech": "Tech Specs",
    "nav.contact": "Contact",
    "btn.requestQuote": "Request Consultation",
    "btn.chatWA": "Chat WhatsApp",

    // Hero Section
    "hero.badge": "AcQuaBlue International Corp. â€¢ US Headquarters: Miami, FL",
    "hero.titleStart": "Advanced Water Treatment &",
    "hero.titleGradient": "Industrial Fluid Engineering",
    "hero.subtitle": "Engineered solutions for industrial, commercial, and municipal challenges. Delivering high-purity water, reverse osmosis, UV/Ozone purification, automation, and turnkey environmental systems across the Americas.",
    "hero.ctaPrimary": "Get Engineering Consult",
    "hero.ctaSecondary": "Explore Systems Catalog",
    "hero.badge1": "EPA & ISO Compliant",
    "hero.badge2": "High Recovery RO & UV",
    "hero.badge3": "Turnkey EPC Projects",
    "hero.badge4": "24/7 Technical Response",

    // Quantitative Metric Counters
    "stats.p1Title": "Years Engineering Excellence",
    "stats.p1Sub": "Proven Track Record in USA & LATAM",
    "stats.p2Title": "Projects Delivered Worldwide",
    "stats.p2Sub": "Global Reach & Rapid Port Logistics",
    "stats.p3Title": "System Uptime & Efficiency",
    "stats.p3Sub": "High Recovery & Optimum Design",
    "stats.p4Title": "Dedicated Technical Support",
    "stats.p4Sub": "24/7 Field & Remote Engineering",

    // Corporate Profile / About
    "about.badge": "Corporate Profile",
    "about.title": "AcQuaBlue International Corp.",
    "about.subtitle": "Engineering Pure Solutions for Global Industries",
    "about.p1": "Headquartered in Miami, Florida, <strong>AcQuaBlue International Corp.</strong> is the international corporate division of AcQuaBlue, specializing in state-of-the-art water purification, industrial effluent remediation, and fluid dynamics engineering.",
    "about.p2": "We bridge advanced U.S. technology standards with international industrial needs. From custom reverse osmosis skids and ultraviolet/ozone sterilization units to precision PLC instrumentation, our turnkey engineering ensures seamless compliance and operational longevity.",
    "about.pillar1Title": "Custom EPC Engineering",
    "about.pillar1Desc": "Tailored design, manufacturing, skid integration, and field deployment.",
    "about.pillar2Title": "U.S. EPA Quality Standards",
    "about.pillar2Desc": "Rigorously tested systems built to meet international environmental regulations.",
    "about.cardSub": "FLORIDA REGISTRATION & EXPORT",
    "about.specLocation": "U.S. Headquarters",
    "about.specPhone": "Direct Phone",
    "about.specEmail": "Corporate Email",
    "about.specSectors": "Core Sectors",

    // Solutions & Catalog
    "solutions.badge": "Comprehensive Portfolio",
    "solutions.title": "Products & Engineered Systems",
    "solutions.subtitle": "Explore our advanced hardware, water purification technology, chemical treatments, and precision controls designed for demanding industrial environments.",
    "tabs.all": "All Solutions",
    "tabs.water": "Water Treatment",
    "tabs.fluid": "Fluid Handling & Pumps",
    "tabs.uv": "UV & Ozone",
    "tabs.control": "Instrumentation & PLC",
    "tabs.chemicals": "Chemicals & Lab",
    
    // Product Cards
    "p1.title": "Industrial Reverse Osmosis Systems",
    "p1.desc": "High-recovery brackish and seawater desalination skids engineered with energy-recovery devices and smart PLC control.",
    "p2.title": "UV & Ozone Purification Units",
    "p2.desc": "Chemical-free germicidal disinfection systems utilizing high-intensity ultraviolet irradiation and corona discharge ozone generators.",
    "p3.title": "Pumping & Ion Exchange Skids",
    "p3.desc": "Heavy-duty chemical dosing pumps, high-pressure multistage pumps, demineralizer resins, and automated iron-removal filters.",
    "p4.title": "Instrumentation & PLC Automation",
    "p4.desc": "Real-time online water quality monitors, conductivity, pH, ORP, turbidity meters, and SCADA-integrated control panels.",
    "p5.title": "Specialty Water Chemicals",
    "p5.desc": "Antiscalants, membrane cleaners, coagulants, biocides, and corrosion inhibitors formulations designed for thermal & cooling towers.",
    "p6.title": "Lab Equipment & Field Testing",
    "p6.desc": "Portable photometers, digital titrators, benchtop spectrophotometers, and rapid microbiology testing kits for quality verification.",
    "btn.details": "View Specs",

    // Services
    "services.badge": "Lifecycle Support",
    "services.title": "Turnkey Engineering & Field Services",
    "services.subtitle": "From initial site auditing and CAD design to preventive maintenance and staff certification, AcQuaBlue provides end-to-end technical leadership.",
    "s1.title": "Technical Consulting & Audit",
    "s1.desc": "Comprehensive water source sampling, scaling risk assessment, energy efficiency evaluation, and regulatory compliance audits.",
    "s2.title": "Engineering & Design",
    "s2.desc": "Custom 3D CAD modeling, P&ID creation, hydraulic calculations, membrane projection modeling, and electrical panel engineering.",
    "s3.title": "Project Management & EPC",
    "s3.desc": "Full procurement, logistics coordination from U.S. ports, on-site construction oversight, and commissioning.",
    "s4.title": "Maintenance & Overhaul",
    "s4.desc": "Scheduled membrane CIP chemical washings, pump overhauls, sensor calibration, and rapid spare-part replenishment.",
    "s5.title": "Turnkey System Installation",
    "s5.desc": "Skid positioning, stainless-steel piping interconnections, power distribution hookups, and pre-start safety testing.",
    "s6.title": "Technical Staff Training",
    "s6.desc": "On-site operator certification, SCADA menu training, standard operating procedure (SOP) manuals, and safety protocols.",

    // Configurations
    "config.badge": "Standard Engineering Schemes",
    "config.title": "Common Treatment Configurations by Industry",
    "config.subtitle": "An informative guide to recommended technological sequences and process trains tailored to specific raw water matrices, effluent types, and industrial quality standards.",
    "cfg.matrixLabel": "Raw Water Matrix & Challenge:",
    "cfg.targetLabel": "Target Quality Standard:",
    "cfg.sequenceLabel": "Recommended Engineering Process Train:",
    "btn.consultConfig": "Consult on This Scheme",
    
    "cfg1.title": "Brackish & Seawater Desalination",
    "cfg1.tag": "High TDS Matrix",
    "cfg1.matrix": "Seawater, high-salinity brackish wells, total dissolved solids (TDS) & scaling minerals.",
    "cfg1.target": "Potable drinking water or low-salinity industrial process supply (>99% salt rejection).",
    "cfg1.step1": "Deep-bed multimedia filtration + 5Âµm cartridge microfiltration",
    "cfg1.step2": "Antiscalant chemical dosing & pH adjustment skid",
    "cfg1.step3": "High-pressure Reverse Osmosis (RO) with Energy Recovery Device (ERD)",
    "cfg1.step4": "Post-treatment re-mineralization & UV germicidal disinfection",

    "cfg2.title": "Boiler Feed & Thermal Process Water",
    "cfg2.tag": "Thermal & Power",
    "cfg2.matrix": "Well or municipal supply with hardness (Ca/Mg), reactive silica, and dissolved gases.",
    "cfg2.target": "Zero-scale, non-corrosive ultra-pure water for high-pressure steam turbines & boilers.",
    "cfg2.step1": "Sodium cation exchange resin water softeners",
    "cfg2.step2": "Activated carbon filtration for free chlorine removal",
    "cfg2.step3": "Two-pass Reverse Osmosis or Cation/Anion Demineralizers",
    "cfg2.step4": "Deaeration towers + O2 scavenger chemical dosing",

    "cfg3.title": "Pharma & Food/Beverage Purified Water",
    "cfg3.tag": "Sanitary Grade",
    "cfg3.matrix": "Potable municipal water requiring pyrogen-free, micro-biologically sterile purity.",
    "cfg3.target": "USP Purified Water & WFI standards with ultra-low conductivity & zero bacteria.",
    "cfg3.step1": "Sanitary pre-filtration + Tri-clamp softening skid",
    "cfg3.step2": "Double-pass RO in 316L electropolished stainless steel",
    "cfg3.step3": "Continuous Electrodeionization (EDI) module",
    "cfg3.step4": "185nm/254nm UV TOC destruction + Ozone recirculation loop",

    "cfg4.title": "Industrial Effluents & Zero Liquid Discharge",
    "cfg4.tag": "Wastewater & ZLD",
    "cfg4.matrix": "High COD/BOD wastewater, heavy metals, oils, suspended solids, and chemical effluents.",
    "cfg4.target": "Environmental discharge compliance or 95%+ water recovery for internal facility reuse.",
    "cfg4.step1": "Coagulation/Flocculation + Dissolved Air Flotation (DAF)",
    "cfg4.step2": "Membrane Bioreactor (MBR) or Advanced Oxidation (AOP)",
    "cfg4.step3": "High-Recovery Effluent RO (HERO / High-pressure UF)",
    "cfg4.step4": "Evaporators & Crystallizers for Zero Liquid Discharge (ZLD)",

    // Case Studies / Projects
    "projects.badge": "Proven Track Record",
    "projects.title": "Client Success Stories & Project References",
    "projects.subtitle": "Discover how our turnkey water purification systems solve complex water matrix challenges across international industries.",
    "cs1.title": "500 GPM Brackish Water RO Skid",
    "cs1.desc": "AcQuaBlue engineered and deployed a high-recovery RO skid for a major beverage processing facility, achieving 99.4% salt rejection and 82% water recovery.",
    "cs1.loc": "Caribbean Food & Beverage Plant",
    "cs2.title": "USP-Grade Pharma Pure Water Loop",
    "cs2.desc": "Turnkey 316L stainless steel purification system with continuous EDI and 185nm UV TOC destruction meeting stringent USP/FDA requirements.",
    "cs2.loc": "Central America Pharmaceutical Lab",
    "cs3.title": "ZLD Heavy Metal Remediation Train",
    "cs3.desc": "Integrated DAF, MBR, and high-pressure HERO membrane train achieving 96% effluent recycling and complete zero-liquid-discharge compliance.",
    "cs3.loc": "South America Mining & Energy Facility",

    // Technical FAQs
    "tech.badge": "Standards & Specs",
    "tech.title": "Engineering Standards & Technical FAQs",
    "faq.q1": "What membrane recovery performance do AcQuaBlue RO systems achieve?",
    "faq.a1": "Our industrial RO systems achieve high-efficiency recovery rates between 75% and 85% for brackish water sources, and up to 50% for seawater desalination, utilizing integrated Energy Recovery Devices (ERDs) to optimize electrical power consumption.",
    "faq.q2": "How does international shipping and export work from Miami, FL?",
    "faq.a2": "From our Miami headquarters, we coordinate full container load (FCL) and breakbulk skid logistics through PortMiami and Port Everglades to all Caribbean, Central, and South American destinations with full US export documentation.",
    "faq.q3": "Are UV and Ozone systems compliant with pharmaceutical standards?",
    "faq.a3": "Yes, our high-purity UV reactor chambers are built from 316L electropolished stainless steel with sanitary tri-clamp fittings, meeting USP Purified Water and WFI standards.",
    "faq.q4": "Which PLC and SCADA automation protocols are supported?",
    "faq.a4": "We engineer systems based on Allen-Bradley Rockwell CompactLogix/ControlLogix PLCs with PanelView HMIs, supporting EtherNet/IP, Modbus TCP, and secure cloud IoT telemetry.",

    // Contact Section
    "contact.badge": "Global Headquarters",
    "contact.title": "Connect with Our US Engineering Team",
    "contact.subtitle": "Ready to upgrade your water treatment infrastructure or discuss custom skid manufacturing? Contact our Miami office directly.",
    "contact.addressTitle": "U.S. Corporate Office",
    "contact.phoneTitle": "Telephone & WhatsApp",
    "contact.emailTitle": "Email Communications",
    "contact.waTitle": "Direct Engineering Support",
    "contact.waSubtitle": "Chat directly with a specialist on WhatsApp",
    "form.title": "Request Engineering Proposal",
    "form.subtitle": "Fill out your project details for an expert technical review.",
    "form.name": "Full Name *",
    "form.email": "Corporate Email *",
    "form.phone": "Phone Number *",
    "form.company": "Company / Organization",
    "form.interest": "Area of Interest",
    "form.message": "Project Description / Technical Requirements *",
    "form.btnSend": "Submit Engineering Request",

    // Footer & Modals
    "footer.desc": "AcQuaBlue International Corp. is a U.S. registered corporation delivering advanced water purification, fluid dynamics, and environmental engineering across international markets.",
    "footer.col1Title": "Solutions",
    "footer.col2Title": "Services",
    "footer.col3Title": "Corporate Office",
    "modal.title": "Request Technical Consultation",
    "modal.subtitle": "AcQuaBlue International Corp. â€¢ Miami, Florida HQ",
    "modal.btnSend": "Submit Consultation Request",
    "toast.quoteSuccess": "Consultation request received! Our Miami engineering team will review your specifications.",
    "toast.formSuccess": "Thank you! Your engineering request has been submitted to AcQuaBlue International Corp. (Miami, FL).",
    "chat.welcome": "Hello! ðŸ‘‹ I am the AI Technical Assistant for <strong>AcQuaBlue International Corp.</strong> (Miami, FL HQ).<br><br>How can I assist your engineering project today regarding reverse osmosis, UV/ozone disinfection, fluid handling, or custom water treatment schemes?"
  },
  ES: {
    // Navigation & Topbar
    "topbar.location": "Sede EE.UU.: Miami, Florida â€¢ Operaciones Globales y Soluciones de ExportaciÃ³n",
    "nav.about": "Nosotros",
    "nav.solutions": "Soluciones y Productos",
    "nav.services": "Servicios de IngenierÃ­a",
    "nav.configurations": "Configuraciones",
    "nav.projects": "Casos de Ã‰xito",
    "nav.tech": "Especificaciones",
    "nav.contact": "Contacto",
    "btn.requestQuote": "Solicitar ConsultorÃ­a",
    "btn.chatWA": "Chatear por WhatsApp",

    // Hero Section
    "hero.badge": "AcQuaBlue International Corp. â€¢ Sede EE.UU.: Miami, FL",
    "hero.titleStart": "Tratamiento de Agua Avanzado e",
    "hero.titleGradient": "IngenierÃ­a de Fluidos Industrial",
    "hero.subtitle": "Soluciones avanzadas para desafÃ­os industriales, comerciales y municipales. Suministro de agua ultra pura, Ã³smosis inversa, purificaciÃ³n por UV/Ozono, automatizaciÃ³n y proyectos de ingenierÃ­a llave en mano en todo el continente.",
    "hero.ctaPrimary": "Solicitar ConsultorÃ­a TÃ©cnica",
    "hero.ctaSecondary": "Explorar CatÃ¡logo de Equipos",
    "hero.badge1": "Cumplimiento EPA e ISO",
    "hero.badge2": "Ã“smosis e UV de Alta Eficiencia",
    "hero.badge3": "Proyectos EPC Llave en Mano",
    "hero.badge4": "Respuesta TÃ©cnica 24/7",

    // Quantitative Metric Counters
    "stats.p1Title": "AÃ±os de Excelencia en IngenierÃ­a",
    "stats.p1Sub": "Trayectoria Consolidada en EE.UU. y LATAM",
    "stats.p2Title": "Proyectos Ejecutados Globalmente",
    "stats.p2Sub": "Alcance Internacional y Despacho Portuario",
    "stats.p3Title": "Confiabilidad y Rendimiento",
    "stats.p3Sub": "Alta RecuperaciÃ³n y DiseÃ±o Eficiente",
    "stats.p4Title": "Soporte TÃ©cnico Dedicado",
    "stats.p4Sub": "Asistencia Especializada en Sitio y Remota",

    // Corporate Profile / About
    "about.badge": "Perfil Corporativo",
    "about.title": "AcQuaBlue International Corp.",
    "about.subtitle": "IngenierÃ­a de Soluciones Puras para la Industria Global",
    "about.p1": "Con sede principal en Miami, Florida, <strong>AcQuaBlue International Corp.</strong> es la divisiÃ³n internacional de AcQuaBlue, especializada en purificaciÃ³n de agua de Ãºltima generaciÃ³n, remediaciÃ³n de efluentes industriales e ingenierÃ­a de fluidos.",
    "about.p2": "Conectamos los estÃ¡ndares tecnolÃ³gicos de EE. UU. con las necesidades industriales internacionales. Desde skids personalizados de Ã³smosis inversa y esterilizadores UV/Ozono hasta instrumentaciÃ³n PLC de precisiÃ³n, garantizamos el cumplimiento normativo y la mÃ¡xima longevidad operativa.",
    "about.pillar1Title": "IngenierÃ­a EPC Personalizada",
    "about.pillar1Desc": "DiseÃ±o a la medida, fabricaciÃ³n, integraciÃ³n de skids y despliegue en campo.",
    "about.pillar2Title": "EstÃ¡ndares de Calidad US EPA",
    "about.pillar2Desc": "Sistemas probados rigurosamente construidos para cumplir normativas internacionales.",
    "about.cardSub": "REGISTRO Y EXPORTACIÃ“N DESDE FLORIDA",
    "about.specLocation": "Sede Corporativa EE.UU.",
    "about.specPhone": "TelÃ©fono Directo",
    "about.specEmail": "Correo Corporativo",
    "about.specSectors": "Sectores Clave",

    // Solutions & Catalog
    "solutions.badge": "Portafolio Integral",
    "solutions.title": "Productos y Sistemas de IngenierÃ­a",
    "solutions.subtitle": "Explore nuestra tecnologÃ­a en purificaciÃ³n de agua, tratamiento quÃ­mico, sistemas de bombeo y controles de precisiÃ³n para entornos industriales exigentes.",
    "tabs.all": "Todas las Soluciones",
    "tabs.water": "Tratamiento de Agua",
    "tabs.fluid": "Manejo de Fluidos y Bombas",
    "tabs.uv": "UV y Ozono",
    "tabs.control": "InstrumentaciÃ³n y PLC",
    "tabs.chemicals": "QuÃ­micos y Laboratorio",

    // Product Cards
    "p1.title": "Sistemas de Ã“smosis Inversa Industrial",
    "p1.desc": "Skids de desalaciÃ³n de agua salobre y de mar de alta recuperaciÃ³n con dispositivos de recuperaciÃ³n de energÃ­a y control PLC.",
    "p2.title": "Unidades de PurificaciÃ³n por UV y Ozono",
    "p2.desc": "Sistemas de desinfecciÃ³n germicida sin quÃ­micos utilizando luz ultravioleta de alta intensidad y generadores de ozono por descarga corona.",
    "p3.title": "Skids de Bombeo e Intercambio IÃ³nico",
    "p3.desc": "Bombas dosificadoras de quÃ­micos de trabajo pesado, bombas multietapa, resinas desmineralizadoras y filtros desferrizadores automÃ¡ticos.",
    "p4.title": "InstrumentaciÃ³n y AutomatizaciÃ³n PLC",
    "p4.desc": "Monitores de calidad de agua en lÃ­nea en tiempo real, medidores de conductividad, pH, ORP, turbidez y tableros SCADA integrados.",
    "p5.title": "Productos QuÃ­micos Especializados",
    "p5.desc": "Formulaciones de anti-incrustantes, limpiadores de membranas, coagulantes, biocidas e inhibidores de corrosiÃ³n para torres de enfriamiento.",
    "p6.title": "Equipos de Laboratorio y Pruebas",
    "p6.desc": "FotÃ³metros portÃ¡tiles, tituladores digitales, espectrofotÃ³metros de mesa y kits de prueba microbiolÃ³gica rÃ¡pida.",
    "btn.details": "Ver Especificaciones",

    // Services
    "services.badge": "Soporte Ciclo de Vida",
    "services.title": "Servicios de IngenierÃ­a Llave en Mano",
    "services.subtitle": "Desde auditorÃ­as iniciales y diseÃ±o en CAD hasta mantenimiento preventivo y certificaciÃ³n de personal, AcQuaBlue brinda liderazgo tÃ©cnico total.",
    "s1.title": "AsesorÃ­a TÃ©cnica y AuditorÃ­a",
    "s1.desc": "Muestreo exhaustivo de agua, evaluaciÃ³n de riesgo de incrustaciÃ³n, auditorÃ­a de eficiencia energÃ©tica y cumplimiento regulatorio.",
    "s2.title": "IngenierÃ­a y DiseÃ±o CAD",
    "s2.desc": "Modelado 3D en CAD, P&ID, cÃ¡lculos hidrÃ¡ulicos, proyecciÃ³n de membranas y diseÃ±o de tableros elÃ©ctricos.",
    "s3.title": "Gerencia de Proyectos y EPC",
    "s3.desc": "ProcuradurÃ­a completa, logÃ­stica de exportaciÃ³n desde puertos de EE. UU., supervisiÃ³n de construcciÃ³n en sitio y puesta en marcha.",
    "s4.title": "Mantenimiento y ReparaciÃ³n",
    "s4.desc": "Lavado quÃ­mico programado de membranas (CIP), reparaciÃ³n de bombas, calibraciÃ³n de sensores y repuestos originales.",
    "s5.title": "InstalaciÃ³n de Sistemas Llave en Mano",
    "s5.desc": "Posicionamiento de skids, interconexiones en tuberÃ­a de acero inoxidable, conexiones elÃ©ctricas y pruebas de seguridad pre-arranque.",
    "s6.title": "Adiestramiento de Personal TÃ©cnico",
    "s6.desc": "CertificaciÃ³n de operadores en sitio, entrenamiento en menÃºs SCADA, manuales de procedimientos (SOP) y protocolos de seguridad.",

    // Configurations
    "config.badge": "Esquemas TÃ©cnicos de Tratamiento",
    "config.title": "Configuraciones Frecuentes por Industria y Matriz de Agua",
    "config.subtitle": "GuÃ­a informativa de los trenes de proceso y secuencias tecnolÃ³gicas recomendadas segÃºn la matriz de agua a tratar y los requerimientos de la aplicaciÃ³n industrial.",
    "cfg.matrixLabel": "Origen & DesafÃ­o del Agua de AlimentaciÃ³n:",
    "cfg.targetLabel": "Objetivo de Calidad Requerido:",
    "cfg.sequenceLabel": "Tren de Proceso TecnolÃ³gico Recomendado:",
    "btn.consultConfig": "Consultar Sobre Este Esquema",

    "cfg1.title": "DesalaciÃ³n de Agua Salobre y Marina",
    "cfg1.tag": "Matriz Alta Salinidad",
    "cfg1.matrix": "Agua de mar, pozos salobres de alta salinidad, sÃ³lidos disueltos totales (TDS) y minerales incrustantes.",
    "cfg1.target": "Agua potable de consumo o agua de proceso industrial de baja salinidad (>99% de rechazo de sales).",
    "cfg1.step1": "FiltraciÃ³n multimedia en lecho profundo + microfiltraciÃ³n de cartuchos 5Âµm",
    "cfg1.step2": "Skid de dosificaciÃ³n de antincrustante quÃ­mico y ajuste de pH",
    "cfg1.step3": "Ã“smosis Inversa (RO) de Alta PresiÃ³n con Dispositivo de RecuperaciÃ³n de EnergÃ­a (ERD)",
    "cfg1.step4": "Re-mineralizaciÃ³n de post-tratamiento y desinfecciÃ³n germicida UV",

    "cfg2.title": "AlimentaciÃ³n a Calderas y Procesos TÃ©rmicos",
    "cfg2.tag": "TÃ©rmico y Potencia",
    "cfg2.matrix": "Agua de pozo o red municipal con dureza (Ca/Mg), sÃ­lice reactiva y gases disueltos.",
    "cfg2.target": "Agua ultra pura no corrosiva y libre de incrustaciones para calderas y turbinas de vapor de alta presiÃ³n.",
    "cfg2.step1": "Ablandadores / Suavizadores con resina catiÃ³nica de ciclo sodio",
    "cfg2.step2": "FiltraciÃ³n con carbÃ³n activado para remociÃ³n de cloro libre",
    "cfg2.step3": "Ã“smosis Inversa de Doble Paso o Desmineralizadores CatiÃ³n/AniÃ³n",
    "cfg2.step4": "Torres desaireadoras + InyecciÃ³n quÃ­mica de secuestrantes de oxÃ­geno",

    "cfg3.title": "Agua Purificada Grado FarmacÃ©utico y Alimentos",
    "cfg3.tag": "Grado Sanitario",
    "cfg3.matrix": "Agua potable de red municipal que requiere esterilidad microbiolÃ³gica y pureza libre de pirÃ³genos.",
    "cfg3.target": "EstÃ¡ndares USP de Agua Purificada y WFI con ultra baja conductividad y cero bacterias.",
    "cfg3.step1": "Pre-filtraciÃ³n sanitaria + Skid de ablandamiento con conexiones Tri-clamp",
    "cfg3.step2": "Ã“smosis Inversa de Doble Paso en acero inoxidable 316L electropulido",
    "cfg3.step3": "MÃ³dulo de ElectrodesionizaciÃ³n Continua (EDI)",
    "cfg3.step4": "DestrucciÃ³n de TOC por UV 185nm/254nm + Bucle de recirculaciÃ³n con Ozono",

    "cfg4.title": "Efluentes Industriales y Descarga Cero (ZLD)",
    "cfg4.tag": "Efluentes y ZLD",
    "cfg4.matrix": "Efluentes industriales con alto DQO/DBO, metales pesados, aceites, sÃ³lidos suspendidos y quÃ­micos.",
    "cfg4.target": "Cumplimiento de normativas de vertido ambiental o reciclaje del 95%+ para reuso interno en planta.",
    "cfg4.step1": "CoagulaciÃ³n/FloculaciÃ³n + FlotaciÃ³n por Aire Disuelto (DAF)",
    "cfg4.step2": "Biorreactor de Membrana (MBR) u OxidaciÃ³n Avanzada (AOP)",
    "cfg4.step3": "Ã“smosis Inversa de Alta RecuperaciÃ³n para Efluentes (HERO / UF)",
    "cfg4.step4": "Evaporadores y Cristalizadores para Descarga Cero de LÃ­quidos (ZLD)",

    // Case Studies / Projects
    "projects.badge": "Casos de Ã‰xito",
    "projects.title": "Historias de Ã‰xito y Referencias de Proyectos",
    "projects.subtitle": "Conozca cÃ³mo nuestros sistemas llave en mano resuelven los desafÃ­os hÃ­dricos mÃ¡s exigentes en industrias de todo el continente.",
    "cs1.title": "Skid de Ã“smosis Inversa 500 GPM",
    "cs1.desc": "AcQuaBlue diseÃ±Ã³ y despachÃ³ un skid de RO para una planta de alimentos y bebidas, logrando 99.4% de rechazo salino y 82% de recuperaciÃ³n.",
    "cs1.loc": "Planta de Alimentos y Bebidas en el Caribe",
    "cs2.title": "Lazo de Agua Purificada Grado USP",
    "cs2.desc": "Sistema llave en mano en acero inoxidable 316L con EDI continuo y destrucciÃ³n de TOC por UV 185nm conforme a estÃ¡ndares USP/FDA.",
    "cs2.loc": "Laboratorio FarmacÃ©utico en CentroamÃ©rica",
    "cs3.title": "Tren ZLD para RemediaciÃ³n de Metales",
    "cs3.desc": "Tren integrado DAF, MBR y membranas HERO de alta presiÃ³n que logra 96% de reuso de efluentes y cumplimiento estricto de Descarga Cero.",
    "cs3.loc": "Complejo Minero y EnergÃ©tico en SudamÃ©rica",

    // Technical FAQs
    "tech.badge": "EstÃ¡ndares y Fichas",
    "tech.title": "EstÃ¡ndares de IngenierÃ­a y Preguntas Frecuentes",
    "faq.q1": "Â¿QuÃ© rendimiento de recuperaciÃ³n logran los sistemas RO de AcQuaBlue?",
    "faq.a1": "Nuestros sistemas de RO industrial alcanzan altos niveles de recuperaciÃ³n entre 75% y 85% para agua salobre y hasta 50% en agua de mar, mediante el uso de Dispositivos de RecuperaciÃ³n de EnergÃ­a (ERD) que optimizan el consumo elÃ©ctrico.",
    "faq.q2": "Â¿CÃ³mo funciona la logÃ­stica de exportaciÃ³n desde Miami, FL?",
    "faq.a2": "Desde nuestra sede en Miami coordinamos envÃ­os en contenedores completos (FCL) y skids consolidados a travÃ©s de PortMiami y Port Everglades hacia destinos del Caribe y LatinoamÃ©rica, con documentaciÃ³n de exportaciÃ³n de EE. UU.",
    "faq.q3": "Â¿Los sistemas UV y de Ozono cumplen con normativas farmacÃ©uticas?",
    "faq.a3": "SÃ­, nuestras cÃ¡maras reactoras UV estÃ¡n fabricadas en acero inoxidable 316L electropulido con conexiones sanitarias tri-clamp, cumpliendo con los estÃ¡ndares de Agua Purificada y WFI de la USP.",
    "faq.q4": "Â¿QuÃ© protocolos de automatizaciÃ³n PLC y SCADA son compatibles?",
    "faq.a4": "DiseÃ±amos con PLCs Allen-Bradley Rockwell CompactLogix/ControlLogix y HMIs PanelView, con soporte nativo para EtherNet/IP, Modbus TCP y telemetrÃ­a IoT en la nube.",

    // Contact Section
    "contact.badge": "Sede Corporativa Global",
    "contact.title": "Conecte con Nuestro Equipo de IngenierÃ­a en EE.UU.",
    "contact.subtitle": "Â¿Listo para actualizar su infraestructura de agua o cotizar la fabricaciÃ³n de un skid? Contacte a nuestra oficina en Miami.",
    "contact.addressTitle": "Oficina Corporativa EE.UU.",
    "contact.phoneTitle": "TelÃ©fono y WhatsApp",
    "contact.emailTitle": "Comunicaciones ElectrÃ³nicas",
    "contact.waTitle": "AtenciÃ³n TÃ©cnica Directa",
    "contact.waSubtitle": "Chatee directamente con un especialista en WhatsApp",
    "form.title": "Solicitar Propuesta de IngenierÃ­a",
    "form.subtitle": "Complete los datos de su proyecto para una revisiÃ³n tÃ©cnica por nuestros ingenieros.",
    "form.name": "Nombre Completo *",
    "form.email": "Correo Corporativo *",
    "form.phone": "TelÃ©fono *",
    "form.company": "Empresa / OrganizaciÃ³n",
    "form.interest": "Ãrea de InterÃ©s",
    "form.message": "DescripciÃ³n del Proyecto / Requerimientos TÃ©cnicos *",
    "form.btnSend": "Enviar Solicitud de IngenierÃ­a",

    // Footer & Modals
    "footer.desc": "AcQuaBlue International Corp. es una corporaciÃ³n registrada en EE. UU. que ofrece soluciones avanzadas de purificaciÃ³n de agua, dinÃ¡mica de fluidos e ingenierÃ­a ambiental.",
    "footer.col1Title": "Soluciones",
    "footer.col2Title": "Servicios",
    "footer.col3Title": "Oficina Corporativa",
    "modal.title": "Solicitar ConsultorÃ­a TÃ©cnica",
    "modal.subtitle": "AcQuaBlue International Corp. â€¢ Sede Miami, Florida",
    "modal.btnSend": "Enviar Solicitud de ConsultorÃ­a",
    "toast.quoteSuccess": "Â¡Solicitud recibida! Nuestro equipo de ingenierÃ­a en Miami revisarÃ¡ sus especificaciones.",
    "toast.formSuccess": "Â¡Gracias! Su solicitud de ingenierÃ­a ha sido enviada a AcQuaBlue International Corp. (Miami, FL).",
    "chat.welcome": "Â¡Hola! ðŸ‘‹ Soy el Asistente TÃ©cnico IA de <strong>AcQuaBlue International Corp.</strong> (Sede Miami, FL).<br><br>Â¿En quÃ© puedo orientar su proyecto de ingenierÃ­a hoy respecto a Ã³smosis inversa, desinfecciÃ³n UV/ozono, bombeo de fluidos o esquemas de tratamiento de agua a la medida?"
  }
};

// Technical Specification Datasheets Data (Featuring Genuine US Component Brands)
const productSpecs = {
  "ro-skid": {
    title: "Industrial Reverse Osmosis Skid (RO-Series)",
    category: "Water Treatment Systems",
    specs: [
      { label: "US Membrane Brand", value: "DuPontâ„¢ FilmTecâ„¢ BW30-400 / SW30HR High-Rejection Elements" },
      { label: "Pressure Vessels", value: "Pentairâ„¢ CodeLineâ„¢ 8\" ASME FRP Multi-Port Pressure Vessels" },
      { label: "Energy Recovery (ERD)", value: "Energy Recovery Inc. (ERIâ„¢) PXÂ® Pressure Exchanger (>97% eff.)" },
      { label: "Automation PLC", value: "Allen-BradleyÂ® CompactLogixâ„¢ 5380 with PanelViewâ„¢ Plus 7 HMI" },
      { label: "High-Pressure Pumps", value: "Goulds PumpsÂ® (Xylem USA) / Danfoss APP Duplex Stainless Steel" },
      { label: "Frame Construction", value: "Heavy-Duty Structural 316 Stainless Steel Skid with Vibro-Mounts" },
      { label: "Compliance & Certifications", value: "US EPA Drinking Water / NSF/ANSI 61 / ISO 9001:2015" }
    ]
  },
  "uv-ozone": {
    title: "UV & Ozone Germicidal Purification Skid",
    category: "Ultraviolet & Ozone Technologies",
    specs: [
      { label: "US UV Chamber Brand", value: "Atlantic UltravioletÂ® / AquafineÂ® Electropolished 316L Reactor" },
      { label: "Germicidal Lamps", value: "US High-Output Amalgam Quartz Lamps (12,000 hrs lamp life)" },
      { label: "Ozone Generator", value: "Corona Discharge Ozone Cell with High-Purity O2 Concentrator" },
      { label: "Sanitary Fittings", value: "Tri-Clamp Sanitary Electropolished Ra < 0.38Âµm (USP Grade)" },
      { label: "TOC Destruction", value: "Dual Wavelength 185nm / 254nm for Ultra-Low Residual TOC" },
      { label: "Pathogen Control", value: "99.99% (4-log) Eradication of Viruses, Bacteria, Cryptosporidium" }
    ]
  },
  "pumps-ion": {
    title: "High-Pressure Pumping & Ion Exchange Demineralizer",
    category: "Fluid Handling & Demineralization",
    specs: [
      { label: "US Pump Brands", value: "Goulds PumpsÂ® (Xylem USA) Multistage / Milton RoyÂ® Dosing" },
      { label: "Ion Exchange Resins", value: "DuPontâ„¢ AmberLiteâ„¢ HCR-S (Cation) / IRA-400 (Anion) Grade Resins" },
      { label: "Vessel Construction", value: "Structural FRP / ASME Rubber-Lined Carbon Steel" },
      { label: "Valve Automation", value: "George Fischer / Bray Pneumatic Actuated SS Butterfly Valves" },
      { label: "Chemical Resistance", value: "PVDF / PTFE / Hastelloy-C Wetted Parts for Aggressive Media" }
    ]
  },
  "plc-ctrl": {
    title: "SCADA & Integrated PLC Control Cabinet",
    category: "Instrumentation & Industrial Automation",
    specs: [
      { label: "US Control Core", value: "Allen-BradleyÂ® Rockwell AutomationÂ® CompactLogixâ„¢ Controller" },
      { label: "Touchscreen Interface", value: "Rockwell PanelViewâ„¢ Plus 7 High-Resolution Color Touch HMI" },
      { label: "Telemetry & SCADA", value: "Modbus TCP/IP, EtherNet/IP & Secure Remote Cloud IoT Portal" },
      { label: "Enclosure Rating", value: "Weatherproof NEMA 4X / IP66 Stainless Steel Enclosure" },
      { label: "Safety Circuits", value: "SIL-2 Certified Emergency E-Stop & Auto Pressure Relievers" }
    ]
  },
  "chem-line": {
    title: "Specialty Industrial Water Chemicals",
    category: "Chemical Solutions",
    specs: [
      { label: "US Chemical Line", value: "DuPontâ„¢ AmberPackâ„¢ & US Industrial Reverse Osmosis Antiscalants" },
      { label: "Certifications", value: "NSF / ANSI Standard 60 Approved for Potable Drinking Water" },
      { label: "Packaging Options", value: "55-Gal Heavy-Duty Drums & 275-Gal UN-Certified IBC Totes" },
      { label: "Safety Compliance", value: "Full US OSHA GHS SDS Documentation & Dosing Guidelines" },
      { label: "Product Range", value: "Broad-Spectrum Antiscalants, CIP Acid/Alkaline Cleaners, Biocides" }
    ]
  },
  "lab-spec": {
    title: "Precision Water Quality Analytical & Lab Equipment",
    category: "Laboratory & Field Analysis",
    specs: [
      { label: "US Instrumentation Brand", value: "HachÂ® Company USA Analytical Laboratory Instruments" },
      { label: "Spectrophotometers", value: "HachÂ® DR3900 Benchtop & DR900 Portable Photometers" },
      { label: "Field Calibration", value: "NIST Traceable Primary Calibration Standards & Reagents" },
      { label: "Tested Parameters", value: "Turbidity, pH, ORP, Conductivity, Dissolved O2, Chlorine, COD/BOD" },
      { label: "Data Logging", value: "USB & Bluetooth Export to LIMS / Excel Quality Management" }
    ]
  }
};

/* ==========================================================================
   ENHANCED AI CHAT ASSISTANT (26+ GROUNDED INTENTS & LEAD QUALIFICATION)
   ========================================================================== */

const chatIntents = [
  {
    id: 'greeting',
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'hola', 'buenos dias', 'buenos dÃ­as', 'buenas tardes', 'saludos', 'buen dia', 'buen dÃ­a'],
    response: {
      EN: `Hello! ðŸ‘‹ Welcome to <strong>AcQuaBlue International Corp.</strong> (Miami, FL).<br><br>We specialize in custom Reverse Osmosis skids, UV/Ozone systems, PLC automation, and turnkey EPC projects across the Americas.<br><br>What type of water treatment challenge or application can we help you solve today?`,
      ES: `Â¡Hola! ðŸ‘‹ Le damos la bienvenida a <strong>AcQuaBlue International Corp.</strong> (Miami, FL).<br><br>Somos especialistas en skids de Ã“smosis Inversa a la medida, sistemas de UV/Ozono, automatizaciÃ³n PLC y proyectos EPC llave en mano en todo el continente.<br><br>Â¿QuÃ© tipo de aplicaciÃ³n o desafÃ­o hÃ­drico podemos orientarle hoy?`
    }
  },
  {
    id: 'company-info',
    patterns: ['who are you', 'about', 'company', 'what do you do', 'quienes son', 'quiÃ©nes son', 'que hacen', 'quÃ© hacen', 'empresa', 'corporativo', 'informacion', 'informaciÃ³n'],
    response: {
      EN: `ðŸ¢ <strong>AcQuaBlue International Corp.</strong> is the international corporate division based in Miami, Florida.<br><br>We design, engineer, manufacture, and export industrial water purification skids, fluid dynamics systems, and chemical treatment solutions with US EPA and ISO standards.<br><br>Would you like to review our catalog or discuss an engineering consult?`,
      ES: `ðŸ¢ <strong>AcQuaBlue International Corp.</strong> es la divisiÃ³n corporativa internacional con sede en Miami, Florida.<br><br>DiseÃ±amos, fabricamos y exportamos skids de purificaciÃ³n de agua, ingenierÃ­a de fluidos y soluciones quÃ­micas bajo normativas US EPA e ISO.<br><br>Â¿Desea explorar nuestro catÃ¡logo de equipos o solicitar una consulta tÃ©cnica?`
    }
  },
  {
    id: 'ro-systems',
    patterns: ['osmosis', 'reverse osmosis', 'ro', 'desalination', 'desalacion', 'desalaciÃ³n', 'Ã³smosis', 'osmosis inversa', 'tds', 'salt rejection', 'salobre', 'brackish', 'seawater', 'agua de mar'],
    leadMatrix: 'Reverse Osmosis / High TDS Desalination',
    response: {
      EN: `ðŸŒŠ <strong>AcQuaBlue Industrial Reverse Osmosis (RO) Skids:</strong><br>
â€¢ <strong>Membranes:</strong> DuPontâ„¢ FilmTecâ„¢ high-rejection elements (>99% salt rejection).<br>
â€¢ <strong>Pressure Vessels:</strong> Pentairâ„¢ CodeLineâ„¢ ASME FRP.<br>
â€¢ <strong>Energy Recovery:</strong> Energy Recovery Inc. (ERIâ„¢) PX isobaric devices saving up to 60% energy.<br>
â€¢ <strong>Controls:</strong> Allen-BradleyÂ® CompactLogix PLC with touchscreen HMI.<br><br>
Could you share your <strong>feed water TDS, flow rate requirement, or email/phone</strong> so our Miami team can prepare a CAD layout & proposal?`,
      ES: `ðŸŒŠ <strong>Skids de Ã“smosis Inversa Industrial AcQuaBlue (RO):</strong><br>
â€¢ <strong>Membranas:</strong> Elementos DuPontâ„¢ FilmTecâ„¢ de alto rechazo (>99% de sales).<br>
â€¢ <strong>Portamembranas:</strong> Pentairâ„¢ CodeLineâ„¢ en FRP norma ASME.<br>
â€¢ <strong>RecuperaciÃ³n EnergÃ©tica:</strong> CÃ¡maras isobÃ¡ricas ERIâ„¢ con hasta 60% de ahorro elÃ©ctrico.<br>
â€¢ <strong>Control:</strong> PLC Allen-BradleyÂ® CompactLogix con pantalla tÃ¡ctil HMI.<br><br>
Â¿PodrÃ­a facilitarnos el <strong>TDS del agua, caudal requerido o su correo/telÃ©fono</strong> para enviarle planos CAD y propuesta tÃ©cnica?`
    }
  },
  {
    id: 'uv-systems',
    patterns: ['uv', 'ultraviolet', 'ultravioleta', 'germicidal', 'germicida', 'uv light', 'luz uv', 'desinfeccion uv', 'desinfecciÃ³n uv'],
    leadMatrix: 'UV Purification Systems',
    response: {
      EN: `ðŸ’¡ <strong>AcQuaBlue Ultraviolet (UV) Disinfection Skids:</strong><br>
â€¢ <strong>Chambers:</strong> Atlantic UltravioletÂ® / AquafineÂ® 316L electropolished stainless steel.<br>
â€¢ <strong>Performance:</strong> 99.99% (4-log) kill rate for pathogens, viruses, E. coli, Cryptosporidium.<br>
â€¢ <strong>Dual Wavelength:</strong> 254nm germicidal + 185nm TOC destruction for pharmaceutical loops.<br><br>
Please provide your <strong>flow rate (GPM / mÂ³/h) and email</strong> for dimensional drawings & quotes.`,
      ES: `ðŸ’¡ <strong>Sistemas de DesinfecciÃ³n Ultravioleta (UV) AcQuaBlue:</strong><br>
â€¢ <strong>CÃ¡maras:</strong> Reactores Atlantic UltravioletÂ® / AquafineÂ® en acero 316L electropulido.<br>
â€¢ <strong>Eficacia:</strong> 99.99% de eliminaciÃ³n de virus, bacterias y Cryptosporidium sin quÃ­micos.<br>
â€¢ <strong>Doble Longitud:</strong> 254nm germicida + 185nm para destrucciÃ³n de TOC en lazos farmacÃ©uticos.<br><br>
IndÃ­quenos su <strong>caudal de trabajo y correo corporativo</strong> para enviarle planos y cotizaciÃ³n.`
    }
  },
  {
    id: 'ozone-systems',
    patterns: ['ozone', 'ozono', 'corona discharge', 'descarga corona', 'ozonizacion', 'ozonizaciÃ³n', 'o3'],
    leadMatrix: 'Ozone Oxidation Systems',
    response: {
      EN: `âš¡ <strong>Corona Discharge Ozone Generation Systems:</strong><br>
â€¢ High-concentration ozone output with integrated oxygen concentrator skids.<br>
â€¢ Ideal for pharmaceutical water loops, beverage bottling, and advanced oxidation (AOP) of recalcitrant organics.<br>
â€¢ Automated ambient ozone destruct sensors & safety interlocks.<br><br>
Leave your <strong>contact information</strong> to speak with an Ozone specialist from Miami.`,
      ES: `âš¡ <strong>Generadores de Ozono por Descarga Corona:</strong><br>
â€¢ Alta concentraciÃ³n de O3 con skids concentradores de oxÃ­geno integrados.<br>
â€¢ Ideal para lazos sanitarios farmacÃ©uticos, embotelladoras y procesos de OxidaciÃ³n Avanzada (AOP).<br>
â€¢ Sensores automÃ¡ticos de destrucciÃ³n de ozono ambiental y enclavamientos de seguridad.<br><br>
DÃ©jenos sus <strong>datos de contacto</strong> para coordinar una llamada con un especialista.`
    }
  },
  {
    id: 'pumps',
    patterns: ['pump', 'pumping', 'bomba', 'bombas', 'dosing', 'dosificacion', 'dosificaciÃ³n', 'multistage', 'multietapa', 'goulds', 'milton roy', 'xylem'],
    leadMatrix: 'Fluid Handling & Pumping Skids',
    response: {
      EN: `ðŸ’§ <strong>Industrial Pumping & Chemical Dosing Systems:</strong><br>
â€¢ <strong>US Brands:</strong> Goulds PumpsÂ® (Xylem USA) multistage high-pressure pumps.<br>
â€¢ <strong>Dosing:</strong> Milton RoyÂ® precision diaphragm & electromagnetic chemical metering pumps.<br>
â€¢ <strong>Materials:</strong> 316SS, Duplex 2205, PVDF, and Hastelloy-C for aggressive liquids.<br><br>
What head pressure (PSI/bar) and flow rate do you require?`,
      ES: `ðŸ’§ <strong>Sistemas de Bombeo y DosificaciÃ³n QuÃ­mica:</strong><br>
â€¢ <strong>Marcas EE.UU.:</strong> Bombas multietapa de alta presiÃ³n Goulds PumpsÂ® (Xylem USA).<br>
â€¢ <strong>DosificaciÃ³n:</strong> Bombas electromagnÃ©ticas y de diafragma Milton RoyÂ® de alta precisiÃ³n.<br>
â€¢ <strong>Materiales:</strong> Acero 316, Duplex 2205, PVDF y Hastelloy-C para fluidos agresivos.<br><br>
Â¿QuÃ© presiÃ³n de descarga (PSI/bar) y caudal requiere su proceso?`
    }
  },
  {
    id: 'ion-exchange',
    patterns: ['ion exchange', 'resin', 'resina', 'resinas', 'softener', 'ablandador', 'suavizador', 'deionizer', 'demineralizer', 'desmineralizador', 'desmineralizacion', 'desmineralizaciÃ³n', 'edi'],
    leadMatrix: 'Ion Exchange & Demineralizers',
    response: {
      EN: `ðŸ§ª <strong>Ion Exchange Demineralizers & Softening Skids:</strong><br>
â€¢ <strong>Resins:</strong> DuPontâ„¢ AmberLiteâ„¢ HCR-S cation and IRA-400 anion exchange media.<br>
â€¢ <strong>Applications:</strong> Boiler feed water conditioning, zero-hardness softening, and EDI polishing loops.<br>
â€¢ Automated multi-port valve regeneration cycles.<br><br>
Provide your raw water hardness & TDS for resin vessel sizing.`,
      ES: `ðŸ§ª <strong>Desmineralizadores e Intercambio IÃ³nico:</strong><br>
â€¢ <strong>Resinas:</strong> Medios de intercambio DuPontâ„¢ AmberLiteâ„¢ catiÃ³nica y aniÃ³nica.<br>
â€¢ <strong>Aplicaciones:</strong> Acondicionamiento para calderas, suavizadores de agua y pulido por EDI.<br>
â€¢ RegeneraciÃ³n automÃ¡tica con vÃ¡lvulas multivÃ­a programables.<br><br>
FacilÃ­tenos la dureza y TDS del agua para dimensionar las columnas.`
    }
  },
  {
    id: 'plc-scada',
    patterns: ['plc', 'scada', 'automation', 'automatizacion', 'automatizaciÃ³n', 'control panel', 'tablero', 'hmi', 'allen-bradley', 'allen bradley', 'rockwell', 'compactlogix'],
    leadMatrix: 'Instrumentation & PLC Automation',
    response: {
      EN: `ðŸ–¥ï¸ <strong>Industrial Automation & PLC/SCADA Engineering:</strong><br>
â€¢ <strong>Core:</strong> Allen-BradleyÂ® Rockwell CompactLogixâ„¢ & ControlLogixâ„¢ PLCs.<br>
â€¢ <strong>HMI:</strong> High-res PanelViewâ„¢ Plus 7 with intuitive process mimic diagrams.<br>
â€¢ <strong>Protocols:</strong> EtherNet/IP, Modbus TCP, BACnet, and Cloud IoT Telemetry for remote diagnostics.<br>
â€¢ <strong>Enclosures:</strong> NEMA 4X / IP66 316 Stainless Steel cabinets.<br><br>
Would you like a custom control architecture for your plant?`,
      ES: `ðŸ–¥ï¸ <strong>AutomatizaciÃ³n Industrial y Tableros PLC/SCADA:</strong><br>
â€¢ <strong>Control:</strong> PLCs Allen-BradleyÂ® Rockwell CompactLogixâ„¢ y ControlLogixâ„¢.<br>
â€¢ <strong>Interfaz:</strong> Pantallas PanelViewâ„¢ Plus 7 con diagramas mÃ­micos de proceso.<br>
â€¢ <strong>Protocolos:</strong> EtherNet/IP, Modbus TCP y telemetrÃ­a IoT en la nube para diagnÃ³stico remoto.<br>
â€¢ <strong>Gabinetes:</strong> NEMA 4X en acero inoxidable 316.<br><br>
Â¿Desea una propuesta de arquitectura de control para su planta?`
    }
  },
  {
    id: 'instrumentation',
    patterns: ['instrument', 'instrumentacion', 'instrumentaciÃ³n', 'sensor', 'sensores', 'ph', 'conductivity', 'conductividad', 'turbidity', 'turbidez', 'orp', 'meter', 'medidor'],
    leadMatrix: 'Online Instrumentation',
    response: {
      EN: `ðŸ“Š <strong>Online Analytical Instrumentation:</strong><br>
â€¢ Real-time digital transmitters for pH, Conductivity/Resistivity, Dissolved Oxygen, Turbidity, and ORP.<br>
â€¢ 4-20mA & digital bus outputs with NIST-traceable calibration sensors.<br>
â€¢ Integrated sample flow cells and auto-cleaning attachments.<br><br>
Share your target parameters for sensor selection.`,
      ES: `ðŸ“Š <strong>InstrumentaciÃ³n AnalÃ­tica en LÃ­nea:</strong><br>
â€¢ Transmisores digitales en tiempo real para pH, Conductividad, OxÃ­geno Disuelto, Turbidez y ORP.<br>
â€¢ Salidas 4-20mA y comunicaciÃ³n digital con sensores calibrables trazables a NIST.<br>
â€¢ Celdas de flujo integradas y sistemas de autolimpieza.<br><br>
IndÃ­quenos los parÃ¡metros que requiere monitorear.`
    }
  },
  {
    id: 'chemicals',
    patterns: ['chemical', 'chemicals', 'quimico', 'quÃ­mico', 'quimicos', 'quÃ­micos', 'antiscalant', 'antiincrustante', 'anti-incrustante', 'biocide', 'biocida', 'coagulant', 'coagulante', 'inhibitor', 'inhibidor', 'cip cleaner'],
    leadMatrix: 'Specialty Water Chemicals',
    response: {
      EN: `ðŸ§ª <strong>Specialty Water Treatment Chemicals:</strong><br>
â€¢ <strong>RO Formulations:</strong> DuPontâ„¢ AmberPackâ„¢ high-performance antiscalants & broad-spectrum biocides.<br>
â€¢ <strong>Cooling Towers & Boilers:</strong> Corrosion inhibitors, scale dispersants, and microbiological control programs.<br>
â€¢ <strong>NSF/ANSI 60:</strong> Potable water certified formulations.<br>
â€¢ <strong>Packaging:</strong> 55-gal drums and 275-gal IBC totes with full SDS documentation.<br><br>
Consult us based on your application and required volume.`,
      ES: `ðŸ§ª <strong>Productos QuÃ­micos Especializados para Tratamiento de Agua:</strong><br>
â€¢ <strong>Formulaciones RO:</strong> Anti-incrustantes de alto rendimiento DuPontâ„¢ AmberPackâ„¢ y biocidas de amplio espectro.<br>
â€¢ <strong>Torres de Enfriamiento y Calderas:</strong> Inhibidores de corrosiÃ³n, dispersantes de incrustaciones y programas microbiolÃ³gicos.<br>
â€¢ <strong>NSF/ANSI 60:</strong> AprobaciÃ³n NSF/ANSI 60 para agua potable.<br>
â€¢ <strong>PresentaciÃ³n:</strong> Tambores de 55 galones y contenedores IBC de 275 galones con hojas SDS.<br><br>
ConsÃºltenos segÃºn su aplicaciÃ³n y volumen requerido.`
    }
  },
  {
    id: 'lab-equipment',
    patterns: ['lab', 'laboratory', 'laboratorio', 'photometer', 'fotometro', 'fotÃ³metro', 'spectrophotometer', 'espectrofotometro', 'espectrofotÃ³metro', 'hach', 'testing kit', 'analisis', 'anÃ¡lisis'],
    leadMatrix: 'Laboratory & Analytical Equipment',
    response: {
      EN: `ðŸ”¬ <strong>Laboratory & Field Testing Equipment:</strong><br>
â€¢ <strong>Brand:</strong> HachÂ® Company USA analytical equipment and spectrophotometers (DR3900 / DR900).<br>
â€¢ Digital titrators, portable colorimeters, turbidity meters, and rapid microbiological test kits.<br>
â€¢ NIST-traceable standards and pre-measured reagent pillows for field QA/QC.<br><br>
Which water quality parameters do you need to verify in your lab?`,
      ES: `ðŸ”¬ <strong>Equipos de Laboratorio y AnÃ¡lisis en Campo:</strong><br>
â€¢ <strong>Marca:</strong> Equipos analÃ­ticos y espectrofotÃ³metros HachÂ® Company USA (DR3900 / DR900).<br>
â€¢ Tituladores digitales, colorÃ­metros portÃ¡tiles, turbidÃ­metros y kits microbiolÃ³gicos rÃ¡pidos.<br>
â€¢ Patrones certificados trazables a NIST y reactivos en sobre dosificado para control de calidad.<br><br>
Â¿QuÃ© parÃ¡metros necesita medir en su laboratorio?`
    }
  },
  {
    id: 'boiler-water',
    patterns: ['boiler', 'caldera', 'calderas', 'steam', 'vapor', 'thermal', 'termico', 'tÃ©rmico', 'deaerator', 'desaireador', 'feedwater', 'agua de caldera'],
    leadMatrix: 'Boiler Feed Water Conditioning',
    response: {
      EN: `ðŸ”¥ <strong>Boiler Feed Water & Thermal Treatment Train:</strong><br>
â€¢ Complete sequence: Softening â†’ Activated Carbon â†’ Two-Pass RO or Demineralizer â†’ Thermal Deaeration + O2 Scavenger.<br>
â€¢ Guarantees zero-scale silica removal and non-corrosive ultra-pure feed water for high-pressure steam boilers.<br><br>
Share your boiler operating pressure (PSI/bar) and steam generation capacity.`,
      ES: `ðŸ”¥ <strong>Tren de Tratamiento para Agua de Calderas:</strong><br>
â€¢ Secuencia recomendada: SuavizaciÃ³n â†’ CarbÃ³n Activado â†’ RO Doble Paso / Desmineralizador â†’ DesaireaciÃ³n + Secuestrante de OxÃ­geno.<br>
â€¢ Garantiza cero incrustaciones, remociÃ³n de sÃ­lice y agua ultra pura no corrosiva para calderas de alta presiÃ³n.<br><br>
IndÃ­quenos la presiÃ³n de operaciÃ³n de su caldera (PSI/bar) y capacidad de vapor.`
    }
  },
  {
    id: 'pharma-water',
    patterns: ['pharma', 'pharmaceutical', 'farmaceutico', 'farmacÃ©utico', 'food', 'beverage', 'alimento', 'bebida', 'alimentos', 'bebidas', 'usp', 'wfi', 'purified water', 'agua purificada', 'sanitario', 'sanitary'],
    leadMatrix: 'Sanitary Grade & USP Water',
    response: {
      EN: `ðŸ’Š <strong>Pharma & Food/Beverage High-Purity Water:</strong><br>
â€¢ <strong>Standard:</strong> Full compliance with USP Purified Water and WFI (Water for Injection) standards.<br>
â€¢ <strong>Engineering:</strong> 316L electropolished stainless steel skids with orbital welding & Tri-clamp sanitary fittings.<br>
â€¢ <strong>Process:</strong> Softening â†’ Double-Pass RO â†’ Continuous EDI â†’ 185nm UV TOC destruction + Ozone recirculation loop.<br><br>
Would you like to review sanitary P&ID drawings with our engineering team?`,
      ES: `ðŸ’Š <strong>Agua Purificada Grado FarmacÃ©utico y Alimentos:</strong><br>
â€¢ <strong>Normativa:</strong> Cumplimiento riguroso de estÃ¡ndares USP de Agua Purificada y WFI.<br>
â€¢ <strong>IngenierÃ­a:</strong> Skids en acero 316L electropulido con soldadura orbital y conexiones Tri-clamp.<br>
â€¢ <strong>Proceso:</strong> SuavizaciÃ³n â†’ RO Doble Paso â†’ EDI Continuo â†’ DestrucciÃ³n de TOC por UV 185nm + Bucle de Ozono.<br><br>
Â¿Desea revisar planos P&ID sanitarios con nuestro equipo de ingenierÃ­a?`
    }
  },
  {
    id: 'wastewater-zld',
    patterns: ['wastewater', 'effluent', 'efluente', 'efluentes', 'zld', 'zero liquid', 'descarga cero', 'residual', 'residuales', 'cod', 'bod', 'dqo', 'dbo', 'heavy metal', 'metales pesados', 'daf', 'mbr'],
    leadMatrix: 'Industrial Wastewater & ZLD',
    response: {
      EN: `â™»ï¸ <strong>Industrial Wastewater & Zero Liquid Discharge (ZLD):</strong><br>
â€¢ Integrated trains: DAF (Dissolved Air Flotation) â†’ Membrane Bioreactor (MBR) â†’ High-Recovery HERO RO â†’ Evaporator/Crystallizer.<br>
â€¢ Recovers 95%+ of industrial process water for internal plant recycling, eliminating environmental discharge penalties.<br><br>
Please provide your effluent COD/BOD and discharge limits for engineering evaluation.`,
      ES: `â™»ï¸ <strong>Efluentes Industriales y Descarga Cero (ZLD):</strong><br>
â€¢ Trenes integrados: DAF (FlotaciÃ³n por Aire) â†’ Biorreactor de Membrana (MBR) â†’ RO de Alta RecuperaciÃ³n HERO â†’ Evaporador/Cristalizador.<br>
â€¢ Recupera mÃ¡s del 95% del agua de proceso para recirculaciÃ³n interna, eliminando multas de vertido ambiental.<br><br>
IndÃ­quenos los valores de DQO/DBO y caudal del efluente para evaluar su tren de tratamiento.`
    }
  },
  {
    id: 'consulting-audit',
    patterns: ['consult', 'consultoria', 'consultorÃ­a', 'audit', 'auditoria', 'auditorÃ­a', 'assessment', 'asesoria', 'asesorÃ­a', 'technical review'],
    leadMatrix: 'Technical Consulting & Audit',
    response: {
      EN: `ðŸ“‹ <strong>Technical Consulting & Engineering Audits:</strong><br>
â€¢ Comprehensive on-site raw water sampling & SDI (Silt Density Index) analysis.<br>
â€¢ Membrane scaling & biofouling forensic evaluation.<br>
â€¢ Energy recovery audit and pump optimization to reduce operating kilowatt consumption.<br><br>
Leave your corporate details to schedule a technical discovery call with our Miami team.`,
      ES: `ðŸ“‹ <strong>AsesorÃ­a TÃ©cnica y AuditorÃ­as de IngenierÃ­a:</strong><br>
â€¢ Muestreo en sitio y anÃ¡lisis de Ã­ndice de colmataciÃ³n (SDI).<br>
â€¢ EvaluaciÃ³n forense de incrustaciÃ³n y ensuciamiento de membranas.<br>
â€¢ AuditorÃ­a de eficiencia energÃ©tica y optimizaciÃ³n de bombeo para reducciÃ³n de consumo elÃ©ctrico.<br><br>
DÃ©jenos sus datos para coordinar una sesiÃ³n tÃ©cnica inicial.`
    }
  },
  {
    id: 'engineering-design',
    patterns: ['design', 'diseno', 'diseÃ±o', 'cad', '3d', 'p&id', 'pid', 'hydraulic', 'hidraulico', 'hidrÃ¡ulico', 'modeling', 'modelado', 'plano', 'planos'],
    leadMatrix: 'CAD & Hydraulic Design',
    response: {
      EN: `ðŸ“ <strong>Turnkey CAD & Process Engineering Design:</strong><br>
â€¢ 3D SolidWorks skid modeling with isometric piping and structural stress analysis.<br>
â€¢ Detailed P&ID (Piping and Instrumentation Diagrams) with instrument tag schedules.<br>
â€¢ Comprehensive membrane projection modeling (DuPont WAVE) and hydraulic head loss calculations.<br><br>
Would you like to send us your design specifications?`,
      ES: `ðŸ“ <strong>IngenierÃ­a de DiseÃ±o y Modelado CAD:</strong><br>
â€¢ Modelado 3D en SolidWorks con isomÃ©tricos de tuberÃ­a y anÃ¡lisis estructural.<br>
â€¢ Diagramas P&ID completos con identificaciÃ³n estandarizada de instrumentos.<br>
â€¢ Proyecciones de membranas (DuPont WAVE) y cÃ¡lculo hidrÃ¡ulico de pÃ©rdidas de carga.<br><br>
Â¿Desea enviarnos las bases de diseÃ±o de su proyecto?`
    }
  },
  {
    id: 'epc-project',
    patterns: ['epc', 'project', 'proyecto', 'proyectos', 'turnkey', 'llave en mano', 'procurement', 'procura', 'construction', 'construccion', 'construcciÃ³n', 'commissioning', 'puesta en marcha'],
    leadMatrix: 'EPC Project Execution',
    response: {
      EN: `ðŸ—ï¸ <strong>Turnkey EPC Engineering & Project Management:</strong><br>
â€¢ Complete procurement of certified US equipment from Miami, FL.<br>
â€¢ Factory Acceptance Testing (FAT) with wet hydraulic trial runs prior to export.<br>
â€¢ On-site construction supervision, mechanical hookup, electrical tie-in, and SAT commissioning.<br><br>
What is your project timeline and target commissioning date?`,
      ES: `ðŸ—ï¸ <strong>Proyectos EPC Llave en Mano y Gerencia de Obra:</strong><br>
â€¢ ProcuradurÃ­a integral de componentes certificados en EE. UU. desde Miami, FL.<br>
â€¢ Pruebas FAT en taller con corrida hidrÃ¡ulica antes del despacho internacional.<br>
â€¢ SupervisiÃ³n de montaje en sitio, interconexiÃ³n mecÃ¡nica, elÃ©ctrica y comisionamiento SAT.<br><br>
Â¿CuÃ¡l es el cronograma estimado de puesta en marcha de su obra?`
    }
  },
  {
    id: 'maintenance-cip',
    patterns: ['maintenance', 'mantenimiento', 'cip', 'clean in place', 'lavado', 'lavado de membranas', 'repair', 'reparacion', 'reparaciÃ³n', 'spare', 'repuesto', 'repuestos', 'overhaul'],
    leadMatrix: 'Maintenance & Membrane CIP',
    response: {
      EN: `ðŸ› ï¸ <strong>Preventive Maintenance & Membrane CIP Services:</strong><br>
â€¢ Automated Clean-In-Place (CIP) skid washes with pH-buffered chemical cycles to restore membrane flux.<br>
â€¢ High-pressure pump overhauls and seal replacements with genuine manufacturer parts.<br>
â€¢ Emergency dispatch of DuPont membranes, filters, and UV lamps from Miami stock.<br><br>
Tell us your system model and required maintenance service.`,
      ES: `ðŸ› ï¸ <strong>Mantenimiento y Lavado QuÃ­mico de Membranas (CIP):</strong><br>
â€¢ Lavados quÃ­micos CIP programados con control de pH para restaurar el flujo de las membranas.<br>
â€¢ ReparaciÃ³n de bombas de alta presiÃ³n y cambio de sellos con repuestos originales.<br>
â€¢ Suministro rÃ¡pido de membranas DuPont, filtros cartucho y lÃ¡mparas UV desde stock en Miami.<br><br>
IndÃ­quenos el modelo de su equipo y el servicio que requiere.`
    }
  },
  {
    id: 'shipping-export',
    patterns: ['shipping', 'export', 'exportacion', 'exportaciÃ³n', 'logistics', 'logistica', 'logÃ­stica', 'container', 'contenedor', 'fcl', 'port', 'puerto', 'miami', 'everglades', 'flete', 'freight'],
    response: {
      EN: `ðŸš¢ <strong>International Shipping & Export Logistics:</strong><br>
â€¢ Direct containerized (FCL) and consolidated skid shipments departing weekly from <strong>PortMiami</strong> and <strong>Port Everglades</strong>.<br>
â€¢ Full export compliance: US AES filing, Certificate of Origin, Certificate of Conformity, and seaworthy timber crating (ISPM 15).<br>
â€¢ Direct deliveries to Caribbean ports, Central America, and South America.<br><br>
Which destination port do you require delivery to?`,
      ES: `ðŸš¢ <strong>LogÃ­stica de ExportaciÃ³n y Despacho Portuario:</strong><br>
â€¢ Despachos semanales en contenedores completos (FCL) y carga consolidada desde <strong>PortMiami</strong> y <strong>Port Everglades</strong>.<br>
â€¢ DocumentaciÃ³n completa: Registro AES en EE. UU., Certificado de Origen y embalaje marÃ­timo certificado (ISPM 15).<br>
â€¢ EnvÃ­os directos a puertos de todo el Caribe, CentroamÃ©rica y SudamÃ©rica.<br><br>
Â¿A quÃ© puerto de destino requiere coordinar la entrega?`
    }
  },
  {
    id: 'pricing-quote',
    patterns: ['price', 'pricing', 'cost', 'costo', 'precio', 'precios', 'quote', 'cotizacion', 'cotizaciÃ³n', 'budget', 'presupuesto', 'how much', 'cuanto cuesta', 'cuÃ¡nto cuesta'],
    response: {
      EN: `ðŸ’° <strong>Engineering Proposals & Quotations:</strong><br>
Because every industrial water treatment system is custom-engineered to raw water chemistry and flow rate, we prepare detailed formal proposals.<br><br>
Please share your <strong>Name, Corporate Email, Flow Rate (GPM / mÂ³/h), and Feed Water Source</strong> so our Miami office can issue a technical specification & commercial quotation.`,
      ES: `ðŸ’° <strong>Cotizaciones y Propuestas de IngenierÃ­a:</strong><br>
Dado que cada sistema industrial se diseÃ±a a la medida de la calidad de agua y caudal de la planta, elaboramos propuestas formales detalladas.<br><br>
Por favor compÃ¡rtanos su <strong>Nombre, Correo Corporativo, Caudal requerido y Origen del Agua</strong> para que nuestra oficina en Miami le envÃ­e la cotizaciÃ³n tÃ©cnica y econÃ³mica.`
    }
  },
  {
    id: 'contact-miami',
    patterns: ['contact', 'contacto', 'phone', 'telefono', 'telÃ©fono', 'address', 'direccion', 'direcciÃ³n', 'email', 'correo', 'headquarters', 'sede', 'miami office', 'oficina'],
    response: {
      EN: `ðŸ“ <strong>AcQuaBlue International Corp. Headquarters:</strong><br>
â€¢ <strong>Corporate Office:</strong> Miami, Florida, USA.<br>
â€¢ <strong>Direct Telephone / WhatsApp:</strong> +1 (407) 309-7191<br>
â€¢ <strong>Corporate Email:</strong> info@acquabluecorp.com<br>
â€¢ <strong>Hours:</strong> Mon - Fri, 8:00 AM - 6:00 PM EST (24/7 emergency response).<br><br>
Leave your details here in chat and we will immediately connect you with a project manager!`,
      ES: `ðŸ“ <strong>Sede Corporativa de AcQuaBlue International Corp.:</strong><br>
â€¢ <strong>Oficina Central:</strong> Miami, Florida, EE. UU.<br>
â€¢ <strong>TelÃ©fono / WhatsApp:</strong> +1 (407) 309-7191<br>
â€¢ <strong>Correo Corporativo:</strong> info@acquabluecorp.com<br>
â€¢ <strong>Horario:</strong> Lun - Vie, 8:00 AM - 6:00 PM EST (AtenciÃ³n de emergencias 24/7).<br><br>
Â¡FacilÃ­tenos sus datos aquÃ­ en el chat para registrar su consulta prioritariamente!`
    }
  },
  {
    id: 'whatsapp-direct',
    patterns: ['whatsapp', 'wa', 'chat directo', 'direct chat', 'mensaje', 'whatsapp link'],
    response: {
      EN: `ðŸ“± <strong>Connect with an Engineer on WhatsApp:</strong><br><br>
Click below to open a direct chat session with our Miami technical engineering team:<br><br>
<a href="https://wa.me/14073097191?text=Hello%20AcQuaBlue%20Miami,%20I%20am%20inquiring%20about%20industrial%20water%20treatment%20engineering." target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all">
  ðŸ’¬ Open WhatsApp (+1 407 309 7191)
</a>`,
      ES: `ðŸ“± <strong>AtenciÃ³n Directa por WhatsApp:</strong><br><br>
Haga clic en el botÃ³n a continuaciÃ³n para abrir un chat directo con nuestro equipo en Miami:<br><br>
<a href="https://wa.me/14073097191?text=Hola%20AcQuaBlue%20Miami,%20deseo%20consultar%20sobre%20soluciones%20de%20tratamiento%20de%20agua%20industrial." target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all">
  ðŸ’¬ Abrir WhatsApp (+1 407 309 7191)
</a>`
    }
  },
  {
    id: 'certifications',
    patterns: ['epa', 'iso', 'nsf', 'standards', 'certification', 'certificacion', 'certificaciÃ³n', 'norma', 'normas', 'compliance', 'cumplimiento', 'osha', 'asme'],
    response: {
      EN: `ðŸ›¡ï¸ <strong>Quality Certifications & Technical Standards:</strong><br>
â€¢ <strong>Drinking Water:</strong> US EPA Safe Drinking Water Act compliance & NSF/ANSI 60 / 61.<br>
â€¢ <strong>Pressure Vessels:</strong> ASME Section X Code stamped FRP vessels (Pentair CodeLine).<br>
â€¢ <strong>Quality Management:</strong> ISO 9001:2015 certified design & integration process.<br>
â€¢ <strong>Safety:</strong> US OSHA GHS compliant documentation for all specialty chemical solutions.`,
      ES: `ðŸ›¡ï¸ <strong>Certificaciones de Calidad y Cumplimiento Normativo:</strong><br>
â€¢ <strong>Agua Potable:</strong> Cumplimiento de normativas US EPA y certificaciones NSF/ANSI 60 / 61.<br>
â€¢ <strong>Recipientes a PresiÃ³n:</strong> Estampado ASME SecciÃ³n X en portamembranas Pentair CodeLine.<br>
â€¢ <strong>GestiÃ³n de Calidad:</strong> Procesos de diseÃ±o e integraciÃ³n bajo norma ISO 9001:2015.<br>
â€¢ <strong>Seguridad:</strong> Hojas de seguridad SDS bajo estÃ¡ndar US OSHA GHS para todos los quÃ­micos.`
    }
  }
];

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  setupLanguageToggle();
  setupCatalogTabs();
  setupMobileMenu();
  setupUnifiedObserver(); // PERF-06: Unified observer replaces separate scroll + counter observers
  setupBackToTop();
  restoreChatHistory(); // BUG-11: Restore chat history from sessionStorage

  // Apply persisted language to page on load (BUG-06)
  document.documentElement.lang = currentLang.toLowerCase();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[currentLang] && i18n[currentLang][key]) {
      el.innerHTML = i18n[currentLang][key];
    }
  });
  const curLangEl = document.getElementById('current-lang');
  if (curLangEl) curLangEl.textContent = currentLang;
});

/* ==========================================================================
   INTERACTION & ANIMATION ENGINES
   ========================================================================== */

// 1. Language Toggle & i18n
function setupLanguageToggle() {
  const langToggleBtn = document.getElementById('lang-toggle');
  const mobileLangBtn = document.getElementById('mobile-lang-toggle');

  const switchLanguage = (newLang) => {
    currentLang = newLang;
    chatState.userLanguage = newLang;
    
    const curLangEl = document.getElementById('current-lang');
    if (curLangEl) curLangEl.textContent = currentLang;

    if (mobileLangBtn) {
      const mobText = document.getElementById('mobile-lang-text');
      if (mobText) {
        mobText.textContent = currentLang === 'EN' ? 'Switch Language (ES)' : 'Cambiar Idioma (EN)';
      }
    }

    // Update all i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[currentLang] && i18n[currentLang][key]) {
        el.innerHTML = i18n[currentLang][key];
      }
    });

    // Update Quick Chat Welcome if no conversation started
    const chatMsgs = document.getElementById('chat-messages');
    if (chatMsgs && chatMsgs.children.length <= 1) {
      chatMsgs.innerHTML = `
        <div class="flex items-start gap-2.5 animate-fade-in">
          <div class="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center shrink-0 font-mono text-xs">AI</div>
          <div class="p-3.5 rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed max-w-[85%] shadow-md">
            ${i18n[currentLang]["chat.welcome"]}
          </div>
        </div>
      `;
    }

    // BUG-12: Update page title and html lang attribute
    document.documentElement.lang = newLang.toLowerCase();
    if (newLang === 'EN') {
      document.title = 'AcQuaBlue International Corp. | Advanced Water Treatment & Fluid Engineering Solutions';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', 'AcQuaBlue International Corp. - Premier US-based provider of industrial water treatment systems, fluid handling, UV & Ozone purification, and engineering services. Located in Miami, Florida.');
    } else {
      document.title = 'AcQuaBlue International Corp. | Tratamiento de Agua Industrial y IngenierÃ­a de Fluidos';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', 'AcQuaBlue International Corp. - Proveedor lÃ­der de sistemas de tratamiento de agua industrial, manejo de fluidos, purificaciÃ³n UV y Ozono. Con sede en Miami, Florida.');
    }
    // BUG-06: Persist language choice
    localStorage.setItem('acquablue_lang', newLang);
  };

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      switchLanguage(currentLang === 'EN' ? 'ES' : 'EN');
    });
  }

  if (mobileLangBtn) {
    mobileLangBtn.addEventListener('click', () => {
      switchLanguage(currentLang === 'EN' ? 'ES' : 'EN');
    });
  }
}

// 2. Catalog Tabs Filtering
function setupCatalogTabs() {
  const tabs = document.querySelectorAll('#catalog-tabs .tab-btn');
  const cards = document.querySelectorAll('#catalog-grid .catalog-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false'); // A11Y-06
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true'); // A11Y-06

      const filter = tab.getAttribute('data-tab');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden-card');
        } else {
          card.classList.add('hidden-card');
        }
      });
    });
  });
}

// 3. Mobile Hamburger Menu
function setupMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const openIcon = document.getElementById('menu-icon-open');
  const closeIcon = document.getElementById('menu-icon-close');

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      const isHidden = menu.classList.contains('hidden');
      menu.classList.toggle('hidden');
      if (openIcon) openIcon.classList.toggle('hidden', isHidden);
      if (closeIcon) closeIcon.classList.toggle('hidden', !isHidden);
      menuBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        if (openIcon) openIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// PERF-06: Unified IntersectionObserver for scroll reveals + counters
function setupUnifiedObserver() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Immediately show all elements without animation
    document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('revealed'));
    document.querySelectorAll('.counter-value').forEach(el => {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      el.textContent = (Number.isInteger(target) ? target : target.toFixed(1)) + suffix;
    });
    return;
  }

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('revealed'));
    document.querySelectorAll('.counter-value').forEach(el => {
      const target = parseFloat(el.dataset.target || 0);
      const suffix = el.dataset.suffix || '';
      el.textContent = (Number.isInteger(target) ? target : target.toFixed(1)) + suffix;
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      // Handle scroll reveal
      if (el.classList.contains('scroll-reveal')) {
        el.classList.add('revealed');
      }

      // Handle counter animation
      if (el.classList.contains('counter-value') && !el.dataset.animated) {
        el.dataset.animated = 'true';
        animateCounter(el);
      }

      observer.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.scroll-reveal, .counter-value').forEach(el => observer.observe(el));
}

// Counter animation helper (used by unified observer)
function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-target') || 0);
  const suffix = el.getAttribute('data-suffix') || '';
  const isDecimal = target % 1 !== 0;
  const duration = 2000;
  const startTime = performance.now();

  const update = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = target * ease;

    el.textContent = isDecimal ? current.toFixed(1) + suffix : Math.floor(current) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
    }
  };

  requestAnimationFrame(update);
}

// PERF-07: Back to Top with rAF throttle
function setupBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 400) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Toast Notification System
function showToast(message, type = 'info', duration = 4500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg class="w-5 h-5 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  } else {
    iconSvg = `<svg class="w-5 h-5 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <div class="flex-1">${message}</div>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 20);

  // Auto dismiss
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// BUG-07 + BUG-08: Modal keydown handler (ESC to close + basic focus trap)
function handleModalKeydown(e) {
  if (e.key === 'Escape') {
    const openModals = document.querySelectorAll('[role="dialog"]:not(.hidden)');
    openModals.forEach(m => closeModal(m.id));
    document.removeEventListener('keydown', handleModalKeydown);
  }
  // Basic focus trap
  if (e.key === 'Tab') {
    const openModal = document.querySelector('[role="dialog"]:not(.hidden)');
    if (!openModal) return;
    const focusable = openModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

// Modal Management
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // BUG-07: Add ESC key listener
    document.addEventListener('keydown', handleModalKeydown);
    // Focus first focusable element inside modal
    const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) setTimeout(() => firstFocusable.focus(), 50);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', handleModalKeydown);
  }
}

// Technical Datasheet Modal
function openProductSpec(productKey) {
  const specData = productSpecs[productKey];
  if (!specData) return;

  const titleEl = document.getElementById('spec-modal-title');
  const catEl = document.getElementById('spec-modal-category');
  const contentDiv = document.getElementById('spec-modal-content');

  if (titleEl) titleEl.textContent = specData.title;
  if (catEl) catEl.textContent = specData.category;

  if (contentDiv) {
    let html = '<div class="divide-y divide-slate-800 border-y border-slate-800">';
    specData.specs.forEach(item => {
      html += `
        <div class="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5">
          <span class="text-slate-400 font-semibold text-xs uppercase tracking-wider">${item.label}:</span>
          <span class="text-cyan-300 font-mono text-xs sm:text-sm font-medium">${item.value}</span>
        </div>
      `;
    });
    html += '</div>';
    contentDiv.innerHTML = html;
  }

  openModal('specModal');
}

// A11Y-03: Accordion Control with full ARIA support
function toggleAccordion(btn) {
  const content = btn.nextElementSibling;
  const icon = btn.querySelector('svg');
  const isExpanded = btn.getAttribute('aria-expanded') === 'true';

  if (!isExpanded) {
    content.classList.remove('hidden');
    if (icon) icon.classList.add('rotate-180');
    btn.setAttribute('aria-expanded', 'true');
    if (content.id) btn.setAttribute('aria-controls', content.id);
  } else {
    content.classList.add('hidden');
    if (icon) icon.classList.remove('rotate-180');
    btn.setAttribute('aria-expanded', 'false');
  }
}

// BUG-01: Form Submission Handlers with real Formspree fetch
async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('[type="submit"]');
  if (submitBtn) {
    if (!submitBtn.dataset.originalText) submitBtn.dataset.originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('https://formspree.io/f/maeqnqae', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ ...data, _subject: 'Engineering Request - AcQuaBlue Corp', source: 'Contact Form' })
    });
    if (res.ok) {
      const msg = i18n[currentLang]['toast.formSuccess'] || 'Thank you! Your engineering request has been submitted.';
      showToast(msg, 'success', 5000);
      form.reset();
    } else {
      throw new Error('Form submission failed');
    }
  } catch (err) {
    showToast('Submission error. Please email info@acquabluecorp.com directly.', 'error', 6000);
  } finally {
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.originalText || 'Send'; }
  }
}

async function handleModalForm(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    if (!submitBtn.dataset.originalText) submitBtn.dataset.originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('https://formspree.io/f/maeqnqae', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ ...data, _subject: 'Consultation Request - AcQuaBlue Corp', source: 'Quote Modal' })
    });
    if (res.ok) {
      const msg = i18n[currentLang]['toast.quoteSuccess'] || 'Consultation request received!';
      showToast(msg, 'success', 5000);
      closeModal('quoteModal');
      form.reset();
    } else {
      throw new Error('Submission failed');
    }
  } catch (err) {
    showToast('Error sending. Please email info@acquabluecorp.com directly.', 'error', 6000);
  } finally {
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.originalText || 'Send'; }
  }
}

/* ==========================================================================
   AI CHAT ASSISTANT ENGINE (GROUNDED BILINGUAL AGENT & LEAD DISPATCH)
   ========================================================================== */

function toggleChatWidget() {
  const windowEl = document.getElementById('chat-window');
  const openIcon = document.getElementById('chat-icon-open');
  const closeIcon = document.getElementById('chat-icon-close');
  const chatInput = document.getElementById('chat-input');

  if (windowEl) {
    if (windowEl.classList.contains('hidden')) {
      windowEl.classList.remove('hidden');
      windowEl.classList.add('flex');
      if (openIcon) openIcon.classList.add('hidden');
      if (closeIcon) closeIcon.classList.remove('hidden');
      if (chatInput) chatInput.focus();
    } else {
      windowEl.classList.add('hidden');
      windowEl.classList.remove('flex');
      if (openIcon) openIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    }
  }
}

function sendQuickPrompt(promptText) {
  const inputEl = document.getElementById('chat-input');
  if (inputEl) {
    inputEl.value = promptText;
    handleChatSubmit(new Event('submit'));
  }
}

// BUG-05: Improved Language Detection with ES stopwords
function detectLanguage(text) {
  const lower = text.toLowerCase();
  
  // Spanish specific characters (highest priority)
  const spanishChars = ['Ã¡', 'Ã©', 'Ã­', 'Ã³', 'Ãº', 'Ã±', 'Â¿', 'Â¡'];
  for (let ch of spanishChars) {
    if (lower.includes(ch)) return 'ES';
  }

  // Spanish stopwords & keywords (no accent required)
  const spanishWords = [
    'hola', 'buenos', 'buenas', 'dias', 'noches', 'tardes', 'gracias',
    'necesito', 'quiero', 'tengo', 'como', 'cuando', 'donde', 'cuanto',
    'informacion', 'precio', 'cotizacion', 'presupuesto', 'sistema',
    'agua', 'tratamiento', 'osmosis', 'inversa', 'bomba', 'bombas',
    'empresa', 'proyecto', 'capacidad', 'flujo', 'caudal', 'equipo',
    'equipos', 'servicio', 'servicios', 'consulta', 'por favor', 'favor'
  ];
  for (let w of spanishWords) {
    if (lower.includes(w)) return 'ES';
  }

  const englishIndicators = [
    'hello', 'hi', 'water', 'treatment', 'quote', 'price', 'cost', 'reverse', 'osmosis',
    'system', 'membrane', 'purification', 'ship', 'miami', 'export', 'spec', 'specs',
    'need', 'want', 'please', 'information', 'details', 'boiler', 'effluent', 'pump',
    'how', 'what', 'where', 'when', 'who', 'catalog', 'project', 'plant', 'flow'
  ];

  let enScore = 0;
  englishIndicators.forEach(w => {
    if (lower.includes(w)) enScore++;
  });

  return enScore >= 1 ? 'EN' : (currentLang === 'EN' ? 'EN' : 'ES');
}

// BUG-10: handleChatSubmit with rate-limit (max 1 message/second)
function handleChatSubmit(e) {
  if (e) e.preventDefault();

  // Rate limit: max 1 message per second
  const now = Date.now();
  if (now - lastChatMessageTime < 1000) return;
  lastChatMessageTime = now;

  const inputEl = document.getElementById('chat-input');
  const messageText = inputEl.value.trim();
  if (!messageText) return;

  // Clear Input
  inputEl.value = '';

  // Append User Message to Chat UI
  appendChatMessage('USER', messageText);

  // Auto detect language
  chatState.userLanguage = detectLanguage(messageText);

  // Show Typing Indicator
  const typingEl = document.getElementById('chat-typing');
  if (typingEl) typingEl.classList.remove('hidden');

  // Process AI Response with natural typing delay
  setTimeout(() => {
    if (typingEl) typingEl.classList.add('hidden');
    const aiResponse = generateGroundedAIResponse(messageText);
    appendChatMessage('AI', aiResponse);
  }, 750);
}

// BUG-09: Sanitize AI response HTML (strip script/event handler injection)
function sanitizeAIResponse(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

// BUG-11: Save chat history to sessionStorage
function saveChatHistory() {
  try {
    sessionStorage.setItem('acquablue_chat', JSON.stringify(chatState.history));
  } catch(e) { /* ignore quota errors */ }
}

// BUG-11: Restore chat history from sessionStorage
function restoreChatHistory() {
  try {
    const saved = sessionStorage.getItem('acquablue_chat');
    if (saved) {
      const history = JSON.parse(saved);
      chatState.history = history;
      // Re-render last 5 messages
      history.slice(-5).forEach(msg => {
        appendChatMessage(msg.sender, msg.text, false);
      });
    }
  } catch(e) { /* ignore */ }
}

function appendChatMessage(sender, text, saveToHistory = true) {
  const messagesContainer = document.getElementById('chat-messages');
  if (!messagesContainer) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = 'flex items-start gap-2.5 animate-fade-in';

  if (sender === 'USER') {
    msgDiv.classList.add('justify-end');
    msgDiv.innerHTML = `
      <div class="p-3.5 rounded-2xl rounded-tr-none bg-gradient-to-r from-cyan-600 to-blue-600 text-white leading-relaxed max-w-[85%] shadow-md text-xs sm:text-sm">
        ${escapeHTML(text)}
      </div>
    `;
  } else {
    // BUG-09: Sanitize AI response before injecting into DOM
    msgDiv.innerHTML = `
      <div class="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center shrink-0 font-mono text-xs">AI</div>
      <div class="p-3.5 rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed max-w-[85%] shadow-md text-xs sm:text-sm">
        ${sanitizeAIResponse(text)}
      </div>
    `;
  }

  messagesContainer.appendChild(msgDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // BUG-11: Persist to history and sessionStorage
  if (saveToHistory) {
    chatState.history.push({ sender, text });
    saveChatHistory();
  }
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Find best matching intent via pattern scoring
function findBestIntent(text) {
  const lower = text.toLowerCase();
  let bestIntent = null;
  let highestScore = 0;

  chatIntents.forEach(intent => {
    let score = 0;
    intent.patterns.forEach(p => {
      if (lower.includes(p.toLowerCase())) {
        score += p.length; // weight longer specific phrases higher
      }
    });
    if (score > highestScore) {
      highestScore = score;
      bestIntent = intent;
    }
  });

  return highestScore > 0 ? bestIntent : null;
}

// Grounded AI Decision Engine & Requirement Extractor
function generateGroundedAIResponse(userText) {
  const lang = chatState.userLanguage;

  // 1. Check for contact info (Email or Phone pattern)
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
  const phoneRegex = /(\+?\d{1,3}[-.\s]?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4})/gi;

  const emailsFound = userText.match(emailRegex);
  const phonesFound = userText.match(phoneRegex);

  if (emailsFound || phonesFound) {
    chatState.leadData.email = emailsFound ? emailsFound[0] : (chatState.leadData.email || 'Provided in conversation');
    chatState.leadData.phone = phonesFound ? phonesFound[0] : (chatState.leadData.phone || 'Provided in conversation');
    chatState.leadData.summary = userText;
    chatState.stage = 'CONFIRMED';

    // BUG-02: Dispatch lead email with real fetch
    dispatchLeadEmail(chatState.leadData);

    if (lang === 'EN') {
      return `
        âœ… <strong>Engineering Lead Registered!</strong><br><br>
        Thank you for providing your contact details. Our engineering team at the <strong>Miami, FL Headquarters</strong> has received your project details and will review your specifications.<br><br>
        ðŸ“© An automated summary has been dispatched to <strong>info@acquabluecorp.com</strong>.<br><br>
        <a href="https://wa.me/14073097191?text=Hello%20AcQuaBlue%20Miami,%20I%20just%20submitted%20a%20technical%20inquiry%20via%20AI%20Chat." target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all mt-2">
          ðŸ’¬ Priority WhatsApp Connect (+1 407 309 7191)
        </a>
      `;
    } else {
      return `
        âœ… <strong>Â¡Requerimiento de IngenierÃ­a Registrado!</strong><br><br>
        Gracias por facilitarnos sus datos de contacto. Nuestro equipo tÃ©cnico en la <strong>Sede de Miami, FL</strong> ha recibido la informaciÃ³n y revisarÃ¡ sus requerimientos.<br><br>
        ðŸ“© Se ha generado y enviado el resumen estructurado a <strong>info@acquabluecorp.com</strong>.<br><br>
        <a href="https://wa.me/14073097191?text=Hola%20AcQuaBlue%20Miami,%20acabo%20de%20enviar%20una%20consulta%20tÃ©cnica%20por%20el%20Chat%20IA." target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all mt-2">
          ðŸ’¬ AtenciÃ³n Prioritaria en WhatsApp (+1 407 309 7191)
        </a>
      `;
    }
  }

  // 2. Score and find best matching intent
  const intent = findBestIntent(userText);
  if (intent) {
    if (intent.leadMatrix) {
      chatState.leadData.matrix = intent.leadMatrix;
    }
    return intent.response[lang] || intent.response['EN'];
  }

  // 3. Fallback Response with Guidance
  if (lang === 'EN') {
    return `
      Thank you for your inquiry regarding <strong>AcQuaBlue International Corp.</strong> water treatment solutions.<br><br>
      To provide the most accurate engineering recommendation, please share:
      <ul class="list-disc list-inside mt-2 space-y-1 text-slate-300">
        <li>Your <strong>Feed Water Source</strong> (Well, Municipal, Seawater, Effluent)</li>
        <li>Required <strong>Flow Rate</strong> (GPM or mÂ³/h)</li>
        <li>Your <strong>Corporate Email or WhatsApp Phone</strong></li>
      </ul>
      <br>Our Miami engineering office will gladly analyze your parameters.
    `;
  } else {
    return `
      Gracias por su consulta sobre las soluciones de ingenierÃ­a hÃ­drica de <strong>AcQuaBlue International Corp.</strong><br><br>
      Para ofrecerle la recomendaciÃ³n tÃ©cnica mÃ¡s precisa, por favor compÃ¡rtanos:
      <ul class="list-disc list-inside mt-2 space-y-1 text-slate-300">
        <li>El <strong>Origen del Agua de AlimentaciÃ³n</strong> (Pozo, Red, Agua de Mar, Efluente)</li>
        <li>El <strong>Caudal Requerido</strong> (GPM o mÂ³/h)</li>
        <li>Su <strong>Correo Corporativo o TelÃ©fono WhatsApp</strong></li>
      </ul>
      <br>Nuestro equipo en Miami evaluarÃ¡ su aplicaciÃ³n a la brevedad.
    `;
  }
}

// BUG-02: Automated Lead Notification Dispatch via real Formspree fetch
async function dispatchLeadEmail(lead) {
  const DEBUG = false; // Set to true only in development
  if (DEBUG) console.log('[AcQuaBlue] Lead captured:', lead);

  try {
    const response = await fetch('https://formspree.io/f/maeqnqae', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: 'New AI Chat Lead - AcQuaBlue Corp',
        name: lead.name || 'AI Chat Lead',
        email: lead.email || 'Not provided',
        phone: lead.phone || 'Not provided',
        company: lead.company || 'Not provided',
        matrix: lead.matrix || 'General Inquiry',
        flow_rate: lead.flowRate || 'Not specified',
        summary: lead.summary || 'Lead from AI chat',
        source: 'AI Chat Widget',
        timestamp: new Date().toISOString()
      })
    });
    if (!response.ok) throw new Error('Network response was not ok');
  } catch (err) {
    if (DEBUG) console.warn('[AcQuaBlue] Lead dispatch failed:', err);
    // Silently fail â€” don't expose errors to user
  }
}
