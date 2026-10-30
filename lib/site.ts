// 店铺资料只需维护这一个文件。老店的私人号码不要写到公开网站中。
// 新店街道地址尚未提供：address 留空时页面显示“地址可询问”，不生成地图链接。
type Store = {
  id: string;
  name: string;
  city: string;
  address: string;
  postalCode: string;
  province: string;
  hours: string;
  mainContact: boolean;
};

const stores: Store[] = [
  {
    id: 'new',
    name: 'LZ Fortuna',
    city: 'Cologno Monzese',
    address: '',
    postalCode: '',
    province: 'MI',
    hours: '09:00–19:30',
    mainContact: true,
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
  },
];

export const site = {
  name: 'LZ FORTUNA',
  url: 'https://lzfortuna.web.app',
  phone: '+393668927486',
  displayPhone: '366 892 7486',
  whatsapp: 'https://wa.me/393668927486',
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
