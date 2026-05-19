import './App.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Notfound from './Components/Notfound/Notfound';
import Home from './Components/Home/Home';
import AuthContextProvider from './../context/AuthContext';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import AuthRoute from './Components/AuthRoute/AuthRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './../context/CartContext';
import Cart from './../ecommerce/Cart/Cart';
import Order from './Components/Order/Order';
import CategoryDetails from './Components/CategoryDetails/CategoryDetails';
import BrandsDetails from './Components/BrandsDetails/BrandsDetails';
import Products from './Components/Products/Products';
import AllOrders from './Components/AllOrders/AllOrders';
import Payment from './Components/Payment/Payment';
import { Offline } from 'react-detect-offline';

function App() {

  const client = new QueryClient()

  const router = createHashRouter([
    {path:'' , element:<Layout/> , children:[
      {index :true , element: <ProtectedRoute> <Home/> </ProtectedRoute>},
      {path:'home' , element: <ProtectedRoute> <Home/> </ProtectedRoute>},
      {path:'products' , element: <ProtectedRoute> <Products/> </ProtectedRoute>},
      {path:'categories' , element: <ProtectedRoute> <Categories/> </ProtectedRoute>},
      {path:'brands' , element: <ProtectedRoute> <Brands/> </ProtectedRoute>},
      {path:'cart' , element: <ProtectedRoute> <Cart/> </ProtectedRoute>},
      {path:'allorders' , element: <ProtectedRoute> <AllOrders/> </ProtectedRoute>},
      {path:'payment' , element: <ProtectedRoute> <Payment/> </ProtectedRoute>},
      {path:'productdetails/:id' , element: <ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
      {path:'categorydetails/:id' , element: <ProtectedRoute> <CategoryDetails/> </ProtectedRoute>},
      {path:'brandsdetails/:id' , element: <ProtectedRoute> <BrandsDetails/> </ProtectedRoute>},
      {path:'order' , element: <ProtectedRoute> <Order/> </ProtectedRoute>},
      {path:'register' , element: <AuthRoute> <Register/> </AuthRoute>},
      {path:'login' , element: <AuthRoute> <Login/> </AuthRoute>},
      {path:'*' , element: <Notfound/>},
    ]}
  ])


  return (
<>
<QueryClientProvider client={client}>

<AuthContextProvider>
  
  <CartContextProvider>
  <RouterProvider router={router}/>

  </CartContextProvider>

</AuthContextProvider>
</QueryClientProvider>

<Offline>

<div className='bg-black p-5 fixed text-white bottom-0 end-5'></div>
<h1>you are Offline!!</h1>
</Offline>






</>
    

  )
}

export default App
