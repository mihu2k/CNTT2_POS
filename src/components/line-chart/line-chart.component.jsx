import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineChart = ({ revenueData }) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // const labels = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December',
  // ];
  const labels = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];

  const data = React.useMemo(() => {
    const dataChart = Array.from({ length: currentMonth }, () => 0);
    if (revenueData) {
      const revenue = revenueData.revenue
        .filter((item) => item._id.year === currentYear)
        .map((item) => ({
          index: item._id.month - 1,
          total: item.total,
        }));
      const revenuePos = revenueData.revenuePos
        .filter((item) => item._id.year === currentYear)
        .map((item) => ({
          index: item._id.month - 1,
          total: item.total,
        }));

      const revenueAll = [...revenue, ...revenuePos];
      const sumIfRevenue = revenueAll.reduce((obj, item) => {
        let index = item.index;
        let total = item.total;

        if (!obj.hasOwnProperty(index)) {
          obj[index] = 0;
        }
        obj[index] += total;
        return obj;
      }, {});

      for (const property in sumIfRevenue) {
        dataChart[property] = sumIfRevenue[property];
      }
    }

    return {
      labels: labels,
      datasets: [
        {
          label: 'Doanh thu (VNĐ)',
          data: dataChart,
          fill: false,
          tension: 0.3,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [revenueData, currentYear, currentMonth]);

  return (
    <div>
      <Line
        data={data}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default React.memo(LineChart);
