const request = require("supertest")
const app = require("../../app")
const {mongoConnect} = require("../../services/mongo")
describe("Testing API calls", ()=>{
    beforeAll( async ()=>{
        await mongoConnect()
    })
    describe('Test GET /launches', ()=>{
        test('should respond with 200 status code',  async () => {
            await request(app)
            .get("/lunches") 
            .expect("Content-Type", /json/)
            .expect(200)
        })
        
    })
    
    describe("Test POST /lauunches",()=>{
        const launchWithDate = {
            mission : "new moon",
            rocket: "spaceX 30",
            target : "mars",
            launchDate : "December 23, 2030"
        }
    
        const launchWithoutDate = {
            mission : "new moon",
            rocket: "spaceX 30",
            target : "mars",
        }
        test("should respond with 201",async ()=>{
            const response = await request(app)
              .post("/lunches")
              .send(launchWithDate)
              .expect("Content-Type",/json/)
              .expect(201)
    
              const requestDate = new Date(launchWithDate.launchDate).valueOf()
              const responseDate = new Date(response.body.launchDate).valueOf()
              expect(responseDate).toBe(requestDate)
    
              expect(response.body).toMatchObject(launchWithoutDate)
    
    
        })
    
        test("should catch missing required properties", async ()=>{
            const response = await request(app)
              .post("/lunches")
              .send(launchWithoutDate)
              .expect(400)
            
            expect(response.body).toStrictEqual({
                error : "Missing launch property"
            })
    
        })
        test("should catch invalid date", async ()=>{
            const response = await request(app)
              .post("/lunches")
              .send({...launchWithDate, launchDate: "hello" })
              .expect(400)
            
              expect(response.body).toStrictEqual({
                error : "invalid date"
            })
    
        })
    
    })

})

