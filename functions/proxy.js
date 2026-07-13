exports.handler = async function(event) {

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // ── PASTE YOUR REAL APPS SCRIPT URL HERE ──
  const TARGET_URL = 'https://script.google.com/macros/s/AKfycbwH1I1qw8a-JrXz6lJwOVfD_62PLBOLV0bWMYgvPfXvrKJQYJ8yWOisdjukMY_WfG2s0g/exec';

  try {
    const response = await fetch(TARGET_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'text/plain' },
      body:    event.body,
      redirect: 'follow'
    });

    return {
      statusCode:  200,
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: '{"status":"ok"}'
    };

  } catch (err) {
    return {
      statusCode: 200, // still return 200 so form doesn't break
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'error', message: err.message })
    };
  }
};