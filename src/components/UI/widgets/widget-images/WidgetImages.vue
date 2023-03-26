<script lang="ts" setup>
import type { Widget } from "@/components/UI/container/types";
import { computed, onUpdated } from "vue";

interface WidgetsImages {
  widgetSet: Widget;
}

const props = defineProps<WidgetsImages>();

const styleWidget = computed(() => {
  return {
    objectFit: props.widgetSet.objectFit,
  };
});

const date = new Date();

console.log(
  "Воспроизводим: Имя:",
  props.widgetSet.name,
  "ID",
  props.widgetSet.id,
  "Контейнер ID",
  props.widgetSet.containerId,
  "Имя файла",
  props.widgetSet.fileName,
  "Начало воспроизвденеия",
  `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
);

onUpdated(() => {
  console.log(
    "Окончание воспроизведения : Имя:",
    props.widgetSet.name,
    "ID",
    props.widgetSet.id,
    "Контейнер ID",
    props.widgetSet.containerId,
    "Имя файла",
    props.widgetSet.fileName,
    "Конец воспроизвденеия",
    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  );
});
</script>

<template>
  <div :id="widgetSet.id" class="widget-images">
    <img class="widget-images__img" :style="styleWidget" :src="widgetSet.fileName" :alt="widgetSet.name" />
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
