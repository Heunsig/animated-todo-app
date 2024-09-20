<script setup lang="ts">
import { onMounted, ref } from 'vue'

const todos = ref<
  Array<{
    id: string
    body: string
  }>
>([])

// function moveUp(index: number) {
//   if (index === 0) return

//   const todo = todos.value[index]
//   todos.value.splice(index, 1)
//   todos.value.splice(index - 1, 0, todo)
// }

// function moveDown(index: number) {
//   if (index === todos.value.length - 1) return

//   const todo = todos.value[index]
//   todos.value.splice(index, 1)
//   todos.value.splice(index + 1, 0, todo)
// }

// immutable way
function moveUp(index: number) {
  if (index === 0) return

  todos.value = todos.value.map((todo, i) => {
    if (i === index) return todos.value[index - 1]
    if (i === index - 1) return todos.value[index]
    return todo
  })
}

function moveDown(index: number) {
  if (index === todos.value.length - 1) return

  todos.value = todos.value.map((todo, i) => {
    if (i === index) return todos.value[index + 1]
    if (i === index + 1) return todos.value[index]
    return todo
  })
}

onMounted(() => {
  todos.value = [
    {
      id: 'a8d3e9b4-a0aa-4093-a16b-3f92f07b51b8',
      body: 'International Identity Representative'
    },
    {
      id: '0e62b1e9-a80f-44f6-aa53-9cf2fdc8d756',
      body: 'Chief Factors Assistant'
    },
    {
      id: '8487583d-e01c-473d-a426-14b8a03c4cda',
      body: 'Investor Marketing Manager'
    },
    {
      id: '61528a22-e8df-4743-9d56-da9d1c6d534d',
      body: 'National Usability Consultant'
    },
    {
      id: 'd498b03f-a6ae-412d-9264-14be3c001902',
      body: 'Investor Applications Planner'
    },
    {
      id: '6faccea5-23a9-4dec-811b-b4f933424688',
      body: 'Human Program Executive'
    },
    {
      id: 'bee6370f-d42f-4272-aa05-59552dc9fad7',
      body: 'Central Brand Representative'
    },
    {
      id: 'b9b83b9b-47fb-495f-8ba1-f8501efd1b69',
      body: 'Regional Security Associate'
    },
    {
      id: 'bf3753a6-07b6-4215-840d-68bcea8cd86b',
      body: 'Chief Brand Officer'
    },
    {
      id: 'be7f2992-991a-4830-bb57-c31b286cb89c',
      body: 'Direct Applications Supervisor'
    }
  ]
})
</script>

<template>
  <div>
    <div class="container">
      <ul class="todo" v-auto-animate>
        <li v-for="(todo, index) in todos" :key="todo.id" class="todo__item">
          <div class="todo__body">
            {{ todo.body }}
          </div>
          <div class="todo__actions">
            <button type="button" class="btn btn__up" @click="() => moveUp(index)">&#8613;</button>
            <button type="button" class="btn btn__down" @click="() => moveDown(index)">
              &#8615;
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.todo {
  list-style: none;
  padding: 0;

  .todo__item {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #ccc;

    .todo__body {
      flex: 1;
    }

    .todo__actions {
      display: flex;
      gap: 1rem;
    }
  }
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
</style>
