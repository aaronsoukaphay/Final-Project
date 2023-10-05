import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Catalog from './Catalog';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import NotFound from './NotFound';
import SignIn from './SignIn';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="catalog/:category" element={<Catalog />} />
        <Route path="catalog/teams/:teamId" element={<Catalog />} />
        <Route path="details/:productId" element={<ProductDetails />} />
        <Route path="cart/customer/:customerId" element={<Cart />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
