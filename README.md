# SOCIAL MEDIA PLATFORM

This is the FIFTH PROJECT of the Full Stack Development Bootcamp with <a href="https://github.com/GeeksHubsAcademy" target="_blank">Geekshubs Academy</a>.

![Cool guy walking with phone](./src/img/coolguywalking.gif)

<div align="center">
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" /><img src="https://img.shields.io/badge/JavaScript-F0DB4F?style=for-the-badge&logo=javascript&logoColor=gray" alt="TypeScript" /><img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js"/><img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MySQL" /><img src="https://img.shields.io/badge/DOCKER-2020BF?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#project-description-es">Description (ES)</a></li>
    <li><a href="#challenge">Challenge</a></li>
    <li><a href="#database-diagram">Database diagram</a></li>
    <li><a href="#instalation-local">Instalation</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#project-development">Project development</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#author">Author / Contact </a></li>
  </ol>
</details>


## Project description (ES)
##### Backend development of a social network

<details>
  <summary>Read about it</summary>
<br />
<b>Description:</b>

In this technical test, it is expected that you demonstrate all the knowledge you have to tackle the development of a backend. To do this, and since the purpose of this test is to determine your knowledge of JavaScript, Express, Node, and Mongo, you will need to develop a social network where users can register, access the network, and interact. An important aspect to consider is the ability to follow and unfollow other users, as well as leave comments on their profiles or posts.

<b>Functional Requirements:</b>
You will develop a social network where users will register, log in, and publish. For this, at least the following collections will be needed:
- users
- posts

<b>Expected Deliverable:</b>
Once the application's needs have been analyzed, it is expected that you can develop a REST API that serves a series of given endpoints.

<b>Other Required Aspects:</b>

- Seeders for the different collections.
- Middlewares to verify the authorship of the post when editing/deleting it.
- Deployment of the backend code to production.

<b>Super Extra Points:</b>

Users can follow other users (Following), and therefore, a user can have followers (Followers).
</details>


## Challenge
- Create Endpoints (registration, login, CRUD, likes):
- Seeders for users and posts.
- All non-public endpoints with corresponding middlewares.
- Deployment


## Instalation (local)
1.  Clone this repository
2.  Run ` $ npm install ` in terminal
3.  Connect repository with database 
4.  *Run seeders:  ` $ npm run seed `
5.  Start server:  ` $ npm start ` (for the deployed version)
              or:  ` $ npm run dev `(for local connection)

*You can select the ammount of fake users and posts you want to create modifying variable 'numberOfUsers' when instanciating the seeder functions `runSeeders(numberOfUsers)` from the seeds.js file. 

*Running seeders would firstly erase all entries from database and populate from zero.


## Endpoints

<details>
<summary>AUTH routes</summary>

-   REGISTER new user
    
        POST https://project5-dev-mzdz.2.ie-1.fl0.io/api/auth/register

    body:
    
    ``` js
        {
		"username": "sergio",
		"email":"sergio@mail.com",
		"password": "123456"
		}
    ```

-   LOGIN user

        POST https://project5-dev-mzdz.2.ie-1.fl0.io/api/auth/login
        
    body (log in as SuperAdmin or as normal User):

    ``` js
        {
		"email":"superadmin@superadmin.com",
		"password": "123456"
		}
    ```
	``` js
        {
		"email":"user@user.com",
		"password": "123456"
		}
    ```
	This would grant you a TOKEN you can use to surpass authorization barriers

</details>
<details>
<summary>USERS routes</summary>

-   GET ALL USERS  (including dinamic query search)

        GET https://project5-dev-mzdz.2.ie-1.fl0.io/api/users
        GET https://project5-dev-mzdz.2.ie-1.fl0.io/api/users?username=AdminUser
		GET https://project5-dev-mzdz.2.ie-1.fl0.io/api/users?email=user@user.com

-	GET USER's OWN PROFILE

      GET https://project5-dev-mzdz.2.ie-1.fl0.io/api/users/profile

-   UPDATE PROFILE (for the currently logged user)

        PUT https://project5-dev-mzdz.2.ie-1.fl0.io/api/users/profile

    body:

    ```js
        {
		"username": "AnotherName"
		}
    ```

