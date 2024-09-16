const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {

  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const task = await Task.create({ title, description });
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an existing task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    await task.save();
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.destroy();
    res.status(204).end(); // No content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
