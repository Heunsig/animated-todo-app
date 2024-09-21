<script setup lang="ts">
import { computed, ref } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import NewTodo from '@/components/NewTodo.vue'
import TodoList from '@/components/TodoList.vue'
import SortBy from '@/components/SortBy.vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { type Task } from '@/types/todo'

const tasks = ref<Array<Task>>([])
const searchKeyword = ref('')
const sortBy = ref('createdAt')

function addTodo(taskBody: string) {
  tasks.value = [
    {
      id: Math.random().toString(36).substr(2, 9),
      body: taskBody,
      createdAt: new Date(),
      isCompleted: false
    },
    ...tasks.value
  ]
}

function removeTodo(id: string) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}

function filterAndSortTasks(tasks: Array<Task>) {
  return tasks
    .filter((task) =>
      task.body.toLocaleLowerCase().includes(searchKeyword.value.toLocaleLowerCase())
    )
    .toSorted((a, b) => {
      if (sortBy.value === 'createdAt') {
        return b.createdAt.getTime() - a.createdAt.getTime()
      }

      return a.body.localeCompare(b.body)
    })
}

const todoTasks = computed(() => {
  return filterAndSortTasks(tasks.value).filter((task) => !task.isCompleted)
})

const completedTasks = computed(() => {
  return filterAndSortTasks(tasks.value).filter((task) => task.isCompleted)
})
</script>

<template>
  <div class="todo-app">
    <NewTodo @onSubmit="(task) => addTodo(task)" />

    <SortBy v-model="sortBy" />

    <SearchBar v-model="searchKeyword" />

    <OverlayScrollbarsComponent
      :options="{
        scrollbars: {
          theme: 'os-theme-light',
          autoHide: 'leave',
          autoHideDelay: 500
        }
      }"
    >
      <div class="todo-section">
        <div>
          <h2 class="section-title">Work to Do</h2>
          <TodoList :tasks="todoTasks" @onClickRemove="(todo) => removeTodo(todo.id)" />
        </div>

        <div>
          <h2 class="section-title">Work Done</h2>
          <TodoList :tasks="completedTasks" @onClickRemove="(todo) => removeTodo(todo.id)" />
        </div>
      </div>
    </OverlayScrollbarsComponent>
  </div>
</template>

<style scoped>
.todo-app {
  width: 100%;
  max-width: 30rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.todo-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-grow: 1;
  padding-right: 0.75rem;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
</style>
