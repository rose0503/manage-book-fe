import React, {useState, useMemo, useContext} from 'react';
import {Card, Form, Input, Button, message } from 'antd';
import './Signin.css'
import { useRouter } from '../../../hooks/useRouter'
import authApi from '../../../api/authApi';
import { UseContext } from '../../../App';


const Signin = () => {  
  const {state, dispatch} = useContext(UseContext);
  const [isValidForm, setIsValidForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues = useMemo(() => {
    const { email = "", password = "" } = router.state || {};
    if (email) setIsValidForm(true);
    return { email, password };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeFields = (_, allFields)=>{
    const isValid = allFields.every(
      field => field.errors.length === 0 && field.touched === true
    );
    setIsValidForm(isValid);
  }

  const onFinish = values => {
    setLoading(true);
    const {email, password} = values;
    authApi.signinUser(email, password)   
      .then(response=> {
        localStorage.setItem("jwt",response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch({type: "USER", payload: response.data.user})
        message.success(response.data.message);
        router.push("/");
      }).catch(error => {
        message.error(error.response.data.error)
        setLoading(false)
      })
  };

  
  return (
    <div className="Signin">
        <Card style={{ width: 340, textAlign:"center" }}>
            <h2 className="title">Login</h2>
            <Form 
              onFieldsChange={onChangeFields}
              onFinish={onFinish}
              initialValues={initialValues}
            >
            <Form.Item name="email" hasFeedback
             rules={[{required:true, message: "Vui lòng nhập email"},
                   {type: "email", message:"Email không hợp lệ."}]}>
                <Input className="form-input" placeholder="Email" />
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
                  Đăng nhập
                </Button>
            </Form.Item>
            </Form>
        </Card>
    </div>    
  );
};


export default Signin;