-   UPDATE USER'S ROLE

        PUT https://project5-dev-mzdz.2.ie-1.fl0.io/api/users/:id/role

	body:
	```js
		{
		"role": "user"
		}	
	```

-   DELETE USER BY ID

        DELETE https://project5-dev-mzdz.2.ie-1.fl0.io/api/users/:id
</details>
<details>
<summary>POSTS routes</summary>

-   CREATE A NEW POST

        POST https://project5-dev-mzdz.2.ie-1.fl0.io/api/posts

	body:
	```js
		{
		 "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ..."
		}	
	```

-   DELETE POST BY ID

        DELETE https://project5-dev-mzdz.2.ie-1.fl0.io/api/posts/:id

-   UPDATE POST BY ID

        UPDATE https://project5-dev-mzdz.2.ie-1.fl0.io/api/posts/:id

	body:
	```js
		{
		"content": "Something else"
		}	
	```
-	GET OWN POSTS

		GET https://project5-dev-mzdz.2.ie-1.fl0.io/api/posts/own

-   GET ALL POSTS

        GET https://project5-dev-mzdz.2.ie-1.fl0.io/api/posts

-	GET POST BY ID

		GET https://project5-dev-mzdz.2.ie-1.fl0.io/api/posts/:id

-	GET POST BY userId

		GET https://project5-dev-mzdz.2.ie-1.fl0.io/api/users/posts/:id


-	LIKE or UNLIKE A POST

		PUT https://project5-dev-mzdz.2.ie-1.fl0.io/api/posts/:id
</details>

<br />
Find here the collection of all endpoints in Thunder Client:

1. You have to open Thunder Client
2. Go to collections
3. Import this file for the local server: 
`./src/HTTP/LOCAL_thunder-collection_P.5_social media_MONGO.json`

	or this other for the deployed version:
`./src/HTTP/DEPLOYMENT_thunder-collection_P.5_social media_MONGO.json`


<!-- ## Project Development:

<details>
  <summary>1. SQL - Database design:</summary>
    
-   Analyze the task to find the purpose of the database and gather all requirements
-   Concept design: create an Entity-Relationship Diagram where we
define tables, their attributes, and the relationships with one another.
-   Normalization: eliminate redundancy, identify primary keys (PK) and foreign keys (FK)
-   Logical thinking: decide what can and cannot be 'NULL' (not required) and which are 'UNIQUE' fields
</details>

<details>
  <summary>2. DOCKER - Creating a container</summary>

-   Install docker
- Create a container
    > docker run -d -p 3306:3306 --name <container-name> -e MYSQL_ROOT_PASSWORD=<your_password> mysql
- Access it
    > mysql -h localhost -P 3306 -u root -p
you will need -h (host), -P (port), -u (username) and -p (password)
- Execute it
    > docker exec -it mysql-pruebas bash
</details>

<details>
  <summary>3. EXPRESS - Create a server connection</summary>

- We initiate NODE:  `$ npm init` 
    This creates 'package.json' where all the dependencies will be stored.

- We run the command: `$ npm install express --save`
    This creates 'package-lock.json' and the 'node_modules' folder

- We create the folder '.gitignore' and add '/node_modules' inside
    This blocks the heavy folder from being upload to github with the rest of the project.

- We install TYPESCRIPT (as developers) `$ npm install typescript -D`

- We create the 'tsconfig.json' file: `$ npx tsc --init`

- We install types /express & node: `$ npm install @types/express @types/node -D`

- We install dependencies to compile TS (nodemon): `$ npm install ts-node nodemon -D`

- We add a shortcut to the package.json's scripts:
    > "dev": "nodemon ./src/server.ts"

- We create the file '.env' with the PORT (of the server) and add '.env' to the '.gitignore'.

    Also add a copy '.env.sample' where we will storage a blueprint of data, without the sensitive information (in this case: 'PORT= ')

- We install 'dotenv': `$ npm i dotenv`
    This gets added to the dependencies and will grab data from the .env file
</details>

<details>
  <summary>4. DOTENV - Connect to the DB</summary>

- We create the folder 'src' with a 'server.ts' file inside.
    The main function connects to the server `startServer();`<br/>
