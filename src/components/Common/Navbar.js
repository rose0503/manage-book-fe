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
import {UserOutlined, ShoppingCartOutlined } from '@ant-design/icons'; 
import { Menu, Dropdown } from 'antd';
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
          <Link to= "/transaction">Sách thuê</Link>
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
        <div className="cart-container">
        <CartContext.Consumer>
          {({cartItems}) => <div className={cartItems.length=== 0 ? '' : `number-item-cart`}>{cartItems.length=== 0 ? '' : cartItems.length}</div>}
        </CartContext.Consumer> 
        <ShoppingCartOutlined className="cart-item"/>   
        </div>
      </>
    )
  }       

  const renderList = () => {
    if (state) {
        return (
          <>
            {cart()}         
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <UserOutlined className="icon-user"/>
              </a>
            </Dropdown>
          </>
        )
    }else{
      return (
        <>
          {cart()}  
          <NavbarText className='link'  tag={Link} to='/signin'>Đăng nhập</NavbarText>
          <NavbarText className="link" tag={Link} to='/signup'>Đăng ký</NavbarText>
        </>
      )
    }
  }
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/">BOOKSTORE</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to='/'>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/user">Users</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to='/transaction'>Transaction</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to={'/cart'}>My Cart</NavLink>
            </NavItem>
          </Nav>
          {renderList()}
        </Collapse>
      </Navbar>
    </div>
  );
}
export default NavBar;
