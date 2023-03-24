<script lang="ts" setup>
import type { Widget } from '@/components/UI/container/types'
import { computed } from 'vue'

interface WidgetsImages {
  widgetSet: Widget
}

const props = defineProps<WidgetsImages>()

const styleWidget = computed(() => {
  return {
    objectFit: props.widgetSet.objectFit
  }
})
</script>

<template>
  <div :id="widgetSet.id" class="widget-images">
    <img
      class="widget-images__img"
      :style="styleWidget"
      :src="widgetSet.fileName"
      :alt="widgetSet.name"
    />
  </div>
</template>

<style lang="scss" scoped>
.widget-images {
  width: 100%;
  height: 100%;

  &__img {
    display: block;
    width: 100%;
    height: 100%;
    object-position: center;
  }
}
</style>
