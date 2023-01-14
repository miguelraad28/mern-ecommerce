require("dotenv").config()
const app = require("./app.js")
require("./database.js")
async function runServer(){
    await app.listen(process.env.PORT)
    console.log(`Servidor en puerto process.env.PORT`)
}
runServer();
