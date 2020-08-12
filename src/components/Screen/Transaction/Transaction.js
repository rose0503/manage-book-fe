import React, { useEffect, useState} from 'react';
import {message } from 'antd';
import {Link, useHistory} from 'react-router-dom'
import Loading from '../../Common/Loading'
import tranApi from '../../../api/transactionApi';
import { Table } from 'antd';

function Trans() {
  const [data,setData] = useState([])
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  useEffect(()=>{
    setLoading(true)
    tranApi.alltran()
    .then(response =>{
      setLoading(false)
      setData(response.data.trans)
    }).catch(error =>{
        message.error("Loading fail")
    })
  },[])


  const columns = [
  {
    title: 'Tài khoản',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Sách mượn',
    dataIndex: 'book',
    key: 'book',
    render: book => (
      <>
        {book.map((b, i) => {
          return (
            <ul key={i}>
              <li>{b.title}</li>
            </ul>
          );
        })}
      </>
    ),
  },
  {
    title: 'Tổng sách',
    dataIndex: 'tong',
    key: 'tong',
  },
  {
    title: 'Action',
    key: 'action',
  },
  ];

  const d =  data.map(item => ({
      key: item._id,
      name: item.userId.name,
      book: item.bookRent.map(i => ({title: i.bookId.title})),
      tong: item.bookRent.length
    }) 
  )
    
    return (
      <>
      {/* <FiltersBook onSubmit={handleChangeFilter} /> */}
      <div style={{width: "80%", clear:"both"}}>
      {
        loading ? <Loading />
        :        
        <>
            <Table columns={columns} dataSource={d} size="middle"/>
        </>
                  
      }
      </div>     
      </>
    );
  }

const  Transaction = () =>{
  return (
    <>
      <div className="container p-5">
        <div className="d-flex justify-content-between">
          <h2 className="mb-4"> Danh sách thuê</h2>
        </div>
                  
        {Trans()}
      </div>
    </>
  )
}
  
  export default Transaction;