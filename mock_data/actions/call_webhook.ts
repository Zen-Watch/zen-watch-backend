// dependency
// const fetch = require('node-fetch');


async function postToWebhookWithAPIKeybasedAuthentication(url, data, apiKey) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to post to webhook: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function getFromWebhookWithAPIKeybasedAuthentication(url, apiKey) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get from webhook: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
// return getFromWebhookWithAPIKeybasedAuthentication;

async function postToWebhook(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
}

async function getFromWebhook(url) {
  const response = await fetch(url);
  return response.json();
}