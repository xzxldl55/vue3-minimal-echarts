/**
 * echart二次封装
 * - 响应性options更新
 * - resizeObserver
 * - 按需导入
 */

import globalEventBus, { EVENT_NAME } from '@/utils/global-event-bus';
import * as echarts from 'echarts/core';

import {
  TooltipComponent,
  TitleComponent,
  GridComponent,
} from 'echarts/components';

// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, Ref, ref, watch } from 'vue';
import { ECOption } from './types';

// 图表调色盘
export const BASE_COLORS = [
  '#73ACFF',
  '#FDD56A',
  '#FDB36A',
  '#FD866A',
  '#9E87FF',
  '#58D5FF',
  '#ff557f',
  '#ff00ff',
  '#5500ff',
  '#55ffff',
];

// Echart导入组件缓存记录，已导入过的剔除掉，不重复导入（PS:这里不确定是否多此一举，尚未研究echarts.use的原理，不确定其内部是否会判断改组件已导入，还是进行覆盖。）
const EchartUsedSet = new WeakSet();
function setAndRemoveDuplicatesEchartUsed(usedComponents: any[]): any[] {
  const restComponents: any[] = [];
  for (const component of usedComponents) {
    if (!EchartUsedSet.has(component)) {
      restComponents.push(component);
      EchartUsedSet.add(component);
    }
  }
  return restComponents;
}

// 预先导入一般通用工具组件
echarts.use([
  LabelLayout,
  UniversalTransition,
  CanvasRenderer, // 使用canvas渲染器
  TooltipComponent, // tooltips工具
  TitleComponent, // title
  GridComponent, // grid布局
]);

/**
 * 初始化一个图表：自动实现图表options响应式 | resizeHandler
 * @param options echartOptions
 * @param noInit 禁用自动在onMounted钩子初始化 【静态，无响应式】
 * @param noResize 禁用自动resize重绘图表 【静态】
 */
const useChart = (
  options: Ref<ECOption | undefined>,
  usedComponents: any[],
  noInit: boolean,
  noResize: boolean
) => {
  // 按需动态导入所需要的组件
  echarts.use([...setAndRemoveDuplicatesEchartUsed(usedComponents)]);

  const chartDOMRef = ref<HTMLElement>();
  // echarts对象 --> 这里不能用响应式对象否则会出现 tooltip 在 axis 模式下不显示的问题
  let chart: echarts.ECharts;

  // 初始化图表
  const initChart = () => {
    if (!chartDOMRef.value) {
      return;
    }
    chart = echarts.init(chartDOMRef.value);

    if (!options.value) {
      return;
    }
    chart.setOption(options.value);
    !noResize &&
      globalEventBus.on(EVENT_NAME.WINDOW_RESIZE, () => {
        chart?.resize();
      });
  };

  // 更新配置
  const updateOptions = () =>
    options.value && chart?.setOption(options.value);

  const loading = () => {
    chart?.showLoading({
      text: '数据加载中',
      textColor: '#fff',
      effect: 'whirling',
      maskColor: 'rgba(255 255 255 / 10%)',
    });
  };

  const done = () => {
    chart?.hideLoading();
  };

  onMounted(() => !noInit && initChart());
  watch(options, updateOptions, {
    deep: true,
  });
  return {
    chart,
    chartDOMRef,
    loading,
    done,
    initChart,
  };
};

export default useChart;
export { useChart };
