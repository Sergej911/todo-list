<template>
  <div class="container">
    <h1 class="mt-3">Список задач</h1>
    <app-form />
    <todo-list />
  </div>
</template>

<script setup>
import AppForm from "./components/AppForm.vue";
import TodoList from "./components/TodoList.vue";
</script>

<style scoped></style>
