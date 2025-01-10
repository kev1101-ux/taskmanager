// Ensure user is logged in before accessing tasks
if (!localStorage.getItem('isLoggedIn')) {
    console.log('Not logged in, redirecting to login page'); // Debugging message
    window.location.href = 'index.html';  // Redirect to login page if not logged in
}


document.getElementById('add-task').addEventListener('click', addTask);

// Ensure no unwanted error logging (Grammarly-related logs)
const originalConsoleError = console.error;
console.error = function (...args) {
    if (typeof args[0] === 'string' && args[0].includes('Grammarly')) return;
    originalConsoleError.apply(console, args);
};

// Fetch tasks from the API and display them
function fetchTasks() {
    fetch(API_URL)
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = ''; // Clear the task list before adding new tasks

            if (tasks.length === 0) {
                taskList.innerHTML = '<li>No tasks available</li>'; // Display message if no tasks exist
            } else {
                tasks.forEach(task => {
                    const li = document.createElement('li');
                    li.className = `task-item ${task.completed ? 'completed' : ''}`;
                    li.innerHTML = `
                        <h3>${task.title}</h3>
                        <p>${task.description}</p>
                        <button onclick="deleteTask(${task.id})">Delete</button>
                        <button onclick="completeTask(${task.id})">${task.completed ? 'Uncomplete' : 'Complete'}</button>
                    `;
                    taskList.appendChild(li);
                });
            }
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

// Add a new task to the API
function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    const completed = document.getElementById('task-completed').checked = false;
    console.log(description);
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
            fetchTasks(); // Reload the task list after adding a new task
        })
        .catch(error => console.error('Error adding task:', error));
}

// Delete a task from the API
function deleteTask(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    })
        .then(() => fetchTasks())  // Reload the task list after deletion
        .catch(error => console.error('Error deleting task:', error));
}

// Mark a task as completed
function completeTask(id) {
    fetch(`${API_URL}/${id}/complete`, {
        method: 'PUT',
    })
        .then(response => response.json())
        .then(() => fetchTasks())  // Reload task list after completion status change
        .catch(error => console.error('Error completing task:', error));
}

// Load tasks when the page is ready
document.addEventListener('DOMContentLoaded', fetchTasks);
