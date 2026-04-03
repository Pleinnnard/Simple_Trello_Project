const taskService = require('../services/taskService');

const getAll = (req, res) => {
  try {
    const tasks = taskService.getAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
};

const create = (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'El título es requerido' });
    }
    const task = taskService.create({ title: title.trim(), description: description || '', status });
    res.status(201).json(task);
  } catch (err) {
    if (err.message === 'DUPLICATE') {
      return res.status(409).json({ error: 'Ya existe una tarea con ese título' });
    }
    res.status(500).json({ error: 'Error al crear tarea' });
  }
};

const update = (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const task = taskService.update(id, data);
    res.json(task);
  } catch (err) {
    if (err.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(500).json({ error: 'Error al actualizar tarea' });
  }
};

const remove = (req, res) => {
  try {
    const { id } = req.params;
    taskService.remove(id);
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    if (err.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(500).json({ error: 'Error al eliminar tarea' });
  }
};

module.exports = { getAll, create, update, remove };