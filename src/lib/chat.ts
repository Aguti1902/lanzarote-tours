import {
  getSettings,
  getTours,
  getTransfersData,
} from "@/lib/content";
import { formatPrice, groupSizeLabel } from "@/lib/format";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

async function buildKnowledge(): Promise<string> {
  const [tours, transfers, settings] = await Promise.all([
    getTours(),
    getTransfersData(),
    getSettings(),
  ]);

  const tourLines = tours
    .map((t) => {
      const group = t.groupSize ? groupSizeLabel(t.groupSize) : t.category;
      const pay = [
        t.allowCard && "tarjeta",
        t.allowBizum && "Bizum",
        t.allowPayOnDay && "pago el día del tour",
      ]
        .filter(Boolean)
        .join(", ");
      return `- ${t.shortTitle} (${group}): ${formatPrice(t.priceAdult)}${t.category === "private" ? "/hora" : " adulto"}, ${t.duration}. Pagos: ${pay}. URL: /excursiones/${t.slug}. ${t.summary}`;
    })
    .join("\n");

  const transferLines = transfers.destinations
    .map(
      (d) =>
        `- Aeropuerto ↔ ${d.name}: ida ${formatPrice(d.priceOneWay)}, ida y vuelta ${formatPrice(d.priceReturn)} (${d.duration})`
    )
    .join("\n");

  return `
Empresa: ${settings.brandName}
Teléfono: ${settings.phone}
Email: ${settings.email}
Horario: ${settings.hours}

EXCURSIONES:
${tourLines}

TRASLADOS PRIVADOS (recibimiento con cartel):
${transferLines}
Ventajas: ${transfers.highlights.join("; ")}
Cancelación traslados: gratis hasta 24 h (devolución 100%). Sillas bebé gratis. Bicicletas +10 €/ud.

CRUCERISTAS:
${settings.cruiseHeadline}
${settings.cruiseIntro}
Recogida también en Puerto de Cruceros.

INFO CLAVE:
- Grupo pequeño: máx. 8 personas.
- En bus: hasta 50 personas, mejor precio, pago también el día del tour.
- Pagos: PayPal, Stripe, transferencia, Bizum y efectivo.
- Idiomas: español, inglés y/o alemán.
- Cancelación excursiones: con menos de 24 h no hay reembolso.
- Privada a la carta: 100 €/h hasta 10 personas · 150 €/h hasta 50.
`.trim();
}

