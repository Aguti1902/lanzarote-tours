import * as XLSX from "xlsx";
import type { Invoice } from "@/types";
import type { DateRange } from "@/components/admin/DateRangeFilter";

const MONTHS_ES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
] as const;

const INVOICE_HEADER_1 = [
  "Nº Factura",
  "Nº Reserva",
  "Cliente",
  "Fecha Factura",
  "Fecha Pago",
  "Stripe",
  "",
  "PayPal",
  "Base Imponible",
  "IGIC",
  "Importe",
  "Forma de pago",
];

const INVOICE_HEADER_2 = [
  "",
  "",
  "",
  "",
  "",
  "Comisión",
  "Importe Abonado",
  "",
  "",
  "",
  "",
  "",
];

const CANCEL_HEADER = [
  "Nº Factura",
  "Nº Reserva",
  "Factura que cancela",
  "Cliente",
  "Fecha Factura",
  "Fecha Pago",
  "Base Imponible",
  "IGIC",
  "Importe",
  "Forma de pago",
];

function dash(): string {
  return "-";
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function isoDay(value: string | undefined): string {
  if (!value) return "";
  const day = value.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : "";
}

function invoiceNumber(invoice: Invoice): string | number {
  if (Number.isFinite(Number(invoice.number)) && Number(invoice.number) > 0) {
    return Number(invoice.number);
  }
  const m = String(invoice.id || "").match(/(\d+)/);
  return m ? Number(m[1]) : invoice.id;
}

function relatedInvoiceNumber(invoice: Invoice): string | number | "" {
  const raw = String(invoice.relatedInvoiceId || "").trim();
  if (!raw) return "";
  const m = raw.match(/(\d+)/);
  return m ? Number(m[1]) : raw.replace(/^FAC-/i, "");
}

function isStripe(code?: string): boolean {
  const v = (code || "").toLowerCase();
  return (
    v === "cc" ||
    v === "card" ||
    v === "stripe" ||
    v === "deposit_10" ||
    v === "deposit_20"
  );
}

function isPaypal(code?: string): boolean {
  const v = (code || "").toLowerCase();
  return v === "pp" || v === "paypal";
}

function formaDePago(code?: string): string {
  if (isStripe(code)) return "Stripe";
  if (isPaypal(code)) return "PayPal";
  if ((code || "").toLowerCase() === "bizum") return "Bizum";
  if (
    (code || "").toLowerCase() === "cf" ||
    (code || "").toLowerCase() === "pay_on_day"
  ) {
    return "Efectivo";
  }
  return code || "";
}

function moneyOrDash(n: number): number | string {
  if (!n) return dash();
  return round2(n);
}

function isCancelled(invoice: Invoice): boolean {
  return invoice.type === "credit_note" || invoice.total < 0;
}

function invoiceRow(invoice: Invoice): (string | number)[] {
  const total = round2(Number(invoice.total) || 0);
  const stripe = isStripe(invoice.paymentMethod);
  const paypal = isPaypal(invoice.paymentMethod);
  const date = isoDay(invoice.createdAt);
  return [
    invoiceNumber(invoice),
    invoice.bookingId || "",
    invoice.customer?.name || "",
    date,
    date,
    dash(),
    stripe ? moneyOrDash(total) : dash(),
    paypal ? moneyOrDash(total) : dash(),
    round2(Number(invoice.subtotal) || 0),
    round2(Number(invoice.taxAmount) || 0),
    total,
    formaDePago(invoice.paymentMethod),
  ];
}

function cancelRow(invoice: Invoice): (string | number)[] {
  const date = isoDay(invoice.createdAt);
  return [
    invoiceNumber(invoice),
    invoice.bookingId || "",
    relatedInvoiceNumber(invoice),
    invoice.customer?.name || "",
    date,
    date,
    round2(Number(invoice.subtotal) || 0),
    round2(Number(invoice.taxAmount) || 0),
    round2(Number(invoice.total) || 0),
    formaDePago(invoice.paymentMethod),
  ];
}

function monthKey(invoice: Invoice): { year: number; month: number } | null {
  const day = isoDay(invoice.createdAt);
  if (!day) return null;
  const year = Number(day.slice(0, 4));
  const month = Number(day.slice(5, 7));
  if (!year || !month) return null;
  return { year, month };
}

function setColWidths(sheet: XLSX.WorkSheet, widths: number[]) {
  sheet["!cols"] = widths.map((wch) => ({ wch }));
}

export function invoiceExcelFilename(range: DateRange, invoices: Invoice[]): string {
  const years = new Set<string>();
  if (range.from) years.add(range.from.slice(0, 4));
  if (range.to) years.add(range.to.slice(0, 4));
  if (!years.size) {
    for (const inv of invoices) {
      const day = isoDay(inv.createdAt);
      if (day) years.add(day.slice(0, 4));
    }
  }
  const list = [...years].sort();
  if (list.length === 1) return `Facturacion ${list[0]}.xlsx`;
  if (list.length > 1) return `Facturacion ${list[0]}-${list[list.length - 1]}.xlsx`;
  return `Facturacion ${new Date().getFullYear()}.xlsx`;
}

export function downloadInvoicesExcel(invoices: Invoice[], range: DateRange) {
  const byMonth = new Map<string, { year: number; month: number; issued: Invoice[]; cancelled: Invoice[] }>();

  for (const invoice of invoices) {
    const key = monthKey(invoice);
    if (!key) continue;
    const id = `${key.year}-${String(key.month).padStart(2, "0")}`;
    let bucket = byMonth.get(id);
    if (!bucket) {
      bucket = { year: key.year, month: key.month, issued: [], cancelled: [] };
      byMonth.set(id, bucket);
    }
    if (isCancelled(invoice)) bucket.cancelled.push(invoice);
    else bucket.issued.push(invoice);
  }

  const workbook = XLSX.utils.book_new();
  const months = [...byMonth.values()].sort((a, b) =>
    a.year === b.year ? a.month - b.month : a.year - b.year
  );

  const sortInvoices = (list: Invoice[]) =>
    [...list].sort((a, b) => {
      const byDate = isoDay(a.createdAt).localeCompare(isoDay(b.createdAt));
      if (byDate !== 0) return byDate;
      return Number(invoiceNumber(a)) - Number(invoiceNumber(b));
    });

  if (!months.length) {
    const empty = XLSX.utils.aoa_to_sheet([INVOICE_HEADER_1, INVOICE_HEADER_2]);
    XLSX.utils.book_append_sheet(workbook, empty, "Facturas");
  }

  for (const bucket of months) {
    const monthName = MONTHS_ES[bucket.month - 1] || String(bucket.month);
    const issuedRows = [
      INVOICE_HEADER_1,
      INVOICE_HEADER_2,
      ...sortInvoices(bucket.issued).map(invoiceRow),
    ];
    const issuedSheet = XLSX.utils.aoa_to_sheet(issuedRows);
    issuedSheet["!merges"] = [
      { s: { r: 0, c: 5 }, e: { r: 0, c: 6 } },
    ];
    setColWidths(issuedSheet, [12, 14, 28, 14, 14, 12, 16, 12, 16, 10, 12, 14]);
    const issuedName =
      months.length > 12 || new Set(months.map((m) => m.year)).size > 1
        ? `Facturas ${monthName} ${bucket.year}`.slice(0, 31)
        : `Facturas ${monthName}`.slice(0, 31);
    XLSX.utils.book_append_sheet(workbook, issuedSheet, issuedName);

    const cancelRows = [
      CANCEL_HEADER,
      Array(CANCEL_HEADER.length).fill(""),
      ...sortInvoices(bucket.cancelled).map(cancelRow),
    ];
    const cancelSheet = XLSX.utils.aoa_to_sheet(cancelRows);
    setColWidths(cancelSheet, [12, 14, 18, 28, 14, 14, 16, 10, 12, 14]);
    const cancelName =
      months.length > 12 || new Set(months.map((m) => m.year)).size > 1
        ? `${monthName} Canceladas ${bucket.year}`.slice(0, 31)
        : `${monthName} Canceladas`.slice(0, 31);
    XLSX.utils.book_append_sheet(workbook, cancelSheet, cancelName);
  }

  XLSX.writeFile(workbook, invoiceExcelFilename(range, invoices));
}
