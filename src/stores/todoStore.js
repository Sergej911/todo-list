import { ref, computed, watch, onMounted } from "vue";
import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", () => {
  let id = 0;

  const todos = ref([]);
  const filter = ref("all");

  onMounted(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos);
    }

    const savedFilter = localStorage.getItem("filter");
    if (savedFilter) {
      filter.value = savedFilter;
    }
  });

  const allTodos = computed(() => todos.value);

  function addTodo(text) {
    if (text.trim()) {
      todos.value.push({ id: id++, text, completed: false });
    }
  }

  function removeTodo(todo) {
    todos.value = todos.value.filter((t) => t !== todo);
  }

  function toggleTodo(todo) {
    todo.completed = !todo.completed;
  }

  const filteredTodos = computed(() => {
    switch (filter.value) {
      case "completed":
        return todos.value.filter((todo) => todo.completed);
      case "not-completed":
        return todos.value.filter((todo) => !todo.completed);
      default:
        return todos.value;
    }
  });

  function setFilter(newFilter) {
    filter.value = newFilter;
    localStorage.setItem("filter", newFilter);
  }

  watch(
    todos,
    (newTodos) => {
      localStorage.setItem("todos", JSON.stringify(newTodos));
    },
    { deep: true }
  );

  return {
    todos,
    allTodos,
    addTodo,
    removeTodo,
    toggleTodo,
    filter,
    filteredTodos,
    setFilter,
  };
});