function localReply(message: string, knowledge: string): string {
  const q = normalize(message);

  if (
    /hola|buenas|hey|hello|buenos dias|buenas tardes|saludos/.test(q) &&
    q.length < 40
  ) {
    return "¡Hola! Soy el asistente de Lanzarote Tours. Puedo ayudarte con excursiones (Sur y Timanfaya, Grand Tour, Manrique, La Graciosa), traslados al aeropuerto, precios y cruceristas. ¿Qué te interesa?";
  }

  if (/gracias|thank/.test(q)) {
    return "¡De nada! Si quieres, te ayudo a elegir entre grupo pequeño, en bus, tour privado o un traslado. También puedes reservar desde la web.";
  }

  if (/crucero|crucerista|barco|escala|puerto/.test(q)) {
    return "Si llegas en crucero, te recogemos en el Puerto de Cruceros (también en otras zonas). Las rutas Sur y Grand Tour están en grupo pequeño o en bus, y hay privada a la carta. Mira /cruceristas o dime cuántas horas tienes en tierra.";
  }

  if (/traslad|aeropuerto|taxi|recogida|transfer|playa blanca|puerto del carmen|costa teguise|arrecife|puerto calero|playa honda/.test(q)) {
    const lines = knowledge
      .split("\n")
      .filter((l) => l.includes("Aeropuerto ↔"))
      .join("\n");
    return `Traslados 100% privados, con cartel con tu nombre. Cancelación gratis hasta 24 h. Sillas de bebé gratis.\n\n${lines}\n\nReserva en /traslados. ¿A qué zona vas?`;
  }

  if (/pago|bizum|tarjeta|efectivo|cobro|paypal|stripe|transferencia/.test(q)) {
    return "Aceptamos **PayPal, Stripe (tarjeta), transferencia, Bizum y efectivo**. En bus también puedes pagar el día del tour. Los traslados admiten tarjeta o PayPal.";
  }

  if (/grupo (pequeno|reducido)|intimo|intim/.test(q)) {
    return "El **grupo pequeño** es máximo 8 personas: más cercanía con el guía. Sur y Timanfaya desde 85 €; Grand Tour desde 125 €. ¿Media jornada o día completo?";
  }

  if (/grupo grande|en bus|barato|econom|precio bajo|masivo|50/.test(q)) {
    return "La opción **en bus** (hasta 50 personas) ofrece el mismo itinerario a mejor precio: Sur y Timanfaya 45 €, Grand Tour 85 €. ¿Cuál prefieres?";
  }

  if (/privado|exclusiv|a la carta|a medida|familia/.test(q)) {
    return "La **excursión privada a la carta** es 100 €/hora (hasta 10 personas) o 150 €/hora (hasta 50), con guía oficial. Itinerario flexible. ¿Cuántas horas y personas?";
  }

  if (/manrique|mirador|fundacion/.test(q)) {
    return "El **Tour César Manrique** visita Timanfaya, Fundación César Manrique, Monumento al Campesino, Jardín de Cactus, Mirador del Río y Jameos del Agua. Detalle en /excursiones/excursion-cesar-manrique.";
  }

  if (/graciosa|catamaran|maritim|sail|kayak|snorkel/.test(q)) {
    return "Tenemos **I Love Graciosa** (ferry + catamarán, paella, barra libre, kayak/snorkel), **La Graciosa Sail**, **a tu aire** y **Costa a Costa**. Mira la sección marítimas en /excursiones.";
  }

  if (/timanfaya|ruta sur|sur|volcan|montanas del fuego|geria|golfo/.test(q)) {
    return "La **Excursión Sur y Timanfaya** visita Timanfaya, El Diablo, Ruta de los Volcanes, El Golfo, Hervideros, Salinas, camellos y La Geria. Grupo pequeño 85 € · en bus 45 €.";
  }

  if (/grand tour|dia completo|jameos|cactus|cueva|completo/.test(q)) {
    return "El **Grand Tour** combina sur, centro y norte: Timanfaya, Jardín de Cactus, Jameos, Cueva de los Verdes, La Geria, Hervideros y El Golfo. Grupo pequeño 125 € · en bus 85 €.";
  }

  if (/precio|cuanto|cuesta|tarif|euro|€/.test(q)) {
    const tourBits = knowledge
      .split("\n")
      .filter((l) => l.startsWith("- ") && (l.includes("adulto") || l.includes("/hora")))
      .slice(0, 8)
      .join("\n");
    return `Precios orientativos:\n\n${tourBits}\n\nTraslados en /traslados. ¿Comparo grupo pequeño vs bus?`;
  }

  if (/cancel|reembol|anular/.test(q)) {
    return "En **excursiones**, con menos de 24 h antes no hay reembolso. En **traslados**, si cancelas con al menos 24 h te devolvemos el 100%.";
  }

  if (/contacto|telefono|llamar|email|correo|whatsapp|horario/.test(q)) {
    const phone = knowledge.match(/Teléfono: (.+)/)?.[1] || "+34 646 08 05 85";
    const email = knowledge.match(/Email: (.+)/)?.[1] || "hola@lanzarotetours.com";
    const hours = knowledge.match(/Horario: (.+)/)?.[1] || "Lunes–Domingo · 8:00–20:00";
    return `Puedes contactarnos en ${phone} o ${email}. Horario: ${hours}. También puedes reservar online.`;
  }

  if (/reserva|reservar|book|contratar/.test(q)) {
    return "Puedes reservar online desde cada ficha de excursión o en /traslados. Indica fecha, personas y método de pago. Si me dices zona de hotel o si vienes en crucero, te oriento.";
  }

  return "Puedo ayudarte con:\n• Excursiones (Sur, Grand Tour, Manrique, Graciosa, privada)\n• Grupo pequeño vs en bus\n• Traslados aeropuerto\n• Precios y formas de pago\n• Escalas de crucero\n\nEjemplo: «¿Cuánto cuesta el Grand Tour en bus?»";
}

async function openaiReply(
  messages: ChatMessage[],
  knowledge: string
): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content: `Eres el asistente de reservas de Lanzarote Tours (empresa familiar, color de marca verde). Responde en español, breve y amable (máx. 120 palabras salvo listas de precios). Usa solo esta información. No inventes precios. Enlaces útiles: /excursiones, /traslados, /cruceristas.

CONTEXTO:
${knowledge}`,
          },
          ...messages.slice(-10).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch {
    return null;
  }
}

export async function answerChat(messages: ChatMessage[]): Promise<{
  reply: string;
  mode: "openai" | "local";
}> {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser?.content?.trim()) {
    return {
      reply: "Cuéntame en qué puedo ayudarte: excursiones, traslados o cruceros.",
      mode: "local",
    };
  }

  const knowledge = await buildKnowledge();
  const ai = await openaiReply(messages, knowledge);
  if (ai) return { reply: ai, mode: "openai" };

  return {
    reply: localReply(lastUser.content, knowledge),
    mode: "local",
  };
}
