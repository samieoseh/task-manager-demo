import Task from "../models/task.js";

export const getTasks = async (req, res) => {
    try {
        const taskId = req.params.id;
        if (taskId == 'undefined') {
            const tasks = await Task.find();
            return res.status(200).json(tasks);
        }
        const task = await Task.find({ _id: taskId }).lean();
        return res.status(200).json(task[0]);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const addTask = async (req, res) => {
      try{
  
          //Retrieving all post fields
          const {
              title,
              status,
              priority,
              startDate,
              endDate,
              owners,
              comments,
            } = req.body;
  
          const newTask = new Task({
            title,
            status,
            priority,
            startDate,
            endDate,
            owners,
            comments,
          });
  
      // Save the new document to the database
      const savedTask = await newTask.save();
      res.status(201).json(savedTask); // Respond with the saved document
    
      } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' .error});
    }
  };

export const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) {
        return res.status(404).json({ error: "Task not found" });
      }
      return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTask = async (req, res) => {
  const taskId = req.params.id;

  const task = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, task, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json(updatedTask);

  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ error: "Internal Server Error" });

  }
}

