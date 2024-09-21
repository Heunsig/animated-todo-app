<script setup lang="ts">
import { computed } from 'vue'
import CustomCheckbox from '@/components/CustomCheckbox.vue'
import { type Task } from '@/types/todo'

const props = defineProps<{
  checked: boolean
  task: Task
}>()

const emit = defineEmits<{
  'update:checked': [value: boolean]
  onClickRemove: [task: Task]
}>()

const checkedValue = computed({
  get: () => props.checked,
  set: (value: boolean) => {
    emit('update:checked', value)
  }
})

function handleClickRemove(task: Task) {
  emit('onClickRemove', task)
}
</script>

<template>
  <div
    class="todo-item"
    :class="{
      'todo-item--completed': task.isCompleted
    }"
  >
    <div class="todo-item__body">
      <CustomCheckbox v-model="checkedValue" />
      <div class="todo-item__text">{{ task.body }}</div>
      <div class="todo-item__date">
        {{ new Intl.DateTimeFormat('ko-KR').format(task.createdAt) }}
      </div>
    </div>
    <div>
      <button type="button" class="btn btn__remove" @click="() => handleClickRemove(task)">
        &times;
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  font-size: 0.9rem;
  border-radius: 0.375rem;
  padding: 0 0.25rem;

  transition: background-color 0.2s;
}

.todo-item__body {
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: 0.75rem;
}

.todo-item__date {
  font-size: 0.75em;
}

.todo-item--completed {
  .todo-item__text {
    text-decoration: line-through;
    color: var(--text-color-dark);
  }

  .todo-item__date {
    color: var(--text-color-dark);
  }
}

.btn {
  display: inline-flex;
  background: none;
  border: none;
  outline: none;
  appearance: none;
  cursor: pointer;
  color: var(--text-color);
  padding: 0 0.25rem;
  margin: 0;

  opacity: 0;
  transition: opacity 0.2s;
}

.todo-item:hover {
  background-color: #36383f;
}
.todo-item:hover .btn {
  opacity: 1;
}
</style>
