/**
 * Prezzi copiati dal listino fotografato fornito dal proprietario.
 * Sono valori di riferimento, non un preventivo automatico.
 * Per aggiornare il listino si modifica soltanto questo file.
 */
export type TailoringPrice = {
  service: string;
  price: string;
  note?: string;
};

export type TailoringCategory = {
  id: string;
  title: string;
  items: TailoringPrice[];
};

export const tailoringCategories: TailoringCategory[] = [
  {
    id: 'pantaloni',
    title: 'Pantaloni e jeans',
    items: [
      { service: 'Orlo a macchina', price: '€ 4,00' },
      { service: 'Orlo con impuntura', price: '€ 3,00 – 5,00' },
      { service: 'Orlo invisibile', price: '€ 5,00' },
      { service: 'Orlo jeans originale', price: '€ 6,00' },
      { service: 'Stringere la gamba', price: '€ 5,00' },
      { service: 'Stringere i fianchi', price: '€ 5,00' },
      { service: 'Stringere gamba e fianchi', price: '€ 6,00' },
      { service: 'Stringere la vita', price: '€ 6,00' },
      { service: 'Allargare la vita', price: '€ 6,00 – 13,00' },
      { service: 'Cambiare la fodera della tasca', price: '€ 7,00' },
      { service: 'Cambiare l’elastico in vita', price: '€ 5,00 – 7,00' },
    ],
  },
  {
    id: 'camicie',
    title: 'Camicie',
    items: [
      { service: 'Accorciare le maniche', price: '€ 5,00' },
      { service: 'Orlo', price: '€ 4,00' },
      { service: 'Stringere i fianchi', price: '€ 5,00' },
      { service: 'Stringere le spalle', price: '€ 7,00' },
      { service: 'Giro collo', price: '€ 5,00' },
    ],
  },
  {
    id: 'gonne',
    title: 'Gonne e vestiti',
    items: [
      { service: 'Orlo con bordo sottile', price: '€ 3,00' },
      { service: 'Orlo gonna', price: '€ 4,00' },
      { service: 'Orlo invisibile', price: '€ 6,00' },
      { service: 'Orlo con impuntura', price: '€ 5,00' },
      { service: 'Cambiare la cerniera', price: '€ 5,00' },
      { service: 'Stringere i fianchi', price: '€ 7,00' },
      { service: 'Stringere la vita', price: '€ 10,00 – 15,00' },
      { service: 'Stringere il collo', price: '€ 4,00 – 8,00' },
      { service: 'Stringere le spalle', price: '€ 5,00 – 8,00' },
    ],
  },
  {
    id: 'giacche',
    title: 'Giacche e cappotti',
    items: [
      { service: 'Accorciare le maniche', price: '€ 6,00 – 12,00' },
      { service: 'Stringere', price: '€ 8,00 – 15,00' },
      { service: 'Orlo', price: '€ 6,00 – 13,00' },
      { service: 'Stringere le spalle', price: '€ 20,00 – 25,00' },
      { service: 'Cambiare la fodera uomo', price: '€ 20,00 – 25,00' },
      { service: 'Cambiare la fodera donna', price: '€ 15,00 – 20,00' },
      { service: 'Cambiare la cerniera', price: '€ 10,00 – 15,00' },
    ],
  },
];

export const otherTailoringServices: TailoringPrice[] = [
  { service: 'Riparazione tende', price: 'Su preventivo' },
];
