<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const sortBy = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div class="sort-by">
    <select v-model="sortBy" class="sort-by__select">
      <option value="createdAt">Created at</option>
      <option value="body">Body</option>
    </select>
  </div>
</template>

<style scoped>
.sort-by {
  margin-bottom: 0.75rem;
  display: flex;
}

.sort-by__select {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border: 1px solid #2e2e2e;
  background-color: #383b42;
  border-radius: 0.5rem;
  color: var(--text-color);
  outline: none;
}
</style>
