const API_URL = 'http://localhost:8080/api/tasks';

document.getElementById('add-task').addEventListener('click', addTask);

const originalConsoleError = console.error;
console.error = function (...args) {
    if (typeof args[0] === 'string' && args[0].includes('Grammarly')) return;
    originalConsoleError.apply(console, args);
};

function fetchTasks() {
    fetch(API_URL)
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                li.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                    <button onclick="completeTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                `;
                taskList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const completed = document.getElementById('task-completed').checked;

    const task = { title, description, completed };

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    })
        .then(response => response.json())
        .then(() => {
            document.getElementById('task-title').value = '';
            document.getElementById('task-desc').value = '';
            document.getElementById('task-completed').checked = false;
            fetchTasks();
        })
        .catch(error => console.error('Error adding task:', error));
}

function deleteTask(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    })
        .then(() => fetchTasks())
        .catch(error => console.error('Error deleting task:', error));
}

// Mark a task as completed
function completeTask(id) {
    fetch(`${API_URL}/${id}/complete`, {
        method: 'PUT',
    })
        .then(response => response.json())
        .then(() => fetchTasks())  // Reload task list
        .catch(error => console.error('Error completing task:', error));
}


// Load tasks on page load
document.addEventListener('DOMContentLoaded', fetchTasks);
