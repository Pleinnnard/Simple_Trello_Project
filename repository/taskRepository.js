const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/tasks.json');

const readAll = () => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]', 'utf-8');
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Error reading the data file');
  }
};

const writeAll = (tasks) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), 'utf-8');
  } catch (error) {
    throw new Error('Error writing the data file');
  }
};

module.exports = { readAll, writeAll };