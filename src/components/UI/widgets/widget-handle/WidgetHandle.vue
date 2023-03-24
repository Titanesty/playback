<script lang="ts" setup>
import type { Widget } from '@/components/UI/container/types'
import { onMounted, ref, shallowRef } from 'vue'
import WidgetImages from '@/components/UI/widgets/widget-images/WidgetImages.vue'

interface WidgetHandle {
  widgets: Widget[]
}

interface WidgetComponent extends Widget {
  component: string
}

const props = defineProps<WidgetHandle>()

const componentsWidget = ref<WidgetComponent[]>([])

const handleWidget = (): void => {
  for (let item of props.widgets) {
    if (item.type === 'images') {
      componentsWidget.value.push({ ...item, component: shallowRef(WidgetImages) })
    }
    if (item.type === 'video') {
      componentsWidget.value.push({ ...item, component: shallowRef(WidgetImages) })
    }
  }
}

onMounted(() => {
  handleWidget()
})
</script>

<template>
  <div class="widget">
    <component
      :is="widget.component"
      v-for="(widget, index) of componentsWidget"
      :key="index"
      :widgetSet="widget"
    />
  </div>
</template>

<style lang="scss" scoped></style>
