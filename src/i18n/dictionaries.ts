import type { Locale } from "./config";

export type Dictionary = {
  nav: {
    about: string;
    excursions: string;
    transfers: string;
    cruises: string;
    houses: string;
    contact: string;
    cart: string;
    manageBooking: string;
  };
  common: {
    from: string;
    book: string;
    view: string;
    seeAll: string;
    loading: string;
    send: string;
    phone: string;
    email: string;
    continue: string;
    backHome: string;
    max: string;
    adults: string;
    children: string;
    date: string;
    total: string;
    required: string;
    processing: string;
  };
  home: {
    heroKicker: string;
    heroCardKicker: string;
    heroCardTitle: string;
    ctaOffers: string;
    ctaCruise: string;
    marquee: string;
    advantages: string[];
    toursTitle: string;
    toursKicker: string;
    transfersKicker: string;
    transfersTitle: string;
    transfersCta: string;
    cruisesKicker: string;
    cruisesTitle: string;
    cruisesCta: string;
    agencyKicker: string;
    agencyTitle: string;
    agencyBody: string;
    agencyCta: string;
    islandKicker: string;
    islandTitle: string;
    islandBody: string;
    islandCta: string;
  };
  footer: {
    blurb: string;
    tagline: string;
    explore: string;
    contact247: string;
    privacy: string;
    terms: string;
    rights: string;
  };
  excursions: {
    title: string;
    subtitle: string;
    faqTitle: string;
    cruiseHint: string;
    cruiseLink: string;
    faqs: { q: string; a: string }[];
  };
  transfers: {
    title: string;
    airportHotel: string;
    hotelAirport: string;
    roundTrip: string;
    tableTitle: string;
    destination: string;
    duration: string;
    oneWay: string;
    return: string;
    faqTitle: string;
    faqs: { q: string; a: string }[];
  };
  cruises: {
    title: string;
    select: string;
    pickup: string;
    pickupText: string;
    return: string;
    returnText: string;
    essentials: string;
    essentialsText: string;
    recommended: string;
    recommendedText: string;
    privateTitle: string;
    privateText: string;
  };
  about: {
    welcome: string;
    mission: string;
    missionText: string;
    vision: string;
    visionText: string;
    values: string;
    promise: string;
    contact: string;
    seeExcursions: string;
  };
  houses: {
    title: string;
    subtitle: string;
    houseTitle: string;
    houseBody: string;
    features: string[];
    cta: string;
  };
  contact: {
    title: string;
    subtitle: string;
    formTitle: string;
    infoTitle: string;
    name: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    address: string;
  };
  cart: {
    title: string;
    empty: string;
    seeExcursions: string;
    hotel: string;
    payment: string;
    checkout: string;
    remove: string;
    now: string;
    cashDay: string;
  };
  manage: {
    title: string;
    subtitle: string;
    bookingId: string;
    lookup: string;
    searching: string;
    activity: string;
    people: string;
    status: string;
    payment: string;
    help: string;
  };
  booking: {
    date: string;
    name: string;
    hotel: string;
    cruiseShip: string;
    notes: string;
    paymentMethod: string;
    card: string;
    bizum: string;
    deposit: string;
    payOnDay: string;
    addToCart: string;
    bookNow: string;
    cancelPolicy: string;
    selectDate: string;
    fillRequired: string;
    added: string;
    payNow: string;
    cashLater: string;
    perAdult: string;
    perVehicle: string;
  };
  transferForm: {
    title: string;
    subtitle: string;
    destination: string;
    route: string;
    passengers: string;
    flight: string;
    hotelAddress: string;
    payment: string;
    confirm: string;
  };
  confirmation: {
    title: string;
    body: string;
    locator: string;
    service: string;
    paidOnline: string;
    cashPending: string;
    invoice: string;
  };
  payments: {
    card: string;
    bizum: string;
    pay_on_day: string;
    deposit_10: string;
  };
  chat: {
    title: string;
    subtitle: string;
    greeting: string;
    placeholder: string;
    writing: string;
    suggestions: string[];
    error: string;
  };
  contactWidget: {
    title: string;
    slug: string;
    help: string;
    questions: string;
    whatsapp: string;
    facebook: string;
  };
};

