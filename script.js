const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>

            <div class="actions">
                <button class="complete-btn">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button class="delete-btn">
                    Delete
                </button>
            </div>
        `;

        const completeBtn =
            li.querySelector(".complete-btn");

        const deleteBtn =
            li.querySelector(".delete-btn");

        completeBtn.addEventListener("click", () => {
            tasks[index].completed =
                !tasks[index].completed;

            saveTasks();
            renderTasks();
        });

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);

            saveTasks();
            renderTasks();
        });

        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Enter a task");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
});

renderTasks();