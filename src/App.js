import './App.css';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from './Pages/CartPage';
import Checkout from './Pages/CheckOut';
import ProductDetailsPage from './Pages/ProductDetailsPage';
//import Protected from './features/auth/components/protected';
import Protected from './features/auth/components/protected';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authslice';
import { fetchItemsByUserIdAsync } from './features/cart/CartSlice';
import PageNotfound from './Pages/404';
import OrderSuccessfullPage from './Pages/OrderSuccessfullPage';
import UserOrdersPage from './Pages/userOrdersPage';
import UserProfilePage from './Pages/userProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import AdminHome from './Pages/Admin-Home';
import ProtectedAdmin from './features/auth/components/protectedAdmin';
import AdminProductDetailsPage from './Pages/AdminProductDetailsPage';
import AdminProductFormPage from './Pages/AdminProductFormPage';
import AdminOrdersPage from './Pages/AdminOrdersPage';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};


const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected>
      <Home />
    </Protected>),
  },
  {
    path: "/Login",
    element: <LoginPage />,
  },
  {
    path: "/SignUp",
    element: <SignUpPage />,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: "/Cart",
    element: <Protected><CartPage /></Protected>,
  },
  {
    path: "/Checkout",
    element: <Protected><Checkout /></Protected>,
  },
  {
    path: "/admin",
    element: <ProtectedAdmin><AdminHome /></ProtectedAdmin>,
  },
  
  {
    path: "/Product-Details/:id",
    element: <Protected><ProductDetailsPage /></Protected>,
  },
  {
    path: "/admin/Product-Details/:id",
    element: <ProtectedAdmin><AdminProductDetailsPage /></ProtectedAdmin>,
  },
  {
    path: "/admin/Product-Form",
    element: <ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>,
  },
  {
    path: "/admin/orders",
    element: <ProtectedAdmin><AdminOrdersPage /></ProtectedAdmin>,
  },
  {
    path: "/admin/Product-Form/edit/:id",
    element: (<ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>),
  },
  {
    path: "/order-succefull/:id",
    element: (
      <Protected>
        <OrderSuccessfullPage></OrderSuccessfullPage>{' '}
      </Protected>
  ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
      <UserOrdersPage></UserOrdersPage>{' '}

      </Protected>
  ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>{' '}
      </Protected>
    ),
  },
  {
    path: "*",
    element: <PageNotfound></PageNotfound>,
  },
]);


function App() {
const dispatch = useDispatch();
const user = useSelector(selectLoggedInUser)

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  },[dispatch,user])
  return (
    <div className="App">
        <Provider template={AlertTemplate} {...options}>
    <RouterProvider router={router} />    
    </Provider>
    </div>
  );
}

export default App;
