<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

const task = ref('')
const taskInput = useTemplateRef('task-input')

const emit = defineEmits<{
  onSubmit: [value: string]
}>()

function handleSubmit() {
  if (!task.value.trim()) {
    taskInput.value?.focus()
    return
  }

  emit('onSubmit', task.value.trim())
  task.value = ''
  taskInput.value?.focus()
}
</script>

<template>
  <div class="new-todo">
    <form @submit.prevent="() => handleSubmit()" class="new-todo__form">
      <div class="new-todo__input-box">
        <input
          ref="task-input"
          type="text"
          placeholder="Write a task"
          v-model="task"
          class="new-todo__input"
          autofocus
        />
      </div>
      <div class="new-todo__actions">
        <button type="submit" class="new-todo__submit">Add task</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.new-todo {
  border: 1px solid #2e2e2e;
  background-color: #383b42;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
}

.new-todo__input-box {
  margin-bottom: 0.5rem;
}

.new-todo__input {
  width: 100%;
  padding: 0.5rem;
  font-size: 0.75rem;
  border: 1px solid #000;
  background-color: #191919;
  border-radius: 0.5rem;
  color: var(--text-color);
  outline: none;
}

.new-todo__actions {
  display: flex;
  justify-content: flex-end;
}

.new-todo__submit {
  color: var(--text-color);
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border: 1px solid #000;
  background-color: #191919;
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;
}
</style>
