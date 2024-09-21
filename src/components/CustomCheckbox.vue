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
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transform: scale(1);
  vertical-align: middle;
  border: 1px solid #b9b8c3;
  transition: all 0.2s ease;
}
.custom-checkbox .cbx span:first-child svg {
  position: absolute;
  z-index: 1;
  top: 8px;
  left: 6px;
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
}
.custom-checkbox .cbx span:first-child:before {
  content: '';
  width: 100%;
  height: 100%;
  background: #506eec;
  display: block;
  transform: scale(0);
  opacity: 1;
  border-radius: 50%;
  transition-delay: 0.2s;
}

.custom-checkbox .inp-cbx:checked + .cbx span:first-child {
  border-color: #3c53c7;
  background: #3c53c7;
  animation: check-15 0.6s ease;
}
.custom-checkbox .inp-cbx:checked + .cbx span:first-child svg {
  stroke-dashoffset: 0;
}
.custom-checkbox .inp-cbx:checked + .cbx span:first-child:before {
  transform: scale(2.2);
  opacity: 0;
  transition: all 0.6s ease;
}
.custom-checkbox .inp-cbx:checked + .cbx span:last-child {
  color: #b9b8c3;
  transition: all 0.3s ease;
}
.custom-checkbox .inp-cbx:checked + .cbx span:last-child:after {
  transform: scaleX(1);
  transition: all 0.3s ease;
}

@keyframes check-15 {
  50% {
    transform: scale(1.2);
  }
}
</style>
