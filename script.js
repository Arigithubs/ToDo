document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const todoList = document.getElementById('todo-list');
    const doingList = document.getElementById('doing-list');
    const doneList = document.getElementById('done-list');

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            const listItem = createTaskElement(taskText, 'todo');
            listItem.style.opacity = "0";
            todoList.appendChild(listItem);
            getComputedStyle(listItem).opacity; // Trigger reflow to reset the animation
            listItem.style.opacity = "1";
            newTaskInput.value = '';
            newTaskInput.focus();
            saveTasks();
        }
    }

    function createTaskElement(text, status) {
        const listItem = document.createElement('li');
        listItem.className = `task-item p-4 mb-2 bg-white rounded shadow transition duration-500 ease-in-out transform ${status}`;
        listItem.dataset.status = status;
        
        const taskContent = document.createElement('div');
        taskContent.className = 'flex-grow pr-4';
        
        const taskText = document.createElement('p');
        taskText.textContent = text;
        taskText.className = 'task-text m-0';

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = text;
        editInput.className = 'task-edit-input hidden w-full rounded p-2 border border-gray-300';

        taskContent.appendChild(taskText);
        taskContent.appendChild(editInput);

        taskText.addEventListener('click', () => {
            taskText.classList.add('hidden');
            editInput.classList.remove('hidden');
            editInput.focus();
        });

        editInput.addEventListener('blur', () => {
            taskText.textContent = editInput.value;
            taskText.classList.remove('hidden');
            editInput.classList.add('hidden');
            saveTasks();
        });

        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                editInput.blur();
            }
        });

        const buttonsContainer = document.createElement('div');

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&times;';
        deleteButton.className = 'delete-button text-red-500 text-2xl p-2 hover:text-red-600 transition duration-300 ease-in-out';
        deleteButton.onclick = () => {
            listItem.style.transform = "scale(0)";
            listItem.style.opacity = "0";
            listItem.addEventListener('transitionend', () => listItem.remove());
            saveTasks();
        };

        buttonsContainer.appendChild(deleteButton);
        
        listItem.appendChild(taskContent);
        listItem.appendChild(buttonsContainer);

        return listItem;
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
            switch(task.status) {
                case 'todo':
                    todoList.appendChild(listItem);
                    break;
                case 'doing':
                    doingList.appendChild(listItem);
                    break;
                case 'done':
                    doneList.appendChild(listItem);
                    break;
            }
        });
    }

    loadTasks();
    window.addTask = addTask;
});
