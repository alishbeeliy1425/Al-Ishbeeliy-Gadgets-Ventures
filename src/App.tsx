/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import AuthPage from './pages/Auth';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { SetupAlert } from './components/SetupAlert';

export default function App() {
  return (
    <BrowserRouter>
      <SetupAlert />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin" element={<Admin />} />
          <Route path="auth" element={<AuthPage />} />
        </Route>
      </Routes>
      <FloatingWhatsApp />
    </BrowserRouter>
  );
}

