import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {type: String },
  status: { type: String },
  priority: { type: String },
  startDate: { type: Number },
  endDate: { type: Number },
  owners: { type: Array, default: [] },
  comments: { type: Array, default: [] },
});



const Task = mongoose.model("Task", taskSchema);

export default Task;
