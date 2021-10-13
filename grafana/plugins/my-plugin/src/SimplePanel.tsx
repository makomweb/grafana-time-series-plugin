import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  
  const { limit } = options;

  return (
    <div style={{ overflow: 'auto', width, height }}>
      { data.series.map(frame => {
          return (
            <table style = {{ width: '100%' }}>
              <thead>
                <tr>
                    <th>Time</th>
                    <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {
                  Array
                    .from({ length: frame.length > limit ? limit : frame.length })
                    .map((_, i) => {
                      return (
                        <tr>
                          {frame.fields.map(field => {
                            const value = field.display!(field.values.get(i));
                            return <td style={{ color: value.color }}>{value.text + (value.suffix ? value.suffix : '')}</td>
                          })}
                        </tr>
                      );
                    })
                }
              </tbody>
            </table>
          )
        })
      }
    </div>
  );
}
