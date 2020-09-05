import React, { useEffect, useState, useContext} from 'react';
import {message, Tag, Button } from 'antd';
import {Link, useHistory} from 'react-router-dom'
import Loading from '../../Common/Loading'
import { Table } from 'antd';
import shopApi from '../../../api/shopApi';
import { UseContext } from '../../../App';

function Render() {
  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
    setLoading(true)
    shopApi.allshop()
    .then(response =>{
      setLoading(false)
      setData(response.data.shops)
    }).catch(error =>{
        message.error("Loading fail")
    })
  },[])


  const columns = [
  {
    title: 'Shop',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Shopkeeper',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Tổng sách',
    dataIndex: 'tong',
    key: 'tong',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: status => 
          <>
            {
              status ? <Tag color='geekblue'>Hoạt động</Tag> : <Tag color='volcano'>Đã đóng cửa</Tag>
            }
          </>
  },
  ];

  const d =  data.map(item => ({
      key: item._id,
      name: item.name ? item.name : "",
      username: item.userId ? item.userId.name  : "",
      //book: item.bookRent.map(i => ({title: i.bookId.title})),
      tong: item.listBook.length,
      status: item.status,
    }) 
  )
    
    return (
      <>
      <div className={!loading ? "" : "customheight"}>
      {/* <FiltersBook onSubmit={handleChangeFilter} /> */}
      <div style={{width: "100%", clear:"both"}}>
      {
        loading ? <Loading />
        :        
        <>
            <Table columns={columns} dataSource={d} size="middle"/>
        </>
                  
      }
      </div>    
      </div> 
      </>
    );
  }

const  Shop = () =>{
    const { state, dispatch } = useContext(UseContext)
  return (
    <>
      <div className="container p-5">
        <div className="d-flex justify-content-between">
          <h2 className="mb-4"> Danh sách cửa hàng</h2>
          {state && <Link to="/myshop"><Button>MyStore</Button></Link>}
        </div>
                  
        {Render()}
      </div>
    </>
  )
}
  
  export default Shop;