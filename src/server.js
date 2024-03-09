//importamos dependencias de librerias
import express, { Router } from "express";
import 'dotenv/config';
import { dbConnection } from "./database/db.js";
import router from "./routes/router.js";

const app = express()

// parsea el body (si no sale undefined)
app.use(express.json())

const PORT = process.env.PORT || 4001;

// API ROUTES
app.get('/api/healthy', (req, res) => {
    res.status(200).json({
        syccess: true,
        message: "server is healthy"
    })
})

app.use('/api', router)


dbConnection() // o por ejemplo appDataSource (como en typeorm)
    .then(() => {
        console.log("Database connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    })
    .catch(error => {
        console.log(error);
    })

