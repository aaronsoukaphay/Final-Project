import { createContext } from 'react';
import { Item } from './App';

export type CartValues = {
  items: Item[];
  setItems: (items: Item[]) => void;
  error?: unknown;
  setError: (err: unknown) => void;
  token?: string;
  setToken: (token?: string) => void;
};

const CartContext = createContext<CartValues>({
  items: [],
  setItems: () => {},
  setError: () => {},
  setToken: () => {},
});
export default CartContext;
