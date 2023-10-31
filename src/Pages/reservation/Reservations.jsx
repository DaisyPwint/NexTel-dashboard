import { Input, Table, Typography, Space, Button, Dropdown, theme, Divider, Form, DatePicker, Select } from "antd"
import { useState } from "react";
import styles from './reservation.module.css';
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";

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

  const contentStyle = {
    padding: "15px",
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      filteredValue: [searchText],
      onFilter: (value,record) => {
        return (
          String(record.id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.room).toLowerCase().includes(value.toLowerCase())
        )
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      align: "center",      
    },
    {
      title: 'Total Room',
      dataIndex: 'room',
      align: "center",      
    },
    {
      title: 'Check-in',
      dataIndex: 'checkIn',
      align: "center",    
    },
    {
      title: 'Check-out',
      dataIndex: 'checkOut',
      align: "center",    
    },
    {
      title: 'Reservation Date',
      dataIndex: 'reservationDate',
      align: "center",  
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
      render: () => (
        <a href="/reservation-detail" style={{textDecoration:'underline'}}>Detail</a>
      )     
    }
  ]

  const data = [
    {
      id:'001',
      name: 'Mg Mg mgmg@gmail.com',
      room: 6,
      checkIn:  '01/10/2023 11:00 PM',
      checkOut: '05/10/2023 11:00 PM',
      reservationDate: '05/10/2023 11:00 PM',
      status: 'Pending'
    },
    {
      id:'002',
      name: 'Su Su susu@gmail.com',
      room: 3,
      checkIn:  '03/10/2023 11:00 PM',
      checkOut: '04/10/2023 11:00 PM',
      reservationDate: '01/10/2023 11:00 PM',
      status: 'Pending'
    },
    {
      id:'003',
      name: 'Hla Hla hlahla@gmail.com',
      room: 2,
      checkIn:  '02/10/2023 11:00 PM',
      checkOut: '05/10/2023 11:00 PM',
      reservationDate: '05/10/2023 11:00 PM',
      status: 'Confirmed'
    }
  ]

  const onFinish = (fieldsValue) => {
    const values = {
      'status': fieldsValue['status'],
      'reserve-date-picker': fieldsValue['reserve'] ? fieldsValue['reserve'].format('DD/MM/YYYY') : null,
      'in-date-picker': fieldsValue['in-date-picker'] ? fieldsValue['in-date-picker'].format('DD/MM/YYYY') : null,
      'out-date-picker': fieldsValue['out-date-picker'] ? fieldsValue['out-date-picker'].format('DD/MM/YYYY') : null
    }
    
    const filteredValues = data.filter((record) => {
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
    <Table columns={columns} bordered dataSource={filteredData || data} />
    </>
  )
}

export default Reservations