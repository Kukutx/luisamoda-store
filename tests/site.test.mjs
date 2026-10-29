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
  for (const name of ['LZFortuna-store', 'Luisa Moda', 'Cologno Monzese', 'Calusco']) {
    assert.ok(config.includes(name), 'Missing ' + name);
  }
  assert.equal((config.match(/09:00–19:30/g) || []).length, 2);
});

test('Italian, Chinese and English are available', () => {
  const page = read('app/page.tsx');
  for (const locale of ['it:', 'zh:', 'en:']) {
    assert.ok(page.includes(locale), 'Missing translation ' + locale);
  }
});

test('preserves the original LUISA editorial visual identity', () => {
  const page = read('app/page.tsx');
  const css = read('app/globals.css');
  assert.ok(page.includes('LUISA <span'), 'Original centered LUISA hero must remain');
  assert.ok(page.includes('photo-1558171813-4c088753af8f'), 'Original sewing image must remain');
  assert.ok(css.includes('--color-foreground: #050505'), 'Original monochrome palette must remain');
  assert.doesNotMatch(page, /hero-art|art-script/, 'Do not replace the hero with a new decorative brand card');
});

test('static Next.js export contains both stores without the old number', () => {
  assert.ok(existsSync(new URL('../out/index.html', import.meta.url)), 'Build the site before running tests');
  const html = read('out/index.html');
  for (const name of ['LZFortuna-store', 'Luisa Moda', 'Cologno Monzese', 'Calusco', '366 892 7486']) {
    assert.ok(html.includes(name), 'Missing in exported HTML: ' + name);
  }
  assert.ok(html.includes('https://wa.me/393668927486'));
});
