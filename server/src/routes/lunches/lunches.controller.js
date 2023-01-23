const  {getAllLunchesFromDatabase, 
        addNewLunch,
        deleteLaunch,
        checkIfLaunchIdExists}  = require("../../models/lunches.model")

async function getAllLunches(req,res){
    return res.status(200).json(await getAllLunchesFromDatabase())
}

async function httpAddNewLunch(req,res){
    const lunch = req.body
    if (!lunch.mission || !lunch.target || !lunch.rocket || !lunch.launchDate){
        return res.status(400).json({
            error : "Missing launch property"
        })
    }
    lunch.launchDate = new Date(lunch.launchDate)
    if (isNaN(lunch.launchDate)){
        return res.status(400).json({
            error : "invalid date"
        })
    }
    const newLunch = await addNewLunch(lunch)
    return res.status(201).json(newLunch)
}

async function httpDeleteLaunch(req,res){
    const LaunchId = Number(req.params.id) 
    if (!await checkIfLaunchIdExists(LaunchId)){
        return res.status(400).json({
            error: "mission not found"
        })
    }
    const aborted = await deleteLaunch(LaunchId) 
    if (aborted){
        return res.status(200).json({ok:true}) 
    } else{
        return res.status(400).json({
            error:"something happened"
        }) 
    }
    
}

module.exports = {
    getAllLunches,
    httpAddNewLunch,
    httpDeleteLaunch
}
