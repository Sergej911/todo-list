<template>
    <div>
        <select :value="filter" @change="setFilter($event.target.value)"
            class="py-2 px-3 border rounded custom-select mb-4">
            <option value="all">Все задачи</option>
            <option value="completed">Выполненные</option>
            <option value="not-completed">Невыполненные</option>
        </select>

        <ul v-if="filteredTodos.length" class="list-group">
            <todo-item class="list-group-item" v-for="todo in filteredTodos" :key="todo.id" :todo="todo"
                @remove-todo="removeTodo" @toggle-todo="toggleTodo" />
        </ul>
        <p class="notodo" v-else>У вас пока нет ни одной задачи</p>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { defineProps } from "vue";
import { useTodoStore } from "@/stores/todoStore";
import TodoItem from "./TodoItem.vue";

const todoStore = useTodoStore();

const props = defineProps({
    todos: Array
})

const filteredTodos = computed(() => todoStore.filteredTodos);
const filter = computed(() => todoStore.filter);

function removeTodo(todo) {
    todoStore.removeTodo(todo);
}

const toggleTodo = (todo) => {
    todoStore.toggleTodo(todo);
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
    width: 300px;
}
</style>