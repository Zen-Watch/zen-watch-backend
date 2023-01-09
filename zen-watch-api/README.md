# Zen Watch API
Backend REST api server for Zen Watch which fetches data from the databases.

## Installation
* [Build A REST API With Node.js, Express, & MongoDB - Quick](https://www.youtube.com/watch?v=fgTGADljAeg)
* [Build and Deploy a MERN Stack Application | Complete MERN Stack Tutorial](https://www.youtube.com/watch?v=2kvA6Ba3fWo)
* [Build a Rest Api with NodeJS (JavaScript), Express, and PostgreSQL](https://www.youtube.com/watch?v=DihOP19LQdg)
* [PERN Stack Course - Postgres, Express, React, and Node](https://www.youtube.com/watch?v=ldYcgPKEZC8)
* [Anson the developer - ExpressJS Tutorial #3 - POST Requests](https://www.youtube.com/watch?v=1cjdlfB11Ss)

### Deployment
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
https://pm2.keymetrics.io/docs/usage/quick-start/
https://stackoverflow.com/questions/50689644/node-dotenv-wont-work-with-pm2

Install Ngnix on the production server
```apt install nginx ```

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

