// Trigger type: Offchain - HTTP REST API callback
// String version with zenwatch handler

`async function echo_bot_by_zen_watch(zenwatch, payload) {
  const response = await fetch(payload.params.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': payload.params.api_key,
    },
    body: JSON.stringify({
      email: payload.email,
      from: payload.from,
      to: payload.to,
      value: payload.value,
    }),
  });

  if (!response.ok) {
    zenwatch.handle_error('Failed to post to webhook: ' + response.status + ' ' + response.statusText);
  }
  zenwatch.handle_action(response.json());
}`

// Actual function definition that's tested in Replit or IDE
async function echo_bot_by_zen_watch(zenwatch, payload) {
  const response = await fetch(payload.params.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': payload.params.api_key,
    },
    body: JSON.stringify({
      from: payload.from,
      to: payload.to,
      value: payload.value,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to post to webhook: ' + response.status + ' ' + response.statusText);
  }
  return response.json();
}



function caller_echo_bot_by_zen_watch() {

}

// Call the main function
caller_echo_bot_by_zen_watch();