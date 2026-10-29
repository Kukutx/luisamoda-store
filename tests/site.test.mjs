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
  assert.ok(page.includes('/brand/lz-wordmark.png'), 'Header must use the approved original wordmark image');
  const hero = page.split('{/* Original centred editorial composition, updated to the LZ identity. */}')[1]?.split('{/* Retain the original photographic cards and editorial proportions. */}')[0] ?? '';
  assert.ok(hero.includes('<h1'), 'The hero wordmark must remain');
  assert.ok(hero.includes('/brand/lz-lockup.png'), 'Hero must use the approved original lockup');
  assert.doesNotMatch(hero, /<LZMonogram/, 'The hero must not repeat a separate monogram');
  assert.doesNotMatch(page, /LUISA <span|aria-label="Luisa Moda"/);
  assert.ok(page.includes('photo-1558171813-4c088753af8f'), 'Original sewing image must remain');
  assert.ok(css.includes('--color-foreground: #050505'), 'Original monochrome palette must remain');
  assert.doesNotMatch(page, /hero-art|art-script/, 'Do not replace the hero with a new decorative brand card');
});

test('approved original logo image assets are installed, no substitute vector', () => {
  for (const file of ['lz-wordmark.png', 'lz-lockup.png', 'lz-monogram.png', 'icon.png']) {
    const url = new URL('../public/brand/' + file, import.meta.url);
    assert.ok(existsSync(url), 'Approved original asset is missing: ' + file);
    assert.ok(readFileSync(url).subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex')));
  }
  assert.ok(!existsSync(new URL('../app/icon.svg', import.meta.url)));
  assert.ok(!existsSync(new URL('../public/lz-fortuna-logo.svg', import.meta.url)));
  assert.match(read('app/layout.tsx'), /icons: \{ icon: '\/brand\/icon\.png' \}/);
  assert.ok(read('lib/site.ts').includes("name: 'LZ FORTUNA'"));
  assert.ok(read('app/layout.tsx').includes("const title = 'LZ FORTUNA"));
});

test('only goods and tailoring service cards remain', () => {
  const page = read('app/page.tsx');
  assert.match(page, /products: 'PRODOTTI'/);
  assert.match(page, /sewing: 'CUCITO E MODIFICHE'/);
  assert.doesNotMatch(page, /STAMPA 3D|INCISIONE|print3d|photo-1612815154858-60aa4c59eaa6/);
  assert.match(page, /md:grid-cols-2 md:gap-10/);
  assert.match(page, /href: '\/sartoria\/'/);
  const exported = read('out/index.html');
  assert.ok(exported.includes('PRODOTTI') && exported.includes('CUCITO E MODIFICHE'));
  assert.ok(!exported.includes('STAMPA 3D') && !exported.includes('INCISIONE'));
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
