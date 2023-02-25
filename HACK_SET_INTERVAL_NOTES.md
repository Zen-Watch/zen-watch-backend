#### Set interval
```
const interval = setInterval(() => {
  console.log('Hello, world!');
}, 1000);
```

The setInterval function in JavaScript does not wait for the previous invocation of the callback function to finish before starting the next one. If the function takes more than 1000ms to execute, then multiple invocations may overlap and execute concurrently. This can lead to issues with race conditions, contention, and other unexpected behaviors.

To avoid this issue, you can use setTimeout instead of setInterval, and recursively schedule the next invocation of the function after the current one completes. Here's an example:

#### Set timeout
```
async function myFunction() {
  // do some work...
}

async function run() {
  try {
    await myFunction();
  } catch (error) {
    console.error(error);
  }

  // Schedule the next invocation of the function after a delay
  setTimeout(run, 1000);
}

// Start the loop
run();

```
- The setTimeout does not automatically start the next invocation after the first function finishes. setTimeout simply schedules a function to be executed after a specified delay. The delay is the amount of time, in milliseconds, that the browser waits before executing the function.

If you want to schedule the next invocation of the function after the first function finishes, you would need to manually schedule the next setTimeout call inside the first function.

- The setTimeout is a standard JavaScript function and works in Node.js. It is used to execute a function after a specified amount of time has elapsed. 
- setInterval schedules the function to run repeatedly at a specified time interval, and in this case, it will wait for 1000 milliseconds after the first time it is printed and then print again.

```
function printMessage() {
  console.log('Hello, world!');
  setTimeout(printMessage, 1000);
}

setTimeout(printMessage, 1000);

```

