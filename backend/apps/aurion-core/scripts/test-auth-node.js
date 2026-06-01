// Cross-platform Node test script for aurion-core auth endpoints
// Requires Node 18+ (global fetch)
const BASE = process.env.BASE ?? 'http://localhost:3333';

function parseSetCookie(setCookie) {
  if (!setCookie) return {};
  // setCookie may be string or array
  const arr = Array.isArray(setCookie) ? setCookie : [setCookie];
  const cookies = {};
  for (const entry of arr) {
    const parts = entry.split(';')[0].split('=');
    const name = parts.shift();
    const value = parts.join('=');
    cookies[name] = value;
  }
  return cookies;
}

async function signup() {
  const res = await fetch(`${BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'NodeTest', email: `node.test+${Date.now()}@example.com`, password: 'secret' }),
  });
  const setCookie = res.headers.get('set-cookie');
  const cookies = parseSetCookie(setCookie);
  const body = await res.json().catch(() => null);
  return { status: res.status, body, cookies };
}

async function signIn(email, password) {
  const res = await fetch(`${BASE}/auth/signin`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const setCookie = res.headers.get('set-cookie');
  const cookies = parseSetCookie(setCookie);
  const body = await res.json().catch(() => null);
  return { status: res.status, body, cookies };
}

async function session(cookieHeader) {
  const res = await fetch(`${BASE}/auth/me`, {
    method: 'GET',
    headers: cookieHeader ? { cookie: cookieHeader } : {},
  });
  const body = await res.json().catch(() => null);
  return { status: res.status, body };
}

async function signOut(cookieHeader) {
  const res = await fetch(`${BASE}/auth/logout`, {
    method: 'POST',
    headers: cookieHeader ? { cookie: cookieHeader } : {},
  });
  const body = await res.json().catch(() => null);
  return { status: res.status, body };
}

(async function main() {
  console.log('Signing up...');
  const up = await signup();
  console.log('signup status', up.status);
  console.log('signup body', up.body);
  const cookieHeader = Object.keys(up.cookies).map(k => `${k}=${up.cookies[k]}`).join('; ');

  console.log('Session (after signup):');
  console.log(await session(cookieHeader));

  console.log('Signing out...');
  console.log(await signOut(cookieHeader));

  if (!up.body?.user?.email) {
    console.log('No user email returned; cannot test sign-in flow reliably. Exiting.');
    process.exit(0);
  }

  const email = up.body.user.email;
  const pwd = 'secret';

  console.log('Signing in...');
  const inRes = await signIn(email, pwd);
  console.log('signin status', inRes.status);
  console.log('signin body', inRes.body);
  const cookieHeader2 = Object.keys(inRes.cookies).map(k => `${k}=${inRes.cookies[k]}`).join('; ');

  console.log('Session (after sign-in):');
  console.log(await session(cookieHeader2));

  console.log('Done');
})();
