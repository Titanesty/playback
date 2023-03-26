<script lang="ts" setup>
import type { Widget } from "@/components/UI/container/types";
import { computed, onUpdated, ref } from "vue";

interface WidgetsImagesProps {
  widgetSet: Widget;
}

const props = defineProps<WidgetsImagesProps>();

interface WidgetsImagesEmits {
  (e: "getEndVideo"): void;
}

const emits = defineEmits<WidgetsImagesEmits>();

const styleWidget = computed(() => {
  return {
    objectFit: props.widgetSet.objectFit,
  };
});

const date = new Date();

interface Time {
  h: number;
  m: number;
  s: number;
}

const startTime = ref<Time>({} as Time);
const endTime = ref<Time>({} as Time);

const getTime = (time: Time) => {
  time.h = date.getHours();
  time.m = date.getMinutes();
  time.s = date.getSeconds();
};

getTime(startTime.value);

const instanceVideo = ref<HTMLVideoElement | null>(null);

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
  `${startTime.value.h}:${startTime.value.m}:${startTime.value.s}`
);

const getEndVideo = (): void => {
  emits("getEndVideo");
};

onUpdated(() => {
  getTime(endTime.value);

  console.log(
    "Окончание воспроизведения Имя:",
    props.widgetSet.name,
    "ID:",
    props.widgetSet.id,
    "Контейнер ID:",
    props.widgetSet.containerId,
    "Имя файла",
    props.widgetSet.fileName,
    "Конец воспроизвденеия:",
    `${endTime.value.h}:${endTime.value.m}:${endTime.value.s}`,
    "Время воспроизвденеия:"
  );
});
</script>

<template>
  <div :id="widgetSet.id" class="widget-video">
    <video
      ref="instanceVideo"
      @ended="getEndVideo"
      class="widget-video__video"
      :style="styleWidget"
      :muted="widgetSet.mute"
      autoplay
      controls
    >
      <source :src="widgetSet.fileName" />
    </video>
  </div>
</template>

<style lang="scss" scoped>
.widget-video {
  width: 100%;
  height: 100%;

  &__video {
    display: block;
    width: 100%;
    height: 100%;
    object-position: center;
  }
}
</style>
