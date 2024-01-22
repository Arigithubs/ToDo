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
        listItem.className = 'border-b border-gray-200 p-2 flex justify-between items-center';
        listItem.dataset.status = status;
        
        const taskContent = document.createElement('span');
        taskContent.textContent = text;
        
        const buttonsContainer = document.createElement('div');
        
        const doingButton = document.createElement('button');
        doingButton.textContent = 'Start Doing';
        doingButton.className = 'bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded';
        doingButton.onclick = function() {
            moveTask(this.parentElement.parentElement, 'doing');
        };
        
        const doneButton = document.createElement('button');
        doneButton.textContent = 'Mark Done';
        doneButton.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2';
        doneButton.onclick = function() {
            moveTask(this.parentElement.parentElement, 'done');
        };
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2';
        deleteButton.onclick = function() {
            this.parentElement.parentElement.remove();
            saveTasks();
        };
        
        buttonsContainer.appendChild(doingButton);
        buttonsContainer.appendChild(doneButton);
        buttonsContainer.appendChild(deleteButton);
        
        listItem.appendChild(taskContent);
        listItem.appendChild(buttonsContainer);
        
        return listItem;
    }

    function moveTask(taskElement, newStatus) {
        const targetList = newStatus === 'doing' ? doingList : doneList;
        targetList.appendChild(taskElement);
        taskElement.dataset.status = newStatus;
        saveTasks();
    }

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
});
