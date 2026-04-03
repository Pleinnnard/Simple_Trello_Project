const taskService = require('../services/taskService');

const getAll = (req, res) => {
  try {
    const tasks = taskService.getAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error to obtain tasks' });
  }
};

const create = (req, res) => {
  const { title, description, status } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'The title is required' });
  }

  try {
    const newTask = taskService.create({ title, description, status });
    res.status(201).json(newTask);
  } catch (error) {
    if (error.message === 'DUPLICATE') {
      return res.status(409).json({ error: 'A task with that title already exists' });
    }
    res.status(500).json({ error: 'Error creating the task' });
  }
};

const update = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updated = taskService.update(id, data);
    res.json(updated);
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(500).json({ error: 'Error updating the task' });
  }
};

const remove = (req, res) => {
  const { id } = req.params;

  try {
    taskService.remove(id);
    res.json({ message: 'Task removed successfully' });
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(500).json({ error: 'Error removing the task' });
  }
};

module.exports = { getAll, create, update, remove };