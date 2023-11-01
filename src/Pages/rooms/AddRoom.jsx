import { useState } from 'react';
import { Form,Row,Col,Select, InputNumber,Space,Button,Typography } from 'antd';
import styles from '../room.module.css';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined} from "@ant-design/icons";
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { addRoom } from '../../features/room-type/roomSlice';

const options = [
  {
    value: 'Single',
    label: 'Single',
  },{
    value: 'Double',
    label: 'Double',
  },{
    value: 'Suite',
    label: 'Suite',
  },{
    value: 'Family',
    label: 'Family',
  },
]

const AddRoom = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [showClickAdd,setShowClickAdd] = useState(false);
  const dispatch = useDispatch();

  const handleAdd = (field) => {
    form.validateFields([['rooms',field.name,'quantity'],['rooms',field.name,'type'],['rooms',field.name,'floor']]).then(() => {
      const numRooms = form.getFieldValue(['rooms',field.name,'quantity']);
      if(numRooms !== undefined && numRooms > 0){
        form.setFieldsValue({
          rooms: form.getFieldValue('rooms').map((room,index) => {
            if(index === field.key){
              const newLists = new Array(numRooms).fill({id: uuid(),number: null,type: room.type,floor: room.floor,status: 'Available'});
              return {...room,roomRequests: newLists}
            }
          return room
          })
        })
        setShowClickAdd(true);
      }
    })
  }

  const onFinish = (values) => {
    dispatch(addRoom(values.rooms[0].roomRequests));
    setShowClickAdd(false);
    navigate('/rooms')
  }

  return(
    <>
      <div className={styles['add-header']}>      
        <ArrowLeftOutlined onClick={() => navigate(-1)} /> 
        <Typography.Title level={3} className={styles['add-title']}>Add Room</Typography.Title>
      </div>
      <Form layout='vertical' name="dynamic_form_complex" initialValues={{
        rooms: [{}]
      }} form={form} className={styles['form-container']} onFinish={onFinish}  autoComplete='off'
      >
        <Form.List name="rooms">
      {(fields) => (
        <>
          {fields.map((field) => (
            <div key={field.key}>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item name={[field.name, 'quantity']} label="Quantity of Room" rules={[
                    {
                      required: true,
                      message: 'Please input room\'s quantity'
                    }
                  ]}>
                    <InputNumber min={1} placeholder='Enter quantity of room' style={{width: '100%'}}/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name={[field.name, 'type']} label="Room Type" rules={[
                    {
                      required: true,
                      message: 'Please input room\'s type'
                    }
                  ]}>
                      <Select options={options} placeholder="Select room type"/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name={[field.name, 'floor']} label="Floor" rules={[
                      {
                        required: true,
                        message: 'Please input room\'s floor'
                      }
                    ]}>
                      <InputNumber min={1} placeholder='Enter floor no' style={{width: '100%'}}/>
                  </Form.Item>
                </Col>
              </Row>
              {/* Nest Form.List */}
              <Form.List name={[field.name, 'roomRequests']}>
                {(subFields) => (
                  <>
                    <Form.Item className={styles['btn-group']}>
                      <Space>
                        <Button onClick={() => {
                          form.resetFields();
                          setShowClickAdd(false);
                        }}>Cancel</Button>
                        <Button type="dashed" onClick={() => handleAdd(field)}>
                          + Add 
                        </Button>
                      </Space>
                    </Form.Item>
                    {
                      showClickAdd && (
                        <Row gutter={24} style={{alignItems: 'center'}}>
                          <Col span={8}>
                            <Typography.Text>Room No</Typography.Text>
                          </Col>
                          <Col span={8}>
                          <Typography.Text>Room Type</Typography.Text>
                          </Col>
                          <Col span={8}>
                          <Typography.Text>Floor</Typography.Text>
                          </Col>
                        </Row>
                      )
                    }
                    {subFields.map((subField) => (
                      <Row gutter={24} key={subField.key}>
                        <Col span={8}>
                          <Form.Item
                              name={[subField.name, 'number']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Missing Room Number',
                                },
                              ]}
                              style={{marginBottom: 0}}
                            >
                              <InputNumber placeholder="Enter Room No" style={{width: '100%'}}/>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            name={[subField.name, 'type']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing Room Type',
                              },
                            ]}
                          >
                            <Select options={options} placeholder="Select Room Type" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            name={[subField.name, 'floor']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing Room floor',
                              },
                            ]}
                          >
                            <InputNumber placeholder="Enter Room Floor" style={{width: '100%'}}/>
                          </Form.Item>
                        </Col>
                      </Row>
                    ))}   
                    {
                      showClickAdd && (
                        <Form.Item className={styles['btn-group']}>
                          <Space>
                              <Button onClick={() => {
                          form.resetFields();
                          setShowClickAdd(false);
                        }}>Cancel</Button>
                              <Button type="primary" htmlType="submit">
                                Save 
                              </Button>
                          </Space>
                        </Form.Item>  
                      )
                    }                             
                  </>
                )}
              </Form.List>              
            </div>
          ))}
        </>
      )}
    </Form.List>
      </Form>
    </>
  )
}
  
export default AddRoom;