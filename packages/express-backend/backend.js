// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
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

function postUser(person) {
  const promise = fetch("Http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  return promise;
}

function updateList(person) {
  postUser(person)
    .then((response) => {
      if (response.status === 201) {
        setCharacters([...characters, person]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

const generateId = () => {
  return Math.random().toString(36).substring(2, 8);
};

const addUser = (user) => {
  user.id = generateId();
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
  const addedUser = addUser(userToAdd);
  res.status(201).send(addedUser);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
