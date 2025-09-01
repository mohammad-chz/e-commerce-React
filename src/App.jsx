import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { CheckoutPage } from './Pages/CheckoutPage';
import { OrdersPage } from './Pages/OrdersPage';
import { TrackingPage } from './Pages/TrackingPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/orders' element={<OrdersPage />} />
        <Route path='/tracking' element={<TrackingPage />} />
      </Routes>
    </Router>
  )
}

export default App
