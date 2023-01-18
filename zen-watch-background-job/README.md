# Zen Watch Background Job
Background job to process unprocess events to populate visualization & alerting tables

## Debugging
Look into polygon & other blockchain explorers to get representative inputs about all error conditions. Go deep into understanding blockchain transactions.
https://polygonscan.com/


### Code Walkthrough
```
src -- top level directory
- server.ts -- Main entry point for the server
- /handlers -- Invokes external & internal dependencies, called by routes
- /logic - Data access layer for mongoose models, called by handlers
- /db - MySQL connection pool & any other necessary core db files
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
```

``` npm start ```
Starts the app in a standalone mode with the node command.

``` npm run prod ```
Starts the app in PM2 mode with the node command.


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
