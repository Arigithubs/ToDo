function saveTasks() {
    const tasks = [];

    document.querySelectorAll('.column ul li').forEach(taskElement => {
        tasks.push({
            text: taskElement.querySelector('span').textContent,
            status: taskElement.dataset.status
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const listItem = createTaskElement(task.text, task.status);
        if (task.status === 'todo') {
            todoList.appendChild(listItem);
        } else if (task.status === 'doing') {
            doingList.appendChild(listItem);
        } else if (task.status === 'done') {
            doneList.appendChild(listItem);
        }
    });
}

loadTasks();
window.addTask = addTask;
