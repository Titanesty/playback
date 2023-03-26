<script lang="ts" setup>
import type { Widget } from "@/components/UI/container/types";
import { computed, onBeforeUnmount, ref } from "vue";
import video2 from "@/assets/video/video1.mp4";
import video1 from "@/assets/video/video2.mp4";
import { PrintConsoleLog } from "@/services/print-console-log";

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

const instanceVideo = ref<HTMLMediaElement | null>(null);

const getEndVideo = (): void => {
  console.log("Конец видео");
  emits("getEndVideo");
};

const videoSrc = (fileName: string): string => {
  if (fileName === "video1.mp4") return video2;
  if (fileName === "video2.mp4") return video1;
  return "";
};

PrintConsoleLog.createdHook(props.widgetSet);

onBeforeUnmount(() => {
  PrintConsoleLog.beforeUnmountHook(props.widgetSet);
});
</script>

<template>
  <div class="widget-video">
    <video
      ref="instanceVideo"
      :id="widgetSet.id"
      class="widget-video__video"
      :style="styleWidget"
      :src="videoSrc(widgetSet.fileName)"
      @ended="getEndVideo"
      muted
      autoplay
      preload="auto"
    />
  </div>
</template>

<style lang="scss" scoped>
.widget-video {
  width: 100%;

  &__video {
    display: block;
    width: 100%;
    height: 100%;
    object-position: center;
  }
}
</style>
