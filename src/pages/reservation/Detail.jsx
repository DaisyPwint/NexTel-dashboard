import { Table, Typography, Space, Dropdown } from 'antd';
import styles from './detail.module.css';
// import { DownOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useGetReserveByIdQuery } from '../../features/reservation/reserveApiSlice';

const Detail = () => {
    const { id } = useParams();
    const {data: reservation,isLoading,error} = useGetReserveByIdQuery(id);
    console.log(reservation);

    if (isLoading) {
        return <div>Loading...</div>;
      }
    
    if (error) {
    return <div>Error: {error.message}</div>;
    }
    
//   const options =[
//     {
//         key: '1',
//         label: 'check-in'
//     },
//     {
//         key: '2',
//         label: 'check-out'
//     },
//     {
//         key: '3',
//         label: 'canceled'
//     }
//   ]
  
  const columns = [
    {
        title: 'Room No.',
        dataIndex: 'roomNumber',
        align: 'center'
    },
    {
        title: 'Room Type',
        dataIndex: 'roomType',
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
        dataIndex: 'pricePerNight',
        align: 'center'
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'center'
    },
    {
        title: 'Action',
        key: 'action',
        align: 'center',
        render: () => (
            <a>Edit</a>
        )
    }
  ]

//   const data = [
//     {
//         key: 1,
//         no: 101,
//         type: 'Single Room',
//         checkIn: '01/10/2023',
//         checkOut: '04/10/2023',
//         price: 'USD 120'
//     },
//     {
//         key: 2,
//         no: 103,
//         type: 'Double Room',
//         checkIn: '02/10/2023',
//         checkOut: '05/10/2023',
//         price: 'USD 200'
//     }
//   ]

const data = reservation?.reservedRooms.map(room => {
    return {
        id: room.id,
        roomNumber: room.roomNumber,
        roomType: room.roomType,
        checkIn: new Date(room.checkIn * 1000).toLocaleDateString('en-GB',{day: 'numeric',month: 'numeric',year: 'numeric'}),
        checkOut: new Date(room.checkOut * 1000).toLocaleDateString('en-GB',{day: 'numeric',month: 'numeric',year: 'numeric'}),
        pricePerNight: room.pricePerNight,
        status: room.status.charAt(0) + room.status.slice(1).toLowerCase()
    }
})
console.log(data);

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
                    <Typography.Text>: {reservation.reservationId}</Typography.Text>
                    <Typography.Text>: {reservation.guestName}</Typography.Text>
                    <Typography.Text>: {reservation.guestPhone}</Typography.Text>
                    <Typography.Text>: {reservation.guestEmail}</Typography.Text>
                    <Typography.Text>: {reservation.guestAddress}</Typography.Text>
                    <Typography.Text>: {reservation.numberOfGuest}</Typography.Text>
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
                    <Typography.Text>: {new Date(reservation.checkIn * 1000).toLocaleDateString('en-GB',{day: 'numeric',month: 'numeric',year: 'numeric'})}</Typography.Text>
                    <Typography.Text>: {new Date(reservation.checkIn * 1000).toLocaleDateString('en-GB',{day: 'numeric',month: 'numeric',year: 'numeric'})}</Typography.Text>
                    <Typography.Text>: {reservation.lengthOfStay}</Typography.Text>
                    <Typography.Text>: {reservation.totalRoom}</Typography.Text>
                    <Typography.Text>: USD {reservation.totalCost}</Typography.Text>
                </div>
            </div>
        </div>
        <Table columns={columns} dataSource={data} />
        <div className={styles["guest-info"]}>
            <Typography.Title level={4} className={styles["guest-info-title"]}>Guest Request</Typography.Title>
            <Typography.Paragraph>{reservation.specialRequest}</Typography.Paragraph>
        </div>
    </>
  )
}

export default Detail