import { MyTimeSeriesPanel } from './MyTimeSeriesPanel';
import { MyTimeSeriesPanelOptions } from './MyTimeSeriesPanelOptions';
import { PanelPlugin } from '@grafana/data';

export const plugin = new PanelPlugin<MyTimeSeriesPanelOptions>(MyTimeSeriesPanel);
