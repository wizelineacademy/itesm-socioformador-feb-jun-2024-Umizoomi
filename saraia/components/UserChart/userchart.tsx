import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  {
    subject: 'Well-Being',
    A: 120,
  },
  {
    subject: 'Flow',
    A: 98,

  },
  {
    subject: 'Communication',
    A: 86,

  },
  {
    subject: 'Proactivity',
    A: 99,

  },
  {
    subject: 'Collaboration',
    A: 85,
  },
  {
    subject: 'Satisfaction',
    A: 85,
  },
  {
    subject: 'Efficiency',
    A: 65,
  },
];

export default class Example extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width="105%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}
