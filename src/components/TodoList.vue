<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import autoAnimate from '@formkit/auto-animate'
import TodoItem from './TodoItem.vue'
import { type Task } from '@/types/todo'

defineProps<{
  tasks: Array<Task>
}>()

const emit = defineEmits<{
  onClickRemove: [task: Task]
}>()

const todoRef = useTemplateRef('todo-list')
onMounted(() => {
  if (todoRef.value) {
    autoAnimate(todoRef.value)
  }
})
</script>

<template>
  <ul class="todo-list" ref="todo-list">
    <li v-for="task in tasks" :key="task.id">
      <TodoItem
        v-model:checked="task.isCompleted"
        :task="task"
        @onClickRemove="(task) => emit('onClickRemove', task)"
      />
    </li>
    <li class="todo-list__empty-msg" v-if="tasks.length === 0">No task</li>
  </ul>
</template>

<style scoped>
.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list__empty-msg {
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-color-dark);
}
</style>
