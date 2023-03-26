<script lang="ts" setup>
import type { Widget } from "@/components/UI/container/types";
import { onMounted, ref, shallowRef } from "vue";
import WidgetImages from "@/components/UI/widgets/widget-images/WidgetImages.vue";
import WidgetVideo from "@/components/UI/widgets/widget-video/WidgetVideo.vue";

interface WidgetHandle {
  widgets: Widget[];
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

const getVisibleWidgetWithDelay = async (): Promise<any> => {
  const firstComponentsWidget: WidgetComponent = componentsWidget.value[0];
  if (firstComponentsWidget.duration.untilDone && firstComponentsWidget.type === "image") {
    visibleWidget.value = firstComponentsWidget;
  } else {
    for (let widget of componentsWidget.value) {
      if (widget.type === "video" && widget.duration.untilDone) {
        ////
        const iterator: IterableIterator<WidgetComponent> = componentsWidget.value[Symbol.iterator]();
        while (!isEndVideo.value) {
          const result = iterator.next();
          if (result.done) {
            // если прошли все элементы массива, выходим из цикла
            break;
          }
          const element = result.value;
          console.log(element);
          // проверяем, нужно ли приостановить выполнение цикла
          if (isEndVideo.value) {
            // ожидаем, пока переменная stop не станет true
            while (isEndVideo.value) {
              // делаем паузу в выполнении цикла
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            // когда переменная stop стала false, продолжаем выполнение цикла
          }
        }
        ////

        visibleWidget.value = widget;
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
</script>

<template>
  <div class="widget">
    {{ isEndVideo }}
    <component
      v-if="visibleWidget"
      :is="visibleWidget.component"
      :widgetSet="visibleWidget"
      @getEndVideo="getEndVideo"
    />
  </div>
</template>

<style lang="scss" scoped>
.widget {
  width: 100%;
  height: 100%;
}
</style>
