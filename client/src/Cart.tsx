import { useEffect, useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function Cart() {
  const [error, setError] = useState<any>();
  const { customerId } = useParams();
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    async function getCartInfo() {
      setError(undefined);
      try {
        const response = await fetch(`/api/carts/${customerId}`);
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
    } else {
      setItems([]);
    }
  }, [customerId]);

  if (error || !customerId) {
    console.error('Fetch error:', error);
    return (
      <p>Error! {error instanceof Error ? error.message : 'Unknown Error'}</p>
    );
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
                <div>{`Size: ${item.size}`}</div>
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
                  <Dropdown.Item href="#/quantity-1">1</Dropdown.Item>
                  <Dropdown.Item href="#/quantity-2">2</Dropdown.Item>
                  <Dropdown.Item href="#/quantity-3">3</Dropdown.Item>
                  <Dropdown.Item href="#/quantity-4">4</Dropdown.Item>
                  <Dropdown.Item href="#/quantity-5">5</Dropdown.Item>
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
            <div className="me-auto">Subtotal: 2 items </div>
            <div>$260.00</div>
          </div>
          <div className="d-flex py-3">
            <div className="me-auto">Shipping</div>
            <div>$10.00</div>
          </div>
          <div className="d-flex py-4 border-top">
            <h4 className="me-auto">Total</h4>
            <div>$270.00</div>
          </div>
          <button style={{ height: '3rem' }}>Checkout</button>
        </div>
      </div>
    </div>
  );
}
