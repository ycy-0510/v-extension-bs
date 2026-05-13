<template>
  <div>
    <div class="p-2 sticky-top bg-white bg-opacity-50 z-3">
      <input
        type="text"
        name="todo"
        id="todo"
        class="form-control form-control-sm"
        placeholder="Add new todo"
        v-model="newTodo"
        @keyup.enter="addNewTodo"
      />
    </div>
    <div class="list-group list-group-flush">
      <label
        v-for="(todo, i) in todos"
        :key="i"
        class="list-group-item d-flex align-items-start p-2"
        :for="`todo-${todo.id}`"
        style="cursor: pointer;"
      >
        <input
          :id="`todo-${todo.id}`"
          :name="`todo-${todo.id}`"
          type="checkbox"
          class="form-check-input mt-1 me-2"
          :checked="todo.completed"
          v-model="todo.completed"
        />
        <div
          class="flex-grow-1 small text-secondary"
          :class="todo.completed ? 'text-decoration-line-through text-muted' : null"
        >
          <p class="mb-0 user-select-none">{{ todo.name }}</p>
        </div>
      </label>
    </div>
    <p class="small text-center text-muted px-2 pb-2 mb-0">This is a demo</p>
  </div>
</template>
<script setup>
import { ref } from "vue";
const newTodo = ref("");
const todos = ref([
  { id: 1, name: "Work on Github issues", completed: true },
  { id: 2, name: "Procrastinate", completed: false },
  { id: 3, name: "Sleep", completed: false },
  { id: 4, name: "Buy some stocks", completed: false },
  { id: 5, name: "Sleep", completed: false },
]);

const addNewTodo = () => {
  console.log("add new todo", newTodo.value);
  todos.value.unshift({
    id: todos.value.length + 1,
    name: newTodo.value,
    completed: false,
  });
  newTodo.value = "";
};
</script>
<style scoped></style>
