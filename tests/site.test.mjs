import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';

const read = (name) => readFileSync(new URL('../' + name, import.meta.url), 'utf8');
const source = ['app/page.tsx', 'lib/site.ts', 'app/layout.tsx'].map(read).join('\n');

test('only the new shop phone number is public', () => {
  assert.match(source, /366 892 7486/);
  assert.match(source, /393668927486/);
  const mobileNumbers = [...source.matchAll(/(?:\+39|39)?(3\d{9})\b/g)].map((match) => match[1]);
  assert.ok(mobileNumbers.every((number) => number === '3668927486'));
});

test('both shops and their opening times are maintained together', () => {
  const config = read('lib/site.ts');
  for (const name of ['LZ Fortuna', 'Luisa Moda', 'Cologno Monzese', 'Calusco']) {
    assert.ok(config.includes(name), 'Missing ' + name);
  }
  assert.equal((config.match(/09:00–19:30/g) || []).length, 2);
});

test('Italian is the only public UI language', () => {
  const page = read('app/page.tsx');
  assert.ok(page.includes("home: 'HOME'"));
  assert.ok(page.includes("services: 'SERVIZI'"));
  assert.doesNotMatch(page, /setLocale|changeLocale|langZh|langEn|langIt/);
  assert.ok(read('app/layout.tsx').includes('<html lang="it"'));
});

test('old language and service URLs redirect to Italian static content', () => {
  const { hosting } = JSON.parse(read('firebase.json'));
  assert.equal(hosting.length, 2, 'The new and former domains both need Hosting configuration');
  const main = hosting.find(({ site }) => site === 'lzfortuna');
  const legacy = hosting.find(({ site }) => site === 'lzfortuna-store-cologno');
  assert.equal(main.public, 'out');
  assert.equal(legacy.redirects[0].destination, 'https://lzfortuna.web.app');
  for (const route of ['/zh', '/en', '/it']) {
    assert.ok(main.redirects.some(({ source, destination }) => source === route && destination === '/'));
    assert.ok(main.redirects.some(({ source, destination }) => source === route + '/**' && destination === '/'));
  }
  for (const route of ['/services/sewing', '/services/3d']) {
    const destination = route === '/services/sewing' ? '/sartoria/' : '/#services';
    assert.ok(main.redirects.some((rule) => rule.source === route && rule.destination === destination));
  }
});

test('LZ FORTUNA brand uses the original monochrome editorial visual style', () => {
  const page = read('app/page.tsx');
  const css = read('app/globals.css');
  assert.match(page, /<h1 className="font-serif[^"]*">\s*LZ <span className="italic">FORTUNA<\/span>/, 'The logo title must be actual HTML text');
  assert.ok(page.includes('Sartoria e servizi per il tuo stile'), 'Subtitle must be editable HTML, not part of an image');
  for (const file of ['app/page.tsx', 'app/sartoria/page.tsx', 'app/prodotti/page.tsx']) {
    assert.doesNotMatch(read(file), /\/brand\/lz-(lockup|wordmark)\.png/, 'Do not render rasterized wordmarks: ' + file);
  }
  assert.doesNotMatch(page, /LUISA <span|aria-label="Luisa Moda"/);
  assert.ok(page.includes('/images/sartoria.jpg'), 'Original sewing image must remain');
  assert.ok(css.includes('--color-foreground: #050505'), 'Original monochrome palette must remain');
  assert.doesNotMatch(page, /hero-art|art-script/, 'Do not replace the hero with a new decorative brand card');
});

test('browser icon remains separate from real HTML wordmark', () => {
  assert.ok(existsSync(new URL('../public/brand/icon.png', import.meta.url)));
  assert.match(read('app/layout.tsx'), /icons: \{ icon: '\/brand\/icon\.png' \}/);
  assert.ok(read('lib/site.ts').includes("name: 'LZ FORTUNA'"));
  assert.ok(read('app/layout.tsx').includes("const title = 'LZ FORTUNA"));
});

test('only goods and tailoring service cards remain', () => {
  const page = read('app/page.tsx');
  assert.match(page, /products: 'PRODOTTI PER TUTTI I GIORNI'/);
  assert.match(page, /sewing: 'CUCITO E MODIFICHE'/);
  assert.doesNotMatch(page, /STAMPA 3D|INCISIONE|print3d|photo-1612815154858-60aa4c59eaa6/);
  assert.match(page, /md:grid-cols-2 md:gap-10/);
  assert.match(page, /href="\/sartoria\/"/);
  assert.match(page, /href="\/prodotti\/"/);
  assert.match(page, /\/images\/assortimento-prodotti\.jpg/);
  assert.doesNotMatch(page, /emporio-illustrativo|Foto illustrativa/);
  assert.ok(page.includes('WHATSAPP') || page.includes('WhatsApp'));
  const exported = read('out/index.html');
  assert.ok(exported.includes('PRODOTTI PER TUTTI I GIORNI') && exported.includes('CUCITO E MODIFICHE'));
  assert.ok(!exported.includes('STAMPA 3D') && !exported.includes('INCISIONE'));
});

