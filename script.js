document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("todo-list");
    const clearButton = document.getElementById("clear-button");
    const newItemInput = document.getElementById("new-item-input");
    const addItemButton = document.getElementById("add-item-button");

    // Load and display the to-do list from local storage
    let savedList = JSON.parse(localStorage.getItem("myTodoList")) || [];

    function renderList() {
        todoList.innerHTML = "";
        for (let i = 0; i < savedList.length; i++) {
            const itemData = savedList[i];
            const listItem = document.createElement("li");
            listItem.textContent = itemData.text;
            if (itemData.clicked) {
                listItem.classList.add("clicked");
            }
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = `<ion-icon name="trash"></ion-icon>`;
            deleteButton.addEventListener("click", () => {
                const firstConfirmation = window.confirm("Are you sure you want to delete this item?");
                if (firstConfirmation) {
                    const secondConfirmation = window.confirm("This action cannot be undone. Confirm again.");
                    if (secondConfirmation) {
                        savedList.splice(i, 1);
                        updateLocalStorage();
                        renderList();
                    }
                }
            });
            listItem.appendChild(deleteButton);
            listItem.addEventListener("click", () => {
                listItem.classList.toggle("clicked");
                itemData.clicked = !itemData.clicked;
                updateLocalStorage();
            });
            todoList.appendChild(listItem);
        }
    }

    function updateLocalStorage() {
        localStorage.setItem("myTodoList", JSON.stringify(savedList));
    }

    renderList();

    clearButton.addEventListener("click", () => {
        const firstConfirmation = window.confirm("This will clear the list. Are you sure?");
        if (firstConfirmation) {
            const secondConfirmation = window.confirm("This action cannot be undone. Confirm again.");
            if (secondConfirmation) {
                localStorage.clear();
                savedList = [];
                renderList();
            }
        }
    });

    addItemButton.addEventListener("click", () => {
        const newItemText = newItemInput.value;
        if (newItemText) {
            savedList.push({ text: newItemText, clicked: false });
            updateLocalStorage();
            newItemInput.value = "";
            renderList();
        }
    });
});
