import { React } from 'react';
import {Route,Routes} from 'react-router-dom';
import './App.css';
import MenuPage from './pages/adminPages/menuPage';
import LandingPage from './pages/adminPages/landingPage';
import GenerateQrPage from './pages/adminPages/menuPages/generateQrPage';
import SaleSummaryPage from './pages/adminPages/menuPages/saleSummaryPage';
import CounterPage from './pages/adminPages/menuPages/counterPage';
import SetupOrdersPage from './pages/adminPages/menuPages/setupOrdersPage';
import OrderPage from './pages/userPages/orderPage';
import CartPage from './pages/userPages/cartPage';
import PayementPage from './pages/userPages/payementPage';

function App() {
  return <Routes>
    <Route path='/:id/order' element={<OrderPage/>}/>
    <Route path='/:id/cart' element={<CartPage/>}/>
    <Route path='/:id/cart/:cartID/payment' element={<PayementPage/>}/>
    <Route path='/:id/cart/:cartID/payment/online' element={<PayementPage/>}/>
    <Route path='/:id/cart/:cartID/payment/otc' element={<PayementPage/>}/>
    <Route path='/menu' element={<MenuPage />}/>
    <Route path='/menu/setup' element={<SetupOrdersPage />}/>
    <Route path='/menu/counter' element={<CounterPage />}/>
    <Route path='/menu/summary' element={<SaleSummaryPage />}/>
    <Route path='/menu/generate-qr' element={<GenerateQrPage />}/>
    <Route path="/" element={<LandingPage />}/>
  </Routes>
}

export default App;