const es: Dictionary = {
  nav: {
    about: "Quiénes somos",
    excursions: "Salidas",
    transfers: "Traslados",
    cruises: "Escala",
    houses: "Estancias",
    contact: "Escribirnos",
    cart: "Cesta",
    manageBooking: "Consultar reserva",
  },
  common: {
    from: "A partir de",
    book: "Reservar plaza",
    view: "Ver ficha",
    seeAll: "Ver calendario",
    loading: "Un momento…",
    send: "Enviar",
    phone: "Teléfono",
    email: "Correo",
    continue: "Seguir",
    backHome: "Volver a la isla",
    max: "Máx.",
    adults: "Adultos",
    children: "Niños",
    date: "Fecha",
    total: "Importe",
    required: "Obligatorio",
    processing: "Confirmando…",
  },
  home: {
    heroKicker: "Desde San Bartolomé",
    heroCardKicker: "Malpaís y mar",
    heroCardTitle: "Volcanes, jameos y costa con quien vive aquí todo el año.",
    ctaOffers: "Ver salidas",
    ctaCruise: "Tengo una escala",
    marquee:
      "Guías locales · Minibús propio · Grupos pequeños · Recogida en el hotel · Solo en español · Comercio de la isla",
    advantages: [
      "Minibús propio, limpio y climatizado",
      "Wifi a bordo, sin esperas de operador",
      "Grupos de hasta 14 plazas",
      "Relato solo en español",
      "Paso a recogerle en el alojamiento",
    ],
    toursTitle: "Salidas que merecen la pena",
    toursKicker: "Calendario",
    transfersKicker: "Puerta a puerta",
    transfersTitle: "Del avión a la cama, sin cola",
    transfersCta: "Pedir traslado",
    cruisesKicker: "Un día en tierra",
    cruisesTitle: "La isla entre dos silbatos",
    cruisesCta: "Ver itinerarios",
    agencyKicker: "Casa abierta",
    agencyTitle: "Una familia, una flota pequeña",
    agencyBody:
      "No mezclamos idiomas ni llenamos autobuses. Salimos con minibuses nuestros, grupos contenidos y el ritmo de quien conoce cada curva del malpaís.",
    agencyCta: "Nuestra forma de viajar",
    islandKicker: "Biosfera",
    islandTitle: "Lanzarote se entiende despacio",
    islandBody:
      "Silencio, lava y un paisaje trabajado por César Manrique y Jesús Soto. Timanfaya, los Jameos, la Cueva de los Verdes o el Jardín de Cactus se recuerdan mejor si alguien de aquí pone el mapa en orden.",
    islandCta: "Elegir una salida",
  },
  footer: {
    blurb:
      "Casa local en Lanzarote. Salidas en español, grupos contenidos y minibuses propios: la isla, sin intermediarios.",
    tagline: "La isla, a pie de tierra",
    explore: "Mapa del sitio",
    contact247: "Estamos aquí",
    privacy: "Privacidad",
    terms: "Condiciones",
    rights: "Todos los derechos reservados",
  },
  excursions: {
    title: "Salidas guiadas por Lanzarote",
    subtitle:
      "Itinerarios locales para recorrer volcanes, jameos, pueblos y costa en grupos contenidos.",
    faqTitle: "Antes de reservar plaza",
    cruiseHint: "¿Desembarca solo unas horas?",
    cruiseLink: "Itinerarios pensados para su escala",
    faqs: [
      {
        q: "¿Cuándo recibiré el bono para la excursión?",
        a: "Tras confirmar la reserva recibirá un email con el bono y los detalles de recogida.",
      },
      {
        q: "¿Cuáles son las formas de pago disponibles?",
        a: "Puede pagar con tarjeta, Bizum, 10% + efectivo o, en muchas actividades, el día del tour.",
      },
      {
        q: "¿Dónde será el punto de encuentro?",
        a: "Le recogemos en la puerta de su alojamiento. El punto exacto aparece en su bono.",
      },
      {
        q: "¿Cuál es la política de cancelación?",
        a: "Cancelación gratuita hasta 48 horas antes de la recogida.",
      },
      {
        q: "¿Cuáles son los idiomas de las excursiones?",
        a: "No mezclamos idiomas: nuestras excursiones se realizan solo en español.",
      },
    ],
  },
  transfers: {
    title: "Traslados privados al aeropuerto",
    airportHotel: "Del aeropuerto al hotel",
    hotelAirport: "Del hotel al aeropuerto",
    roundTrip: "Ida y vuelta",
    tableTitle: "Tarifas desde ACE",
    destination: "Zona",
    duration: "Tiempo",
    oneWay: "Solo ida",
    return: "Ida y vuelta",
    faqTitle: "Sobre el recibimiento",
    faqs: [
      {
        q: "¿Dónde encontraré a mi chófer?",
        a: "Le esperamos en la terminal de llegadas con un cartel con su nombre.",
      },
      {
        q: "¿Qué pasa si mi vuelo tiene un retraso?",
        a: "Hacemos seguimiento de vuelos y adaptamos la recogida sin coste adicional.",
      },
      {
        q: "¿Cómo funciona la política de cancelación?",
        a: "Cancelación gratuita hasta 48 horas antes del servicio.",
      },
    ],
  },
  cruises: {
    title: "Un día de isla entre dos silbatos",
    select: "Elige cómo bajar a tierra",
    pickup: "Le esperamos en el muelle",
    pickupText:
      "Indique barco y hora de desembarque: le recogemos cerca del puerto, sin perder la mañana en colas.",
    return: "De vuelta a bordo a tiempo",
    returnText:
      "El itinerario se ajusta a su all-aboard. Prioridad: que embarque con calma.",
    essentials: "Lo que no se puede perder",
    essentialsText:
      "Timanfaya, El Golfo, Jameos… lo esencial de la isla en las horas de su escala.",
    recommended: "Itinerarios de escala",
    recommendedText:
      "Grupos contenidos y relato en español, pensados para quien solo tiene un día.",
    privateTitle: "¿Prefiere un coche solo para ustedes?",
    privateText:
      "La opción más flexible si viaja en familia o quiere un ritmo a medida.",
  },
  about: {
    welcome: "Una casa de la isla, abierta",
    mission: "Para qué salimos",
    missionText:
      "Enseñar Lanzarote con calma: grupos pequeños, español nítido y minibuses propios.",
    vision: "Adónde vamos",
    visionText:
      "Ser la referencia local para quien quiere la isla de verdad, no un autobús lleno.",
    values: "Cómo trabajamos",
    promise: "Lo que prometemos",
    contact: "Escribirnos",
    seeExcursions: "Ver salidas",
  },
  houses: {
    title: "Dónde dormir cuando la isla se queda",
    subtitle: "Una estancia tranquila para explorar Lanzarote a su ritmo.",
    houseTitle: "Casa Cordel",
    houseBody:
      "Base cómoda y silenciosa para quien quiere despertar en la isla y salir a recorrerla sin prisas.",
    features: [
      "Rincón sosegado en Lanzarote",
      "Pensada para familias y parejas",
      "Compatible con nuestras recogidas",
    ],
    cta: "Pedir disponibilidad",
  },
  contact: {
    title: "Cuéntenos cómo llega",
    subtitle: "Respondemos todos los días. Dudas de salidas, escalas o traslados.",
    formTitle: "Escríbanos",
    infoTitle: "Dónde encontrarnos",
    name: "Nombre",
    message: "Mensaje",
    send: "Enviar nota",
    sending: "Enviando…",
    success: "Recibido. Le escribimos en cuanto podamos.",
    address: "Calle Calderetas, 100\n35550 San Bartolomé - Lanzarote",
  },
  cart: {
    title: "Plazas en la cesta",
    empty: "Aún no ha guardado ninguna salida.",
    seeExcursions: "Mirar el calendario",
    hotel: "Hotel / alojamiento",
    payment: "Cómo pagar",
    checkout: "Confirmar plazas",
    remove: "Quitar",
    now: "Ahora",
    cashDay: "Efectivo",
  },
  manage: {
    title: "Su reserva, a mano",
    subtitle: "Localizador y correo con el que compró las plazas.",
    bookingId: "Número de reserva",
    lookup: "Consultar",
    searching: "Buscando…",
    activity: "Salida",
    people: "Personas",
    status: "Estado",
    payment: "Pago",
    help: "¿Quiere cambiar algo? Llámenos o escríbanos.",
  },
  booking: {
    date: "Fecha *",
    name: "Nombre y apellidos *",
    hotel: "Hotel / punto de recogida",
    cruiseShip: "Barco (si viene de escala)",
    notes: "Notas para el equipo",
    paymentMethod: "Forma de pago",
    card: "Tarjeta (íntegro)",
    bizum: "Bizum (íntegro)",
    deposit: "10% tarjeta + resto en mano",
    payOnDay: "Pagar el día de la salida",
    addToCart: "Guardar en la cesta",
    bookNow: "Reservar ahora",
    cancelPolicy: "Anulación gratis hasta 48 h antes",
    selectDate: "Elija una fecha para guardar la plaza.",
    fillRequired: "Faltan datos obligatorios.",
    added: "Plaza guardada en la cesta.",
    payNow: "Ahora (10% tarjeta)",
    cashLater: "Efectivo el día",
    perAdult: "por adulto",
    perVehicle: "por vehículo",
  },
  transferForm: {
    title: "Pedir un traslado",
    subtitle: "Privado · le esperamos con cartel",
    destination: "Zona *",
    route: "Trayecto *",
    passengers: "Pasajeros",
    flight: "Nº de vuelo",
    hotelAddress: "Hotel / dirección *",
    payment: "Pago",
    confirm: "Confirmar traslado",
  },
  confirmation: {
    title: "Plazas anotadas",
    body: "Le hemos escrito un correo. Si hace falta algún detalle, el equipo se pone en contacto.",
    locator: "Localizador",
    service: "Servicio",
    paidOnline: "Pagado (tarjeta/online)",
    cashPending: "Pendiente en efectivo",
    invoice: "Factura",
  },
  payments: {
    card: "Tarjeta",
    bizum: "Bizum",
    pay_on_day: "Pago el día de la salida",
    deposit_10: "10% tarjeta + resto en mano",
  },
  chat: {
    title: "Guía de la casa",
    subtitle: "Salidas, traslados y escalas",
    greeting:
      "Hola. Soy la guía digital de Lanzarote Experience Tours. Pregunte por salidas, precios, traslados o si desembarca de un crucero.",
    placeholder: "Escriba su duda…",
    writing: "Pensando…",
    suggestions: [
      "¿Timanfaya o Grand Tour?",
      "Traslado a Playa Blanca",
      "Llego en crucero un día",
      "¿Puedo dejar un 10% y el resto en mano?",
    ],
    error:
      "Ahora mismo no he podido responder. Pruebe de nuevo o llámenos al +34 646 08 05 85.",
  },
  contactWidget: {
    title: "Lanzarote Experience Tours",
    slug: "Casa abierta, todos los días",
    help: "¿Dudas de salidas, escalas o traslados? Estamos al otro lado.",
    questions: "¿Hablamos?",
    whatsapp: "WhatsApp",
    facebook: "Facebook",
  },
};

