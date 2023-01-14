require("dotenv").config()
const app = require("./src/app.js")
require("./src/database.js")
async function runServer(){
    await app.listen(process.env.PORT)
    console.log(`Servidor en puerto ${process.env.PORT}`)
}
runServer();
