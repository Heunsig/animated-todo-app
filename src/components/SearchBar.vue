<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const searchKeyword = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>
<template>
  <div class="search-bar">
    <input type="text" v-model="searchKeyword" class="search-bar__input" placeholder="Search..." />
  </div>
</template>

<style scoped>
.search-bar {
  margin-bottom: 1rem;
}

.search-bar__input {
  width: 100%;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border: 1px solid #2e2e2e;
  background-color: #383b42;
  border-radius: 0.5rem;
  color: var(--text-color);
  outline: none;
}
</style>
