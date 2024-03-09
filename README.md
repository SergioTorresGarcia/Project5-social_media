### Como hacer un proyecto desde cero:

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
```

