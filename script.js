// To Do List

// Getting All Required Elements From HTML File
let input = document.querySelector('.inputbox input');
let tasksBox = document.querySelector('.tasksbox');
let clearBtn = document.querySelector('.clear');
let enterBtn = document.querySelector('.entericon');
let dateInput = document.querySelector('.dateinput');
let allCounter = document.querySelector('.num1');
let pendingCounter = document.querySelector('.num2');
let completedCounter = document.querySelector('.num3');

// Create Empty Array To Store All Tasks
let tasksArray = [];

// If Local Storage Has An Items
if (localStorage.getItem('tasks')) {
  // Add These Items To Tasks Array
  tasksArray.push(...JSON.parse(localStorage.getItem('tasks')));
  // Call Showing Data Function
  showingData();
  // Call Tasks Counter Function
  tasksCounter();
};

// When Click Enter Icon
enterBtn.addEventListener('click', () => {
  // If Input Has A Value And Date Input Has A Value Too
  if (input.value && dateInput.value) {
    // Add New Task (Object) To Tasks Array
    tasksArray.push({ id: new Date().getTime(), value: input.value, date: dateInput.value, pend: 'yes' });
    // Update Local Storage And Add Tasks Array To It
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
    // Call Showing Data Function
    showingData();
    // Delete Input Value After Adding Task
    input.value = '';
    // Delete Date Input Vaalue After Adding Task
    dateInput.value = '';
  };
  // Call Tasks Coutner Function
  tasksCounter();
});

// When Press Any Key On Input
input.addEventListener('keyup', (key) => {
  // If This Key Is Enter Key
  if (key.key == 'Enter') {
    // If Input Has A Value And Date Input Has A Value Too
    if (input.value && dateInput.value) {
      // Add New Task (Object) To Tasks Array
      tasksArray.push({ id: new Date(), value: input.value, date: dateInput.value, pend: 'yes' });
      // Update Local Storage And Add Tasks Array To It
      localStorage.setItem('tasks', JSON.stringify(tasksArray));
      // Call Showing Data Function
      showingData();
      // Delete Input Value After Adding Task
      input.value = '';
      // Delete Date Input Value After Adding Task
      dateInput.value = '';
    };
  };
  // Call Tasks Function Counter
  tasksCounter();
});

// Showing Data Function
function showingData() {
  // Clear Task Box Firstly
  tasksBox.innerHTML = '';
  // Sorting Tasks Array By Date
  tasksArray.sort((task1, task2) => {
    // If Date Of Task 1 > Date Of Task 2
    if (task1.date > task2.date) return 1; // Return Task 1
    // If Date Of Task 2 > Date Of Task 1
    else if (task2.date > task1.date) return -1; // Return Task 2
    // Else
    else return 0;
  });
  // Looping On Tasks Array
  tasksArray.forEach((task) => {
    // Add Items From Tasks Array To Tasks Box In HTML File
    tasksBox.innerHTML += `
    <div class="task" task-id="${task.id}">
      <label for="${task.id}">
        <input type="checkbox" onclick="updateStatue(this)" class="check" id="${task.id}" ${task.pend == 'no' ? 'checked' : ''}>
        <span class="text">${task.value}</span>
        <div class="date">${task.date}</div>
      </label>
      <i class="uil uil-trash-alt del" onclick="deleteTask(this)"></i>
    </div>`;
  });
  // Add Active Class To (All) Filter Only And Remove It From Other Filters
  document.querySelector('.filters span.active').classList.remove('active');
  document.querySelector('.all').classList.add('active');
};

// Updating Statue Of Task Function
function updateStatue(task) {
  // Looping On Tasks Array
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].id == task.parentElement.parentElement.getAttribute('task-id')) {
      tasksArray[i].pend == 'yes' ? tasksArray[i].pend = 'no' : tasksArray[i].pend = 'yes';
    };
    // Update Local Storage
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
  };
  // Call Tasks Counter Function
  tasksCounter();
};

// Delete Task Function
function deleteTask(taskDel) {
  // Filtering Tasks Array And Getting Tasks Without Task That You want To Delete It
  tasksArray = tasksArray.filter((task) => {
    return task.id != taskDel.parentElement.getAttribute('task-id');
  });
  // Remove This Task From HTML File
  taskDel.parentElement.remove();
  // Update Local Storage
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
  // Call Tasks Counter Function
  tasksCounter();
};

// When Clicking Clear ALL Btn
clearBtn.addEventListener('click', () => {
  // Remove All Items From Tasks Array
  tasksArray = [];
  // Clear Local Storage
  localStorage.removeItem('tasks');
  // Call Showing Data Function
  showingData();
  // Call Tasks Counter Function
  tasksCounter();
});

// Creating All Required Arrays For Filters
let pendingTasks = [];
let completedTasks = [];

// Filter Function
function filter(filterArray, elementAddClass, statue) {
  // Remove Active Class From All Filters
  document.querySelector('.filters span.active').classList.remove('active');
  // Add Active Class To Current Filter
  elementAddClass.classList.add('active');
  // Filtering Tasks Array And Getting Pending Tasks Only
  filterArray = tasksArray.filter((task) => {
    return task.pend == statue;
  });
  tasksBox.innerHTML = '';
  // Looping On Fillter Array (Result Of Filtering)
  filterArray.forEach((task) => {
    tasksBox.innerHTML += `
          <div class="task" task-id="${task.id}">
            <label for="${task.id}">
              <input type="checkbox" onclick="updateStatue(this)" class="check" id="${task.id}" ${task.pend == 'no' ? 'checked' : ''}>
              <span class="text">${task.value}</span>
              <div class="date">${task.date}</div>
            </label>
            <i class="uil uil-trash-alt del" onclick="deleteTask(this)"></i>
          </div>`;
  });
};

// Tasks Counter Functoin
function tasksCounter() {
  // Return Pending Tasks In New Array
  let pendCounterArray = tasksArray.filter((task) => {
    return task.pend == 'yes';
  });
  // Return Completed Tasks In New Array
  let compCounterArray = tasksArray.filter((task) => {
    return task.pend != 'yes';
  });
  // Getting Length Of All Arrays
  allCounter.innerHTML = tasksArray.length; // Tasks Array
  pendingCounter.innerHTML = pendCounterArray.length; // Pending Tasks Array
  completedCounter.innerHTML = compCounterArray.length; // Completed Tasks Array
  // Control On Counters Color // If Counter Is 0, Color Is Red
  if (allCounter.innerHTML == 0) {
    allCounter.parentElement.style.color = '#D50808';
    allCounter.style.color = '#D50808';
  } else {
    allCounter.parentElement.style.color = '#9000E4';
    allCounter.style.color = '#9000E4';
  };
  if (pendingCounter.innerHTML == 0) {
    pendingCounter.parentElement.style.color = '#D50808';
    pendingCounter.style.color = '#D50808';
  } else {
    pendingCounter.parentElement.style.color = '#9000E4';
    pendingCounter.style.color = '#9000E4';
  };
  if (completedCounter.innerHTML == 0) {
    completedCounter.parentElement.style.color = '#D50808';
    completedCounter.style.color = '#D50808';
  } else {
    completedCounter.parentElement.style.color = '#9000E4';
    completedCounter.style.color = '#9000E4';
  };
};

// This Project Is Done