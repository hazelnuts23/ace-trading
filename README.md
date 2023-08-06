# Ace App

### Requirements
1. Clone this project
2. Docker

### To Setup
1. In **api** and **web** folder.
2. Copy `.env_example` as `.env` and update the environment variables with the value.
3. In real world projects, sensitive information is strictly not allowed to be share nor expose. Exception for this, for quick setup
4. To start the project, in root folder, run `docker-compose -f ./docker-compose.yml up -d`. `-d` for detach after completion
5. The initial setup will run services (**web** and **api**) and create database table
6. Once it is complete, run `docker exec ace_api  npx ts-node src/database/seeds/initial_seed.ts` to insert **seed** data. A seed data is an initial data.

#### Services/Tech ####
1. web - Node 16/React JS
2. api - Node 16/NodeJS/Express/TypeScript/Jest 
3. Database - PostgreSQL 14.8
4. Data - Source from Kaggle seed into DB
5. Chart Library - igniteui-react-charts

### To Run 
1. Open browser and run `http://localhost:8080`
2. It will show **login** page
3. To login, use anonymous credentials. Email: `admin@test.com` Password: `AlQcExwqyvMExVJ`  
4. It will redirect to home dashboard

![Alt text](https://ace-storages.s3.ap-southeast-1.amazonaws.com/2023-08-07_00-25-53+animated.gif)

### To Run Test ###
1. In terminal, run `docker exec ace_api npm run test`.
2. It will run all test as follow.  

![Alt text](https://ace-storages.s3.ap-southeast-1.amazonaws.com/2023-08-06_19-58-02.png)

### Access to Database ###
1. Download and install [Table+](https://tableplus.com/) .
2. Open Table+ and Create Connection by clicking [+] and Select `PostgreSQL`.
3. Enter Name `Ace Local`, Host `127.0.0.1`, User `ace-user`, Password `zMYTAKG6QjM`, Database `ace` and PORT `5432`.
4. Click button **Connect**  

![Alt text](https://ace-storages.s3.ap-southeast-1.amazonaws.com/2023-08-06_20-01-22.png)
