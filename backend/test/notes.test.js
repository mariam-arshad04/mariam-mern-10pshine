require("./setup");
const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");

describe("Notes API Tests", () => {

  let token;
  let noteId;

  /*
  ==========================
        AUTH SETUP
  ==========================
  */
  before(async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@example.com",
        password: "password123"
      });

    token = res.body.token;
  });

  /*
  ==========================
        AUTH FAIL CASES
  ==========================
  */

  it("should fail without token", async () => {
    const res = await request(app)
      .get("/api/notes");

    expect(res.status).to.equal(401);
  });

  it("should fail with invalid token", async () => {
    const res = await request(app)
      .get("/api/notes")
      .set("Authorization", "Bearer invalidtoken");

    expect(res.status).to.equal(401);
  });

  /*
  ==========================
        CREATE NOTE
  ==========================
  */

  it("should create a note", async () => {
    const res = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Note",
        content: "Test Content"
      });

    expect(res.status).to.equal(201);
    expect(res.body.note).to.have.property("id");

    noteId = res.body.note.id;
  });

  it("should fail if title or content missing", async () => {
    const res = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "" });

    expect(res.status).to.equal(500);
  });

  it("should fail if both title and content empty", async () => {
    const res = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "", content: "" });

    expect(res.status).to.equal(500);
  });

  it("should handle very long title", async () => {
    const longTitle = "A".repeat(500);

    const res = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: longTitle, content: "Test" });

    expect(res.status).to.equal(201);
  });

  it("should create multiple notes", async () => {
    const res1 = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Note 1", content: "Content 1" });

    const res2 = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Note 2", content: "Content 2" });

    expect(res1.status).to.equal(201);
    expect(res2.status).to.equal(201);
  });

  /*
  ==========================
        GET NOTES
  ==========================
  */

  it("should fetch notes", async () => {
    const res = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.notes).to.be.an("array");
  });

  it("should get note by ID", async () => {
    const res = await request(app)
      .get(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("id");
  });

  it("should return 404 for non-existing note", async () => {
    const res = await request(app)
      .get("/api/notes/9999")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(404);
  });

  /*
  ==========================
        AUTHORIZATION ISOLATION
  ==========================
  */

  it("should not allow another user to access this user's note", async () => {

    await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Second User",
        email: "second@example.com",
        password: "password123"
      });

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "second@example.com",
        password: "password123"
      });

    const secondToken = loginRes.body.token;

    const res = await request(app)
      .get(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${secondToken}`);

    expect(res.status).to.equal(404);
  });

  /*
  ==========================
        UPDATE NOTE
  ==========================
  */

  it("should update note", async () => {
    const res = await request(app)
      .put(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated",
        content: "Updated content"
      });

    expect(res.status).to.equal(200);
  });

  it("should fail updating non-existing note", async () => {
    const res = await request(app)
      .put("/api/notes/9999")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Doesn't exist",
        content: "Test"
      });

    expect(res.status).to.equal(500);
  });

  /*
  ==========================
        DELETE NOTE
  ==========================
  */

  it("should fail deleting non-existing note", async () => {
    const res = await request(app)
      .delete("/api/notes/9999")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(500);
  });

  it("should delete note", async () => {
    const res = await request(app)
      .delete(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
  });

});
