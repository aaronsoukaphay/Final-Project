import { createContext } from 'react';
import { Item } from './App';

export type CartValues = {
  items: Item[];
  setItems: (items: Item[]) => void;
  error?: unknown;
  setError: (err: unknown) => void;
};

const CartContext = createContext<CartValues>({
  items: [],
  setItems: () => {},
  setError: () => {},
});
export default CartContext;
