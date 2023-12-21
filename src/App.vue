<script setup lang="ts">
import Chart from '@/components/chart/index.vue';
import { BarChart } from 'echarts/charts';
import { onMounted, ref } from 'vue';
import { BASE_COLORS } from '@/components/chart/use-chart';
import { ECOption } from '@/components/chart/types';

const options = ref<ECOption>();

const chartRef = ref<typeof Chart>();

const mockData = [
  {
    name: '小明',
    value: 120,
  },
  {
    name: '小红',
    value: 170,
  },
  {
    name: '小华',
    value: 420,
  },
  {
    name: '小军',
    value: 64,
  },
  {
    name: '喜羊羊',
    value: 150,
  },
];

const changeColors = () => {
  if (options.value) {
    options.value.color = BASE_COLORS;
  }
};

const sort = () => {
  if (options.value) {
    const sortData = mockData.sort((a, b) => a.value - b.value);
    options.value.yAxis = {
      type: 'category',
      data: sortData.map((v) => v.name),
      axisLabel: {
        margin: 2,
      },
    };
    options.value.series = [
      {
        type: 'bar',
        data: sortData.map((v) => v.value),
        colorBy: 'data',
        barMaxWidth: 24,
        itemStyle: {
          borderRadius: [0, 12, 12, 0],
        },
      },
    ];
  }
};

onMounted(() => {
  
  // 简单模拟下请求数据，异步设置options
  setTimeout(() => {
    console.log('App.vue chart - ', chartRef.value?.chart)
    options.value = {
      title: {
        show: true,
        text: '终极一班同学身价图',
      },
      xAxis: {
        type: 'value',
        name: '万元',
      },
      yAxis: {
        type: 'category',
        data: mockData.map((v) => v.name),
        axisLabel: {
          margin: 2,
        },
      },
      grid: {
        left: '60px',
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      series: [
        {
          type: 'bar',
          data: mockData.map((v) => v.value),
          colorBy: 'data',
          barMaxWidth: 24,
          itemStyle: {
            borderRadius: [0, 12, 12, 0],
          },
        },
      ],
    };
  });
});
</script>

<template>
  <button @click="changeColors">换个颜色！</button>
  <button @click="sort">排个序</button>
  <chart
    ref="chartRef"
    class="bar-chart__demo"
    :used-components="[BarChart]"
    :options="options"
  />
</template>

<style scoped>
.bar-chart__demo {
  width: 500px;
  height: 400px;
}
</style>