const en: Dictionary = {
  nav: {
    about: "Our house",
    excursions: "Days out",
    transfers: "Transfers",
    cruises: "Shore day",
    houses: "Stays",
    contact: "Write to us",
    cart: "Basket",
    manageBooking: "Find a booking",
  },
  common: {
    from: "From",
    book: "Reserve a seat",
    view: "Open",
    seeAll: "See the calendar",
    loading: "One moment…",
    send: "Send",
    phone: "Phone",
    email: "Email",
    continue: "Continue",
    backHome: "Back to the island",
    max: "Max.",
    adults: "Adults",
    children: "Children",
    date: "Date",
    total: "Amount",
    required: "Required",
    processing: "Confirming…",
  },
  home: {
    heroKicker: "From San Bartolomé",
    heroCardKicker: "Lava and sea",
    heroCardTitle: "Volcanoes, jameos and coastline with people who live here.",
    ctaOffers: "See days out",
    ctaCruise: "I have a port call",
    marquee:
      "Local guides · Our own minibus · Small groups · Hotel pick-up · Spanish only · Island trade",
    advantages: [
      "Our own clean, air-conditioned minibus",
      "Wifi on board, no operator queues",
      "Groups of up to 14 seats",
      "Commentary in Spanish only",
      "We collect you at your stay",
    ],
    toursTitle: "Days that stay with you",
    toursKicker: "Calendar",
    transfersKicker: "Door to door",
    transfersTitle: "From the plane to the pillow",
    transfersCta: "Request a transfer",
    cruisesKicker: "A day ashore",
    cruisesTitle: "The island between two whistles",
    cruisesCta: "See itineraries",
    agencyKicker: "Open house",
    agencyTitle: "One family, a small fleet",
    agencyBody:
      "We do not mix languages or fill coaches. We go out in our own minibuses, with contained groups and the pace of people who know every bend in the malpaís.",
    agencyCta: "How we travel",
    islandKicker: "Biosphere",
    islandTitle: "Lanzarote is understood slowly",
    islandBody:
      "Silence, lava and a landscape shaped by César Manrique and Jesús Soto. Timanfaya, the Jameos, Cueva de los Verdes or the Cactus Garden stay with you if someone from here puts the map in order.",
    islandCta: "Choose a day out",
  },
  footer: {
    blurb:
      "A local house in Lanzarote. Spanish-only days out, contained groups and our own minibuses — the island, with no middlemen.",
    tagline: "The island, on foot",
    explore: "Site map",
    contact247: "We are here",
    privacy: "Privacy",
    terms: "Terms",
    rights: "All rights reserved",
  },
  excursions: {
    title: "Guided days out in Lanzarote",
    subtitle:
      "Local itineraries through volcanoes, jameos, villages and coast in contained groups.",
    faqTitle: "Before you reserve a seat",
    cruiseHint: "Ashore for just a few hours?",
    cruiseLink: "Itineraries built around your port call",
    faqs: [
      {
        q: "When will I receive my excursion voucher?",
        a: "After confirmation you will receive an email with the voucher and pick-up details.",
      },
      {
        q: "Which payment methods are available?",
        a: "Card, Bizum, 10% deposit + cash on the day, or pay on the day for many activities.",
      },
      {
        q: "Where is the meeting point?",
        a: "We pick you up at your accommodation. The exact point is on your voucher.",
      },
      {
        q: "What is the cancellation policy?",
        a: "Free cancellation up to 48 hours before pick-up.",
      },
      {
        q: "Which languages are the tours in?",
        a: "We do not mix languages: our excursions are in Spanish only.",
      },
    ],
  },
  transfers: {
    title: "Private airport transfers",
    airportHotel: "Airport to hotel",
    hotelAirport: "Hotel to airport",
    roundTrip: "Return",
    tableTitle: "Fares from ACE",
    destination: "Area",
    duration: "Time",
    oneWay: "One way",
    return: "Return",
    faqTitle: "About meet & greet",
    faqs: [
      {
        q: "Where will I find my driver?",
        a: "We meet you in arrivals with a sign with your name.",
      },
      {
        q: "What if my flight is delayed?",
        a: "We track flights and adjust pick-up at no extra cost.",
      },
      {
        q: "What is the cancellation policy?",
        a: "Free cancellation up to 48 hours before the service.",
      },
    ],
  },
  cruises: {
    title: "A day on the island between two whistles",
    select: "Choose how you come ashore",
    pickup: "We meet you at the pier",
    pickupText: "Tell us your ship and disembarkation time. We collect you near the port, without losing the morning in queues.",
    return: "Back on board in time",
    returnText: "The itinerary follows your all-aboard. Priority: you embark without rushing.",
    essentials: "What you should not miss",
    essentialsText:
      "Timanfaya, El Golfo, Jameos… the island in the hours of your port call.",
    recommended: "Shore itineraries",
    recommendedText: "Contained groups and Spanish commentary, for guests with a single day.",
    privateTitle: "A car just for you?",
    privateText: "The most flexible option for families or a custom pace.",
  },
  about: {
    welcome: "An island house, open",
    mission: "Why we go out",
    missionText:
      "Show Lanzarote slowly: small groups, clear Spanish and our own minibuses.",
    vision: "Where we are heading",
    visionText: "Be the local reference for people who want the island itself, not a full coach.",
    values: "How we work",
    promise: "What we promise",
    contact: "Write to us",
    seeExcursions: "See days out",
  },
  houses: {
    title: "Where to sleep when the island stays",
    subtitle: "A quiet stay to explore Lanzarote at your own pace.",
    houseTitle: "Casa Cordel",
    houseBody:
      "A comfortable, quiet base for anyone who wants to wake on the island and wander without hurry.",
    features: [
      "A calm corner of Lanzarote",
      "Made for families and couples",
      "Compatible with our pick-ups",
    ],
    cta: "Ask for dates",
  },
  contact: {
    title: "Tell us how you arrive",
    subtitle: "We reply every day. Days out, port calls or transfers.",
    formTitle: "Write to us",
    infoTitle: "Where to find us",
    name: "Name",
    message: "Message",
    send: "Send a note",
    sending: "Sending…",
    success: "Received. We will write back as soon as we can.",
    address: "Calle Calderetas, 100\n35550 San Bartolomé - Lanzarote",
  },
  cart: {
    title: "Seats in the basket",
    empty: "You have not saved a day out yet.",
    seeExcursions: "Open the calendar",
    hotel: "Hotel / stay",
    payment: "How to pay",
    checkout: "Confirm seats",
    remove: "Remove",
    now: "Now",
    cashDay: "Cash",
  },
  manage: {
    title: "Your booking, at hand",
    subtitle: "Reference number and the email used to buy the seats.",
    bookingId: "Booking number",
    lookup: "Look up",
    searching: "Searching…",
    activity: "Day out",
    people: "Guests",
    status: "Status",
    payment: "Payment",
    help: "Need a change? Call or write to us.",
  },
  booking: {
    date: "Date *",
    name: "Full name *",
    hotel: "Hotel / pick-up point",
    cruiseShip: "Cruise ship (if applicable)",
    notes: "Notes",
    paymentMethod: "Payment method",
    card: "Card (100%)",
    bizum: "Bizum (100%)",
    deposit: "10% card + cash balance",
    payOnDay: "Pay on the day",
    addToCart: "Add to cart",
    bookNow: "Book now",
    cancelPolicy: "Free cancellation up to 48 h before",
    selectDate: "Please select a date to add to cart.",
    fillRequired: "Please complete the required fields.",
    added: "Added to cart.",
    payNow: "Now (10% card)",
    cashLater: "Cash on the day",
    perAdult: "per adult",
    perVehicle: "per vehicle",
  },
  transferForm: {
    title: "Book a transfer",
    subtitle: "Private · meet & greet with your name sign",
    destination: "Destination *",
    route: "Route *",
    passengers: "Passengers",
    flight: "Flight number",
    hotelAddress: "Hotel / address *",
    payment: "Payment",
    confirm: "Confirm transfer",
  },
  confirmation: {
    title: "Seats noted",
    body: "We have sent a confirmation email. Our team will write if any detail is needed.",
    locator: "Reference",
    service: "Service",
    paidOnline: "Paid (card/online)",
    cashPending: "Cash due",
    invoice: "Invoice",
  },
  payments: {
    card: "Card",
    bizum: "Bizum",
    pay_on_day: "Pay on the day",
    deposit_10: "10% card + cash balance",
  },
  chat: {
    title: "House guide",
    subtitle: "Days out, transfers and port calls",
    greeting:
      "Hello. I am the digital guide for Lanzarote Experience Tours. Ask about days out, prices, transfers or if you come ashore from a ship.",
    placeholder: "Type your question…",
    writing: "Thinking…",
    suggestions: [
      "Timanfaya or Grand Tour?",
      "Transfer to Playa Blanca",
      "I arrive by cruise for one day",
      "Can I pay 10% and the rest in cash?",
    ],
    error:
      "I could not reply right now. Please try again or call +34 646 08 05 85.",
  },
  contactWidget: {
    title: "Lanzarote Experience Tours",
    slug: "Open house, every day",
    help: "Days out, port calls or transfers? We are on the other side.",
    questions: "Shall we talk?",
    whatsapp: "WhatsApp",
    facebook: "Facebook",
  },
};

