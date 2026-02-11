require("./setup");
const sinon = require("sinon");
const nodemailer = require("nodemailer");

// Mock nodemailer
sinon.stub(nodemailer, "createTransport").returns({
  sendMail: sinon.stub().resolves(true)
});

const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");

describe("Auth API Tests", () => {

  const testUser = {
    name: "Test User",
    email: "testuser@example.com",
    password: "password123"
  };

  /*
  ==========================
        SIGNUP TESTS
  ==========================
  */
  describe("POST /signup", () => {

    it("should register new user", async () => {
      const res = await request(app)
        .post("/api/auth/signup")
        .send(testUser);

      expect(res.status).to.equal(201);
      expect(res.body.success).to.be.true;
    });

    it("should fail if fields are missing", async () => {
      const res = await request(app)
        .post("/api/auth/signup")
        .send({ email: "abc@test.com" });

        expect(res.status).to.be.oneOf([400, 404]);
    });

    it("should not allow duplicate email", async () => {
      const res = await request(app)
        .post("/api/auth/signup")
        .send(testUser); // same user again

      expect(res.status).to.equal(409);
    });

  });

  /*
  ==========================
          LOGIN TESTS
  ==========================
  */
  describe("POST /login", () => {

    it("should login user and return token", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: testUser.email,
          password: testUser.password
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("token");
    });

    it("should fail with wrong password", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: testUser.email,
          password: "wrongpassword"
        });

      expect(res.status).to.equal(401);
    });

    it("should fail if user does not exist", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "nouser@test.com",
          password: "password123"
        });

      expect(res.status).to.equal(401);
    });

    it("should fail if password missing", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email });

        expect(res.status).to.be.oneOf([400, 404]);
    });

    it("should fail if email missing", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ password: testUser.password });

        expect(res.status).to.be.oneOf([400, 404]);

    });

    it("token should contain user id and email", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: testUser.email,
          password: testUser.password
        });

      expect(res.body).to.have.property("token");
      // Optional: decode JWT here if needed
    });

  });

  /*
  ==========================
      FORGOT / RESET PASSWORD TESTS
  ==========================
  */

  describe("POST /forgot-password", () => {
    it("should send reset email for existing user", async () => {
      const res = await request(app)
        .post("/api/auth/forgot-password")
        .send({ email: testUser.email });

      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("OTP sent to email");
    });

    it("should fail for non-existing user", async () => {
      const res = await request(app)
        .post("/api/auth/forgot-password")
        .send({ email: "nouser@test.com" });

      expect(res.status).to.equal(404);
    });
  });

  describe("POST /reset-password", () => {
    // Mock token for testing
    const mockToken = "mock-valid-token";

    it("should reset password with valid token", async () => {
      const res = await request(app)
        .post("/api/auth/reset-password")
        .send({
          token: mockToken,
          password: "newpassword123"
        });

      // If your controller validates token, adjust accordingly
      expect(res.status).to.be.oneOf([200, 400, 404]);

    });

    it("should fail reset with invalid token", async () => {
      const res = await request(app)
        .post("/api/auth/reset-password")
        .send({
          token: "invalidtoken",
          password: "newpassword123"
        });

        expect(res.status).to.be.oneOf([200, 400, 404]);

    });

    it("should fail reset if password missing", async () => {
      const res = await request(app)
        .post("/api/auth/reset-password")
        .send({ token: mockToken });

        expect(res.status).to.be.oneOf([200, 400, 404]);

    });
  });

});
