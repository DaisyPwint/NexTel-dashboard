import { Table, Input, Typography, Button} from 'antd';
import { useState } from 'react';
import styles from '../room.module.css';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllTypes } from '../../features/room-type/typeSlice';

const RoomType = () => {
  const [searchText,setSearchText] = useState("");
  const navigate = useNavigate();
  const types =useSelector(selectAllTypes);

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      align: "center",
      render: (_,record,index) => index + 1
    },
    {
      title: 'Room Type',
      dataIndex: 'name',
      align: "center",
      filteredValue: [searchText],
      onFilter: (value,record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase()) || String(record.capacity).toLowerCase().includes(value.toLowerCase()) || String(record.price).toLowerCase().includes(value.toLowerCase())
        )
      }
    },
    {
      title: 'Maximum Capacity',
      dataIndex: 'maximumCapacity',
      align: "center",
    },
    {
      title: 'Price per night',
      dataIndex: 'pricePerNight',
      align: "center",
    },
    {
      title: 'Room Size',
      dataIndex: 'size',
      align: "center",
    },
    {
      title: 'Action',
      key: 'action',
      align: "center",
      render: (_,record) => (
        <Link to={`/edit-room-type/${record.id}`} state={{record}}>Edit</Link>
      )
    }
  ]
  
  return (
    <>
      <div className={styles.header}>
        <Typography.Title level={3}>Room Type Lists</Typography.Title>
        <div className={styles.action}>
          <Input.Search placeholder='Search here...' onSearch={(value) => {
            setSearchText(value);
          }} onChange={(e) => {
            setSearchText(e.target.value);
          }}
          />
          <Button type='primary' onClick={() => navigate('/add-room-type')}><PlusOutlined/> Add Room Type</Button>
        </div>
      </div>
      <Table columns={columns} dataSource={types}/>
    </>
  )
}

export default RoomType