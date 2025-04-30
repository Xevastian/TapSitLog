import { React } from 'react';
import { Route, Routes } from 'react-router-dom';
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
import PrivateRoute from './components/PrivateRoute.js';
import DashboardPage from './pages/adminPages/menuPages/dashboardPage.js'; //new
import Menu_Page from './pages/adminPages/menuPages/menu_Page.js';//new
import InventoryPage from './pages/adminPages/menuPages/inventoryPage.js';//new
import SalesPage from './pages/adminPages/menuPages/salesPage.js'; //new

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/:id/order' element={<PrivateRoute><OrderPage /></PrivateRoute>} />
      <Route path='/:id/cart' element={<PrivateRoute><CartPage /></PrivateRoute>} />
      <Route path='/:id/cart/:cartID/payment' element={<PrivateRoute><PayementPage /></PrivateRoute>} />
      <Route path='/:id/cart/:cartID/payment/online' element={<PrivateRoute><PayementPage /></PrivateRoute>} />
      <Route path='/:id/cart/:cartID/payment/otc' element={<PrivateRoute><PayementPage /></PrivateRoute>} />
      <Route path='/menu' element={<PrivateRoute><MenuPage /></PrivateRoute>} />
      <Route path='/menu/setup' element={<PrivateRoute><SetupOrdersPage /></PrivateRoute>} />
      <Route path='/menu/counter' element={<PrivateRoute><CounterPage /></PrivateRoute>} />
      <Route path='/menu/pending-orders' element={<PrivateRoute><SaleSummaryPage /></PrivateRoute>} />
      <Route path='/menu/generate-qr' element={<PrivateRoute><GenerateQrPage /></PrivateRoute>} />
      <Route path="/menu/dashboard" element={<DashboardPage />} /> 
      <Route path='/menu/menu_page' element={<Menu_Page />} /> 
      <Route path='/menu/inventory' element={<InventoryPage />} /> 
      <Route path='/menu/sales' element={<SalesPage />} />
    </Routes>
  );
}

export default App;
