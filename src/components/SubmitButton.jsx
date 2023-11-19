import { useEffect, useState } from 'react';
import { Button, Form} from 'antd';

const SubmitButton = ({ form }) => {
    const [submittable, setSubmittable] = useState(false);
  
    // Watch all values
    const values = Form.useWatch([], form);
    useEffect(() => {
      form
        .validateFields({
          validateOnly: true,
        })
        .then(
          () => {
            setSubmittable(true);
          },
          () => {
            setSubmittable(false);
          },
        );
    }, [form,values]);
    return (
      <Button type="primary" htmlType="submit" disabled={!submittable}>
        Reset Password
      </Button>
    );
  };

export default SubmitButton;