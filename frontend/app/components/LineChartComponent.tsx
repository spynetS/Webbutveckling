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

const data = {
  labels: [
    new Date('2025-09-01'),
    new Date('2025-09-02'),
    new Date('2025-09-03'),
    new Date('2025-09-04'),
    new Date('2025-09-05'),
  ],
  datasets: [
    {
      label: 'Strength',
      data: [12, 19, 15, 22, 18],
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Strength over time' },
  },
  scales: {
    x: {
      type: 'time',
      time: { unit: 'day', tooltipFormat: 'PPP' },
      title: { display: true, text: 'Date' },
    },
    y: {
      beginAtZero: true,
      title: { display: true, text: 'Strength' },
    },
  },
};

const LineChartComponent: React.FC = () => <Line data={data} options={options} />;

export default LineChartComponent;
