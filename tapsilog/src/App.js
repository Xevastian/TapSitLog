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
import OTCPayementPage from './pages/userPages/paymentPages/OTCPayementPage.js';
import Gcash from './pages/userPages/paymentPages/onlineOptionsPage/gcash.js';
import Bank from './pages/userPages/paymentPages/onlineOptionsPage/onlineBank.js';
import BarcodeScanner from './pages/adminPages/menuPages/readQRPage.js';
import Receipt from './pages/userPages/paymentPages/onlineOptionsPage/eReceipt.js';

function App() {
  return <Routes>
    <Route path='/:id/order' element={<OrderPage/>}/>
    <Route path='/:id/order/:orderID' element={<CartPage/>}/>
    <Route path='/:id/order/:orderID/payment' element={<PayementPage/>}/>
    <Route path='/:id/order/:orderID/payment/gcsh' element={<Gcash/>}/>
    <Route path='/:id/order/:orderID/payment/crdt' element={<Bank/>}/>
    <Route path='/:id/order/:orderID/payment/rcpt' element={<Receipt/>}/>
    <Route path='/:id/order/:orderID/payment/otc' element={<OTCPayementPage/>}/>
    <Route path='/menu' element={<MenuPage />}/>
    <Route path='/menu/setup' element={<SetupOrdersPage />}/>
    <Route path='/menu/counter' element={<CounterPage />}/>
    <Route path='/menu/counter/read-qr' element={<BarcodeScanner />}/>
    <Route path='/menu/pending-orders' element={<SaleSummaryPage />}/>
    <Route path='/menu/generate-qr' element={<GenerateQrPage />}/>
    <Route path="/" element={<LandingPage />}/>

  </Routes>
}


export default App;