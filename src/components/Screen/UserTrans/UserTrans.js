import React, { useEffect, useContext, useState } from 'react';
import { message, Table } from 'antd';
import { UseContext } from '../../../App';
import tranApi from '../../../api/transactionApi';
import Loading from '../../Common/Loading';

function Trans() {
    const [loading, setLoading] = useState(false);
    const {state, dispatch} = useContext(UseContext);
    const [data, setData] = useState([])

    useEffect(()=>{
        tranApi.gettran()
        .then(response => {
            setData(response.data.trans)
        })
        .catch(err => {
            message.error(err.response ? err.response.data.error : "Loading failed")
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
      const title = data.map(item => {
        return(
            item.userId.name
        )
    })
      return (
        <>
        <div style={{width: "80%", clear:"both"}}>
        {
          loading ? <Loading />
          :        
          <>
              <Table columns={columns}
                     dataSource={d} 
                     size="middle"
                     title={() => title}
                     bordered
                />
          </>
                    
        }
        </div>     
        </>
      );
}
  



function UserTrans() {
    return (
        <>
        <div className="container p-5">
          <div className="d-flex justify-content-between">
            <h2 className="mb-4"> Sách mượn</h2>
          </div>
                    
          {Trans()}
        </div>
      </>
    );
}

export default UserTrans;


