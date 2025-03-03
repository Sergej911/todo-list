<template>
    <li :class="{ done: todo.completed }" class="list-group-item d-flex justify-content-between align-items-center">
        <div :class="{ itemtext: todo.completed }">
            {{ todo.text }}
        </div>
        <div class="btn-group btn-group-sm">
            <button @click="emit('toggle-todo', todo)" class="btn btn-success">Готово</button>
            <button @click="emit('remove-todo', todo)" class="btn btn-danger">Удалить</button>
        </div>
    </li>
</template>

<script setup>
import { defineProps } from "vue";
import { defineEmits } from "vue";
import { useTodoStore } from "@/stores/todoStore";

const todoStore = useTodoStore();

const props = defineProps({
    todo: Object
})

const emit = defineEmits(['remove-todo', 'toggle-todo']);
</script>

<style scoped>
.done {
    background-color: rgba(18, 207, 43, 0.356);
    transition: all 0.2s ease;
}

.itemtext {
    text-decoration: line-through;
    color: rgba(23, 24, 23, 0.589);
}
</style>