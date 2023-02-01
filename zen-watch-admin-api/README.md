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
SERVER_PORT=1337
ALCHEMY_API_KEY='get-your-alchemy-api-key'
CRYPTOCOMPARE_API_KEY='get-your-cryptocompare-api-key'
ALLOWED_ORIGIN='http://localhost:3000 or the remote server'
ALLOWED_DEV_API_KEY='zen-watch-api-key'
```

### Deployment
``` npm install ```
Installs the dependencies for the the app with node command.

Download the postman collection & run the `/healthz` api:
```
https://api.postman.com/collections/2147990-ddfc6a6b-a76f-4f4f-ba39-55cefc1468df?access_key=PMAT-01GPFZ56RH6KJWMR7XW4DRJJKB
```

``` npm start ```
Starts the app with node command.

``` num run dev ```
Starts the app with nodemon command, for live reload during development.

### Start the processes with PM2 in production
```
For api-server, run from the root folder: 
npm run build
pm2 start app.config.json

For admin-api-server, run from the root folder:
npm run build
pm2 start app.config.json

For admin-dashboard, run from the root (make sure to start the admin-api-server before this):
npm run build
pm2 start app.config.json

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

### Find and kill a process
```
sudo lsof -i :<PortNumber>
kill -9 <PID>
```

### Infrastructure
For creating droplets and adding SSH access
https://docs.digitalocean.com/products/droplets/how-to/add-ssh-keys/

#### Learn more about Digital Ocean deployment.
* [CODEDAMN-Build and Deploy a MERN Stack Application | Complete MERN Stack Tutorial](https://www.youtube.com/watch?v=2kvA6Ba3fWo)
* [CODEDAMN-Full DigitalOcean Crash Course - Get started with cloud computing today](https://www.youtube.com/watch?v=9ZUHSW1tTiU)
* [CODEDAMN-DigitalOcean Playlist](https://www.youtube.com/playlist?list=PLYxzS__5yYQk7h6aoN5_rvvvC8WUMxAaB)
* [Using Nginx to Host Multiple Websites on One Server](https://www.youtube.com/watch?v=b6YKx72XXQM)
* [Part 1: Latest DigitalOcean Crash Course for beginner (Node JS, Nginx, MySql etc)](https://www.youtube.com/watch?v=qp3YlqYu-ig)
* [Part 2: Deploy Node.js App To DigitalOcean Server | DigitalOcean Crash Course](https://www.youtube.com/watch?v=akEfQt9oGmc)
* https://docs.digitalocean.com/products/networking/vpc/concepts/best-practices/

#### Digital Ocean Security Best Practices
* https://docs.digitalocean.com/products/networking/vpc/concepts/best-practices/
* https://docs.digitalocean.com/products/databases/mysql/how-to/secure/
* https://docs.digitalocean.com/products/networking/vpc/how-to/add-resources/
* https://docs.digitalocean.com/products/databases/mysql/how-to/schedule-updates/

#### Dockerizing Node JS
* [Build a REST API with Node JS and Express JS | With Chanakya 1](https://www.youtube.com/watch?v=S8bbbcskNkM)
* [Containerize a Node JS and Express API with Docker | With Chanakya](https://www.youtube.com/watch?v=waKaGikF_Ig)
* [Deploying a Containerized(Docker) Node JS REST API to Digital Ocean | With Chanakya](https://www.youtube.com/watch?v=RSI3v5YzPbc)
* [Getting started with Docker and Kubernetes for Web Developers on Digital Ocean](https://www.youtube.com/watch?v=YrM0UPsnY1Q)
* [Deploying a MERN Application (with Docker, Atlas, and Digital Ocean!)](https://www.youtube.com/watch?v=DftsReyhz2Q)
* [Why Use Docker](https://www.youtube.com/watch?v=SYozbyvsP8A)
* [What Is Docker? | What Is Docker And How It Works? | Docker Tutorial For Beginners | Simplilearn](https://www.youtube.com/watch?v=rOTqprHv1YE)
* [Docker with Nodejs in 5 mins // Docker Tutorial](https://www.youtube.com/watch?v=hXhI2ZLDgQM)
* [GOOD - Learn Docker in 7 Easy Steps - Full Beginner's Tutorial](https://www.youtube.com/watch?v=gAkwW2tuIqE)
* [How to build docker image for nodejs apps](https://www.youtube.com/watch?v=DQJNtDm5qy0)
* [How To Build a Node.JS Application with Docker | Getting Started with Docker Using Node.js](https://www.youtube.com/watch?v=PsWeSg38XFY)
* [Install Docker on DigitalOcean Droplet (2022)](https://www.youtube.com/watch?v=dSfDK1KIiVs)
* [Building a Local Dev Environment with Docker](https://www.youtube.com/watch?v=FiaLKwdv9TI)
* [How to dockerize NodeJS and MongoDB application using docker-compose](https://www.youtube.com/watch?v=vm3YfOHf_Cc)
* [Docker Compose Tutorial](https://www.youtube.com/watch?v=HG6yIjZapSA)
* [Docker Tutorial for BeginnersDocker Tutorial for Beginners](https://www.youtube.com/watch?v=pTFZFxd4hOI)
* [Docker Deepdive Playlist](https://www.youtube.com/watch?v=syzwLwE3Xq4&list=PLj-2elZxVPZ8k8z6a2q6-J79Y-9BUQllW)

#### Using PM2 for production
* https://pm2.keymetrics.io/docs/usage/quick-start/
* https://stackoverflow.com/questions/50689644/node-dotenv-wont-work-with-pm2
* [Using PM2 in 2020 for NodeJS](https://www.youtube.com/watch?v=ebdKIU6SDHI)
* [Using PM2 with start command](https://stackoverflow.com/questions/31579509/can-pm2-run-an-npm-start-script)
* [How to Build React for Production Using PM2](https://javascript.plainenglish.io/how-do-you-build-reactjs-for-production-pm2-816001d1d736)

#### Install Ngnix on the production server
```apt install nginx ```

#### Commands to run local mysql
``` brew services start mysql ```
``` brew services stop mysql ```
``` mysql -u root -p ```
``` SHOW INDEXES FROM table_name ``

#### MySQL Backup/Archives on Digital Ocean
* [Managed Databases for MySQL by DigitalOcean](https://www.youtube.com/watch?v=NIW5NQxpOjg)
* https://www.digitalocean.com/community/questions/how-to-get-long-term-backups-for-digitalocean-s-managed-databases-mysql
* https://www.digitalocean.com/community/tutorials/how-to-back-up-a-mysql-database-to-spaces-using-lvm-snapshots
* https://www.digitalocean.com/community/questions/how-to-get-long-term-backups-for-digitalocean-s-managed-databases-mysql
* https://simplebackups.com/blog/how-to-backup-mysql-to-digitalocean-spaces/
* https://snapshooter.com/learn/backup-mysql-to-digitalocean-spaces
* https://stackoverflow.com/questions/65595461/how-to-export-mysql-database-from-digital-ocean-managed-database
* https://www.digitalocean.com/blog/digitalocean-acquires-snapshooter`

## Error Resolutions
* [Solution for EADDRINUSE error while running concurrently](https://stackoverflow.com/questions/61181302/nodemon-error-listen-eaddrinuse-address-already-in-use-5000) 