<template>
    <div class="flex">
        <ul v-if="todos.length" class="list-group">
            <todo-item class="list-group-item" v-for="todo in todos" :key="todo.id" :todo="todo"
                @remove-todo="removeTodo" />
        </ul>
        <p class="notodo" v-else>У вас пока нет ни одной задачи</p>

        <select @change="setFilter($event.target.value)" class="py-2 px-3 border rounded custom-select mb-3">
            <option value="all">Все задачи</option>
            <option value="completed">Выполненные</option>
            <option value="not-completed">Невыполненные</option>
        </select>
    </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useTodoStore } from "@/stores/todoStore";
import TodoItem from "./TodoItem.vue";

const todoStore = useTodoStore();

const props = defineProps({
    todos: Array
})

function removeTodo(todo) {
    todoStore.removeTodo(todo);
}

// Переключение статуса задачи
function toggleTodoStatus(todo) {
    todoStore.toggleTodoStatus(todo);
}

function setFilter(filter) {
    todoStore.setFilter(filter);
}
</script>

<style scoped>
.list-group {
    max-width: 60%;
}

.notodo {
    font-size: 20px;
}

.custom-select {
    width: 200px;
}
</style>