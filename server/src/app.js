const express = require("express")
const app = express()
const cors = require("cors")
const planetsRouter = require("./routes/planets/planets.router")
const lanchesRouter = require("./routes/lunches/lunches.router")
const path = require("path");

app.use(cors({
    origin : "http://localhost:8000"
}))
app.use(express.json())
app.use(express.static(path.join(__dirname,"..","public")))

app.use(planetsRouter)
app.use("/lunches",lanchesRouter)
app.get("/*", (req,res) =>{
    res.sendFile(path.join(__dirname,"..","public","index.html"));
})

module.exports = app