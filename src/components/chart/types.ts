import { ComposeOption } from 'echarts/core';
// 引入类型系统
import {
  BarSeriesOption,
  BoxplotSeriesOption,
  CandlestickSeriesOption,
  CustomSeriesOption,
  EffectScatterSeriesOption,
  FunnelSeriesOption,
  GaugeSeriesOption,
  GraphSeriesOption,
  HeatmapSeriesOption,
  LineSeriesOption,
  LinesSeriesOption,
  MapSeriesOption,
  ParallelSeriesOption,
  PictorialBarSeriesOption,
  PieSeriesOption,
  RadarSeriesOption,
  SankeySeriesOption,
  ScatterSeriesOption,
  SunburstSeriesOption,
  ThemeRiverSeriesOption,
  TreeSeriesOption,
  TreemapSeriesOption,
} from 'echarts/charts';

import {
  AriaComponentOption,
  AxisPointerComponentOption,
  BrushComponentOption,
  CalendarComponentOption,
  DataZoomComponentOption,
  GeoComponentOption,
  GraphicComponentOption,
  GridComponentOption,
  LegendComponentOption,
  MarkAreaComponentOption,
  MarkLineComponentOption,
  MarkPointComponentOption,
  PolarComponentOption,
  RadarComponentOption,
  SingleAxisComponentOption,
  TimelineComponentOption,
  ToolboxComponentOption,
  VisualMapComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
  DatasetComponentOption
} from 'echarts/components';

// EchartOptions类型
export type ECOption = ComposeOption<
  // 组件
  | AriaComponentOption
  | AxisPointerComponentOption
  | BrushComponentOption
  | CalendarComponentOption
  | DataZoomComponentOption
  | GeoComponentOption
  | GraphicComponentOption
  | GridComponentOption
  | LegendComponentOption
  | MarkAreaComponentOption
  | MarkLineComponentOption
  | MarkPointComponentOption
  | PolarComponentOption
  | RadarComponentOption
  | SingleAxisComponentOption
  | TimelineComponentOption
  | ToolboxComponentOption
  | VisualMapComponentOption
  | TitleComponentOption
  | TooltipComponentOption
  | DatasetComponentOption
  // 图表
  | BarSeriesOption
  | BoxplotSeriesOption
  | CandlestickSeriesOption
  | CustomSeriesOption
  | EffectScatterSeriesOption
  | FunnelSeriesOption
  | GaugeSeriesOption
  | GraphSeriesOption
  | HeatmapSeriesOption
  | LineSeriesOption
  | LinesSeriesOption
  | MapSeriesOption
  | ParallelSeriesOption
  | PictorialBarSeriesOption
  | PieSeriesOption
  | RadarSeriesOption
  | SankeySeriesOption
  | ScatterSeriesOption
  | SunburstSeriesOption
  | ThemeRiverSeriesOption
  | TreeSeriesOption
  | TreemapSeriesOption
>;
