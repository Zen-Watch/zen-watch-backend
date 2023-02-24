# Zen Watch Admin API
Backend REST admin api server for Zen Watch Admin dashboard.

### Code Walkthrough
```
src -- top level directory
- server.ts -- Main entry point for the server
- /routes -- Houses various apis, called by server.ts
- /handlers -- Invokes external & internal dependencies, called by routes
- /logic - Data access layer for sql models, called by handlers
- /db - MySQL connection pool & any other necessary core db files
- /cache - Contains cache files
```

### Create Environment Variables
Create a .env file in the root folder & following secrets to the .env file, consult Dheeban.
Connect to MySQL via client.
```
MYSQL_HOST='127.0.0.1'
MYSQL_USER='your-local-mysql-user'
MYSQL_PASSWORD='your-local-mysql-password'
MYSQL_DATABASE='zen_watch'
SERVER_PORT=1338
ALCHEMY_API_KEY='get-your-alchemy-api-key'
CRYPTOCOMPARE_API_KEY='get-your-cryptocompare-api-key'
ALLOWED_DEV_API_KEY='zen-watch-api-key'
IFTTT_INSTANCE_WORKER_SHARDS=1
```

### Local Testing in Postman
Download the postman collection & run the `/healthz` api:
```
https://api.postman.com/collections/2147990-ddfc6a6b-a76f-4f4f-ba39-55cefc1468df?access_key=PMAT-01GPFZ56RH6KJWMR7XW4DRJJKB
```

### Deployment
``` npm install ```
Installs the dependencies for the the app with node command.

``` npm start ```
Starts the app with node command.

``` num run dev ```
Starts the app with nodemon command, for live reload during development.

### Start the processes with PM2 in production
```
For admin-api-server, run from the root folder:
npm run build
pm2 start app.config.json
```

### To list, stop or delete the PM2 process
```
pm2 stop <process-name>
pm2 delete <process-name>
pm2 ls
```

### Find and kill a process
```
sudo lsof -i :<PortNumber>
kill -9 <PID>
```
#### Commands to run local mysql
``` brew services start mysql ```
``` brew services stop mysql ```
``` mysql -u root -p ```
``` SHOW INDEXES FROM table_name ``