### Note
Not setting to processing state now, as we want the subsequent task to pick up the unfinished task and right now, each shard is acted by one dedicated worker, which might be true in the future as well.

#### mysql2 read for update

In MySQL, SELECT ... FOR UPDATE is used to lock the selected rows in a transaction, preventing other transactions from modifying them. This is useful in scenarios where you want to update the selected rows without any other transactions modifying them before your update is complete.

Here's an example of using mysql2 to read rows with SELECT ... FOR UPDATE:

```
const mysql = require('mysql2/promise');

async function readRowsForUpdate(connection, tableName) {
  const [rows] = await connection.execute(`SELECT * FROM ${tableName} WHERE is_processed = false FOR UPDATE`);
  return rows;
}

async function processRows(connection, rows, tableName) {
  // Do some processing with the rows
  const promises = rows.map((row) => {
    return connection.execute(`UPDATE ${tableName} SET is_processed = true WHERE id = ?`, [row.id]);
  });
  await Promise.all(promises);
}

async function main() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'my_database',
  });

  const tableName = 'my_table';
  const rows = await readRowsForUpdate(connection, tableName);

  if (rows.length > 0) {
    await processRows(connection, rows, tableName);
  }

  connection.end();
}

main().catch((error) => {
  console.error(error);
});

```
In this example, readRowsForUpdate selects all rows from the specified table where is_processed = false and acquires a lock on them using FOR UPDATE. The function returns an array of rows, which can then be passed to processRows for processing.

processRows updates the is_processed column for each row to true and then releases the lock.

Note that you need to create a new connection for each transaction and explicitly end the connection when you're done.


#### mysql2 pools & transactions

Sure! Here's an example of using mysql2 with async and transactions to update two tables:

```
const mysql = require('mysql2/promise');
const async = require('async');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
});

async function updateTables() {
  let conn;
  try {
    conn = await pool.getConnection();

    await conn.beginTransaction();

    const result1 = await conn.query('UPDATE table1 SET column1 = ? WHERE id = ?', ['value1', 1]);
    const result2 = await conn.query('UPDATE table2 SET column2 = ? WHERE id = ?', ['value2', 2]);

    await conn.commit();

    console.log('Tables updated successfully');
  } catch (err) {
    await conn.rollback();
    console.error(err);
  } finally {
    if (conn) {
      conn.release();
    }
  }
}

updateTables();

```
This example uses async to run the two UPDATE queries in parallel, but it can be modified to run them sequentially as well.
