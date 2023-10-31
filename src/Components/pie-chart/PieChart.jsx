import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import { DatePicker, Typography} from "antd";
import styles from './pieChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const outerLabel = ['Single', 'Double', 'Twin', 'Family', 'Suite', 'Presidential'];
const innerLabel = [16.53, 24.79, 21.49, 12.40, 13.22, 11.57];
const colors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"
];

const data = {
  labels: outerLabel,
  datasets: [
    {
      label: '% of rooms',
      data: innerLabel,
      backgroundColor: colors,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  plugins: {
    // title: {
    //   display: true,
    //   text: 'Room Reservation Chart',
    //   align: 'start',
    //   color: '#fff',
    //   font: {
    //     size: 18,
    //     family: 'Inter'
    //   }
    // },
    legend: {
      display: true,
      position: "right",
      align: "center",
      labels: {
        color: '#fff',
        usePointStyle: true,
        font: {
          size: 14,
          family: 'Inter',
        }
      }
    },
  },
};

const onChange = (date,dateString) => {
  console.log(date,dateString);
}

const PieChart = () => {
  return (
    <div className={styles['container']}>
      <div className={styles['date-container']}>
        <Typography.Title level={4} style={{ marginTop: '0.5em' }}>Room Reservation Chart</Typography.Title>
        <DatePicker onChange={onChange} picker="month"/>
      </div>
      <div className={styles['chart-container']}>
        <Pie data={data} width={300} height={300} options={options}/>
      </div>
    </div>
  );
};

export default PieChart;
