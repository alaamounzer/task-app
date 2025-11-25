let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let taskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveProfile(name, email) {
    localStorage.setItem("profileName", name);
    localStorage.setItem("profileEmail", email);
}

window.onload = function () {
    renderTasks();
    updateCompletedCount();
    updateTotalCount();
    const savedName = localStorage.getItem("profileName");
    const savedEmail = localStorage.getItem("profileEmail");

    if (savedName) document.getElementById("profileName").innerText = savedName;
    if (savedEmail) document.getElementById("profileEmail").innerText = savedEmail;

    if (document.getElementById("nameInput"))
        document.getElementById("nameInput").value = savedName || "";

    if (document.getElementById("emailInput"))
        document.getElementById("emailInput").value = savedEmail || "";
};

function addTask() {
    let input = document.getElementById("taskInput");
    if (!input) return;

    let text = input.value.trim();
    if (text === "") return;

    let task = {
        id: taskId++,
        text: text,
        done: false
    };

    tasks.push(task);
    saveTasks();
    input.value = "";

    renderTasks();
    updateCompletedCount();
    updateTotalCount();
}

function toggleTask(id) {
    let task = tasks.find(t => t.id === id);
    task.done = !task.done;

    saveTasks();
    renderTasks();
    updateCompletedCount();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();

    renderTasks();
    updateCompletedCount();
    updateTotalCount();
}

function renderTasks() {
    let container = document.getElementById("taskList");
    if (!container) return;

    container.innerHTML = "";

    tasks.forEach(task => {
        let div = document.createElement("div");
        div.className = "task-card " + (task.done ? "done" : "not-done");

        div.innerHTML = `
            <strong>#${task.id}</strong> ${task.text}
            <br>
            <button onclick="toggleTask(${task.id})">
                ${task.done ? "Undo" : "Done"}
            </button>

            <button onclick="deleteTask(${task.id})" style="margin-top:8px;">
                Delete
            </button>
        `;

        container.appendChild(div);
    });
}


function updateProfile() {
    let nameEl = document.getElementById("nameInput");
    let emailEl = document.getElementById("emailInput");

    if (!nameEl || !emailEl) return;

    let name = nameEl.value.trim();
    let email = emailEl.value.trim();

    if (name) document.getElementById("profileName").innerText = name;
    if (email) document.getElementById("profileEmail").innerText = email;

    saveProfile(name, email);
    updateCompletedCount();
    updateTotalCount();
}


function updateCompletedCount() {
    let count = tasks.filter(t => t.done).length;
    let el = document.getElementById("completedCount");
    if (el) el.innerText = count;
}

function updateTotalCount() {
    let el = document.getElementById("totalCount");
    if (el) el.innerText = tasks.length;
}