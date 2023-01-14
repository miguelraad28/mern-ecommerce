require("dotenv").config()
console.log(process.env.PORT)
const app = require("./app.js")
require("./database.js")
async function runServer(){
    await app.listen(3001)
    console.log(`Servidor en puerto 3001`)
}
runServer();
