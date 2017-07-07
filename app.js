const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Todo = require('./models/todo-schema.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/static', express.static('static'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/static/index.html");
});

app.get("/api/todos",function (req,res) {
  Todo.find().then(function (data) {
    if (data){
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(data);
    } else {
      res.send("No Todos");
    }
  }).catch(function (err) {
    res.status(400).send("Bad request. Try again. Err: ", err);
  });
});

app.post("/api/todos", function(req, res){
  let newTodo = {
    title:req.body.title,
    completed: req.body.completed,
    order:req.body.order
  };
  Todo.create(newTodo).then(function (todo) {
    if (todo){
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(todo);
    } else {
      res.status(403).send("No Todo Found");
    }
  }).catch(function (err) {
    res.status(400).send("Bad request. Try again. Err: ", err);
  });
});

app.get("/api/todos/:id", function(req, res){
  Todo.findOne({order:req.params.id}).then(function (todo) {
    if (todo){
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(todo);
    } else {
      res.send("Todo not found");
    }
  }).catch(function (err) {
    res.status(400).send("Bad request. Try again. Err: ", err);
  });
});

app.put("/api/todos/:id", function(req, res){
  Todo.update({order:req.params.id}, {$set:{
    title:req.body.title,
    completed: req.body.completed
  }}).then(function (todo) {
    if (todo) {
      res.setHeader("Content-Type", "application/json");
      res.status(203).json(todo);
    } else {
      res.status(403).send("No Todo Found");
    }
  }).catch(function (err) {
    res.status(400).send("Bad Request. Try again. Err: ", err);
  });
});

app.patch("/api/todos/:id", function(req, res){
  let todoUpdate = {};
  if (req.body.title)
    {todoUpdate.title = req.body.title;}
  else
    {todoUpdate.complete = req.body.complete;}
  Todo.update({order:req.params.id}, {$set:todoUpdate})
  .then(function (todo) {
    if (todo) {
      res.setHeader("Content-Type", "application/json");
      res.status(203).json(todo);
    } else {
      res.status(403).send("No Todo Found");
    }
    }).cathc(function (err) {
    res.status(400).send("Bad Request. Try again. Err: ", err);
  });
});

app.delete("/api/todos/:id", function(req, res){
  Todo.remove({order:req.params.id}).then(function (todo) {
    if (todo) {
      res.setHeader("Content-Type", "application/json");
      res.status(203).json(todo);
    } else {
      res.status(403).send("No Todo Found");
    }
  }).cathc(function (err) {
    res.status(400).send("Bad Request. Try again. Err: ", err);
  });
});


app.listen(3000, function () {
  console.log('Express running on http://localhost:3000/.');
});
