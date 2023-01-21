# Getting Started
Basic CMS by THINKTODO, it was developed on NestJS Framework

# Prerequisites
1/ Docker and Docker Compose
2/ NodeJS & NestJS
3/ Database is Mysql

# Install Dev Tool
## Install TypeOrm
npm i -g typeorm
typeorm init

# How to create migration script 
npm run typeorm:create src/migration/CreateUserTable

# How to run CMS
1/ Run database and redis first
docker-compose up

2/ Run CMS API
npm run start
