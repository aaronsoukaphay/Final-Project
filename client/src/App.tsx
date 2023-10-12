import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import CartContext from './CartContext';
import Header from './Header';
import Home from './Home';
import Catalog from './Catalog';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import NotFound from './NotFound';
import RegistrationForm from './RegistrationForm';
import SignInForm from './SignInForm';

export type Item = {
  productImage: string;
  productName: string;
  cartId: number;
  productId: number;
  size: string;
  quantity: number;
  price: number;
};

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<unknown>();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    async function getCartInfo() {
      setError(undefined);
      try {
        const request = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(`/api/carts/read-in-cart`, request);
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const cartContents: any[] = await response.json();
        cartContents.sort((a, b) => a.cartId - b.cartId);
        setItems(cartContents);
      } catch (err: any) {
        console.log(err.message);
        setError(err);
      }
    }
    if (token) {
      getCartInfo();
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{ items, setItems, error, setError, token, setToken }}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="catalog/:category" element={<Catalog />} />
          <Route path="catalog/teams/:teamId" element={<Catalog />} />
          <Route path="details/:productId" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="search/:searchQuery" element={<Catalog />} />
          <Route path="register" element={<RegistrationForm />} />
          <Route path="sign-in" element={<SignInForm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </CartContext.Provider>
  );
}
