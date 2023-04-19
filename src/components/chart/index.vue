<template>
    <div ref="chartDOMRef"></div>
</template>

<script setup lang="ts">
import { useChart } from './use-chart';
import { toRefs } from 'vue';
import { ECOption } from './types';

const props = defineProps<{
    options: ECOption | undefined;
    usedComponents: any[];
    noInit?: boolean;
    noResize?: boolean;
}>();
const { options, noInit, noResize } = toRefs(props);
const { chart, chartDOMRef, loading, done, initChart } = useChart(
    options,
    props.usedComponents,
    !!noInit?.value,
    !!noResize?.value
);

defineExpose({
    chart,
    loading,
    done,
    initChart
});
</script>