test('assortment page describes all advertised goods, without prices or checkout', () => {
  const data = read('lib/merchandise.ts');
  const html = read('out/prodotti/index.html');
  const groups = [
    'Abbigliamento e accessori', 'Mobili e arredamento', 'Casa e pulizia',
    'Cucina e tavola', 'Scuola e cartoleria', 'Cosmetici e cura personale',
    'Giochi e giocattoli', 'Tessili e articoli vari',
  ];
  for (const category of groups) {
    assert.ok(data.includes(category), 'Missing product group: ' + category);
    assert.ok(html.includes(category), 'Missing page category: ' + category);
  }
  assert.ok(html.includes('L’assortimento cambia nel tempo'));
  assert.ok(html.includes('https://wa.me/393668927486'));
  assert.doesNotMatch(html, /€\s*\d|checkout|Acquista ora/);
});

test('both service cards use actual images and WhatsApp exists only in the AppBar', () => {
  const html = read('out/index.html');
  assert.ok(html.includes('href="/prodotti/"'));
  assert.ok(html.includes('href="/sartoria/"'));
  const page = read('app/page.tsx');
  const cards = page.split('<article className="flex flex-col overflow-hidden border border-black/10">');
  assert.equal(cards.length, 3, 'Exactly two separately authored service cards expected');
  const products = cards[1].split('</article>')[0];
  const sewing = cards[2].split('</article>')[0];
  assert.match(products, /<Image/, 'First card needs a real product image, not text in place of a photo');
  assert.match(products, /\/images\/assortimento-prodotti\.jpg/);
  assert.ok(existsSync(new URL('../public/images/assortimento-prodotti.jpg', import.meta.url)));
  assert.doesNotMatch(products, /photo-1604719312566|emporio-illustrativo|Foto illustrativa/, 'Do not restore rejected photos');
  assert.match(sewing, /src=\{sewingImage\}/, 'Keep the original tailoring image');
  assert.ok(existsSync(new URL('../public/images/sartoria.jpg', import.meta.url)), 'Serve the tailoring photo locally');
  assert.doesNotMatch(products + sewing, /href=\{site\.whatsapp\}|WHATSAPP ↗/, 'No WhatsApp controls on either service card');
  const appbar = page.split('<header className=')[1]?.split('</header>')[0] ?? '';
  assert.match(appbar, /href=\{site\.whatsapp\}/, 'WhatsApp belongs in the header AppBar');
  assert.match(appbar, /bg-black/, 'AppBar WhatsApp should be black');
  assert.ok(html.includes('https://wa.me/393668927486'));
  assert.ok(!existsSync(new URL('../public/images/emporio-illustrativo.jpg', import.meta.url)));
});

test('static Next.js export contains both stores without the old number', () => {
  assert.ok(existsSync(new URL('../out/index.html', import.meta.url)), 'Build the site before running tests');
  const html = read('out/index.html');
  for (const name of ['LZ Fortuna', 'Luisa Moda', 'Cologno Monzese', 'Calusco', '366 892 7486']) {
    assert.ok(html.includes(name), 'Missing in exported HTML: ' + name);
  }
  assert.ok(html.includes('https://wa.me/393668927486'));
});

test('static HTML has Italian locale and a canonical public URL', () => {
  const html = read('out/index.html');
  assert.match(html, /<html lang="it"/);
  assert.ok(html.includes('https://lzfortuna.web.app/'));
  assert.ok(html.includes('og:locale'));
  assert.ok(html.includes('it_IT'));
});

test('tailoring price page is statically exported, with WhatsApp and no checkout', () => {
  const html = read('out/sartoria/index.html');
  for (const group of ['Pantaloni e jeans', 'Camicie', 'Gonne e vestiti', 'Giacche e cappotti', 'Riparazione tende']) {
    assert.ok(html.includes(group), `Missing price section: ${group}`);
  }
  assert.ok(html.includes('https://wa.me/393668927486'));
  assert.ok(html.includes('tel:+393668927486'));
  assert.ok(html.includes('Prezzi indicativi'));
  assert.equal((read('lib/tailoring.ts').match(/service:/g) || []).length, 34); // includes type declaration, 33 rows
});

test('brand name is spelled consistently across public files', () => {
  const files = ['app/page.tsx', 'app/layout.tsx', 'app/prodotti/page.tsx', 'app/sartoria/page.tsx', 'lib/site.ts', 'legacy-hosting/404.html', 'package.json'];
  for (const file of files) {
    assert.doesNotMatch(read(file), /furtuna|LZFortuna|Lzfortuna|LZ-Fortuna|Lz Fortuna/, `${file} must use LZ FORTUNA / LZ Fortuna / lzfortuna`);
  }
});
