const request = require("supertest")("https://restful-booker.herokuapp.com");
const expect = require("chai").expect;
const { BOOKING_DATA } = require("../data/testData");

let token;
let bookingID;

let headerAuth = {
  "Content-Type": "application/json"
};

describe("Restful - Booker", function () {
  it.only("TC01_Get token successfully", async function () {
    const response = await request
      .post("/auth")
      .send({
        username: BOOKING_DATA.username,
        password: BOOKING_DATA.password
      })
      .set(headerAuth);

    expect(response.status).to.eql(200);
    expect(response.body).to.have.property("token");

    // Simpan ke variabel global
    token = response.body.token;
    console.log("Token:", token);
  });

    it("TC02_Create Booking Success", async function () {
        const res = await request
          .post("/booking")
          .set("Content-Type", "application/json")
          .set("Accept", "application/json")
          .send({
            firstname: BOOKING_DATA.firstname,
            lastname: BOOKING_DATA.lastname,
            totalprice: BOOKING_DATA.price,
            depositpaid: true,
            bookingdates: {
              checkin: "2025-05-04",
              checkout: "2026-05-04",
            },
            additionalneeds: "Breakfast",
          });
    
        expect(res.status).to.eql(200);
        expect(res.body.booking.firstname).to.eql(BOOKING_DATA.firstname);
        expect(res.body.booking.lastname).to.eql(BOOKING_DATA.lastname);
        expect(res.body.booking.totalprice).to.eql(BOOKING_DATA.price);
    
        bookingID = res.body.bookingid;
      });

      it("TC03_GET Booking by ID Success", async function () {
        const res = await request
        .get("/booking/" + bookingID)
        .set("Accept", "application/json");
    
        expect(res.status).to.eql(200);
        expect(res.body.firstname).to.eql(BOOKING_DATA.firstname);
        expect(res.body.lastname).to.eql(BOOKING_DATA.lastname);
        expect(res.body.totalprice).to.eql(BOOKING_DATA.price);
      });

      it("TC04_GET Booking by ID Failed - Invalid Booking ID", async function () {
        const res = await request.get("/booking/" +bookingID+ "123");
        expect(res.status).to.eql(404);
      });

      it("TC05_Delete Booking Success",async function(){
        const response = await request
            .del("/booking/"+bookingID)
            .set("Content-Type", "application/json")
            .set({ Authorization: "Basic "+token});

        expect(response.status).to.eql(201);
        //ini gatau kenapa 403 terus, coba di postman juga tetep kena 403 forbidden
    })
});