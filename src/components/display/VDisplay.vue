<script lang="ts" setup>
import { computed } from "vue";
import VContainer from "@/components/UI/container/VContainer.vue";
import schedule from "@/schedule.json";
import type { Container, Widget } from "@/components/UI/container/types";

const containersList: Container[] = schedule.containers;

const widgetsList: Widget[] = schedule.widgets;

const parentId = computed(() => {
  return containersList.filter((item) => item.parentId === null)[0];
});
</script>

<template>
  <VContainer :containers="containersList" :parentContainer="parentId" :widgetsList="widgetsList" />
</template>
