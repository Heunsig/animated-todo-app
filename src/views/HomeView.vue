<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import autoAnimate, { type AnimationController } from '@formkit/auto-animate'
import TodoItem from '@/components/TodoItem.vue'

const todoRef = useTemplateRef('todo')
const completedTodoRef = useTemplateRef('completedTodo')

const todos = ref<
  Array<{
    id: string
    body: string
    created_at: Date
    isCompleted: boolean
  }>
>([])

const text = ref('')
function addTodo() {
  todos.value = [
    {
      id: Math.random().toString(36).substr(2, 9),
      body: text.value,
      created_at: new Date(),
      isCompleted: false
    },
    ...todos.value
  ]

  text.value = ''
}

function removeTodo(id: string) {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}

const searchKeyword = ref('')
const sortBy = ref('createdAt')

const filteredTodos = computed(() => {
  return todos.value
    .filter((todo) => todo.isCompleted === false)
    .filter((todo) =>
      todo.body.toLocaleLowerCase().includes(searchKeyword.value.toLocaleLowerCase())
    )
    .toSorted((a, b) => {
      if (sortBy.value === 'createdAt') {
        return b.created_at.getTime() - a.created_at.getTime()
      }

      return a.body.localeCompare(b.body)
    })
})

const completedTodos = computed(() => {
  return todos.value.filter((todo) => todo.isCompleted)
})

const controller = ref<AnimationController | null>(null)

onMounted(() => {
  todos.value = [
    {
      id: '13ee2a54-c529-4448-8683-bb172a0e4f6a',
      body: 'Human Paradigm Designer',
      created_at: new Date('Fri Nov 22 2024 02:01:09 GMT+0900 (Korean Standard Time)'),
      isCompleted: false
    },
    {
      id: '22d5bb91-200f-43f5-b867-3e94f473476c',
      body: 'Central Implementation Strategist',
      created_at: new Date('Thu Dec 19 2024 21:50:32 GMT+0900 (Korean Standard Time)'),
      isCompleted: false
    },
    {
      id: 'ef6df881-5a09-418c-b9ba-3801362a2836',
      body: 'Direct Mobility Specialist',
      created_at: new Date('Wed Nov 13 2024 02:42:53 GMT+0900 (Korean Standard Time)'),
      isCompleted: false
    },
    {
      id: 'b4716f2b-21df-4b0a-a938-769e7797f853',
      body: 'International Identity Technician',
      created_at: new Date('Thu Jan 04 2024 18:16:13 GMT+0900 (Korean Standard Time)'),
      isCompleted: false
    },
    {
      id: '4b6e23d4-e3f6-4f47-9fa1-a202c8497ed8',
      body: 'Internal Group Planner',
      created_at: new Date('Sun Jun 02 2024 01:57:51 GMT+0900 (Korean Standard Time)'),
      isCompleted: false
    }
  ]

  if (!todoRef.value) return

  controller.value = autoAnimate(todoRef.value)

  if (!completedTodoRef.value) return
  autoAnimate(completedTodoRef.value)
})
</script>

<template>
  <div>
    <div class="container">
      <div>
        <form @submit.prevent="() => addTodo()">
          <input type="text" placeholder="Add a new todo" v-model="text" />
          <button type="submit">Add</button>
        </form>
      </div>
      <div>
        <input type="text" v-model="searchKeyword" />
      </div>
      <div>
        <select v-model="sortBy">
          <option value="createdAt">Created at</option>
          <option value="body">Body</option>
        </select>
      </div>
      <ul class="todo-list" ref="todo">
        <li v-for="todo in filteredTodos" :key="todo.id" class="todo__item">
          <TodoItem
            v-model:checked="todo.isCompleted"
            :todo="todo"
            @onClickRemove="(todo) => removeTodo(todo.id)"
          />
        </li>
      </ul>
      <ul class="todo-list" ref="completedTodo">
        <li v-for="todo in completedTodos" :key="todo.id" class="todo__item">
          <TodoItem v-model:checked="todo.isCompleted" :todo="todo" disableRemove />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 30rem;
  margin: 0 auto;
}

.todo-list {
  list-style: none;
  padding: 0;
}
</style>
