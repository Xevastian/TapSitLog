import { React } from 'react';
import { Route, Routes } from 'react-router-dom';
import MenuPage from './pages/adminPages/menuPage.js';
import LandingPage from './pages/adminPages/landingPage.js';
import GenerateQrPage from './pages/adminPages/menuPages/generateQrPage.js';
import SaleSummaryPage from './pages/adminPages/menuPages/PendingOrderPage.js';
import CounterPage from './pages/adminPages/menuPages/counterPage.js';
import OrderPage from './pages/userPages/orderPage.js';
import CartPage from './pages/userPages/cartPage.js';
import PayementPage from './pages/userPages/payementPage.js';
import PrivateRoute from './components/PrivateRoute.js';
import DashboardPage from './pages/adminPages/menuPages/dashboardPage.js';
import Menu from './pages/adminPages/menuPages/menu_Page.js';
import OTCPayementPage from './pages/userPages/paymentPages/OTCPayementPage.js';
import Gcash from './pages/userPages/paymentPages/onlineOptionsPage/gcash.js';
import Bank from './pages/userPages/paymentPages/onlineOptionsPage/onlineBank.js';
import Receipt from './pages/userPages/paymentPages/onlineOptionsPage/eReceipt.js';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/:id/order' element={<OrderPage/>}/>
      <Route path='/:id/order/:orderID' element={<CartPage/>}/>
      <Route path='/:id/order/:orderID/payment' element={<PayementPage/>}/>
      <Route path='/:id/order/:orderID/payment/gcsh' element={<Gcash/>}/>
      <Route path='/:id/order/:orderID/payment/crdt' element={<Bank/>}/>
      <Route path='/:id/order/:orderID/payment/rcpt' element={<Receipt/>}/>
      <Route path='/:id/order/:orderID/payment/otc' element={<OTCPayementPage/>}/>
      
      <Route path='/menu' element={<PrivateRoute><MenuPage /></PrivateRoute>} >
        
        <Route index element={<DashboardPage />} /> 

        <Route path='/menu/counter' element={<PrivateRoute><CounterPage /></PrivateRoute>} />
        <Route path='/menu/pending-orders' element={<PrivateRoute><SaleSummaryPage /></PrivateRoute>} />
        <Route path='/menu/generate-qr' element={<PrivateRoute><GenerateQrPage /></PrivateRoute>} />
        <Route path="/menu/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} /> 
        <Route path='/menu/menu_page' element={<PrivateRoute><Menu /></PrivateRoute>} /> 
      </Route>
    </Routes>
  );
}

export default App;
