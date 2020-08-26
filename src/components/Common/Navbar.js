import React, {useState, useContext } from 'react'
import { Link, useHistory } from "react-router-dom"
import '../../App.css'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';
import {UserOutlined, ShoppingCartOutlined, ShopOutlined, AppstoreAddOutlined } from '@ant-design/icons'; 
import { Menu, Dropdown, Tooltip } from 'antd';
import { UseContext } from '../../App';
import {CartContext} from '../../hooks/cartContext'
  

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useContext(UseContext);
  const history = useHistory();
  const toggle = () => setIsOpen(!isOpen);
  const menu = (
    <Menu>
      <Menu.Item key="0" disabled>
        <h6 disabled>{state ? state.name : "Hello,"}</h6>
      </Menu.Item>
      <Menu.Item key="1" style={{margin:"-18px 0"}} disabled>
        <p disabled>{state ? state.email : "good day"}</p>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <Link to= "/profile">Thông tin cá nhân</Link>
      </Menu.Item>
      <Menu.Item key="4">
          <Link to= "/usertrans">Sách mượn</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5" 
        onClick={() => {
          localStorage.clear()
          dispatch({ type: "CLEAR" })
          history.push('/signin')}}
      >
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const cart = () => {
    return (
      <>
        <Link className="cart-container"  to='/cart'>
        <CartContext.Consumer>
          {({cartItems}) => <div className={cartItems.length=== 0 ? '' : `number-item-cart`}>{cartItems.length=== 0 ? '' : cartItems.length}</div>}
        </CartContext.Consumer> 
        <ShoppingCartOutlined className="cart-item"/>   
        </Link>
      </>
    )
  } 

  const shop = () => {
    if (state) {
    return (
      <>
        <Link className="shop-container" to='/myshop'>
              <Tooltip  title="Cửa hàng của bạn" >
                  <ShopOutlined />
              </Tooltip>
        </Link>
      </>
    )
    }
    else{
      return(
        <></>
      )
      
    } 
  }     

  const renderList = () => {
    if (state) {
        return (
          <div style={{display:"flex"}}>
            {
              state.isAdmin ?
              <div style={{display:"flex"}}>
                <h6 style={{marginRight:"10px"}}>Admin</h6>
                <Link className="shop-container"   to='/createbook'>
                  <Tooltip  title="Thêm sách" >
                    <AppstoreAddOutlined />
                  </Tooltip>
                </Link>
              </div>
              :
              <div style={{display:"flex", alignItems:"center"}}>
                <span style={{marginRight:"6px"}}>Chào {state.name},</span>
              </div>

            }
            
            <Dropdown className="hover-user" overlay={menu}>
              <a className="ant-dropdown-link " onClick={e => e.preventDefault()}>
                <UserOutlined className="icon-user"/>
              </a>
            </Dropdown>
          </div>
        )
    }else{
      return (
        <div style={{display:"flex"}}>
           
          <NavbarText className='link'  tag={Link} to='/signin'>Đăng nhập</NavbarText>
          <NavbarText className="link" tag={Link} to='/signup'>Đăng ký</NavbarText>
        </div>
      )
    }
  }

  return (
    <div>
      <div style={{padding: '0 !important'}}>
        <div className="top-navbar">
          <div>
              <NavbarBrand tag={Link} to="/">BOOKSTORE</NavbarBrand>
             
          </div>
          {renderList()}
        </div>
      </div>
      <Navbar color="light" light expand="md" style={{padding: ".5rem 0"}}>
        <NavbarBrand />
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to='/book'>Sách</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to='/transaction'>Giao Dịch</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to='/shop'>Cửa Hàng</NavLink>
            </NavItem>
            {state && 
            <NavItem>
                <NavLink tag={Link} to='/usertrans'>Sách Mượn</NavLink>
            </NavItem>}
        </Nav>
        {cart()} 
        {shop()}
            
          
        </Collapse>
      </Navbar>
    </div>
  );
}
export default NavBar;
