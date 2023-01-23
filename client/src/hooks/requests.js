const API_URL = "http://localhost:8000"

async function httpGetPlanets() {
  const res = await fetch(`${API_URL}/planets`)
  return await res.json()
}

async function httpGetLaunches() {
  const res = await fetch(`${API_URL}/lunches`)
  const lunchedFlights = await res.json()
  return lunchedFlights.sort( (a,b) => {
    return a.flighNumber = b.flightNumber
  })
}

async function httpSubmitLaunch(launch) {
  try{
    return await fetch(`${API_URL}/lunches`, {
      method: "post",
      headers : {
        "Content-type" : "application/json",
      },
      body : JSON.stringify(launch)
    })
  }catch(err){
    return {
      ok: false
    }
  }
  
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/lunches/${id}`, {
      method : "delete"
    })
  }catch(err){
    return {
      ok: false
    }
  } 
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};