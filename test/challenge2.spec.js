const request = require("supertest");
const expect = require("chai").expect;

const baseUrl = "http://localhost:3000/api/v1";

describe("Testing challenge #2", () => {
  it("find - should return a Dog object", (done) => {
    request(baseUrl)
      .get(`/dog/${2}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body).to.haveOwnProperty("id").eq(2);
        expect(res.body).to.haveOwnProperty("race").eq("Poodle");
        expect(res.body).to.haveOwnProperty("age").eq(6);
        expect(res.body).to.haveOwnProperty("color").eq("black");
        done();
      });
  });

  it("findAll - should return an array of Dogs object", (done) => {
    request(baseUrl)
      .get("/dog")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.instanceOf(Array);
        expect(res.body.length).to.be.gt(0);
        done();
      });
  });

  it("findOne - find - should return a Dog object", (done) => {
    request(baseUrl)
      .get("/dog/findOne")
      .query({ race: "Pitbull", age: 10 })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body).to.haveOwnProperty("id").eq(6);
        expect(res.body).to.haveOwnProperty("race").eq("Pitbull");
        expect(res.body).to.haveOwnProperty("age").eq(10);
        expect(res.body).to.haveOwnProperty("color").eq("white");
        done();
      });
  });

  it("create - find - should return the new Dog object", (done) => {
    request(baseUrl)
      .post("/dog")
      .send({ race: "Rottweiler", age: 6, color: "black" })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(201);
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body).to.haveOwnProperty("id");
        expect(res.body).to.haveOwnProperty("race").eq("Rottweiler");
        expect(res.body).to.haveOwnProperty("age").eq(6);
        expect(res.body).to.haveOwnProperty("color").eq("black");

        done();
      });
  });

  it("update - find - should return the updated Dog object", (done) => {
    request(baseUrl)
      .patch(`/dog/${3}`)
      .send({ age: 7 })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.instanceOf(Object);
        expect(res.body).to.haveOwnProperty("age").to.be.eq(7);
        done();
      });
  });

  it("delete - should delete the given dog", (done) => {
    let currentLength = 0;
    let beforeLength = 0;
    request(baseUrl)
      .get("/dog")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        beforeLength = res.body.length;
      });

    request(baseUrl)
      .delete(`/dog/${5}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        expect(res.statusCode).to.be.equal(200);
        expect(res.text).to.be.string("Dog deleted succesfully");
      });

    request(baseUrl)
      .get("/dog")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        currentLength = res.body.length;
        expect(currentLength).to.be.lessThan(beforeLength);
        done();
      });
  });
});
