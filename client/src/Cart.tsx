import { useCallback, useEffect, useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function Cart() {
  const [error, setError] = useState<any>();
  const { customerId } = useParams();
  const [items, setItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [taxes, setTaxes] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const calculateSubtotal = useCallback(() => {
    let subtotal = 0;
    items.forEach((item) => (subtotal += item.price));
    setSubtotal(subtotal);
  }, [items]);

  const calculateTaxes = useCallback(() => {
    const taxes = subtotal * 0.0725;
    setTaxes(taxes);
  }, [subtotal]);

  const calculateTotal = useCallback(() => {
    const total = subtotal + taxes;
    setTotal(total);
  }, [subtotal, taxes]);

  useEffect(() => {
    async function getCartInfo() {
      setError(undefined);
      try {
        const response = await fetch(`/api/carts/customer/${customerId}`);
        if (!response.ok) throw new Error(`HTTP error!: ${response.status}`);
        const cartContents = await response.json();
        setItems(cartContents);
      } catch (err: any) {
        console.log(err.message);
        setError(err);
      }
    }
    if (customerId) {
      getCartInfo();
      calculateSubtotal();
      calculateTaxes();
      calculateTotal();
    } else {
      setItems([]);
    }
  }, [customerId, calculateSubtotal, calculateTaxes, calculateTotal]);

  if (error || !customerId) {
    console.error('Fetch error:', error);
    return (
      <p>Error! {error instanceof Error ? error.message : 'Unknown Error'}</p>
    );
  }

  async function updateCart(cartId, size, quantity) {
    try {
      const request = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ size, quantity }),
      };
      const response = await fetch(`/api/carts/${cartId}`, request);
      if (!response.ok) throw new Error(`HTTP error!: ${response.status}`);
      const newCart = await response.json();
      if (newCart) console.log('Cart has been updated!', newCart);
      const updatedCart = items.map((i) =>
        i.cartId === cartId ? { ...i, size, quantity } : i
      );
      console.log('updating with', updatedCart);
      setItems(updatedCart);
    } catch (err: any) {
      console.log(err.message);
      setError(err);
    }
  }

  return (
    <div className="p-5 d-flex">
      <div className="col-7 me-auto">
        <h2>Order Details</h2>
        <div>Your order will be with you soon.</div>
        <div className="d-flex mt-4">
          <div className="col-3 d-flex flex-column">
            <div className="text-center border-bottom border-2 border-dark pb-1">
              Product
            </div>
            {items.map((item, i) => (
              <div key={i} className="text-center mt-2">
                <img src={item.productImage} width="60%" />
              </div>
            ))}
          </div>
          <div className="d-flex flex-column justify-content-between">
            <div className="border-bottom border-2 border-dark pb-1">
              Description
            </div>
            {items.map((item, i) => (
              <div key={i} className="d-flex flex-column mt-2 pb-5">
                <div>{item.productName}</div>
                <DropdownButton id="dropdown-basic-button" title={item.size}>
                  <Dropdown.Item
                    onClick={() => updateCart(item.cartId, 'S', item.quantity)}>
                    S
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => updateCart(item.cartId, 'M', item.quantity)}>
                    M
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => updateCart(item.cartId, 'L', item.quantity)}>
                    L
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      updateCart(item.cartId, 'XL', item.quantity)
                    }>
                    XL
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            ))}
          </div>
          <div className="col-2 d-flex flex-column justify-content-between">
            <div className="border-bottom border-2 border-dark pb-1">
              Quantity
            </div>
            {items.map((item, i) => (
              <div key={i} className="mt-2 mb-5 pb-5">
                <DropdownButton
                  id="dropdown-basic-button"
                  title={item.quantity}>
                  <Dropdown.Item
                    onClick={() => updateCart(item.cartId, item.size, 1)}>
                    1
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => updateCart(item.cartId, item.size, 2)}>
                    2
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => updateCart(item.cartId, item.size, 3)}>
                    3
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => updateCart(item.cartId, item.size, 4)}>
                    4
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => updateCart(item.cartId, item.size, 5)}>
                    5
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            ))}
          </div>
          <div className="col-2 d-flex flex-column justify-content-between">
            <div className="border-bottom border-2 border-dark pb-1">
              Subtotal
            </div>
            {items.map((item, i) => (
              <div key={i} className="mt-2 pb-5 mb-5">
                <div>{`$${item.price}.00`}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-4">
        <h3 className="mb-4">Order Summary</h3>
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="me-auto">{`Subtotal (${items.length} items)`}</div>
            <div>{`$${subtotal}.00`}</div>
          </div>
          <div className="d-flex py-3">
            <div className="me-auto">Taxes</div>
            <div>{`$${taxes}`}</div>
          </div>
          <div className="d-flex py-4 border-top">
            <h4 className="me-auto">Total</h4>
            <div>{`$${total}`}</div>
          </div>
          <button style={{ height: '3rem' }}>Checkout</button>
        </div>
      </div>
    </div>
  );
}
