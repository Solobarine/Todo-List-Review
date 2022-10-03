// ----------------- Import Required Elements
import taskList from './modules/taskarray.js';
import * as element from './modules/elements.js';
import * as taskFunction from './modules/functions.js';
import './style.css';

// ----------------- Collect data from Local Storage
const store = localStorage.getItem('listOfTasks');

if (store) {
  taskList.push(...JSON.parse(store));
} else {
  taskList; // eslint-disable-line
}

// ------------------ Load Avaliable Tasks
taskFunction.reloadTask();

// ------------------ Event Listener for Add Button
element.addBtn.addEventListener('click', () => {
  const input = element.userInput.value;
  const comp = 'false';
  const index = taskList.length;
  taskFunction.addTask(input, comp, index);
  taskFunction.loadTask(index);
  localStorage.setItem('listOfTasks', JSON.stringify(taskList));
});

// ------------------ Check the Box if b is set to true
for (let i = 0; i < taskList.length; i += 1) {
  if (taskList[i].b === true) {
    element.taskContainer.children[i].children[0].checked = true;
    element.taskContainer.children[i].classList.add('change-color');
    element.taskContainer.children[i].children[1].style.textDecoration = 'line-through';
  } else {
    element.taskContainer.children[i].classList.remove('change-color');
  }
}

// -----------------  Event Listener for CheckBox
element.taskContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('checkbox')) {
    const checkItem = e.target.parentElement;
    const item = e.target.parentElement.children[0];
    const checkIndex = taskList.findIndex((c) => c.a === checkItem.querySelector('.task-item').innerText);
    taskList[checkIndex].b = item.checked;
    if (item.checked === true) {
      element.taskContainer.children[checkIndex].children[1].style.textDecoration = 'line-through';
      checkItem.classList.add('change-color');
    } else {
      element.taskContainer.children[checkIndex].children[1].style.textDecoration = 'none';
      checkItem.classList.remove('change-color');
    }
    localStorage.setItem('listOfTasks', JSON.stringify(taskList));
  }
});

// --------------------- Event Listener to Remove Button
element.taskContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('remBtn')) {
    const taskCon = e.target.parentElement;
    const taskIndex = taskList.findIndex((t) => t.a === taskCon.querySelector('.task-item').innerText);
    taskFunction.deleteTask(taskIndex);
    element.taskContainer.removeChild(taskCon);
    taskFunction.refreshIndex();
    localStorage.setItem('listOfTasks', JSON.stringify(taskList));
  }
});

// ---------------------- Edit To Do
element.taskContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('task-item')) {
    const repParent = e.target.parentElement;
    const repTask = e.target.parentElement.children[1];
    const repInput = document.createElement('input');
    const taskIndex = taskList.findIndex((t) => t.a === repParent.querySelector('.task-item').innerText);
    repInput.className = 'repInput';
    repInput.setAttribute('type', 'text');
    repParent.replaceChild(repInput, repTask);
    // -------------------- Collect User Input
    repInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const val = repInput.value;
        // ------------------------ Replace The Old Task
        taskList[taskIndex].a = val;
        repParent.replaceChild(repTask, repInput);
        repTask.textContent = val;
        localStorage.setItem('listOfTasks', JSON.stringify(taskList));
      }
      localStorage.setItem('listOfTasks', JSON.stringify(taskList));
    });
  }
});

// ------------------- Function to clear all completed Tasks
const clearAll = () => {
  for (let i = 0; i < taskList.length; i += 1) {
    if (taskList[i].b === true) {
      taskList.splice(i, 1);
      localStorage.setItem('listOfTasks', JSON.stringify(taskList));
    }
  }
};

// ------------------- Delete All Completed Tasks
element.clearCompleted.addEventListener('click', () => {
  clearAll();
  taskFunction.reloadTask();
  taskFunction.refreshIndex();
});
