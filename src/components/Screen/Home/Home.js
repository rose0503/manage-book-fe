import React, { useEffect, useState} from 'react';
import {Button, message } from 'antd';
import {Link, useHistory} from 'react-router-dom'
import queryString from 'query-string'
import bookApi from '../../../api/bookApi';
import NotFound from '../../Common/NotFound';
import Loading from '../../Common/Loading'
import Pagination from '../Pagination/Pagination'
import FiltersBook from '../FiltersBook/FiltersBook';
import {CartContext} from '../../../hooks/cartContext'

function Home() {
  const [data,setData] = useState([])
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 4,
    _totalRow: 1
  })

  const [filters, setFilters] = useState({ 
    _limit: 6,
    _page: 1,
    title_like : ''
  })
  
  useEffect(()=>{
    setLoading(true)
    bookApi.allbook(filters)
    .then(response =>{
      setLoading(false)
      setData(response.data.books)
      setPagination(response.data.pagination)
    }).catch(error =>{
        message.error("Loading fail")
    })
  },[filters])

  function handlePageChange(newPage){
      setFilters({
        ...filters,
        _page: newPage,

      })
    };  

  function handleChangeFilter(newFilter){
      setFilters({
        ...filters,
        _page: 1,
        title_like: newFilter.searchbook
      })
  }
    return (
      <>
      {
        data ?
        <>
          <FiltersBook onSubmit={handleChangeFilter} />
          <div style={{display: "flex", justifyContent:"center", clear:"both", marginBottom: "2rem"}}>
          <div className="row">
          {
            loading ? <Loading />
            :
            data.map((item, i) =>{
              return (
                <>
                
                <div className="item-list"  key={i} >
                  <div className="col-sm-6 col-md-4 col-lg-3">
                    <div id="card-hover" className=" card mb-3" style={{width: "210px", transition: "all 0.7"}}>
                        <img id="img-hover" src={item.coverUrl!== "NotFound" ? item.coverUrl : "https://res.cloudinary.com/quocviet0503/image/upload/v1596661882/default-book-icon_bcxisi.png"} 
                            style={{width: "200px", height: "250px"}}
                          className="card-img-top m-1" alt={item.title}/>
                        <div className="card-body">
                          <h5 className="card-title" style={{height: "48px !important"}}>
                            {item.title}  
                          </h5>
                          <div className="card-text">
                            <div className="text-truncate" style={{width: "180px"}}>
                              <span>{item.description}</span>
                            </div>
                          </div>
                          <div className="row">
                            <CartContext.Consumer>
                              {({addToCart}) =>
                                <button className="btn btn-primary m-1" onClick={()=>addToCart(item)}>
                                  Add to cart
                                </button>
                            }                       
                            </CartContext.Consumer>
                            <Link className="btn btn-primary m-1" to={`/book/${item._id}`}>
                              Chi tiết
                            </Link>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
            </>
            )})           
          }
          </div>
          </div>
          {
            !loading ? <Pagination  onPageChagne={handlePageChange} 
                    pagination={pagination} 
                    />
                  : ""  
          }
      </>
      : 
        <div className="no-cart cart">Hiện tại chưa có sách nào.</div>     
      
      }
      </>
    )}

const  Book = () =>{
  return (
    <>
      <div className="container p-5">
        <div className="d-flex" style={{flexDirection: "column", position: "relative"}}>
          <h2 className="mb-4"> Cửa hàng sách</h2>
          {Home()}
        </div>
                  
        
      </div>
    </>
  )
}
  
  export default Book;