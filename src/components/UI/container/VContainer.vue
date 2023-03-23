<script lang="ts" setup>
import type {Container} from "@/components/UI/containers/types";
import {computed} from "vue";

interface ContainerProps {
  containers: Container[];
}

const props = defineProps<ContainerProps>()

const parentContainer = computed(()=> {
  return props.containers
})

const childContainer = computed(()=> {
  return props.containers.filter((item)=> item.parentId === parentContainer.value!.id) // непросредственно дети
})

const deepContainer = computed(()=> {
  return props.containers.filter((item)=> item.parentId !== parentContainer.value!.id) // глубокие потомки
})
</script>

<template>
<div class="container" v-for="container of containers" :style="{'backgroundColor': container.color}">
   {{ container.id }}
  <VContainer :containers="childContainer" />
</div>
</template>

<style lang="scss" scoped>

</style>