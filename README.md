# Lanzarote Tours

Web de excursiones y traslados en Lanzarote (Next.js + React), con panel de administración. Marca en verde.

## Arranque

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Panel admin

- URL: `/admin`
- Contraseña demo: `admin123`

| Sección | Qué puedes hacer |
|---------|------------------|
| Dashboard | Estadísticas, accesos rápidos |
| Reservas | Ver todas, confirmar / completar / cancelar |
| Excursiones | Crear, editar, eliminar tours y precios |
| Traslados | Destinos, precios ida/vuelta, ventajas |
| Blog | Crear / editar / eliminar entradas |
| Ajustes web | Marca, contacto, misión/visión, textos de páginas |

Los cambios se guardan en `src/data/*.json` y se ven en la web al instante.

## Chat IA

Botón flotante **Chat IA** en la web pública. Responde sobre excursiones, traslados, precios y cruceristas.

- Sin configuración: asistente local.
- Con OpenAI: copia `.env.example` a `.env.local`, añade `OPENAI_API_KEY` y reinicia.

## Páginas públicas

- `/` — Inicio
- `/sobre-nosotros` — Quiénes somos, misión, visión y valores
- `/excursiones` — Sur/Timanfaya, Grand Tour, Manrique, marítimas, FAQ
- `/excursiones/[slug]` — detalle + reserva
- `/cruceristas` — escalas en puerto
- `/traslados` — aeropuerto, tarifas, FAQ y ficha del aeropuerto
- `/blog`

## Contenido alineado al brief

- Precios Sur: 85 € (grupo pequeño) / 45 € (bus)
- Grand Tour: 125 € / 85 €
- Privada a la carta: 100 €/h (hasta 10) · 150 €/h (hasta 50)
- Cancelación: 24 horas
- Teléfono: +34 646 08 05 85
- Pagos: PayPal, Stripe, transferencia, Bizum y efectivo

> La pasarela real (Stripe/PayPal/Bizum) se puede conectar después; ahora las reservas se guardan en `src/data/bookings.json`.
