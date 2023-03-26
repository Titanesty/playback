<script lang="ts" setup>
import type { Container, Widget } from "@/components/UI/container/types";
import { computed, onMounted, ref, shallowRef, Transition } from "vue";
import WidgetImages from "@/components/UI/widgets/widget-images/WidgetImages.vue";
import WidgetVideo from "@/components/UI/widgets/widget-video/WidgetVideo.vue";

interface WidgetHandle {
  widgets: Widget[];
  effect: Container["effect"];
}

interface WidgetComponent extends Widget {
  component: string;
}

const props = defineProps<WidgetHandle>();

const componentsWidget = ref<WidgetComponent[]>([]);

const handleWidget = (): void => {
  for (let item of props.widgets) {
    if (item.type === "image") {
      componentsWidget.value.push({ ...item, component: shallowRef(WidgetImages) });
    }
    if (item.type === "video") {
      componentsWidget.value.push({ ...item, component: shallowRef(WidgetVideo) });
    }
  }
  componentsWidget.value.sort((a, b) => a.order - b.order);
};

const visibleWidget = ref<WidgetComponent | null>(null);

const isEndVideo = ref(false);

const getVisibleWidgetWithDelay = async (): Promise<void> => {
  const firstComponentsWidget: WidgetComponent = componentsWidget.value[0];
  if (firstComponentsWidget.duration.untilDone && firstComponentsWidget.type === "image") {
    visibleWidget.value = firstComponentsWidget;
  } else {
    for (let widget of componentsWidget.value) {
      if (widget.duration.untilDone && widget.type === "video") {
        visibleWidget.value = widget;
        await new Promise<void>((resolve) => {
          const checkVideoDone = () => {
            if (!isEndVideo.value) {
              setTimeout(checkVideoDone, 1000);
            } else {
              resolve();
            }
          };
          checkVideoDone();
        });
      } else {
        await new Promise((resolve) => {
          setTimeout(resolve, widget.duration.value);
          visibleWidget.value = widget;
        });
      }
    }
  }
};

onMounted(async () => {
  handleWidget();
  await getVisibleWidgetWithDelay();
});

const getEndVideo = (): void => {
  isEndVideo.value = true;
};

const isTransitionName = computed(() => {
  return props.effect === "crossfade" ? "fade" : "";
});
</script>

<template>
  <div class="widget">
    <Transition :name="isTransitionName">
      <component
        v-if="visibleWidget"
        :is="visibleWidget.component"
        :key="visibleWidget.id"
        :widgetSet="visibleWidget"
        @getEndVideo="getEndVideo"
      />
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.widget {
  width: 100%;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  position: absolute;
  transition: opacity 1000ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
