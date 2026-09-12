// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yak999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const deleteUserById = (id) => {
  const index = users.users_list.findIndex((user) => user.id === id);

  if (index === -1) {
    return undefined;
  }

  const [deletedUser] = users.users_list.splice(index, 1);
  return deletedUser;
};

app.delete("/users/:id", (req, res) => {
  const deletedUser = deleteUserById(req.params.id);

  if (deletedUser === undefined) {
    return res.status(404).send("Resource not found.");
  }

  res.status(200).send(deletedUser);
});

const findUsers = (name, job) => {
  return users.users_list.filter((user) => {
    const matchesName = name === undefined || user.name === name;
    const matchesJob = job === undefined || user.job === job;

    return matchesName && matchesJob;
  });
};

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const findUserById = (id) => {
  return users.users_list.find((user) => user.id === id);
};

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  if (name !== undefined || job !== undefined) {
    const result = findUsers(name, job);
    return res.send({ users_list: result });
  }

  res.send(users);
});

app.get("/users/:id", (req, res) => {
  const user = findUserById(req.params.id);

  if (user === undefined) {
    return res.status(404).send("Resource not found.");
  }

  res.send(user);
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
