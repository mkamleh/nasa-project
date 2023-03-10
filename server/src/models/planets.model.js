const {parse} = require('csv-parse');
const fs = require('fs');
const path = require("path")
const planets = require("./planet.mongo")


function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

function loadPlanets(){
  return new Promise( (resolve,reject) => {
    const arrayOfPromises = [];
    fs.createReadStream(path.join(__dirname,"..",'..',"..","data","kepler_data.csv"))
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          arrayOfPromises.push(savePlanet(data));
        }
    })
    .on('error', (err) => {
        console.log(err);
        reject()
    })
    .on('end', () => {
        Promise.allSettled(arrayOfPromises)
        .then(() => {
          const countPlanetsFound = arrayOfPromises.length
        console.log(`${countPlanetsFound} habitable planets found!`);
        })
        resolve()
    });
  }) 
}

async function getAllPlanetsModel(){
  return await planets.find({}); 
}

async function savePlanet(planet){
  try{
    console.log("hi")
    await planets.updateOne({
      keplerName : planet.kepler_name
    },{
      keplerName : planet.kepler_name
    },{
      upsert: true
    });
  }catch(err){
    console.error("could not save planet")
  }
  
}



module.exports = {
    loadPlanets,
    getAllPlanetsModel
}
