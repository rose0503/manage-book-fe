import React, {  useContext } from 'react';
import {
  CloseOutlined
} from '@ant-design/icons';
import { Button, message } from 'antd';
import { CartContext } from '../../../hooks/cartContext';
import './Cart.css'
import { UseContext } from '../../../App';
import { useHistory } from 'react-router-dom';
import cartApi from '../../../api/cartApi';


const Cart = () =>{
    const { state, dispatch } = useContext(UseContext);
    const { cartItems, removeAll, setCartItems} = useContext(CartContext)
    const history = useHistory();

    const rentBook = () => {
      if(!state){
        message.warning('Bạn phải đăng nhập để thuê')
        history.push('/signin')
      }else{
        let newarr = []
        cartItems.map(item => {
          const itemsub = item._id;
          newarr.push(itemsub)
        })

        const data = {
          userId: state._id,
          listCart: newarr
        }
        cartApi.addcart(data)
        .then(response => {
          message.success(response.data.message)
          history.push('/usertrans')
          setCartItems([])
          localStorage.removeItem("cart");
       })
       .catch(err => {
          message.error(err.response.data.error || "Thuê sách thất bại")
       })
      }
    }
    return (
      <>
      
        <div className="container p-5">
          <div className="d-flex justify-content-center">
            <h2 className="mb-4">Giỏ hàng</h2>
          </div>
          <Button disabled={!cartItems.length} onClick={()=>rentBook()}>Thuê sách</Button>
          <Button disabled={!cartItems.length} onClick={()=>removeAll()}>Xóa tất cả</Button>
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
                                <div className="text-truncate" style={{width: "180px"}}>
                                  {item.title} 
                                </div> 
                              </h5>
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