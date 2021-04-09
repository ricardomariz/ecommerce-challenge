# ecommerce-challenge


## Install dependencies
$ yarn

## Create database with docker-compose
$ docker-compose up -d

credentials values for database are on docker-compose file

## Make migrations
$ yarn typeorm migration:run

## Change the MailTrap config to your own.
MailTrap file is in src/config/mailTrap.ts
change user and pass values

## Run server
$ yarn dev

## API Server will run on port: 3333 - access <http://localhost:3333>
