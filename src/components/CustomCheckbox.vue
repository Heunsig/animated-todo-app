<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const id = ref('')
const checked = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

onMounted(() => {
  id.value = uuidv4()
})
</script>
<template>
  <div class="custom-checkbox">
    <input class="inp-cbx" :id="id" type="checkbox" style="display: none" v-model="checked" />
    <label class="cbx" :for="id">
      <span>
        <svg width="12px" height="9px" viewbox="0 0 12 9">
          <polyline points="1 5 4 8 11 1"></polyline>
        </svg>
      </span>
    </label>
  </div>
</template>

<style scoped>
.custom-checkbox .cbx {
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
}
.custom-checkbox .cbx span {
  display: inline-block;
  vertical-align: middle;
  transform: translate3d(0, 0, 0);
}
.custom-checkbox .cbx span:first-child {
  position: relative;
  width: 1rem;
  height: 1rem;
  transform: scale(1);
  vertical-align: middle;
  border: 1px solid #2e2e2e;
  transition: all 0.2s ease;
  border-radius: 0.375rem;
  background-color: #404348;
}
.custom-checkbox .cbx span:first-child svg {
  position: absolute;
  z-index: 1;
  top: 2px;
  left: 1px;
  fill: none;
  stroke: white;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translate3d(0, 0, 0);
  transform: scale(0.8);
}

.custom-checkbox .inp-cbx:checked + .cbx span:first-child {
  border-color: #000000;
  background: #1e1e1e;
}

.custom-checkbox .inp-cbx:checked + .cbx span:first-child svg {
  stroke-dashoffset: 0;
}
</style>
