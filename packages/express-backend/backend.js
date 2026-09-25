import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  userServices
    .getUsers(name, job)
    .then((users) => {
      res.send({ users_list: users });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred in the server.");
    });
});

app.get("/users/:id", (req, res) => {
  userServices
    .findUserById(req.params.id)
    .then((user) => {
      if (user === null) {
        return res.status(404).send("Resource not found.");
      }

      res.send(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred in the server.");
    });
});

app.post("/users", (req, res) => {
  userServices
    .addUser(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred in the server.");
    });
});

app.delete("/users/:id", (req, res) => {
  userServices
    .deleteUserById(req.params.id)
    .then((user) => {
      if (user === null) {
        return res.status(404).send("Resource not found.");
      }

      res.status(204).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred in the server.");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
