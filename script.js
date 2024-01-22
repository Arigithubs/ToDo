document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const todoList = document.getElementById('todo-list');
    const doingList = document.getElementById('doing-list');
    const doneList = document.getElementById('done-list');

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            const listItem = createTaskElement(taskText, 'todo');
            todoList.appendChild(listItem);
            newTaskInput.value = '';
            saveTasks();
        }
    }

    function createTaskElement(text, status) {
        const listItem = document.createElement('li');
        listItem.className = 'task-item flex justify-between p-4 bg-white shadow-md mb-2 rounded';
        listItem.dataset.status = status;
        
        const taskContent = document.createElement('div');
        taskContent.className = 'flex-grow';
        
        const taskText = document.createElement('p');
        taskText.textContent = text;
        taskText.className = 'task-text';
        
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = text;
        editInput.className = 'task-edit-input hidden w-full';
        
        taskContent.appendChild(taskText);
        taskContent.appendChild(editInput);

        const buttonsContainer = document.createElement('div');
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-2 rounded';
        editButton.onclick = () => {
            taskText.classList.toggle('hidden');
            editInput.classList.toggle('hidden');
            editInput.focus();
        };
        
        editInput.onblur = () => {
            taskText.textContent = editInput.value;
            taskText.classList.toggle('hidden');
            editInput.classList.toggle('hidden');
            saveTasks();
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-2 rounded';
        deleteButton.onclick = () => {
            listItem.remove();
            saveTasks();
        };

        buttonsContainer.appendChild(editButton);
        buttonsContainer.appendChild(deleteButton);
        
        listItem.appendChild(taskContent);
        listItem.appendChild(buttonsContainer);

        return listItem;
    }

    function moveTask(taskElement, newStatus) {
        const targetList = newStatus === 'doing' ? doingList : newStatus === 'done' ? doneList : todoList;
        targetList.appendChild(taskElement);
        taskElement.dataset.status = newStatus;
        saveTasks();
    }

    function saveTasks() {
        const tasks = Array.from(document.querySelectorAll('.task-item')).map(taskElement => {
            return {
                text: taskElement.querySelector('.task-text').textContent,
                status: taskElement.dataset.status
            };
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
});
