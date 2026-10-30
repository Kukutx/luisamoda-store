// 店铺资料只需维护这一个文件。老店的私人号码不要写到公开网站中。
// address 留空时页面显示“地址可询问”，不生成地图链接。
type Store = {
  id: string;
  name: string;
  city: string;
  address: string;
  postalCode: string;
  province: string;
  hours: string;
  mainContact: boolean;
  /** Short label under the store name. */
  tagline: string;
  /** What a visitor finds in this store, in plain words. */
  highlights: string[];
  tiktok?: { handle: string; url: string };
};

const stores: Store[] = [
  {
    id: 'new',
    name: 'LZ Fortuna',
    city: 'Cologno Monzese',
    address: 'Via Guglielmo Marconi',
    postalCode: '20093',
    province: 'MI',
    hours: '09:00–19:30',
    mainContact: true,
    tagline: 'Il negozio nuovo, piccolo e vicino a casa',
    highlights: [
      'Abbigliamento per tutti i giorni',
      'Accessori e piccoli articoli utili',
      'Orli e piccole riparazioni',
    ],
    tiktok: { handle: '@luisa5558', url: 'https://www.tiktok.com/@luisa5558' },
  },
  {
    id: 'old',
    name: 'Luisa Moda',
    city: 'Calusco d’Adda',
    address: 'Piazza S. Rocco, 51',
    postalCode: '24033',
    province: 'BG',
    hours: '09:00–19:30',
    mainContact: false,
    tagline: 'Il negozio storico, da oltre vent’anni',
    highlights: [
      'Emporio con tanti reparti: casa, cucina, scuola, giocattoli e altro',
      'Abbigliamento e accessori',
      'Laboratorio di sartoria per riparazioni e modifiche',
    ],
  },
];

export const site = {
  name: 'LZ FORTUNA',
  url: 'https://lzfortuna.web.app',
  phone: '+393668927486',
  displayPhone: '366 892 7486',
  whatsapp: 'https://wa.me/393668927486',
  tiktok: 'https://www.tiktok.com/@luisa5558',
  stores,
} as const;

/** Full postal line, e.g. "Piazza S. Rocco, 51, 24033 Calusco d’Adda (BG)"; empty when unknown. */
export function fullAddress(store: Store): string {
  if (!store.address) return '';
  return `${store.address}, ${store.postalCode} ${store.city} (${store.province})`;
}

/** Google Maps search link for a store, or null while its street address is unknown. */
export function mapsUrl(store: Store): string | null {
  if (!store.address) return null;
  const query = `${store.address}, ${store.postalCode} ${store.city} ${store.province}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** WhatsApp link that opens the chat with a message already written, so the visitor only has to complete it. */
export function whatsappWith(message: string): string {
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
