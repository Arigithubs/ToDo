document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const todoList = document.getElementById('todo-list');
    const doingList = document.getElementById('doing-list');
    const doneList = document.getElementById('done-list');

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            const listItem = createTaskElement(taskText);
            todoList.appendChild(listItem);
            newTaskInput.value = '';
            updateLocalStorage();
        }
    }

    function createTaskElement(text) {
        const listItem = document.createElement('li');
        listItem.className = 'border-b border-gray-200 p-2 flex justify-between items-center';
        
        const taskContent = document.createElement('span');
        taskContent.textContent = text;
        
        const buttonsContainer = document.createElement('div');
        
        const doingButton = document.createElement('button');
        doingButton.textContent = 'Start Doing';
        doingButton.className = 'bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded';
        doingButton.onclick = function() {
            moveTask(this.parentElement.parentElement, doingList);
        };
        
        const doneButton = document.createElement('button');
        doneButton.textContent = 'Mark Done';
        doneButton.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2';
        doneButton.onclick = function() {
            moveTask(this.parentElement.parentElement, doneList);
        };
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2';
        deleteButton.onclick = function() {
            this.parentElement.parentElement.remove();
            updateLocalStorage();
        };
        
        buttonsContainer.appendChild(doingButton);
        buttonsContainer.appendChild(doneButton);
        buttonsContainer.appendChild(deleteButton);
        
        listItem.appendChild(taskContent);
        listItem.appendChild(buttonsContainer);
        
        return listItem;
    }

    function moveTask(taskElement, targetList) {
        targetList.appendChild(taskElement);
        updateLocalStorage();
    }

    function updateLocalStorage() {
        // Implement the local storage update logic here
    }

    window.addTask = addTask; // Expose addTask function to global scope so it can be called from onclick
});

