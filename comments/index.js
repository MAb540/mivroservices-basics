import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(express.json());
app.use(cors());
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res, next) => {
  console.log(req.params);

  const comments = commentsByPostId[req.params.id] || [];
  res.status(200).send(comments);
});

app.post("/posts/:id/comment", async (req, res, next) => {
  const postId = req.params.id;
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[postId] || [];
  comments.push({ id: commentId, content: content, status: "pending" });

  commentsByPostId[postId] = comments;

  const commentCreatedEvent = {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      status: "pending",
      postId,
    },
  };

  await axios.post("http://event-bus-srv:4005/events", commentCreatedEvent);
  res.status(201).send(commentsByPostId[postId]);
});

app.post("/events", async (req, res, next) => {
  console.log("Received Event", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }

  res.send({});
});

const port = 4001;
app.listen(port, () => console.log("listening on port: ", port));
