// 店铺资料只需维护这一个文件。老店的私人号码不要写到公开网站中。
export const site = {
  name: 'LZFortuna-store & Luisa Moda',
  url: 'https://lzfortuna-store-cologno.web.app',
  phone: '+393668927486',
  displayPhone: '366 892 7486',
  whatsapp: 'https://wa.me/393668927486',
  stores: [
    {
      id: 'new',
      name: 'LZFortuna-store',
      city: 'Cologno Monzese',
      address: '',
      hours: '09:00–19:30',
      mainContact: true,
    },
    {
      id: 'old',
      name: 'Luisa Moda',
      city: 'Calusco',
      address: '',
      hours: '09:00–19:30',
      mainContact: false,
    },
  ],
} as const;
