import React, {  useContext } from 'react';
import {
  CloseOutlined
} from '@ant-design/icons';
import { Button, message } from 'antd';
import { CartContext } from '../../../hooks/cartContext';
import './Cart.css'
import { UseContext } from '../../../App';
import { useHistory } from 'react-router-dom';



const Cart = () =>{
    const { state, dispatch } = useContext(UseContext);
    const history = useHistory();
    const rentBook = () => {
      if(!state){
        message.warning('Bạn phải đăng nhập để thuê')
        history.push('/signin')
      }
    }
    return (
      <>
      
        <div className="container p-5">
          <div className="d-flex justify-content-center">
            <h2 className="mb-4">Giỏ hàng</h2>
          </div>
          <CartContext.Consumer>
              {({cartItems}) =>  <Button disabled={!cartItems.length} onClick={()=>rentBook()}>Thuê sách</Button>}
          </CartContext.Consumer>
          <CartContext.Consumer>
          {({removeAll, cartItems}) =>
              <Button disabled={!cartItems.length} onClick={()=>removeAll()}>Xóa tất cả</Button>
          }</CartContext.Consumer>
            <CartContext.Consumer>   
          {
            ({cartItems}) => 
              <>
              <div className={!cartItems.length === 0 ? "no-cart cart" : "row cart"}>
              {                
                cartItems.length !== 0 ? 
                cartItems.map((item, i) =>
                    <>
                    {
                      
                      <div className="item-list"  key={i} >
                      <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="card mb-3" style={{width: "210px", position: "relative"}}>
                            <CartContext.Consumer>
                              {({removeItem}) => <CloseOutlined  className="close-book" onClick={()=>removeItem(item)}/>
                              }                       
                            </CartContext.Consumer>
                            <img src={item.coverUrl!== "NotFound" ? item.coverUrl : "https://res.cloudinary.com/quocviet0503/image/upload/v1596661882/default-book-icon_bcxisi.png"} 
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
                            </div>
                        </div>
                      </div>
                    </div>
                  
                    }           
                    </>
                )
                : 
                  <h5 className="mb-4">Chưa có sản phẩm nào.</h5>
              }
              </div>
            </>        
          }                     
          </CartContext.Consumer>          
        </div>
      </>
    );
  }
  
export default Cart