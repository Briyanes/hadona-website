/**
 * POST /api/contact — Hadona lead form endpoint (Vercel serverless function).
 *
 * Sends the brief by email via Resend (https://resend.com).
 * Required env: RESEND_API_KEY
 * Optional env: NOTIFY_EMAIL (default hello@hadona.id)
 *               CONTACT_FROM  (default Resend sandbox sender; set to a
 *                              verified domain, e.g. 'Hadona Website <form@hadona.id>')
 */
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WINDOW_MS = 10 * 60 * 1000; // rate-limit window
const MAX_PER_WINDOW = 5;
const hits = new Map(); // best-effort, per-instance rate limiting

function str(v, max) {
  return String(v == null ? '' : v).trim().slice(0, max);
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body || '{}'); } catch (e) { body = null; }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'Invalid payload' });
  }

  // Honeypot: bots that fill the hidden "website" field are accepted silently.
  if (str(body.website, 200)) return res.status(200).json({ ok: true });

  const name = str(body.name, 80);
  const email = str(body.email, 120).toLowerCase();
  const company = str(body.company, 120);
  const budget = str(body.budget, 60);
  const message = str(body.message, 2000);

  if (name.length < 2) return res.status(400).json({ ok: false, error: 'Name is required' });
  if (!RE_EMAIL.test(email)) return res.status(400).json({ ok: false, error: 'Valid email is required' });
  if (!budget) return res.status(400).json({ ok: false, error: 'Budget is required' });
  if (message.length < 10) return res.status(400).json({ ok: false, error: 'Message is too short' });

  // Basic per-IP rate limit (best effort across warm instances).
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_PER_WINDOW) return res.status(429).json({ ok: false, error: 'Too many requests' });
  list.push(now);
  hits.set(ip, list);

  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(500).json({ ok: false, error: 'Server not configured' });

  const notify = process.env.NOTIFY_EMAIL || 'hello@hadona.id';
  const from = process.env.CONTACT_FROM || 'Hadona Website <onboarding@resend.dev>';
  const text =
    'New brief from hadona.id\n\n' +
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n' +
    'Company: ' + (company || '-') + '\n' +
    'Budget: ' + budget + '\n\n' +
    'Message:\n' + message + '\n';

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: from,
        to: [notify],
        reply_to: email,
        subject: 'New brief — ' + name + (company ? ' (' + company + ')' : ''),
        text: text
      })
    });
    if (!r.ok) return res.status(502).json({ ok: false, error: 'Mail provider error' });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'Mail provider unreachable' });
  }
};
