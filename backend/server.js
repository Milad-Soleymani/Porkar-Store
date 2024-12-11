const app = require('./app');




// ! Handling uncaught Exception

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down server for handling uncaught exception`);
})

// ! config
if (process.env.NODE_ENV != "PRODUCTION") {
    require('dotenv').config({
        path: "backend/config/.env"
    })
}

// ! create server

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on https://localhost:${process.env.PORT}`)
})

// ! unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shuting down the server for ${err.message}`);
    console.log('Shuting down for unhandled promise rejection')

    server.close(() => {
        process.exit(1);
    })
})