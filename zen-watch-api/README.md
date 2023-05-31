# Zen Watch API
Backend REST api server for Zen Watch which fetches data from the databases.

**Note:** This repository contains an outdated Event System, and a new version is currently being build.

## Generate API keys
Use the following site to genrate an api key for new sign ups - https://www.uuidgenerator.net/

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
### Node Versions
Local Environment node version - v18.11.0
API & Admin Server 1 node version - v19.5.0

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
API_WORKER_SHARDS=1
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

``` npm run dev ```
Starts the app with nodemon command, for live reload during development.

### Start the processes with PM2 in production
```
For api-server, run from the root folder: 
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
``` SHOW INDEXES FROM table_name ```

### Command to connect to remote MySQL
```
* Add your local dynamic ip to digital ocean trusted source, if your ip changed
* Connect over terminal with public ip from your local, and private ip from admin/api servers
mysql -u doadmin -h mysql-server-1-do-user-13444801-0.b.db.ondigitalocean.com -P 25060 -D zen_watch -p
* You can add the details to sqlace as well, no ca-cert required
```
