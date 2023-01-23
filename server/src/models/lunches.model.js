const lunchesDatabase = require("./lunches.mongo")


const DEFAULT_FLIGHT_NUMBER = 100;

const lunch = {
    flightNumber : 100,
    mission : "Kepler X",
    rocket : "Nasa 300",
    launchDate: new Date("December 27, 2030"),
    target: "Kepler-442 b",
    customers : ["MK","NASA"],
    upcoming: true,
    success : true
}


async function saveLunch(launch){
    console.log(launch)
    await lunchesDatabase.updateOne({
        flightNumber : lunch.flightNumber
    },
        launch
    ,{
        upsert: true
    })
}

saveLunch(lunch)

async function addNewLunch(lunch){
    const latestFlightNumber = await getLatestId()+1
    const tempLunch = {
        flightNumber : latestFlightNumber,
        ...lunch,
        customers : ["MW","NASA"],
        upcoming : true,
        success : true
    }

    await lunchesDatabase.findOneAndUpdate({
        flightNumber : latestFlightNumber
    },
        tempLunch
    ,{
        upsert: true
    })
    return tempLunch
}

async function deleteLaunch(id){
    const lunchFlight = await lunchesDatabase.updateOne({
        flightNumber:id
    },{
        upcoming : false,
        success : false
    })
    console.log(lunchFlight)
    return (lunchFlight.matchedCount ===1 && lunchFlight.modifiedCount === 1)
}

async function checkIfLaunchIdExists(id){
    return await lunchesDatabase.findOne({
        flightNumber:id
    })
}

async function getLatestId(){
    const latestFlight = await lunchesDatabase
    .findOne()
    .sort("-flightNumber")

    if (!latestFlight){
        return DEFAULT_FLIGHT_NUMBER
    }
    return latestFlight.flightNumber
}

async function getAllLunchesFromDatabase(){
    return await lunchesDatabase
    .find({},{"__id":0, "__v":0})
} 

module.exports = {
    getAllLunchesFromDatabase,
    addNewLunch,
    deleteLaunch,
    checkIfLaunchIdExists
}