import React, {useState} from 'react';
import {Card, Form, Input, Button, message } from 'antd';
import './Signup.css'
import { useRouter } from '../../../hooks/useRouter'
import  authApi from '../../../api/authApi'


const Signup = () => {  
  const [isValidForm, setIsValidForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onChangeFields = (_, allFields)=>{
    const isValid = allFields.every(
      field => field.errors.length === 0 && field.touched === true
    );
    setIsValidForm(isValid);
  }

  const onFinish = values => {
    setLoading(true);
    const {email, name, password} = values;
    authApi.registerUser(email, name, password)   
      .then(response=> {
        message.success(response.data.message);
        router.push("/signin", {email, password});
      }).catch(error => {
        message.error(error.response.data.error)
        setLoading(false)
      })
  
  };


  return (
    <div className="signup">
        <Card style={{ width: 340, textAlign:"center" }}>
            <h2 className="title">Register</h2>
            <Form 
              onFieldsChange={onChangeFields}
              onFinish={onFinish}
            >
            <Form.Item name="email" hasFeedback
             rules={[{required:true, message: "Vui lòng nhập email"},
                   {type: "email", message:"Email không hợp lệ."}]}>
                <Input className="form-input" placeholder="Email" />
            </Form.Item>

            <Form.Item name="name" hasFeedback 
                       rules={[{ required: true , message: "Vui lòng nhập tên "}]} 
            >
              <Input className="form-input" placeholder="Tên đầy đủ" />
            </Form.Item>
            <Form.Item name="password" hasFeedback 
                rules={[{ required: true, message: "Vui lòng nhập password"},
                        { min : 6, message:"Password tối thiểu 6 ký tự"}
                ]}>
              <Input.Password className="form-input" placeholder="Mật khẩu"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}
                        disabled={!isValidForm} className="btn-form" >
                  Đăng ký
                </Button>
            </Form.Item>
            </Form>
        </Card>
    </div>    
  );
};


export default Signup;