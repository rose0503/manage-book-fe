import React, { useState, useEffect, useContext } from 'react';
import { Button, Input, message  } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import shopApi from '../../../api/shopApi';
import { UseContext } from '../../../App';

const Render = () =>{
    const [loading, setLoading] =useState(false);
    const [visible, setVisible] = useState(false);
    const [name, setName] =useState('');
    const [data, setData] = useState(null);
    const {state, dispatch } = useContext(UseContext);
    

    const showModal = () => {
        setVisible(true)
          
      };
    
    const handleOk = () => {
        setLoading(true)
    
        shopApi.createshop(name)
          .then(response =>{
            setLoading(false)
            setVisible(false)
            // setData(response.data.newShop)
            localStorage.setItem("user",JSON.stringify({...state, shopOwner:response.data.newShop}));
            dispatch({type:"SHOP",payload:response.data.newShop})
            message.success(response.data.message)
          }).catch(error =>{
            setLoading(true)
              message.error(error.response.data.error || "Tạo thất bại")
          })
    };

    useEffect(()=>{
        
    })

    const handleCancel = () => {
        setVisible(false)
    };  
    const shop = state ?  state.shopOwner.status : '' ;


    return (
    <>
        {
            !shop ? 
        <>
            <div className="shop">
                <h5  className="mb-4">Hiện tại, bạn chưa có cửa hàng!
                    <div>
                        <h6 style={{margin:"10px"}}>Hãy tạo store nào.</h6>
                        <Button onClick={showModal}>Đăng ký Store</Button>
                    </div>
                </h5>
            </div>
            <Modal
                visible={visible}
                title="Tạo cửa hàng"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                            Quay Lại
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    Tạo
                    </Button>,
                ]}
                >
                <div style={{display:"flex"}}>
                    <label htmlFor="name" style={{width: "24%"}}>Tên cửa hàng:</label>
                    <Input id="name" placeholder="Vui lòng nhập tên cửa hàng" onChange={(e)=>setName(e.target.value)} />
                </div>
                
            </Modal>
        </>
        :
        <>
            <div className="shop">
                {state.shopOwner.name}
            </div>
        </>
        }
        </>
    )
}

function MyShop() {
    return (
        <div className="container p-5">
            <div className="d-flex justify-content-center">
                <h2 className="mb-4">Cửa hàng của bạn</h2>
            </div>
            {Render()}  
        </div>
    );
}

export default MyShop;