const http = require("http")
const app = require("./app")

const {loadPlanets} = require('./models/planets.model')
const {mongoConnect} = require("./services/mongo")

const PORT = process.env.PORT || 8000 

const server = http.createServer(app)





async function  startServer(){
    await mongoConnect()
    await loadPlanets()
    server.listen(PORT, ()=> {
        console.log(`server is listening on port ${PORT}`)
    })
}

startServer()




