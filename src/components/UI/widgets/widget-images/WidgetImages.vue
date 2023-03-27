<script lang="ts" setup>
import type { Widget } from "@/components/UI/container/types";
import { computed, onBeforeUnmount } from "vue";
import img1 from "@/assets/images/img1.jpg";
import img2 from "@/assets/images/img2.jpg";
import img3 from "@/assets/images/img3.jpg";
import img4 from "@/assets/images/img4.jpg";
import { PrintConsoleLog } from "@/services/print-console-log";

interface WidgetsImages {
  widgetSet: Widget;
}

const props = defineProps<WidgetsImages>();

const styleWidget = computed(() => {
  return {
    objectFit: props.widgetSet.objectFit,
  };
});

const imageSrc = (image: string): string => {
  if (image === "img1.jpg") return img1;
  if (image === "img2.png") return img2;
  if (image === "img3.jpg") return img3;
  if (image === "img4.jpg") return img4;
  return "";
};

PrintConsoleLog.createdHook(props.widgetSet);

onBeforeUnmount(() => {
  PrintConsoleLog.beforeUnmountHook(props.widgetSet);
});
</script>

<template>
  <div :id="widgetSet.id" class="widget-images">
    <img class="widget-images__img" :style="styleWidget" :src="imageSrc(widgetSet.fileName)" :alt="widgetSet.name" />
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
