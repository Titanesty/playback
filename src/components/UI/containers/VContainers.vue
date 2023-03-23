<script lang="ts" setup>

import type {Container} from "@/components/UI/containers/types";
import {computed} from "vue";
import VContainer from "@/components/UI/container/VContainer.vue";

interface ContainerProps {
  containers: Container[];
}

const props = defineProps<ContainerProps>()

// const sizeContainer = computed(()=> {
//   return {
//     width: `${props.settingsContainer.width}px`,
//     height: `${props.settingsContainer.height}px`
//   }
// })
//
// const positionContainer = computed(()=> {
//   if (!props.settingsContainer.parentId) return "relative"
//   return "absolute"
// })

const parentContainer = computed(()=> {
  return props.containers.find(item=> item.parentId === null) //родитель главный
})

const childAllContainer = computed(()=> {
  return props.containers.filter((item)=> item.id !== parentContainer.value!.id) // все кто его дети и потомки
})

const childContainer = computed(()=> {
  return childAllContainer.value.filter((item)=> item.parentId === parentContainer.value!.id) // непросредственно дети
})

const deepContainer = computed(()=> {
  return childAllContainer.value.filter((item)=> item.parentId !== parentContainer.value!.id) // глубокие потомки
})


</script>

<template>
  <div class="container container--main" :style="style">
    <VContainer :containers="containers" />
  </div>

</template>

<style lang="scss" scoped>

</style>