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

const LineChartComponent: React.FC = (
  props:
  {
    labels:unknown[],
    data:number[],
    label:string,
    title:string,

  }) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label:props.label,
        data: props.data,
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
        title: { display: true, text: props.title },
      },
      scales: {
        x: {
          type: 'time',
          time: { unit: 'day', tooltipFormat: 'PPP' },
          title: { display: true, text: 'Date' },
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: props.label },
        },
      },
    };

    return(
      <Line data={data} options={options} />
    )
  }

export default LineChartComponent;
