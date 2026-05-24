export function getVariant(key: string): 'A' | 'B' {
  if (typeof window === 'undefined') return 'A';
  const name = `ab_${key}`;
  let v = window.localStorage.getItem(name);
  if (!v) {
    v = Math.random() < 0.5 ? 'A' : 'B';
    window.localStorage.setItem(name, v);
  }
  return v as 'A' | 'B';
}

export function recordClick(key: string) {
  if (typeof window === 'undefined') return;
  const variant = getVariant(key);
  const countKey = `ab_${key}_clicks_${variant}`;
  const n = Number(window.localStorage.getItem(countKey) || '0') + 1;
  window.localStorage.setItem(countKey, String(n));
  console.log('[AB]', key, variant, n);
}
