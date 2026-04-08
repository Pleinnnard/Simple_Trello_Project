const API_URL = 'http://localhost:3000/tasks';

function getAll() {
  return fetch(API_URL)
    .then((res) => {
      if (!res.ok) throw new Error('Error al obtener tareas');
      return res.json();
    })
    .catch(() => {
      throw new Error('Servidor no disponible');
    });
}

function create(data) {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then((res) => {
      return res.json().then((json) => {
        if (!res.ok) throw new Error(json.error || 'Error al crear tarea');
        return json;
      });
    })
    .catch((err) => {
      throw err;
    });
}

function update(id, data) {
  return fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then((res) => {
      return res.json().then((json) => {
        if (!res.ok) throw new Error(json.error || 'Error al actualizar tarea');
        return json;
      });
    });
}

function remove(id) {
  return fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then((res) => {
      if (!res.ok) throw new Error('Error al eliminar tarea');
      return res.json();
    });
}

const api = {
  getAll,
  create,
  update,
  remove
};
