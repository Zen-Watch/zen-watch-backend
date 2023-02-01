### Node Versions
Local Environment node version - v18.11.0
API & Admin Server 1 node version - v19.5.0

# Digital Ocean New Server Set up
```
# Install npm
ssh root@<server-ip>
apt-get update && apt-get install npm
npm -v
npm i -g n
n latest

exit
ssh root@<server-ip>
 
node -v
npm -v
```

# Setup Github SSH 
https://docs.github.com/en/authentication/connecting-to-github-with-ssh

```
ssh-keygen -t ed25519 -C "sgdheeban@gmail.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat < ~/.ssh/id_ed25519.pub
```

# Create Github folder
```
mkdir github
cd github

For api-server, additionally download:

git clone git@github.com:sgdheeban/zen-watch-backend.git
cd zen-watch-backend/zen-watch-api
npm install

For admin-server (runs admin ui, api & background jobs), additionally download:

git clone git@github.com:sgdheeban/zen-watch-backend.git
git clone git@github.com:sgdheeban/zen-watch-admin.git

cd zen-watch-backend/zen-watch-admin-api
npm install
copy & modify the .env files in the root folder

cd zen-watch-backend/zen-watch-background-jobs/zen-watch-event-evm-transaction-background-job/
npm install
copy & modify the .env files in the root folder

cd zen-watch-admin/zen-watch-admin-dashboard/
npm install
copy & modify the .env files in the root folder
```

# Install PM2 on the box
https://pm2.keymetrics.io/docs/usage/quick-start/
```
npm install pm2@latest -g
```

# Instal NGINX
```
apt install nginx
cd /etc/nginx/sites-available/
vim default

Comment out like this: 
# root /var/www/html;

Update the location block like this (comment out try_files, add proxy_pass with the right port)
# try_files $uri $uri/ =404;
proxy_pass http://localhost:1337;

Close the default file, restart nginx service
sudo service nginx restart
```

# Start the process with PM2
```
npm run build

For api-server, run from the root folder: 
pm2 start npm --name "api-server" -- start

For admin-api-server, run from the root folder:
pm2 start npm --name "admin-api-server" -- start
```

# Checking Environment
```
To check what localhost resolves to:
 more /etc/hosts
```

# Creating new mysql instance
* Connect over VPC instead of public IP
* Create a new db called zen_watch
* Copy connect details to the .env files in projects

