# **Dicurre (eWallet Project)**

## **About**
A backend program for Dicurre website and application. An e-wallet website and application to transfer money to anyone you connected.

## **CRUD Database**
1. Users
2. Profiles
3. Transactions
4. Transaction type
5. Authentication
6. Authenticated


## **Tech Stacks**

[![My Skills](https://skills.thijs.gg/icons?i=nodejs,express,&theme=light)](https://skills.thijs.gg)

## **Requirements**
1. [Node.Js](https://nodejs.org/en/ "Node Js")
2. Package Manager
    * [NPM](https://www.npmjs.com/ "NPM")
    * [Yarn](https://yarnpkg.com/ "Yarn")
3. Postman Collection
    * [Download Here](https://drive.google.com/file/d/11fgJMPJXAFRh7u7LW1W-_or19OGAuA8t/view)

## **How to Install**
1. Download this repository or clone on your IDE ```https://github.com/prasetyoow/fw9-backend-dicurre.git```
2. Create .env file and write the same like .env.example
3. Install node_modules using package manager (Yarn or NPM)
    * ```npm install```
    * ```yarn add```
    
## **How to Run**
1. Type on your terminal
    * ```npm run dev```
    * ```yarn start dev```

## **Endpoints**

  ####  **Authentication**

| URL        | METHOD        | DESCRIPTION  |
| ------------- |:-------------:| ------------:|
|/auth/register      | POST | Register a new user |
|/auth/login     | POST | Login using user that already registered |
| /auth/createpin | POST | Create a pin for the new user |


  ####  **Authenticated**
| URL        | METHOD        | DESCRIPTION  |
| ------------- |:-------------:| ------------:|
|/auth/profile| GET | Show profile for user login |
|/auth/phone| POST | Create or add new phone number for user login |
| /auth/profile | PATCH | Update profile for user login |
| /auth/changePassword | PATCH | Update or change new password for user login |
|/auth/changePIN| PATCH | Update or change new PIN for user login |
|/auth/phone| PATCH |Update or change new phone number or user |
|/auth/topup| POST |To Top up balance for user login |
|/auth/transfer| POST |To Transfer money to another user |

## **Licenses**
&copy;  [Wahyu Prasetyo](https://github.com/prasetyoow)
