<template>
  <div class="container">
    <h1 class="mt-3">Список задач</h1>
    <app-form />
    <todo-list :todos="todos" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTodoStore } from "@/stores/todoStore";
import AppForm from "./components/AppForm.vue";
import TodoList from "./components/TodoList.vue";

const todoStore = useTodoStore();
const todos = computed(() => todoStore.allTodos); 
</script>

<style scoped></style>
