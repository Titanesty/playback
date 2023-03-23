<script lang="ts" setup>
import VContainers from "@/components/UI/containers/VContainers.vue";
import schedule from '@/schedule.json';
import type {Container} from "@/components/UI/containers/types";

const containersList: Container[] = schedule.containers

</script>

<template>
 <VContainers :containers="containersList" />
</template>