import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Product from "./pages/Product"
import ProductList from "./pages/ProductList"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"


const App = () => {
  const user = useSelector(store => store.user.currentUser)

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route exact path='/' element={<Home />} />

        <Route path='/products'>
          <Route index element={<ProductList />} />
          <Route path=':category' element={<ProductList />} />
        </Route>

        <Route path='/product/:id' element={<Product />} />

        <Route path='/cart' element={<Cart />} />

        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to='/' /> : <Register />} />

        <Route path='/payment/checkout' element={<Checkout />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
