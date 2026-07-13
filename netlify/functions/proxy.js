exports.handler = async function(event) {

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const TARGET_URL = 'https://script.google.com/macros/s/AKfycbwqdjNpHIoUnlU9fP152LayXEkvzpEWtgBrVmGEXORU-OutDcb-Yc4MF8caXVLtbMzj-g/exec';

  // ── Forward to Apps Script WITHOUT awaiting ──────────────────
  // Apps Script is slow (20-30s). Netlify times out if we await.
  // We fire-and-forget — Apps Script still runs to completion.
  fetch(TARGET_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'text/plain' },
    body:    event.body || '',
    redirect: 'follow'
  }).catch(err => console.log('Apps Script forward error:', err.message));

  // ── Return immediately to the browser ────────────────────────
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin':  '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: 'ok' })
  };
};