- We link a new file called `app.ts` to separate responsabilities.<br/>
-   In this file we write the following code:

    ```js
    import express from "express";
    import dotenv from "dotenv";
    import { Request, Response } from "express";
    
    // links the .env folder
    dotenv.config(); 

    // runs server connection
    const app = express(); 

    // parses responses to .json)
    app.use(express.json()); 

    // sets up the connection port
    const PORT = process.env.PORT || 4002; 

    // server is up and listening to any upcomming request
    app.listen(3000, () => console.log('Servidor levantado en 3000')); 


    // testing request - 'Hello world' means we are ready to go!
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello world!')
    }); 
    ```

- We run the server using the previously created nodemon shortcut: `$ npm run dev`
</details>

<details>
  <summary>5. MySQL Workbench</summary>

- We open the workbench and run the following commands:

    ```sql
    CREATE DATABASE <project_name>;
    USE <project_name>;
    ```
</details>

<details>
  <summary>6. MIGRATIONS & MODELS</summary>

- Creating MIGRATIONS [Data Definition Language (DDL): with typeorm]: `./src/database/migrations`
- Adding them to `DataSource.migrations` in the `db.ts` file: `Role, User, Service, Appointment`
- Creating MODELS (entities) [Data Manipulation Language (DML)]
- Adding them to `DataSource.entities` in the `db.ts` file: `Roles, Users, Services, Appointments`
</details>

<details>
  <summary>7. CONTROLLERS</summary>

- We create controllers (in a folder on the same level with `package.json`): 
    > `auth, roles, users, services, appointments`
</details>

<details>
  <summary>8. ROUTES</summary>

- We create routes (in `app.ts`) for CRUD (create, read, update and delete) database records.
</details>

<details>
  <summary>9. MIDDLEWARE: auth()</summary>
  
  - Additionally we need to control access to our data. We will use 'middleware' functions.

  -  `Auth` (authorisation systembased on TOKENs) will block anything that is not to be seen by the general public. In our case, it only does not affect to `register`, `login` and `getServices` (as those are the endpoints reachable without logging in)
  -  The `auth()` function verifies an encrypted TOKEN created automatically while logging in. With an active token we have access to other data.
</details>

<details>
  <summary>10. MIDDLEWARE: isSuperAdmin()</summary>
  
- We also want to grant special administrative access. With another middleware, the `isSuperAdmin()` function, we control PERMISSIONS.
- The 'superadmin' role would be able to reach all data, while Users would have a more limited reach. More levels can be implemented
</details>

<details>
  <summary>11. TOKENDATA</summary>

- For the TOKEN to work, we create a new file `./types/index.d.ts` with the following lines:

    ```js
    export type tokenData = {
        userId: number;
        roleName: string;
    };

    declare global {
        namespace Express {
            export interface Request {
                tokenData: tokenData;
            }
        }
    }
    ```
</details>

<details>
  <summary>12. SEEDERS</summary>

- In order to check out this project, you'll need to ppopulate the database.

- Follow steps 5 and 6 of the <a href="#instalation-local">instalation</a>
</details>


## Deployment -->
The project is deployed here:
https://project5-dev-mzdz.2.ie-1.fl0.io/api/healthy



## Author
<div align="center">
<a href = "mailto:a.sergiotorres@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://github.com/SergioTorresGarcia" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a> 
</div>



<!-- ### Como hacer un proyecto desde cero:

```bash

$ npm init -y
```

```bash
$ npm i express
```

Creamos .gitignore y añadimos:
	/node.modules
	.env

```bash
$ npm i nodemon -D
```

```bash
$ npm i dotenv -E
```

creamos carpeta src:
    server.js

añadir script en package.json:

```bash
"dev": "nodemon ./src/server.js"
```

///////////////

añadimos linea (bajo "main" en package.json:
) 
```json
"type": "module",
```
Cambiamos el require por:
```bash
import express from "express";
import 'dotenv/config';
```

ejecutar en powershell:
```bash
$ docker run -d -p 27017:27017 --name mongo -v mongo-data:/data/db -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo:latest
```

instalamos mongoose:
```bash
$ npm i mongoose --save
```

instalamos bcrypt:
```bash
$ npm i bcrypt
```
instalamos jwt:
```bash
$ npm i jsonwebtoken
```

```txt
creamos modelo
```

```txt
creamos controlador
```

```txt
creamos la ruta
``` -->

