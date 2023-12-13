let todoList = [];

function addToList() {
    let inputText = document.getElementById("textInput").value.trim();
    if (inputText !== "") {
        todoList.push({ text: inputText, done: false });
        updateList();
        document.getElementById("textInput").value = "";
    }
}

function updateList() {
    let list = document.querySelector(".todoList");
    list.innerHTML = "";

    todoList.forEach((item, index) => {
        const listItem = document.createElement("div");
        listItem.classList.add("todo-item");

        const text = document.createElement("span");
        text.textContent = item.text;
        text.classList.add("todo");

        const actions = document.createElement("div");
        actions.classList.add("actions");        

        const editButton = document.createElement("span");
        editButton.classList.add("edit");
        editButton.innerHTML = "&#9998;";
        editButton.addEventListener("click", function () {
        let newText = prompt("Редактировать задачу:", item.text);
        if (newText !== "" && newText.length < 100) {
            item.text = newText.trim();
            updateList();
        }
        else {
            while (newText === "" || newText.length > 100)
            {
                alert("Текст должен быть не пустой, и не должен содержать более 100 символов!");
                newText = prompt("Редактировать задачу:");
                item.text = newText.trim();
                updateList();
            }
        }
        });

        const returnButton = document.createElement("span");
        returnButton.classList.add("return");
        returnButton.innerHTML = "&#8617;";
        returnButton.style.display = "none";
        returnButton.addEventListener("click", function () {
            item.done = false;
            updateList();
        });

        const deleteButton = document.createElement("span");
        deleteButton.classList.add("delete");
        deleteButton.innerHTML = "&#10006;";
        deleteButton.addEventListener("click", function () {
          const index = todoList.findIndex(item => item.text === text.textContent);
          if (index !== -1) {
              todoList.splice(index, 1);
              listItem.remove();
              updateList();
          }
        });    

        const checkbox = document.createElement("span");
        checkbox.classList.add("checkbox");
        checkbox.innerHTML = "&#10004;";
        checkbox.addEventListener("click", function () {
            item.done = true;
            updateList();
        });
      
        const moveUpButton = document.createElement("span");
        moveUpButton.classList.add("move-up");
        moveUpButton.innerHTML = "&#8593;"; 
        moveUpButton.addEventListener("click", function () {
            if (index > 0) {
                const temp = todoList[index];
                todoList[index] = todoList[index - 1];
                todoList[index - 1] = temp;
                updateList();
            }
        });

        const moveDownButton = document.createElement("span");
        moveDownButton.classList.add("move-down");
        moveDownButton.innerHTML = "&#8595;";
        moveDownButton.addEventListener("click", function () {
            if (index < todoList.length - 1) {
                const temp = todoList[index];
                todoList[index] = todoList[index + 1];
                todoList[index + 1] = temp;
                updateList();
            }
        });

        if (item.done)
        {
            checkbox.style.display = "none";
            returnButton.style.display = "inline";
            text.style.textDecoration = "line-through";
            text.style.fontWeight = "bold";
        }
        else
        {
            checkbox.style.display = "inline";
            returnButton.style.display = "none";
            text.style.textDecoration = "none";
        }
        listItem.style.backgroundColor = index % 2 === 0 ? "#f0f0f0" : "#ffffff";
        
        actions.appendChild(moveUpButton);
        actions.appendChild(moveDownButton);
        actions.appendChild(checkbox);
        actions.appendChild(returnButton);
        actions.appendChild(deleteButton);

        listItem.appendChild(editButton);
        listItem.appendChild(text);
        listItem.appendChild(actions);        

        list.appendChild(listItem);
    });
    const deleteAllContainer = document.querySelector(".delete-all-container");
    deleteAllContainer.style.display = todoList.length > 0 ? "block" : "none";
    const deleteCompletedContainer = document.querySelector(".delete-completed-container");
    deleteCompletedContainer.style.display = todoList.some(item => item.done) ? "block" : "none";
}

function deleteCompletedTasks()
{
    const confirmDelete = confirm("Вы уверены, что хотите удалить выполненные задачи?");
    if (confirmDelete) {
    todoList = todoList.filter(item => !item.done);
    updateList();
    }
}

function deleteAllTasks() {
    const confirmDelete = confirm("Вы уверены, что хотите удалить все задачи?");
    if (confirmDelete) {
        todoList = [];
        updateList();
    }
}