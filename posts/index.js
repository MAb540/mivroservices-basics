import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res, next) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res, next) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };

  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });
  res.status(201).send(posts[id]);
});

app.post("/events", async (req, res, next) => {
  console.log("Received Event", req.body.type);
  res.send({});
});

const port = 4000;
app.listen(port, () => {
  console.log("version:latest,  new latest version available");
  console.log("listening on port: ", port);
});
