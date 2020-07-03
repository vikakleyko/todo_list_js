/* eslint-disable indent */
'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem("toDoList")));
    }

        addToStorage() {
            localStorage.setItem("toDoList", JSON.stringify([...this.todoData]));
        }

        render() {
            this.todoList.textContent = '';
            this.todoCompleted.textContent = '';
            this.todoData.forEach(this.createItem, this);
            this.addToStorage();
        }

        createItem(todo) {
            const li = document.createElement("li");
            li.classList.add("todo-item");
            li.key = todo.key;
            li.insertAdjacentHTML("beforeend", `
            <span class="text-todo">${todo.value}</span>
                <div class="todo-buttons">
                    <button class="todo-edit"></button>
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
                </div>`
            );
            if (todo.completed) {
                this.todoCompleted.append(li);
            } else {
                this.todoList.append(li);
            }
        }

        addTodo(e) {
            e.preventDefault();
            if (this.input.value.trim()) {
                const newTodo = {
                    value: this.input.value.trim(),
                    completed: false,
                    key: this.generateKey(),
                };
                this.todoData.set(newTodo.key, newTodo);
                this.render();
            } else {
                alert("Enter value to create todo");
            }
            this.input.value = '';
        }

        findObjectByValue(item) {
            let todo;
            [...this.todoData].forEach(el => {
                if (el[1].value === item) {
                    todo = el;
                }
            });
            return todo;
        }

        deleteItem(item) {
            this.todoData.delete(this.findObjectByValue(item)[0]);
            this.render();
        }

        completeItem(item) {
            const todo = this.findObjectByValue(item);
            todo[1].completed = !todo[1].completed;
            this.todoData.set(todo[0], todo[1]);
            this.render();
        }

        editItem(todo, updatedValue) {
            todo[1].value = updatedValue;
            this.todoData.set(todo[0], todo[1]);
            this.render();
        }

        handler() {
            let updatedTodo, todoItem;
            document.addEventListener("click", e => {
                const target = e.target;
                const todo = target.closest(".todo-item");

                if (todo) {
                    if (target.matches(".todo-remove")) {
                        this.deleteItem(todo.querySelector("span").textContent);
                    }
                    if (target.matches(".todo-complete")) {
                        this.completeItem(todo.querySelector("span").textContent);
                    }
                    if (target.matches(".todo-edit")) {
                        todo.querySelector("span").contentEditable = "true";
                        updatedTodo = todo.querySelector("span");
                        todoItem = this.findObjectByValue(updatedTodo.textContent);
                    }
                }
                // save changes on click outside span
                if (updatedTodo && target !== updatedTodo && !target.matches(".todo-edit")) {
                    updatedTodo.contentEditable = "false";

                    // edit in case of updates
                    if (todoItem[1].value !== updatedTodo.textContent) {
                        this.editItem(todoItem, updatedTodo.textContent);
                    }
                }
            });
        }

        generateKey() {
            return Math.floor(Math.random() * 1000) + 1;
        }

        init() {
            this.form.addEventListener("submit", this.addTodo.bind(this));
            this.render();
        }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
todo.handler();

