// script.js
function addTask() {
    var newTaskText = document.getElementById('new-task').value;
    if (newTaskText) {
        var li = document.createElement('li');
        li.textContent = newTaskText;
        li.onclick = function() { moveToDoing(this); };
        document.getElementById('todo-list').appendChild(li);
        document.getElementById('new-task').value = '';
    }
}

function moveToDoing(taskElement) {
    var doingList = document.getElementById('doing-list');
    doingList.appendChild(taskElement);
    taskElement.onclick = function() { moveToDone(this); };
}

function moveToDone(taskElement) {
    var doneList = document.getElementById('done-list');
    doneList.appendChild(taskElement);
    taskElement.onclick = null;
}
