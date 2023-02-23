# Zen Watch Event EVM Transaction Background Job
Background job to process unprocess events to populate visualization & alerting tables. Handles logic related to evm transactions.

## Debugging
Look into polygon & other blockchain explorers to get representative inputs about all error conditions. Go deep into understanding blockchain transactions.
https://polygonscan.com/

### Code Walkthrough
```
src -- top level directory
- server.ts -- Main entry point for the server
- /handlers -- Invokes external & internal dependencies, called by routes
- /logic - Data access layer for sql models, called by handlers
- /db - MySQL connection pool & any other necessary core db files
- /core - Contains core business logic files common to all modules, chains etc
- /cache - Contains cache files
```

### Working with JSON MysQL
https://medium.com/1mgofficial/mysql-json-support-virtual-columns-and-indexing-json-31df4cc1aa31

### Create Environment Variables
Create a .env file in the root folder & following secrets to the .env file, consult Dheeban.
Connect to MySQL via client.
```
MYSQL_HOST='127.0.0.1'
MYSQL_USER='your-local-mysql-user'
MYSQL_PASSWORD='your-local-mysql-password'
MYSQL_DATABASE='zen_watch'
SERVER_PORT=1337
ALCHEMY_API_KEY='get-your-alchemy-api-key'
CRYPTOCOMPARE_API_KEY='get-your-cryptocompare-api-key'
API_WORKER_ID=0
```
NOTE: API_WORKER_ID is a range from [0,N), where N is the total number of shards, configured in the system. Each worker, picks the shard that they are asigned, i.e., API_WORKER_ID, picks shard 0. Currently, we have only on shard, but this allows for horizontal scalability in the background job processing.

### Deployment
``` npm install ```
Installs the dependencies for the the app with node command.

``` npm run build ```
Builds the code for the the app with node command.

``` npm start ```
Starts the app in a standalone mode with the node command.

### Start the processes with PM2 in production
```
For each background job, run from the root folder:
npm run build
pm2 start app.config.json
```

### To list, stop or delete the PM2 process
```
pm2 stop <process-name>
pm2 delete <process-name>
pm2 ls
```