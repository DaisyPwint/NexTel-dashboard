import { Table, Typography, Space, Dropdown } from 'antd';
import styles from './detail.module.css';
import { DownOutlined } from '@ant-design/icons';

const Detail = () => {

  const items =[
    {
        key: '1',
        label: 'check-in'
    },
    {
        key: '2',
        label: 'check-out'
    },
    {
        key: '3',
        label: 'canceled'
    }
  ]
  
  const columns = [
    {
        title: 'Room No.',
        dataIndex: 'no',
        align: 'center'
    },
    {
        title: 'Room Type',
        dataIndex: 'type',
        align: 'center'
    },
    {
        title: 'Check-In',
        dataIndex: 'checkIn',
        align: 'center'
    },
    {
        title: 'Check-Out',
        dataIndex: 'checkOut',
        align: 'center'
    },
    {
        title: 'Price per Night',
        dataIndex: 'price',
        align: 'center'
    },
    {
        title: 'Action',
        key: 'action',
        align: 'center',
        render: () => (
            <Space size="middle">
                <a>Edit</a>
                <Dropdown menu={{
                    items
                }}>
                    <a>
                        <Space>
                            More actions
                            <DownOutlined/>
                        </Space>
                    </a>
                </Dropdown>
            </Space>
        )
    }
  ]

  const data = [
    {
        key: 1,
        no: 101,
        type: 'Single Room',
        checkIn: '01/10/2023',
        checkOut: '04/10/2023',
        price: 'USD 120'
    },
    {
        key: 2,
        no: 103,
        type: 'Double Room',
        checkIn: '02/10/2023',
        checkOut: '05/10/2023',
        price: 'USD 200'
    }
  ]

  return (
    <>
        <Typography.Title level={3}>Reservation Detail</Typography.Title>
        <div className={styles["infos-container"]}>
            <div className={styles.infos}>
                <div className={styles['info-datas']}>
                    <Typography.Text>Reservation ID</Typography.Text>
                    <Typography.Text>Name</Typography.Text>                    
                    <Typography.Text>Phone No</Typography.Text>            
                    <Typography.Text>Email</Typography.Text>                    
                    <Typography.Text>Address</Typography.Text>                 
                    <Typography.Text>Number of guests</Typography.Text>               
                </div>
                <div className={styles['info-datas']}>
                    <Typography.Text>: 0001</Typography.Text>
                    <Typography.Text>: Mg Mg</Typography.Text>
                    <Typography.Text>: +95 9788676754</Typography.Text>
                    <Typography.Text>: mgmg@gmail.com</Typography.Text>
                    <Typography.Text>: Mandalay</Typography.Text>
                    <Typography.Text>: 5</Typography.Text>
                </div>
            </div>
            <div className={styles.infos}>
                <div className={styles['info-datas']}>
                    <Typography.Text>Check-in Date</Typography.Text>
                    <Typography.Text>Check-out Date</Typography.Text>                    
                    <Typography.Text>Total length of stay</Typography.Text>            
                    <Typography.Text>Total Room</Typography.Text>                    
                    <Typography.Text>Total Cost</Typography.Text>            
                </div>
                <div className={styles['info-datas']}>
                    <Typography.Text>: 01/10/2023</Typography.Text>
                    <Typography.Text>: 05/10/2023</Typography.Text>
                    <Typography.Text>: 3</Typography.Text>
                    <Typography.Text>: 6</Typography.Text>
                    <Typography.Text>: USD 1200</Typography.Text>
                </div>
            </div>
        </div>
        <Table columns={columns} dataSource={data} />
        <div className={styles["guest-info"]}>
            <Typography.Title level={4} className={styles["guest-info-title"]}>Guest Request</Typography.Title>
            <Typography.Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, perspiciatis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, officiis?</Typography.Paragraph>
        </div>
    </>
  )
}

export default Detail