const de: Dictionary = {
  nav: {
    about: "Unser Haus",
    excursions: "Ausfahrten",
    transfers: "Transfers",
    cruises: "Landgang",
    houses: "Aufenthalt",
    contact: "Schreiben Sie uns",
    cart: "Korb",
    manageBooking: "Buchung finden",
  },
  common: {
    from: "Ab",
    book: "Platz sichern",
    view: "Öffnen",
    seeAll: "Kalender ansehen",
    loading: "Einen Moment…",
    send: "Senden",
    phone: "Telefon",
    email: "E-Mail",
    continue: "Weiter",
    backHome: "Zurück zur Insel",
    max: "Max.",
    adults: "Erwachsene",
    children: "Kinder",
    date: "Datum",
    total: "Betrag",
    required: "Pflichtfeld",
    processing: "Wird bestätigt…",
  },
  home: {
    heroKicker: "Aus San Bartolomé",
    heroCardKicker: "Lava und Meer",
    heroCardTitle: "Vulkane, Jameos und Küste mit Menschen, die hier leben.",
    ctaOffers: "Ausfahrten ansehen",
    ctaCruise: "Ich habe einen Hafenstopp",
    marquee:
      "Lokale Guides · Eigener Minibus · Kleine Gruppen · Abholung am Hotel · Nur Spanisch · Inselhandel",
    advantages: [
      "Eigener, sauberer und klimatisierter Minibus",
      "Wifi an Bord, ohne Betreiber-Warteschlangen",
      "Gruppen bis 14 Plätze",
      "Erzählung nur auf Spanisch",
      "Abholung an Ihrer Unterkunft",
    ],
    toursTitle: "Tage, die bleiben",
    toursKicker: "Kalender",
    transfersKicker: "Tür zu Tür",
    transfersTitle: "Vom Flugzeug ins Bett",
    transfersCta: "Transfer anfragen",
    cruisesKicker: "Ein Tag an Land",
    cruisesTitle: "Die Insel zwischen zwei Pfiffen",
    cruisesCta: "Routen ansehen",
    agencyKicker: "Offenes Haus",
    agencyTitle: "Eine Familie, eine kleine Flotte",
    agencyBody:
      "Wir mischen keine Sprachen und füllen keine Reisebusse. Wir fahren mit eigenen Minibussen, in überschaubaren Gruppen und im Tempo derer, die jede Kurve des Malpaís kennen.",
    agencyCta: "So reisen wir",
    islandKicker: "Biosphäre",
    islandTitle: "Lanzarote versteht man langsam",
    islandBody:
      "Stille, Lava und eine Landschaft, die César Manrique und Jesús Soto geformt haben. Timanfaya, die Jameos, Cueva de los Verdes oder der Kakteengarten bleiben, wenn jemand von hier die Karte ordnet.",
    islandCta: "Eine Ausfahrt wählen",
  },
  footer: {
    blurb:
      "Ein lokales Haus auf Lanzarote. Ausfahrten auf Spanisch, kleine Gruppen und eigene Minibusse — die Insel ohne Zwischenhändler.",
    tagline: "Die Insel, zu Fuß",
    explore: "Seitenplan",
    contact247: "Wir sind da",
    privacy: "Datenschutz",
    terms: "Bedingungen",
    rights: "Alle Rechte vorbehalten",
  },
  excursions: {
    title: "Geführte Ausfahrten auf Lanzarote",
    subtitle:
      "Lokale Routen zu Vulkanen, Jameos, Dörfern und Küste in überschaubaren Gruppen.",
    faqTitle: "Bevor Sie einen Platz sichern",
    cruiseHint: "Nur ein paar Stunden an Land?",
    cruiseLink: "Routen für Ihren Hafenstopp",
    faqs: [
      {
        q: "Wann erhalte ich meinen Ausflugsbon?",
        a: "Nach der Bestätigung erhalten Sie eine E-Mail mit Bon und Abholungsdetails.",
      },
      {
        q: "Welche Zahlungsmethoden gibt es?",
        a: "Karte, Bizum, 10 % Anzahlung + Rest bar oder Zahlung am Tourtag.",
      },
      {
        q: "Wo ist der Treffpunkt?",
        a: "Wir holen Sie an Ihrer Unterkunft ab. Der genaue Punkt steht auf dem Bon.",
      },
      {
        q: "Wie ist die Stornierungsregelung?",
        a: "Kostenlose Stornierung bis 48 Stunden vor der Abholung.",
      },
      {
        q: "In welchen Sprachen finden die Touren statt?",
        a: "Wir mischen keine Sprachen: unsere Ausflüge sind nur auf Spanisch.",
      },
    ],
  },
  transfers: {
    title: "Flughafentransfers Lanzarote",
    airportHotel: "Flughafen zum Hotel",
    hotelAirport: "Hotel zum Flughafen",
    roundTrip: "Hin und zurück",
    tableTitle: "Private Transfers vom und zum Flughafen Lanzarote",
    destination: "Ziel",
    duration: "Dauer",
    oneWay: "Einfach",
    return: "Hin und zurück",
    faqTitle: "Häufige Fragen zu unseren Transfers",
    faqs: [
      {
        q: "Wo finde ich meinen Fahrer?",
        a: "Wir erwarten Sie in der Ankunftshalle mit einem Schild mit Ihrem Namen.",
      },
      {
        q: "Was passiert bei Flugverspätung?",
        a: "Wir verfolgen Flüge und passen die Abholung ohne Aufpreis an.",
      },
      {
        q: "Wie ist die Stornierungsregelung?",
        a: "Kostenlose Stornierung bis 48 Stunden vor dem Service.",
      },
    ],
  },
  cruises: {
    title: "Ein Inseltag zwischen zwei Pfiffen",
    select: "Wählen Sie, wie Sie an Land gehen",
    pickup: "Wir erwarten Sie am Pier",
    pickupText:
      "Nennen Sie uns Schiff und Ausschiffungszeit. Wir holen Sie nahe dem Hafen ab, ohne den Morgen in Schlangen zu verlieren.",
    return: "Pünktlich zurück an Bord",
    returnText: "Die Route folgt Ihrer All-aboard-Zeit. Vorrang: Sie gehen ohne Hetze an Bord.",
    essentials: "Was Sie nicht verpassen sollten",
    essentialsText:
      "Timanfaya, El Golfo, Jameos… die Insel in den Stunden Ihres Landgangs.",
    recommended: "Landgang-Routen",
    recommendedText:
      "Überschaubare Gruppen und Erzählung auf Spanisch, für Gäste mit nur einem Tag.",
    privateTitle: "Lieber ein Auto nur für Sie?",
    privateText:
      "Die flexibelste Option für Familien oder ein eigenes Tempo.",
  },
  about: {
    welcome: "Ein Inselhaus, offen",
    mission: "Warum wir fahren",
    missionText:
      "Lanzarote langsam zeigen: kleine Gruppen, klares Spanisch und eigene Minibusse.",
    vision: "Wohin wir wollen",
    visionText:
      "Die lokale Referenz sein für alle, die die Insel selbst wollen, keinen vollen Reisebus.",
    values: "Wie wir arbeiten",
    promise: "Was wir versprechen",
    contact: "Schreiben Sie uns",
    seeExcursions: "Ausfahrten ansehen",
  },
  houses: {
    title: "Wo schlafen, wenn die Insel bleibt",
    subtitle: "Ein ruhiger Aufenthalt, um Lanzarote in Ihrem Tempo zu erkunden.",
    houseTitle: "Casa Cordel",
    houseBody:
      "Eine komfortable, stille Basis für alle, die auf der Insel aufwachen und ohne Eile losziehen wollen.",
    features: [
      "Ruhige Ecke auf Lanzarote",
      "Für Familien und Paare gedacht",
      "Kompatibel mit unseren Abholungen",
    ],
    cta: "Verfügbarkeit anfragen",
  },
  contact: {
    title: "Erzählen Sie uns, wie Sie ankommen",
    subtitle: "Wir antworten jeden Tag. Ausfahrten, Landgang oder Transfers.",
    formTitle: "Schreiben Sie uns",
    infoTitle: "Wo Sie uns finden",
    name: "Name",
    message: "Nachricht",
    send: "Notiz senden",
    sending: "Wird gesendet…",
    success: "Angekommen. Wir schreiben so bald wir können zurück.",
    address: "Calle Calderetas, 100\n35550 San Bartolomé - Lanzarote",
  },
  cart: {
    title: "Plätze im Korb",
    empty: "Sie haben noch keine Ausfahrt gespeichert.",
    seeExcursions: "Kalender öffnen",
    hotel: "Hotel / Unterkunft",
    payment: "Zahlung",
    checkout: "Plätze bestätigen",
    remove: "Entfernen",
    now: "Jetzt",
    cashDay: "Bar",
  },
  manage: {
    title: "Ihre Buchung zur Hand",
    subtitle: "Referenz und die E-Mail, mit der Sie die Plätze gekauft haben.",
    bookingId: "Buchungsnummer",
    lookup: "Suchen",
    searching: "Suche…",
    activity: "Ausfahrt",
    people: "Personen",
    status: "Status",
    payment: "Zahlung",
    help: "Änderung nötig? Rufen oder schreiben Sie uns.",
  },
  booking: {
    date: "Datum *",
    name: "Vollständiger Name *",
    hotel: "Hotel / Abholpunkt",
    cruiseShip: "Kreuzfahrtschiff (falls zutreffend)",
    notes: "Notizen",
    paymentMethod: "Zahlungsmethode",
    card: "Karte (100%)",
    bizum: "Bizum (100%)",
    deposit: "10% Karte + Rest bar",
    payOnDay: "Zahlung am Tourtag",
    addToCart: "In den Warenkorb",
    bookNow: "Jetzt buchen",
    cancelPolicy: "Kostenlose Stornierung bis 48 Std. vorher",
    selectDate: "Bitte wählen Sie ein Datum für den Warenkorb.",
    fillRequired: "Bitte füllen Sie die Pflichtfelder aus.",
    added: "Zum Warenkorb hinzugefügt.",
    payNow: "Jetzt (10% Karte)",
    cashLater: "Bar am Tag",
    perAdult: "pro Erwachsenem",
    perVehicle: "pro Fahrzeug",
  },
  transferForm: {
    title: "Transfer buchen",
    subtitle: "Privat · Empfang mit Namensschild",
    destination: "Ziel *",
    route: "Strecke *",
    passengers: "Passagiere",
    flight: "Flugnummer",
    hotelAddress: "Hotel / Adresse *",
    payment: "Zahlung",
    confirm: "Transfer bestätigen",
  },
  confirmation: {
    title: "Buchung erhalten!",
    body: "Wir haben eine Bestätigungs-E-Mail gesendet. Unser Team meldet sich bei Bedarf.",
    locator: "Referenz",
    service: "Service",
    paidOnline: "Bezahlt (Karte/online)",
    cashPending: "Bar noch offen",
    invoice: "Rechnung",
  },
  payments: {
    card: "Karte",
    bizum: "Bizum",
    pay_on_day: "Zahlung am Tourtag",
    deposit_10: "10% Karte + Rest bar",
  },
  chat: {
    title: "Hausführerin",
    subtitle: "Ausfahrten, Transfers und Landgang",
    greeting:
      "Hallo. Ich bin die digitale Guide von Lanzarote Experience Tours. Fragen Sie nach Ausfahrten, Preisen, Transfers oder wenn Sie von einem Schiff an Land gehen.",
    placeholder: "Schreiben Sie Ihre Frage…",
    writing: "Denkt nach…",
    suggestions: [
      "Timanfaya oder Grand Tour?",
      "Transfer nach Playa Blanca",
      "Ich komme einen Tag mit dem Schiff",
      "Kann ich 10% und den Rest bar zahlen?",
    ],
    error:
      "Ich konnte gerade nicht antworten. Bitte erneut versuchen oder +34 646 08 05 85 anrufen.",
  },
  contactWidget: {
    title: "Lanzarote Experience Tours",
    slug: "Offenes Haus, jeden Tag",
    help: "Ausfahrten, Landgang oder Transfers? Wir sind auf der anderen Seite.",
    questions: "Sprechen wir?",
    whatsapp: "WhatsApp",
    facebook: "Facebook",
  },
};

const dictionaries: Record<Locale, Dictionary> = { es, en, de };

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale] ?? dictionaries.es;
}

export function getDictionarySync(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.es;
}
