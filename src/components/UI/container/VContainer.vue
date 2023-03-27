<script lang="ts" setup>
import { computed } from "vue";
import type { CSSProperties } from "vue";
import type { Container, Widget } from "@/components/UI/container/types";
import WidgetHandle from "@/components/UI/widgets/widget-handle/WidgetHandle.vue";

interface ContainerProps {
  parentContainer: Container;
  containers: Container[];
  widgetsList: Widget[];
}
const props = defineProps<ContainerProps>();

const childContainer = computed(() => {
  return props.containers.filter((item) => item.parentId === props.parentContainer.id);
});

const styleContainer = (item: Container): CSSProperties => {
  return {
    backgroundColor: item.color,
    maxWidth: `${item.width}px`,
    maxHeight: `${item.height}px`,
    left: `${item.y}px`,
    top: `${item.x}px`,
    position: item.parentId === null ? "relative" : "absolute",
  };
};

const getWidgetsListByContainers = (containerId: number): Widget[] => {
  return props.widgetsList.filter((item) => item.containerId === containerId);
};

console.log(
  "КОНТЕЙНЕР id:",
  props.parentContainer.id,
  "ВИДЖЕТЫ:",
  getWidgetsListByContainers(props.parentContainer.id).map((item) => item.name)
);
</script>

<template>
  <div :id="parentContainer.id" class="container" :style="styleContainer(parentContainer)">
    <WidgetHandle :widgets="getWidgetsListByContainers(parentContainer.id)" :effect="parentContainer.effect" />
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
      <WidgetHandle :widgets="getWidgetsListByContainers(container.id)" :effect="container.effect" />
    </VContainer>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
}
</style>
