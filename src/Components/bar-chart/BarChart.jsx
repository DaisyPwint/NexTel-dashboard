import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import { faker } from '@faker-js/faker';
import { DatePicker, Typography } from "antd";
import styles from './barChart.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const options = {
    responsive: true,
    scales:{
      y: {
        grid: {
          display: false,
        }
      }
    },
    plugins: {
        legend: {
            display: false,
        }
    }
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','Auguest','September','Octomber','November','December'];

const data = {
    labels,
    datasets: [
        {
            label: 'Income',
            data: labels.map(() => faker.number.binary({min: 0, max: 100})),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            barThickness: 30,
        }
    ]
}

const onChange = (date,dateString) => {
    console.log(date,dateString);
}

const BarChart = () => {
  return (
    <div className={styles['container']}>
      <div className={styles['date-container']}>
        <Typography.Title level={4} style={{ marginTop: '0.5em' }}>Income Chart</Typography.Title>
        <DatePicker onChange={onChange} picker="month"/>
      </div>
      <div className={styles['chart-container']}>
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}

export default BarChart