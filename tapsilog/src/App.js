import { React } from 'react';
import {Route,Routes} from 'react-router-dom';
import './App.css';
import MenuPage from './pages/adminPages/menuPage.js';
import LandingPage from './pages/adminPages/landingPage.js';
import GenerateQrPage from './pages/adminPages/menuPages/generateQrPage.js';
import SaleSummaryPage from './pages/adminPages/menuPages/PendingOrderPage.js';
import CounterPage from './pages/adminPages/menuPages/counterPage.js';
import SetupOrdersPage from './pages/adminPages/menuPages/setupOrdersPage.js';
import OrderPage from './pages/userPages/orderPage.js';
import CartPage from './pages/userPages/cartPage.js';
import PayementPage from './pages/userPages/payementPage.js';


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
    <Route path='/menu/pending-orders' element={<SaleSummaryPage />}/>
    <Route path='/menu/generate-qr' element={<GenerateQrPage />}/>
    <Route path="/" element={<LandingPage />}/>
  </Routes>
}

export default App;
