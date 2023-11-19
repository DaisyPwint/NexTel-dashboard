import { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import { DatePicker, Typography} from "antd";
import styles from './pieChart.module.css';
import { useGetFilterRoomQuery } from "../../features/reservation/reserveApiSlice";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [ dates,setDates ] = useState({year: currentYear,month: currentMonth});
  const { data:rooms,isLoading,error } = useGetFilterRoomQuery(dates);

  let outerLabel = [];
  const innerLabel = [];
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

const noData = {
  labels: ["No Data"],
  datasets: [
    {
      data: [100],
      backgroundColor: ['#d3d3d3'],
    }
  ]
}

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
  
  const typeCounts = useMemo(() => {
    const roomType = rooms?.map(room => room.roomType);
    const typeCounts = roomType?.reduce((counts, type) => {
      counts[type] = (counts[type] || 0) + 1;
      return counts;
    }, {});
    return typeCounts;
  }, [rooms]);

  for(const type in typeCounts){
    outerLabel?.push(type);
    const calPercentage = (typeCounts[type] / rooms?.length) * 100;
    innerLabel?.push(calPercentage);
  }

  const onChange = (_,dateString) => {
    const [year,month] = dateString.split('-');
    setDates({year,month});
    if(!dateString){
      setDates({
        year: currentYear,month: currentMonth
      });
    }
  }

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles['container']}>
      <div className={styles['date-container']}>
        <Typography.Title level={4} style={{ marginTop: '0.5em' }}>Room Reservation Chart</Typography.Title>
        <DatePicker onChange={onChange} picker="month"/>
      </div>
      <div>
        <Pie data={rooms && rooms.length !== 0 ? data : noData } width={300} height={300} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
