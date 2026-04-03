const taskRepository = require('../repository/taskRepository');

const VALID_STATUSES = ['To Do', 'Doing', 'Done'];

const getAll = () => {
  return taskRepository.readAll();
};

const create = ({ title, description = '', status = 'To Do' }) => {
  const tasks = taskRepository.readAll();

  const duplicate = tasks.find(
    (t) => t.title.toLowerCase() === title.trim().toLowerCase()
  );
  if (duplicate) throw new Error('DUPLICATE');

  const finalStatus = VALID_STATUSES.includes(status) ? status : 'To Do';

  const newTask = {
    id: Date.now().toString(),
    title: title.trim(),
    description: description.trim(),
    status: finalStatus,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  taskRepository.writeAll(tasks);
  return newTask;
};

const update = (id, data) => {
  const tasks = taskRepository.readAll();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) throw new Error('NOT_FOUND');

  if (data.status && !VALID_STATUSES.includes(data.status)) {
    delete data.status;
  }

  tasks[index] = { ...tasks[index], ...data };
  taskRepository.writeAll(tasks);
  return tasks[index];
};

const remove = (id) => {
  const tasks = taskRepository.readAll();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) throw new Error('NOT_FOUND');

  tasks.splice(index, 1);
  taskRepository.writeAll(tasks);
};

module.exports = { getAll, create, update, remove };