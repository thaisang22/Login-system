Login System
<p align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  </a>
</p>
<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>
<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" />
  </a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank">
    <img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" />
  </a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank">
    <img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" />
  </a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank">
    <img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/>
  </a>
  <a href="https://opencollective.com/nest#backer" target="_blank">
    <img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" />
  </a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank">
    <img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" />
  </a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank">
    <img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate PayPal" />
  </a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank">
    <img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us" />
  </a>
  <a href="https://twitter.com/nestframework" target="_blank">
    <img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow NestJS" />
  </a>
</p>
Description
This project is a login system built using NestJS, a progressive Node.js framework for building efficient and scalable server-side applications.

## Installation
Clone the Repository
```bash
git clone https://github.com/thaisang22/Login-system.git
cd Login-system
```
## Install Dependencies
```bash
npm install
```
# Configuration
## Set Up Environment
Create a .env file based on the .env.example file and adjust the environment variables as needed:
```bash
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5434/testdb?schema=public"
JWT_SECRET="test_jwt_secret"
```
## Start Docker Services
Use Docker Compose to start services:
```bash
docker-compose up -d
```
## Apply Migrations
Sync the database with the schema:
```bash
npx prisma migrate dev
```
## Start the Application
```bash
npm run start
```
## Running Tests
Execute the tests with:
```bash
npm test
```

## Access Prisma Studio
Interact with the database via Prisma Studio:
```bash
npx prisma studio
```
Prisma Studio will open in your browser at http://localhost:5555.
