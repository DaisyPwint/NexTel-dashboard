import { Input, Table, Typography, Space, Button, Dropdown, theme, Divider, Form, DatePicker, Select } from "antd"
import { useEffect, useState } from "react";
import styles from './reservation.module.css';
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import { Link} from "react-router-dom";
import { useGetReservationsQuery } from "../../features/reservation/reserveApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { allReservation, setReservations } from "../../features/reservation/reserveSlice";

const options = [
  {
    value: 'single',
    label: 'Single',
  },{
    value: 'confirmed',
    label: 'Confirmed',
  },{
    value: 'canceled',
    label: 'Canceled',
  },{
    value: 'expired',
    label: 'Expired',
  },
]

const { useToken } = theme;

const Reservations = () => {
  const [searchText,setSearchText] = useState("");
  const { token } = useToken();
  const [filteredData,setFilteredData] = useState(null);
  const [onFilter,setOnfilter] = useState(false);
  const {data:data,isLoading,error} = useGetReservationsQuery();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const reservations = useSelector(allReservation);

  useEffect(() => {
    if(data){
      dispatch(setReservations(data));
    }
  },[dispatch,data])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const contentStyle = {
    padding: "15px",
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'reservationId',
      filteredValue: [searchText],
      onFilter: (value,record) => {
        return (
          String(record.reservationId).toLowerCase().includes(value.toLowerCase()) ||
          String(record.guestName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.guestEmail).toLowerCase().includes(value.toLowerCase()) ||
          String(record.totalRoom).toLowerCase().includes(value.toLowerCase())
        )
      }
    },
    {
      title: 'Guest',
      dataIndex: 'guestInfo',
      align: "center",      
      render: (_,record) => (
        <Space direction="vertical">
          <div>{record.guestName}</div>
          <div>{record.guestEmail}</div>
        </Space>
      )
    },
    {
      title: 'Total Room',
      dataIndex: 'totalRoom',
      align: "center",      
    },
    {
      title: 'Check-in',
      dataIndex: 'checkIn',
      align: "center",   
      render: (_,record) => (
        <Space direction="vertical">
          <div>{record.checkIn.date}</div>
          <div>{record.checkIn.time}</div>
        </Space>
      )
    },
    {
      title: 'Check-out',
      dataIndex: 'checkOut',
      align: "center",  
      render: (_,record) => (
        <Space direction="vertical">
          <div>{record.checkOut.date}</div>
          <div>{record.checkOut.time}</div>
        </Space>
      )    
    },
    {
      title: 'Reservation Date',
      dataIndex: 'createdAt',
      align: "center",  
      render: (_,record) => (
        <Space direction="vertical">
          <div>{record.createdAt.date}</div>
          <div>{record.createdAt.time}</div>
        </Space>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: "center",        
    },
    {
      title: 'Action',
      key: 'action',
      align: "center",
      render: () => (
        <Space size="middle" style={{ whiteSpace: 'nowrap' }}>
          <a>Confirm</a>
          <a>Cancel</a>
        </Space>
      )
    },
    {
      title: 'Detail',
      dataIndex: 'detail', 
      align: "center",
      render: (_,record) =>  (
          <Link to={record.id} style={{textDecoration: 'underline'}}>Detail</Link>
          )
    }
  ]

const trasformedData = reservations.map(item => {
  return {
    id: item.id,
    reservationId: item.reservationId,
    guestName: item.guestName.charAt(0).toUpperCase() + item.guestName.slice(1),
    guestEmail: item.guestEmail,
    totalRoom: 1,
    checkIn: {
      date: new Date(item.checkIn * 1000).toLocaleString('en-GB', { day: 'numeric',month: 'numeric',year: 'numeric' }),
      time: new Date(item.checkIn * 1000).toLocaleString('en-GB', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).replace(/\s/, ' ').toUpperCase(),
    },
    checkOut: {
      date: new Date(item.checkOut * 1000).toLocaleString('en-GB', { day: 'numeric',month: 'numeric',year: 'numeric' }),
      time: new Date(item.checkOut * 1000).toLocaleString('en-GB', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).replace(/\s/, ' ').toUpperCase(),
    },
    createdAt: {
      date: new Date(item.createdAt * 1000).toLocaleString('en-GB', { day: 'numeric',month: 'numeric',year: 'numeric' }),
      time: new Date(item.createdAt * 1000).toLocaleString('en-GB', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).replace(/\s/, ' ').toUpperCase(),
    },
    status: item.status.charAt(0) + item.status.slice(1).toLowerCase()
  }
})

  const onFinish = (fieldsValue) => {
    const values = {
      'status': fieldsValue['status'],
      'reserve-date-picker': fieldsValue['reserve'] ? fieldsValue['reserve'].format('DD/MM/YYYY') : null,
      'in-date-picker': fieldsValue['in-date-picker'] ? fieldsValue['in-date-picker'].format('DD/MM/YYYY') : null,
      'out-date-picker': fieldsValue['out-date-picker'] ? fieldsValue['out-date-picker'].format('DD/MM/YYYY') : null
    }
    
    const filteredValues = reservations.filter((record) => {
      const statusFilter = !values.status || record.status.toLowerCase() === values.status;
  
      const reserveDate = values['reserve-date-picker'];
      const checkInDate = values['in-date-picker'];
      const checkOutDate = values['out-date-picker'];
  
      const reserveFilter = !reserveDate || record.reservationDate.includes(reserveDate);
      const checkInFilter = !checkInDate || record.checkIn.includes(checkInDate);
      const checkOutFilter = !checkOutDate || record.checkOut.includes(checkOutDate);
      return statusFilter && reserveFilter && checkInFilter && checkOutFilter;
    });

    setFilteredData(filteredValues);    
    setOnfilter(false);
  };

  return (
    <>
    <div className={styles.header}>
      <Typography.Title level={3}>Reservation Lists</Typography.Title>
      <div className={styles.action}>
        <Input.Search placeholder="Search id,name and total room" onSearch={(value) => {
          setSearchText(value);
        }} onChange={(e) => {
          setSearchText(e.target.value)
        }} style={{width: 250}}></Input.Search>
        <Button type="primary" icon={<ReloadOutlined />}>Check Expired</Button>
        <Dropdown trigger={['click']}
        open={onFilter}
        onOpenChange={open => setOnfilter(open)}
        dropdownRender={() => (
          <div style={contentStyle}>
            <Space>
              <Typography.Title level={4} style={{marginTop: '5px',marginBottom: 0}}>Filter Reservation</Typography.Title>
            </Space>
            <Divider style={{margin: "20px 0"}}/>
            <Form layout="vertical" onFinish={onFinish}>
              <Space direction="vertical">
                <Space direction="horizontal">
                  <Form.Item name="status" label="Status" style={{width: 160}}>
                    <Select options={options} placeholder="Any status"/>
                  </Form.Item>
                  <Form.Item name="reserve" label="Reservation Date">
                    <DatePicker format="DD/MM/YYYY"/>
                  </Form.Item>
                </Space>
                <Space direction="horizontal">
                  <Form.Item name="in-date-picker" label="Check-in date">
                    <DatePicker placeholder="Select check-in" format="DD/MM/YYYY"/>
                  </Form.Item>
                  <Form.Item name="out-date-picker" label="Check-out date">
                    <DatePicker placeholder="Select check-out" format="DD/MM/YYYY" />
                  </Form.Item>
                </Space>
                <Form.Item style={{textAlign: "right"}}>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Filter
                    </Button>
                    <Button htmlType="reset">Reset</Button>
                  </Space>
                </Form.Item>
              </Space>
            </Form>
          </div>
        )}
        >
          <a onClick={(e) => e.preventDefault()}>
            <FilterOutlined style={{fontSize: "20px"}}/>
          </a>
        </Dropdown>
      </div>
    </div>
    <Table columns={columns} bordered dataSource={filteredData || trasformedData} />
    </>
  )
}

export default Reservations