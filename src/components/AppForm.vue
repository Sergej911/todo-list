<template>
    <div>
        <form @submit.prevent="addTodo" class="input-group mb-3">
            <input v-model="newTodo" class="form-control" type="text" placeholder="Введите задачу">
            <div class="button-wrapper">
                <button class="btn btn-primary" type="submit">Добавить</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useTodoStore } from "@/stores/todoStore";

const todoStore = useTodoStore();

const newTodo = ref('');

function addTodo() {
    if (newTodo.value.trim()) {
        todoStore.addTodo(newTodo.value);
        newTodo.value = '';
    }
}

function setFilter(filter) {
    todoStore.setFilter(filter);
}
</script>

<style scoped>
.input-group {
    max-width: 60%;
}
</style>