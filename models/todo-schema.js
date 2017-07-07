const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost:27017/todoList");

const todoSchema = new Schema({
  title:{type:String, required:true},
  completed:{type:Boolean, default:false},
  order:Number
});

const Todo = mongoose.model("todos", todoSchema);

module.exports = Todo;
