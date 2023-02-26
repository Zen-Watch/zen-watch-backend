// Trigger type: Offchain - HTTP REST API callback
// String version with zenwatch handler

`async function echo_bot_by_zen_watch(url, api_key, payload, zenwatch) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': api_key,
    },
    body: JSON.stringify(payload.data),
  });

  if (!response.ok) {
    zenwatch.handle_error('Failed to post to webhook: ' + response.status + ' ' + response.statusText);
  }
  zenwatch.handle_action(response.json());
}`

// Actual function definition that's tested in Replit or IDE
async function echo_bot_by_zen_watch(url, api_key, payload, zenwatch) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': api_key,
    },
    body: JSON.stringify(payload.data),
  });

  if (!response.ok) {
    throw new Error(`Failed to post to webhook: ${response.status} ${response.statusText}`);
  }

  return response.json();
}



function caller_echo_bot_by_zen_watch() {
  // const result = echo_bot_by_zen_watch(
  //   'http://localhost:1338/ifttt/test/echo'
  // )
  // console.log(result);
  console.log('caller_echo_bot_by_zen_watch');
  echo_bot_by_zen_watch(
    'http://localhost:1338/ifttt/test/echo',
    'xyz',
    JSON.stringify({ "email": "sgdheeban@gmail.com", a: 1 })
  ).then((response) => {
    console.log("response", response);
  }).catch((error) => {
    console.log("error", error);
  });
}

// Call the main function
caller_echo_bot_by_zen_watch();