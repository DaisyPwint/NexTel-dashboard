import { Table, Input, Typography, Button, Dropdown, theme, Space, Divider, Form, Select, Popconfirm, InputNumber} from 'antd';
import { useState } from 'react';
import styles from '../room.module.css';
import { PlusOutlined, FilterOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllRooms } from '../../features/room-type/roomSlice';

const option1 = [
  {
    value: 'single',
    label: 'Single',
  },{
    value: 'double',
    label: 'Double',
  },{
    value: 'suite',
    label: 'Suite',
  },{
    value: 'family',
    label: 'Family',
  },
]

const option2 = [
  {
    value: 1,
    label: 1,
  },{
    value: 2,
    label: 2,
  },{
    value: 3,
    label: 3,
  },{
    value: 4,
    label: 4,
  },
]

const option3 = [
  {
    value: 'occupied',
    label: 'Occupied',
  },{
    value: 'available',
    label: 'Available',
  }
]

const EditableCell = ({
  editing,dataIndex,title,inputType,record,index,children,...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>
  return (
    <td {...restProps}>
      {
        editing ? (
          <Form.Item name={dataIndex} rules={[{
            required: true,
            message: `Please input ${title}!`
          }]} style={{marginBottom: 0}}>
            {inputNode}
          </Form.Item>
        ) : (
          children
        )
      }
    </td>
  )

}

const { useToken } = theme;

const AllRooms = () => {
  const [searchText,setSearchText] = useState("");
  const { token } = useToken();
  const [form] = Form.useForm();
  const [filteredData,setFilteredData] = useState(null);
  const [onFilter,setOnfilter] = useState(false);
  const [editingKey,setEditingKey] = useState('');
  
  const roomRequests = useSelector(selectAllRooms);
  const [data,setData] = useState(roomRequests);
  const navigate = useNavigate();

  const isEditing = (record) => record.id === editingKey;
  
  const contentStyle = {
    padding: "15px",
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
 
  const onFinish = (fieldsValue) => {
    const type = fieldsValue.type;
    const floor = fieldsValue.floor;
    const status = fieldsValue.status;
    const filterValues = data.filter(record => {
      const typeFilter = !type || record.type.toLowerCase().includes(type.toLowerCase());
      const floorFilter = !floor || record.floor === floor;
      const statusFilter = !status || record.status.toLowerCase() === status.toLowerCase();
      return typeFilter && floorFilter && statusFilter;
    })
    setFilteredData(filterValues);
    setOnfilter(false);
  }

  const edit = (record) => {
    form.setFieldsValue({
      no: '',
      type: '',
      floor: '',
      ...record
    })
    setEditingKey(record.id)
  }

  const cancel = () => {
    setEditingKey('');
  }

  const save = async (key) => {
    try{
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => item.id === key);
      if(index > -1){
        const item = newData[index];
        newData.splice(index,1,{
          ...item,
          ...row
        });
        setData(newData);
        setEditingKey('')
      }else{
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    }catch(errInfo){
      console.log('Validate Failed: ',errInfo);
    }
  }
  
  const columns = [
    {
      title: 'No',
      dataIndex: 'key', 
      align: "center",
      render: (_, record, index) => index + 1
    },
    {
      title: 'Room No',
      dataIndex: 'no',
      align: "center",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.no).toLowerCase().includes(value.toLowerCase())
        );
      },
      editable: true
    },
    {
      title: 'Room Type',
      dataIndex: 'type',
      align: "center",
      editable: true
    },
    {
      title: 'Floor',
      dataIndex: 'floor',
      align: "center",
      editable: true
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
      render: (_, record) => {
        const editable = isEditing(record);

        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.id)} style={{marginRight: 10}}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>          
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>Edit</Typography.Link>
          )
      }
    },
  ]; 

  const mergedColumns = columns.map(col => {
    if(!col.editable){
      return col;
    }
console.log(col);
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'no' ? 'number' : col.dataIndex === 'floor' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })
  
  return (
    <>
      <div className={styles.header}>
        <Typography.Title level={3}>Room Lists</Typography.Title>
        <div className={styles.action}>
          <Input.Search placeholder='Search Room Number' onSearch={(value) => {
            setSearchText(value);
          }} onChange={(e) => {
            setSearchText(e.target.value);
          }}
          />
          <Button type='primary' onClick={() => navigate('/add-room')}><PlusOutlined/> Add Room</Button>
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
                <Form.Item name="type" label="Room Type" style={{width: 200}}>
                  <Select options={option1} placeholder="Any"/>
                </Form.Item>
                <Form.Item name="floor" label="Floor" style={{width: 200}}>
                  <Select options={option2} placeholder="Any"/>
                </Form.Item>
                <Form.Item name="status" label="Status" style={{width: 200}}>
                  <Select options={option3} placeholder="Any Status"/>
                </Form.Item>
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
      <Form form={form} component={false}>
        <Table components={{
          body: {
            cell: EditableCell
          }
        }} columns={mergedColumns} dataSource={filteredData || data}/>          
      </Form>
    </>
  )
}

export default AllRooms