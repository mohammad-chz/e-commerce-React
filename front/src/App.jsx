import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { CheckoutPage } from './Pages/Checkout/CheckoutPage';
import { OrdersPage } from './Pages/OrdersPage';
import { TrackingPage } from './Pages/TrackingPage';
import './App.css';
import NotFound from './Pages/NotFound';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [cartItems, setCartItems] = useState([])
  useEffect(() => {
    axios.get('api/cart-items?expand=product').then((response) => {
      setCartItems(response.data);
    })
  }, [])
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage cartItems={cartItems} />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/checkout' element={<CheckoutPage cartItems={cartItems} />} />
        <Route path='/orders' element={<OrdersPage />} />
        <Route path='/tracking' element={<TrackingPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
