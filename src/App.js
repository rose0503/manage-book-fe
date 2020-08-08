import React,{useEffect, createContext, Suspense, useContext, useReducer} from 'react';
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom"
import Navbar from './components/Common/Navbar'

import Signin from './components/Screen/Signin/Signin'
import User from './components/Screen/User'
import Transaction from './components/Screen/Transaction'
import Cart from './components/Screen/Cart/Cart'
import Loading from './components/Common/Loading'
import NotFound from './components/Common/NotFound'
import {reducer, initialState} from './hooks/useReducer'
import DetailBook from './components/Screen/DetailBook';
import Profile from './components/Screen/Profile';
import {CartProvider} from './hooks/cartContext';
const Signup = React.lazy(() => import('./components/Screen/Signup/Signup'))
const Home = React.lazy(() => import('./components/Screen/Home/Home'))

export const UseContext = createContext();

const Routing = () => {
  const history = useHistory();
  const {state, dispatch} = useContext(UseContext);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type: "USER", payload:user})
    }
    else{
          history.push('/')
    }
  },[])
  return(
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/signin'>
          <Signin/>
        </Route>
        <Route path='/signup'>
          <Signup/>
        </Route>
        <Route path='/user'>
          <User/>
        </Route>
        <Route path='/transaction'>
          <Transaction/>
        </Route>
        <Route path='/cart'>
          <Cart/>
        </Route>
        <Route path='/cart:bookid'>
          <Cart/>
        </Route>
        <Route path='/book/:bookid'>
          <DetailBook/>
        </Route>
        <Route path='/profile'>
          <Profile/>
        </Route>
        <Route component={NotFound} />
      </Switch>  
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="App">
      <CartProvider>
      <UseContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar/>
          <Suspense fallback={<Loading />}>
            <Routing />
          </Suspense>
      </BrowserRouter>
      </UseContext.Provider>
      </CartProvider>
    </div>
  );
}

export default App;
