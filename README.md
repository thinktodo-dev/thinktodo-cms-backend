# Getting Started
Basic CMS by THINKTODO, it was developed on NestJS Framework

In general, the request lifecycle looks like the following:

Incoming request
Globally bound middleware
Module bound middleware
Global guards
Controller guards
Route guards
Global interceptors (pre-controller)
Controller interceptors (pre-controller)
Route interceptors (pre-controller)
Global pipes
Controller pipes
Route pipes
Route parameter pipes
Controller (method handler)
Service (if exists)
Route interceptor (post-request)
Controller interceptor (post-request)
Global interceptor (post-request)
Exception filters (route, then controller, then global)
Server response

https://i.stack.imgur.com/2lFhd.jpg

## Features CMS THINKTODO BACKEND
1. Support CORS
2. Support user table for login with email
3. Support bcrypt hash password
4. Support Serialization 

# Prerequisites
1. Docker and Docker Compose
2. NodeJS & NestJS
3. Database is Mysql

# Install Dev Tool
## Install TypeOrm
npm i -g typeorm
typeorm init

## CRUD API
nest g resource modules/user

# How to create migration script 
npm run typeorm:create src/migration/CreateUserTable

# How to run CMS
1. Run database and redis first
docker-compose up

2. Run CMS API
npm run start

# Rule of API Url
/{name-microservice}/{secure/{module}/{path}

Example:
/core/v1/user
/core/v1/user/:uuid

# Generate Resource

# Load lazy loading data
## using relations in query
userEntity=await this.usersRepository.findOne({where:{id:userEntity.id},relations: ["role"],})

