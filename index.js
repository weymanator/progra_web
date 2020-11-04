const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use("/public", express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/curri", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/curri.html"));
});

app.get("/curriJuan", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/curriJuan.html"));
});

app.get("/claudio", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/claudio_curri.html"));
});

const tasks = [
  { ID: 1, Task: "task 1", status: false },
  { ID: 2, Task: "task 2", status: false },
  { ID: 3, Task: "task 3", status: false },
  { ID: 4, Task: "task 4", status: true },
];

function getID(data) {
  if (data.length === 0) return 1;
  return Math.max(...data.map((item) => item.ID)) + 1;
}

app.get("/task", function (req, res) {
  console.log("PARAMS: ", req.query);

  console.log("ID: ", req.query.id);
});

app.get("/tasks", function (req, res) {
  res.json(tasks);
});

app.post("/tasks", function (req, res) {
  console.log("PARAMS: ", req.body);

  const task = Object.assign({}, req.body);

  task.ID = getID(tasks);

  tasks.push(task);

  res.json(task);
});

app.put("/tasks", function (req, res) {
  console.log("PARAMS: ", req.body);
  const task = Object.assign({}, req.body);
  task.status = !task.status;
  const index = tasks.findIndex((i) => i.ID == task.ID);
  console.log(tasks.splice(index, 1, task));

  console.log("TASKS: ", tasks);

  res.json(task);
});

app.listen(7000);
