import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", () => {
  let id = 0;

  const todos = ref([]);
  const filter = ref("all"); // По умолчанию показываем все задачи

  onMounted(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos);

      if (todos.value.length > 0) {
        id = Math.max(...todos.value.map((t) => t.id)) + 1;
      }
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
      saveToLocalStorage();
    }
  }

  function removeTodo(todo) {
    todos.value = todos.value.filter((t) => t !== todo);
    saveToLocalStorage();
  }

  function toggleTodo(todo) {
    todo.completed = !todo.completed;
    saveToLocalStorage();
  }

  // Фильтрация задач
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case "completed":
        return todos.value.filter((todo) => todo.completed); // Только выполненные
      case "not-completed":
        return todos.value.filter((todo) => !todo.completed); // Только невыполненные
      default:
        return todos.value; // Все задачи
    }
  });

  // Установка фильтра
  function setFilter(newFilter) {
    filter.value = newFilter;
    localStorage.setItem("filter", newFilter);
  }

  function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos.value));
  }

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
