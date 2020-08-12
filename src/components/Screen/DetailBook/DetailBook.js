import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import bookApi from '../../../api/bookApi';
import './Detail.css'
import { message } from 'antd';
import Loading from '../../Common/Loading';

function DetailBook() {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const {bookid} = useParams();
    useEffect(()=>{       
        setLoading(true) 
        bookApi.getbook(bookid)
         .then(response => {
            setLoading(false)
            setData(response.data.book)
            console.log(response.data)
         }).catch(error=>{
             message.error("Loading book failed")
         })
    },[])
    return (
    <>
        {
            loading ? <Loading />
            :
        <div>
           <div className="container p-5">
                <div className="d-flex justify-content-center">
                    <h2 className="mb-4"> {data.title}</h2>
                </div>
                <div className="content-book">
                    <img className="img-book" src={data.coverUrl} alt={data.title}/>
                    <div className="description-book">
                        <h6>Mô tả</h6>
                        <span>{data.description}</span>
                    </div>
                </div>    
            </div>
        </div>
    }
     </>
    );
   
}

export default DetailBook;