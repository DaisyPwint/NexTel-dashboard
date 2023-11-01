import { Input, Table, Typography, Space, Button, Dropdown, theme, Divider, Form, DatePicker, Select } from "antd"
import styles from '../room.module.css';
import { useState } from "react";
import { FilterOutlined } from "@ant-design/icons";

const { useToken } = theme;
const options = [
  {
    value: 'single',
    label: 'Single',
  },{
    value: 'double',
    label: 'Double',
  },{
    value: 'family',
    label: 'Family',
  }
]

const OccupiedRooms = () => {
  const { token } = useToken();
  const [searchText,setSearchText] = useState("");
  const [onFilter,setOnfilter] = useState(false);
  const [filteredData,setFilteredData] = useState(null);

  const contentStyle = {
    padding: "15px",
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      filteredValue: [searchText],
      onFilter: (value,record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.phone).toLowerCase().includes(value.toLowerCase()) ||
          String(record.email).toLowerCase().includes(value.toLowerCase()) ||
          String(record.number).toLowerCase().includes(value.toLowerCase())
          )
      },
      align: 'center',
      render : (_,record,index) => index + 1
    },
    {
      title: 'Name',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      align: 'center'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center'
    },
    {
      title: 'Room No',
      dataIndex: 'number',
      align: 'center'
    },
    {
      title: 'Room Type',
      dataIndex: 'type',
      align: 'center'
    },
    {
      title: 'Check-in Date',
      dataIndex: 'checkIn',
      align: 'center'
    },
    {
      title: 'Check-out Date',
      dataIndex: 'checkOut',
      align: 'center'
    }
  ]

  const data = [
    {
      id: '001',
      name: 'Mg Mg',
      phone: '+95 9788676754',
      email: "mgmg@gmail.com",
      number: 113,
      type: "Single",
      checkIn: '01/10/2023',
      checkOut: '05/10/2023'
    },
    {
      id: '002',
      name: 'Aung Aung',
      phone: '+95 9788676754',
      email: "aungaung@gmail.com",
      number: 114,
      type: "Double",
      checkIn: '02/10/2023',
      checkOut: '05/10/2023'
    },
    {
      id: '003',
      name: 'Su Su',
      phone: '+95 9788676754',
      email: "susu@gmail.com",
      number: 115,
      type: "Family",
      checkIn: '01/10/2023',
      checkOut: '05/10/2023'
    },
  ]

  const onFinish = (fieldsValue) => {
    console.log(fieldsValue);
    const values = {
      'type': fieldsValue['type'],
      'in-date-picker': fieldsValue['in-date-picker'] ? fieldsValue['in-date-picker'].format('DD/MM/YYYY') : null,
      'out-date-picker': fieldsValue['out-date-picker'] ? fieldsValue['out-date-picker'].format('DD/MM/YYYY') : null,
    }

    const filteredValue = data.filter(record => {
      const typeFilter = !values.type || record.type.toLowerCase() === values.type.toLowerCase();

      const checkInDate = values['in-date-picker'];
      const checkOutDate = values['out-date-picker'];

      const checkInFilter = !checkInDate || record.checkIn.includes(checkInDate);
      const checkOutFilter = !checkOutDate || record.checkOut.includes(checkOutDate);

      return typeFilter && checkInFilter && checkOutFilter;
    })
    setFilteredData(filteredValue);    
    setOnfilter(false);
  }

  return (
    <>
      <div className={styles.header}>
      <Typography.Title level={3}>Occupied Room Lists</Typography.Title>
      <div className={styles.action}>
      <Input.Search placeholder="Search name,phone,email and room no" onSearch={(value) => {
          setSearchText(value);
        }} onChange={(e) => {
          setSearchText(e.target.value)
        }} style={{width: 250}}></Input.Search>
        <Dropdown trigger={['click']}
        open={onFilter}
        onOpenChange={open => setOnfilter(open)}
        dropdownRender={() => (
          <div style={contentStyle}>
            <Space>
              <Typography.Title level={4} style={{marginTop: '5px',marginBottom: 0}}>Filter Occupancy</Typography.Title>
            </Space>
            <Divider style={{margin: "20px 0"}}/>
            <Form layout="vertical" onFinish={onFinish}>
              <Space direction="vertical">
                  <Form.Item name="type" label="Room Type" style={{width: 160}}>
                    <Select options={options} placeholder="Any"/>
                  </Form.Item>
                  <Form.Item name="in-date-picker" label="Check-in date">
                    <DatePicker placeholder="Select check-in" format="DD/MM/YYYY"/>
                  </Form.Item>
                  <Form.Item name="out-date-picker" label="Check-out date">
                    <DatePicker placeholder="Select check-out" format="DD/MM/YYYY" />
                  </Form.Item>
                <Form.Item style={{textAlign: "right"}}>
                  <Space>
                    <Button htmlType="reset">Reset</Button>
                    <Button type="primary" htmlType="submit">
                      Filter
                    </Button>
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
      <Table columns={columns} dataSource={filteredData || data} />
    </>
  )
}

export default OccupiedRooms;