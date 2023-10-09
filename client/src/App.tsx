import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Catalog from './Catalog';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import NotFound from './NotFound';
import RegistrationForm from './RegistrationForm';
import SignInForm from './SignInForm';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="catalog/:category" element={<Catalog />} />
        <Route path="catalog/teams/:teamId" element={<Catalog />} />
        <Route path="details/:productId" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="register" element={<RegistrationForm />} />
        <Route path="sign-in" element={<SignInForm />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
