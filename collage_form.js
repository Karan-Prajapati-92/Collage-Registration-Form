import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const databaseurl = process.env.databaseurl;

const client = new MongoClient(databaseurl);

const databasename = "Collage_Registration_from";
const databasecollection = "student_data";

app.get("/", (req, resp) => {
  resp.sendFile("form.html", { root: "./public" });
});

app.post("/submit", async (req, resp) => {
  try {
    await client.connect();

    const db = client.db(databasename);
    const collection = db.collection(databasecollection);

    const result = await collection.insertOne(req.body);

    console.log(result);
    resp.send(`

      <script>
alert("Form submitted successfully!");
window.location.href='/';
</script>
`);
  } catch (error) {
    console.log("MongoDB Error:", error.message);
    resp.status(500).send("Database connection failed");
  }
});

app.listen(3500, () => {
  console.log("Server is running successfully on http://localhost:3500");
});
