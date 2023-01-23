const express = require("express")
const {getAllLunches,httpAddNewLunch,httpDeleteLaunch} = require("../lunches/lunches.controller")

const lunchRouter = express.Router()

lunchRouter.get("/",getAllLunches)
lunchRouter.post("/", httpAddNewLunch)
lunchRouter.delete("/:id", httpDeleteLaunch)

module.exports = lunchRouter