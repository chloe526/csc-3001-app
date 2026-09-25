import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

function getUsers(name, job) {
  if (name === undefined && job === undefined) {
    return userModel.find();
  } else if (name !== undefined && job !== undefined) {
    return findUserByNameAndJob(name, job);
  } else if (name !== undefined) {
    return findUserByName(name);
  } else {
    return findUserByJob(job);
  }
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  return userToAdd.save();
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function findUserByNameAndJob(name, job) {
  return userModel.find({
    name: name,
    job: job,
  });
}

function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
  deleteUserById,
};
