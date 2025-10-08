// LineChart.tsx
import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend);

type Data = {
  labels: unknown[];
  data: number[];
  label: string;
};

type Props = {
  datas: Data[];
  title: string;
};

function getData(datas: Data[]) {
  return {
    labels: datas[0]?.labels || [],
    datasets: datas.map((d, i) => ({
      label: d.label,
      data: d.data,
      borderColor: `hsl(${(i * 60) % 360}, 70%, 50%)`, // different color per line
      backgroundColor: `hsla(${(i * 60) % 360}, 70%, 50%, 0.2)`,
      tension: 0.4,
    })),
  };
}

function getOptions(title: string) {
  return {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: title },
    },
    scales: {
      x: {
        type: 'time',
        time: { unit: 'day', tooltipFormat: 'PPP' },
        title: { display: true, text: 'Date' },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Value' },
      },
    },
  };
}

const LineChartComponent: React.FC<Props> = ({ datas, title }) => {
  return <Line data={getData(datas)} options={getOptions(title)} />;
};

export default LineChartComponent;
