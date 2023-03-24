<script lang="ts" setup>
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { Container, Widget } from '@/components/UI/container/types'
import WidgetHandle from '@/components/UI/widgets/widget-handle/WidgetHandle.vue'

interface ContainerProps {
  parentContainer: Container
  containers: Container[]
  widgetsList: Widget[]
}
const props = defineProps<ContainerProps>()

const childContainer = computed(() => {
  return props.containers.filter((item) => item.parentId === props.parentContainer.id)
})

const styleContainer = (item: Container): CSSProperties => {
  return {
    backgroundColor: item.color,
    width: `${item.width}px`,
    height: `${item.height}px`,
    left: `${item.y}px`,
    top: `${item.x}px`
  }
}

const getWidgetsListByContainers = (containerId: number): Widget[] => {
  return props.widgetsList.filter((item) => item.containerId === containerId)
}

interface WidgetByContainers extends Container {
  widgets: Widget[]
}

const writeLog = () => {
  const array = props.containers.reduce(
    (accum: WidgetByContainers[], value: Container): WidgetByContainers[] => {
      const widgets = props.widgetsList.filter((item) => item.containerId === value.id)

      accum.push({ ...value, widgets })
      return accum
    },
    []
  )
  array.forEach((item) => {
    console.log('КОНТЕЙНЕР:', item, 'ВИДЖЕТЫ:', item.widgets)
  })
}

writeLog()
</script>
<template>
  <div
    :id="parentContainer.id"
    class="container container-main"
    :style="styleContainer(parentContainer)"
  >
    <WidgetHandle :widgets="getWidgetsListByContainers(parentContainer.id)" />
    <VContainer
      :id="container.id"
      class="container"
      :style="styleContainer(container)"
      v-for="container in childContainer"
      :key="container.id"
      :parentContainer="container"
      :containers="containers"
      :widgetsList="widgetsList"
    >
      <WidgetHandle :widgets="getWidgetsListByContainers(container.id)" />
    </VContainer>
  </div>
</template>
<style lang="scss" scoped>
.container-main {
  position: relative;
}
</style>
