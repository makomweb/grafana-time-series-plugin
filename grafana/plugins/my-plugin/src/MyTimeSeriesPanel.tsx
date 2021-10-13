import React from 'react';
import {
  PanelProps,
  DataFrame,
  FieldType
 } from '@grafana/data';
import { MyTimeSeriesPanelOptions } from 'MyTimeSeriesPanelOptions';
import { TimeSeries } from '@grafana/ui';
import { Measure } from 'types';

function createDataFrame(metricName: string, measures: Measure[]): DataFrame
{
  return {
    name: metricName,
    fields: [
      {name: 'time', type: FieldType.time, values: measures.map(o => o.timeStamp)},
      {name: 'value', type: FieldType.number, values: measures.map(o => o.value)},
    ],
    length: measures.length
  };
}

function getFrames(metrics: Map<string, Measure[]>) : any
{
  return metrics.forEach(
    (value, key) => {
      return createDataFrame(key, value);
    });
} 

function getMetrics() : Map<string, Measure[]> {
  return new Map<string, Measure[]>(
    [
      ["metric.1", getMeasures()],
      ["metric.2", getMeasures()]
    ]
  );
}

function getMeasures() : Measure[]
{
  return [10, 20, 30, 40]
    .map(item => new Measure(new Date(), item));
}

interface Props extends PanelProps<MyTimeSeriesPanelOptions> {}

export const MyTimeSeriesPanel: React.FC<Props> = ({ options, data, width, height }) => {
  
  const metrics = getMetrics();
  const frames = getFrames(metrics) as DataFrame[];

  return (
    <TimeSeries
      frames={frames}
      width={width}
      height={height}
      >

    </TimeSeries>
  );
}

