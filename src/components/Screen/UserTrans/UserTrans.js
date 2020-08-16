import React, { useEffect, useContext, useState } from 'react';
import { message, Table, Tag, Space , Button} from 'antd';
import { UseContext } from '../../../App';
import tranApi from '../../../api/transactionApi';
import Loading from '../../Common/Loading';
import './UserTrans.css'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom';

function Trans() {
    const [loading, setLoading] = useState(false);
    const {state, dispatch} = useContext(UseContext);
    const [data, setData] = useState([])
    const [subdata,setSubData] = useState([]);
    moment.locale("vi");

    useEffect(()=>{
      setLoading(true)
        tranApi.gettran()
        .then(response => {
            setLoading(false)
            setData(response.data.trans)
        })
        .catch(err => {
            message.error(err.response ? err.response.data.error : "Loading failed")
        })        
    },[])

    const onChangeComplete = (bookid) =>{
      tranApi.complete(bookid)
      .then(response =>{
        // setLoading(false)
        setData(response.data.trans)
        // message.success(response.data ?  response.data.message : "Trả sách thành công")
        console.log(data)
      }).catch(err => {
        // console.log(err.response)
        message.error(err.response ? err.response.data.error : "Loading failed")
    }) 
    }

    
    

    let a = []
    data.map(item => {
      return (
      item ? item.bookRent.map(i => {
        const b = {
          bookId: i.bookId._id,
          titleBook: i.bookId.title,
          isComplete : i.isComplete,
          dateRent : i.dateRent,
          picBook: i.bookId.coverUrl
          } 
            a.push(b)
          }) : '' )
  })
    
    // useEffect(()=>{
      
      
    // })

    const columns = [
      {
        title: 'Ảnh',
        dataIndex: 'picBook',
        key: 'picBook',
        render: picBook => <img src={picBook} className="picbook"/>,
        
      },
      {
        title: 'Sách mượn',
        dataIndex: 'titleBook',
        key: 'titleBook',
        
      },
      {
        title: 'Ngày mượn',
        dataIndex: 'dateRent',
        key: 'dateRent',
        render: dateRent => 
        <>
          {
            moment(dateRent).format('L')
          }
        </>
      },
      {
        title: 'Trạng thái',
        dataIndex: 'isComplete',
        key: 'isComplete',
        render: isComplete => 
          <>
            {
              isComplete ? <Tag color='geekblue'>Đã trả</Tag> : <Tag color='volcano'>Chưa trả</Tag>
            }
          </>
      },
      {
      title: 'Action',
      key: 'action',
      render: (isComplete, record) => (
        <Space size="middle">
          <Button  disabled={record.isComplete} onClick={()=>onChangeComplete(record.bookId)}>Trả sách</Button>
        </Space>
      ),
    }
    ];   
    
    useEffect(()=>{
      
        setSubData(a)
     
    },[data])
    
    const title = state ? state.name : "Tài khoản"
      return (
        <>
        <div style={{width: "100%", clear:"both"}}>
        {
          loading ? <Loading />
          :        
          <>
              <Table columns={columns}
                     dataSource={subdata} 
                     size="middle"
                     title={() => <h4>{title}</h4>}
                     bordered
                     pagination={{
                      pageSize: 5
                    }}
                     rowKey={record => record._id}
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


