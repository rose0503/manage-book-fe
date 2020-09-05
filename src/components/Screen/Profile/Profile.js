import React, { useEffect, useState } from 'react';
import profileApi from '../../../api/profileApi';
import { message } from 'antd';
import NotFound from '../../Common/NotFound';
import './Profile.css'
import { Tag, Divider } from 'antd';
import Loading from '../../Common/Loading'


const Render =() =>{
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false);


    useEffect(()=>{
        setLoading(true)
        profileApi.getuser()
         .then(response =>{
            setLoading(false)
            setData(response.data.user)
         })
         .catch(error=>{
            message.error("Loading fail")
        })

    },[])
    return(
        <>
        {
            data ? 
                <>
                {
                loading ? <Loading />
                :
                <>  
                    <div className="header-profile">
                        <div >
                            <div><img src={data.avatar} alt="avatar" /></div>
                        </div>
                        <div>
                            <div style={{marginBottom: "5px"}}>Họ và tên: 
                                <span>{data.name}</span>
                            </div>
                            <div style={{marginBottom: "5px"}}>Email: 
                                <span>{data.email}</span>
                            </div>
                            {
                                data.isAdmin ? 
                                <div style={{marginBottom: "5px"}}>Admin: 
                                    <span>True</span>
                                </div>
                                : <></>
                            }
                        </div>
                    </div>
                    <div>
                        <Divider orientation="left">Shop</Divider>
                    {
                        data.shopOwner ?
                            <>
                            <div className="shop-profile">
                                <div>
                                    Chủ shop: 
                                    <span>{data.shopOwner.name}</span>
                                    <Tag color="#108ee9">{data.shopOwner.status ? "Còn hoạt động" : "Đã đóng cửa"}</Tag>
                                </div>
                                <div>
                                    Tổng sách: 
                                    <span>{data.shopOwner.listBook.lenght ? data.shopOwner.listBook.lenght : "0"}</span>
                                </div>
                            </div>
                            <div className="container">
                                {
                                data.shopOwner.listBook.lenght > 0 ? 
                                <div className="book-profile">data</div>
                                : 
                                <div className="nobook-profile">Hiện chưa có sách</div>
                                }
                            </div>
                            </>
                        : 
                        <div>Hiện tại chưa có cửa hàng nào!</div>
                    }
                    </div>
                </>
                }
                </>
            :
            NotFound
        }
        </>
    )
}

function Profile() {
    return (
        <div className="container p-5 " style={{height: "500px"}}>
          <div className="d-flex justify-content-center">
            <h2 className="mb-4">Thông tin</h2>
          </div>
          <div className="profile">
            {Render()}
          </div>
        </div>
    );
}

export default Profile;