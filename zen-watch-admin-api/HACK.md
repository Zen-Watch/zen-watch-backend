[1] Error: Too many connections
[1]     at PromisePool.query (/Users/sgdheeban/Documents/zen-watch/zen-watch-backend/zen-watch-admin-api/node_modules/mysql2/promise.js:351:22)
[1]     at /Users/sgdheeban/Documents/zen-watch/zen-watch-backend/zen-watch-admin-api/build/logic/developer.logic.js:25:35
[1]     at Generator.next (<anonymous>)
[1]     at fulfilled (/Users/sgdheeban/Documents/zen-watch/zen-watch-backend/zen-watch-admin-api/build/logic/developer.logic.js:5:58)
[1]     at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
[1]   code: 'ER_CON_COUNT_ERROR',
[1]   errno: 1040,
[1]   sql: undefined,
[1]   sqlState: '',
[1]   sqlMessage: 'Too many connections'
[1] }
