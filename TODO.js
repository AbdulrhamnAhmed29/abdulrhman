let input = document.getElementById("inp");
let btn = document.getElementById("btnAdd");
let btnClear = document.getElementById("btnClear");
let ul = document.getElementById("ul");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


btn.classList.add('none');


function check(e) {
    e.preventDefault();
    if (input.value.trim().length < 5) {
        alert("The task is less than 5 characters."
        )
    } else {
        btn.classList.remove('none');
    }
}

// localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// task-show 
function renderTasks() {
    ul.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.classList.add("task-item");

        //    task-paragrapg 
        let textSpan = document.createElement("span");
        textSpan.classList.add("task-text");
        textSpan.textContent = task.text;
        if (task.done) textSpan.classList.add("line");

        //  time 
        let timeSpan = document.createElement("span");
        timeSpan.classList.add("task-time");
        timeSpan.textContent = getElapsedTime(task.time);

        let actionsDiv = document.createElement("div");
        actionsDiv.classList.add("task-actions");

        let editBtn = document.createElement("button");
        editBtn.classList.add("task-btn", "edit");
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.addEventListener("click", () => editTask(index));

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("task-btn", "delete");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.addEventListener("click", () => deleteTask(index));

        let doneBtn = document.createElement("button");
        doneBtn.classList.add("task-btn", "done");
        doneBtn.innerHTML = '<i class="fas fa-check"></i>';
        doneBtn.addEventListener("click", () => toggleDone(index));

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);
        actionsDiv.appendChild(doneBtn);

        li.appendChild(textSpan);
        li.appendChild(timeSpan);
        li.appendChild(actionsDiv);

        ul.appendChild(li);
    });
}

// task time 
function getElapsedTime(startTime) {
    let now = Date.now();
    let diff = Math.floor((now - startTime) / 1000);
    let minutes = Math.floor(diff / 60);
    let seconds = diff % 60;
    return `${minutes}m ${seconds}s`;
}

// Add task 
btn.addEventListener("click", function (e) {
    let value1 = input.value.trim();
    if (value1.length < 5) {
        alert("The task is less than 5 characters.");
        return;
    }
    tasks.push({
        text: value1,
        time: Date.now(),
        done: false
    });
    saveTasks();
    renderTasks();

    input.value = "";
    btn.classList.add('none');
});

// edit task 
function editTask(index) {
    let newText = prompt("Edit your task:", tasks[index].text);
    if (newText && newText.trim().length >= 5) {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    } else if (newText) {
        alert("The task is less than 5 characters.");
    }
}

// delete task 
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// up date tasks 
function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

// Delete all tasks 
btnClear.addEventListener("click", function () {
    if (confirm("هل تريد مسح كل المهام؟")) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
});


setInterval(renderTasks, 1000);


renderTasks();

// show/hide add button based on input length
input.addEventListener("input", function () {
    if (input.value.trim().length < 5) {
        btn.classList.add('none');
    } else {
        btn.classList.remove('none');
    }
});
