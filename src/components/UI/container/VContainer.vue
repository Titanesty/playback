<script lang="ts" setup>
import type {Container} from "@/components/UI/containers/types";
import {computed, ref} from "vue";

interface ContainerProps {
  containers: Container[];
  parentId: number
}

const props = defineProps<ContainerProps>()

const parentContainer = computed(()=> {
  return props.containers.filter((item)=> item.parentId === props.parentId) // непросредственно дети
})

const getParentContainerId = (containerId: number): number => {
  return containerId
}

const getNextContainers = (containerId: number): Container[]  => {
  return props.containers.filter((item) => item.parentId === containerId)
}
</script>

<template>
<div class="container" v-for="container of parentContainer" :style="{'backgroundColor': container.color, width: `${container.width}px`, height: `${container.height}px`}">
  <VContainer :containers="getNextContainers(container.id)" :parentId="getParentContainerId(container.id)" />
</div>
</template>

<style lang="scss" scoped>

</style>