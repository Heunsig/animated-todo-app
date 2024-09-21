<script setup lang="ts">
import { computed, ref } from 'vue'
import CustomCheckbox from '@/components/CustomCheckbox.vue'

type Todo = {
  id: string
  body: string
  created_at: Date
  isCompleted: boolean
}

const props = defineProps<{
  checked: boolean
  todo: Todo
  disableRemove?: boolean
}>()

const emit = defineEmits<{
  'update:checked': [value: boolean]
  onClickRemove: [todo: Todo]
}>()

const checkedValue = computed({
  get: () => props.checked,
  set: (value: boolean) => {
    emit('update:checked', value)
  }
})

function handleClickRemove(todo: Todo) {
  emit('onClickRemove', todo)
}
</script>

<template>
  <div class="todo-item">
    <div class="todo__body">
      <div>
        <CustomCheckbox v-model="checkedValue" />
      </div>
      <div>{{ todo.body }}</div>
      <div>{{ new Intl.DateTimeFormat('ko-KR').format(todo.created_at) }}</div>
    </div>
    <div class="todo__actions">
      <button
        v-if="!disableRemove"
        type="button"
        class="btn btn__remove"
        @click="() => handleClickRemove(todo)"
        :disabled="disableRemove"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #ccc;
  margin: 0.5rem 0;

  &__body {
    flex: 1;
  }

  &__actions {
    display: flex;
    gap: 1rem;
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
