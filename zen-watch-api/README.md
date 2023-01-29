# Zen Watch API
Backend REST api server for Zen Watch which fetches data from the databases.

## Installation
* [Build A REST API With Node.js, Express, & MongoDB - Quick](https://www.youtube.com/watch?v=fgTGADljAeg)
* [Restful API with NodeJS, Express, Typescript & Mongo / Mongoose - 2020](https://www.youtube.com/watch?v=lNqaQ0wEeAo)
* [Build and Deploy a MERN Stack Application | Complete MERN Stack Tutorial](https://www.youtube.com/watch?v=2kvA6Ba3fWo)
* [Build a Rest Api with NodeJS (JavaScript), Express, and PostgreSQL](https://www.youtube.com/watch?v=DihOP19LQdg)
* [PERN Stack Course - Postgres, Express, React, and Node](https://www.youtube.com/watch?v=ldYcgPKEZC8)
* [Anson the developer - ExpressJS Tutorial #3 - POST Requests](https://www.youtube.com/watch?v=1cjdlfB11Ss)
* [Mongoose JS - Official Documentation](https://mongoosejs.com/docs/typescript.html)
* [Mongoose JS - Indexes](https://mongoosejs.com/docs/guide.html#indexes)

### Code Walkthrough
```
src -- top level directory
- server.ts -- Main entry point for the server
- /routes -- Houses various apis, called by server.ts
- /handlers -- Invokes external & internal dependencies, called by routes
- /logic - Data access layer for mongoose models, called by handlers
- /db - MySQL connection pool & any other necessary core db files
- /cache - Contains cache files
```

### Deployment
``` npm install ```
Installs the dependencies for the the app with node command.

Create a .env file in the root folder & following secrets to the .env file, consult Dheeban.
Connect to MongoDB via mongosh and/or GUI.
```
MYSQL_HOST='127.0.0.1'
MYSQL_USER='your-local-mysql-user'
MYSQL_PASSWORD='your-local-mysql-password'
MYSQL_DATABASE='zen_watch'
SERVER_PORT=1337
ALCHEMY_API_KEY='get-your-alchemy-api-key'
CRYPTOCOMPARE_API_KEY='get-your-cryptocompare-api-key'
```

Download the postman collection & run the `/healthz` api:
```
https://api.postman.com/collections/2147990-ddfc6a6b-a76f-4f4f-ba39-55cefc1468df?access_key=PMAT-01GPFZ56RH6KJWMR7XW4DRJJKB
```

``` npm start ```
Starts the app with node command.

``` num run dev ```
Starts the app with nodemon command, for live reload during development.

``` npm run prod ```
This is same as npm start, except NODE_ENV is set to prod, to use production setting.
https://stackoverflow.com/questions/25112510/how-to-set-environment-variables-from-within-package-json


### Infrastructure
Mongo DB: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
For production, MongoDB is provisioned through Digital Ocean

For creating droplets and adding SSH access
https://docs.digitalocean.com/products/droplets/how-to/add-ssh-keys/

Learn more about deployment.
https://www.youtube.com/watch?v=2kvA6Ba3fWo

Using PM2 for production.
* https://pm2.keymetrics.io/docs/usage/quick-start/
* https://stackoverflow.com/questions/50689644/node-dotenv-wont-work-with-pm2
* [Using PM2 in 2020 for NodeJS](https://www.youtube.com/watch?v=ebdKIU6SDHI)

Install Ngnix on the production server
```apt install nginx ```

### Install & work with MYSQL

TODO: Checkout Prisma ORM: https://www.prisma.io/

* [Install mysql with Brew](https://flaviocopes.com/mysql-how-to-install/)
* [NodeJS, Express JS with MySQL](https://www.youtube.com/watch?v=Hej48pi_lOc)
* [MySQL Cheatsheet](https://devhints.io/mysql)
* [MySQL data types](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)
* [How to work with JSON / INDEXES in mysql](https://www.digitalocean.com/community/tutorials/working-with-json-in-mysql)
* [JSON mysql pros-cons](https://stackoverflow.com/questions/33660866/native-json-support-in-mysql-5-7-what-are-the-pros-and-cons-of-json-data-type)
* [Using Transaction in MySQL2](https://sehannrathnayake.medium.com/how-to-handle-mysql-database-transactions-with-nodejs-b7a2bf1fd203)
*[Scheduling with node-cron in nodejs](https://www.youtube.com/watch?v=KxPENgraciY)
* [MySQL date timestamp tricks](https://www.w3schools.com/sql/func_mysql_date_sub.asp)
* [MySQL cheatsheet](https://devhints.io/mysql) - [here too](https://popsql.com/learn-sql/mysql/how-to-query-date-and-time-in-mysql)
* [MySQL from unix time](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_from-unixtime)

#### JSON MYSQL
* https://vladmihalcea.com/index-json-columns-mysql
* https://dev.mysql.com/blog-archive/indexing-json-documents-via-virtual-columns/
* [Virtual Columns with JSON Data Types](https://www.youtube.com/watch?v=sDK5YMBpiy4)
* [JSON in MySQL](https://www.youtube.com/watch?v=mL7xnMZNYXM)
* [Virtual Columns in MySQL](https://www.youtube.com/watch?v=uiI_tZyQDZo)
* [JSON + SQL](https://www.youtube.com/watch?v=PlYlYERtTWc)
* https://medium.com/1mgofficial/mysql-json-support-virtual-columns-and-indexing-json-31df4cc1aa31
* https://stackoverflow.com/questions/38389075/how-to-create-index-on-json-column-in-mysql
* https://subscription.packtpub.com/book/big-data-and-business-intelligence/9781788395809/13/ch13lvl1sec122/indexing-for-json-using-generated-columns
* https://medium.com/@michalisantoniou6/massive-performance-gains-on-json-column-queries-using-mysql-virtual-columns-and-indexes-in-laravel-dc7d289a41b3
* [Remove Quote String MySQL JSON](https://dba.stackexchange.com/questions/143576/how-to-remove-string-quotes-in-mysql-5-7-for-function-json-extract)

#### Commands to run local mysql
``` brew services start mysql ```
``` brew services stop mysql ```
``` mysql -u root -p ```
``` SHOW INDEXES FROM table_name ```

#### Indexing JSON on MySQL
* https://planetscale.com/blog/indexing-json-in-mysql
* https://stackoverflow.com/questions/38389075/how-to-create-index-on-json-column-in-mysql
* https://www.compose.com/articles/mysql-for-json-generated-columns-and-indexing/
* https://vladmihalcea.com/index-json-columns-mysql

#### Cors Error
* [What is CORS and How to solve CORS error in Node.js (Express.js)](https://www.youtube.com/watch?v=OX-9oOcPDfE)
* [Learn CORS In 6 Minutes-Web Dev Simplified](https://www.youtube.com/watch?v=PNtFSVU-YTI)
* [Express (NodeJS) - How to enable CORS](https://www.youtube.com/watch?v=zDqwbiCyur8)
* [NodeJS - How to use CORS with Express](https://www.youtube.com/watch?v=XHNn0ToXovA)
* https://www.twilio.com/blog/add-cors-support-express-typescript-api

#### Specific issues
* https://stackoverflow.com/questions/49817290/how-to-tell-typescript-that-process-is-not-undefined
* [Too Many MySQL connections - Check Hack.md](https://stackoverflow.com/questions/65813552/too-many-connections-nodejs-mysql2-promise)

#### Caching
* [Node Cache](https://www.youtube.com/watch?v=ipIGWZwxC7w)

#### Commands to run local mongdb

Start/Stop Mongod process

```brew services start mongodb-community@6.0```
```brew services stop mongodb-community@6.0```

Manually run as a background process on Intel Macs
```mongod --config /usr/local/etc/mongod.conf --fork```

Manually run as a background process on M1 Macs
```mongod --config /opt/homebrew/etc/mongod.conf --fork```

To stop a mongod running as a background process, connect to the mongod using 
mongosh and issue the shutdown command as needed.

Start the mongosh client:
```
mongosh
show dbs
show collections
db.metrics.find()
db.metrics.drop()
```

## Error Resolutions
* [Solution for EADDRINUSE error while running concurrently](https://stackoverflow.com/questions/61181302/nodemon-error-listen-eaddrinuse-address-already-in-use-5000) 
* [Find & kill a port in Mac](https://codinhood.com/nano/macos/find-kill-proccess-port-macos)


## Skipped for future
Learning from time wasting mistakes.Failed attempts.

### Heavy weight typescript codebase
* [Build a REST API with Node.js, Express, TypeScript, MongoDB & Zod](https://www.youtube.com/watch?v=BWUi6BS9T5Y)
* [Reference github code](https://github.com/TomDoesTech/REST-API-Tutorial-Updated/blob/main/src/models/product.model.ts)

#### Local installation of postgres

* [How to Install Postgres on MacOS](https://www.youtube.com/watch?v=Z-iM7hUdBSg)

* https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/

* [Build a Rest Api with NodeJS (JavaScript), Express, and PostgreSQL](https://www.youtube.com/watch?v=DihOP19LQdg)

```
\connectinfo
\l
create database explorer;
\c explorer;
\! clear
```

