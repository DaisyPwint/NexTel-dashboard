import { Card, Statistic } from 'antd';

const DashboardCard = ({title,value,style}) => {
  return (
    <Card>
        <Statistic title={title} value={value} valueStyle={style}/>
    </Card>
  )
}

export default DashboardCard