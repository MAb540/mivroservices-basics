import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const comments = posts[postId].comments;
    comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, postId, content, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    comment.content = content;
    comment.status = status;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvents(type, data);
  res.send({});
});

const port = 4002;
app.listen(port, async () => {
  console.log("listening on port: ", port);

  const res = await axios.get("http://event-bus-srv:4005/events");

  for (let event of res.data) {
    console.log("Processing event: ", event.type);
    handleEvents(event.type, event.data);
  }
});
