import { useEffect, useState } from 'react';
import { DropdownButton, Dropdown, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [error, setError] = useState<any>();
  const [items, setItems] = useState<any[]>([]);
  const [empty, setEmpty] = useState(true);
  const navigate = useNavigate();
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const quantities = [1, 2, 3, 4, 5];

  let subtotal = 0;

  items.forEach((item) => (subtotal += item.price * item.quantity));
  const taxes = subtotal * 0.0725;
  const total = subtotal + taxes;

  useEffect(() => {
    async function getCartInfo() {
      setError(undefined);
      try {
        const request = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
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
    if (items[0]) {
      getCartInfo();
      setEmpty(false);
    } else {
      setEmpty(true);
    }
    getCartInfo();
  }, [items]);

  if (error) {
    console.error('Fetch error:', error);
    return (
      <p>Error! {error instanceof Error ? error.message : 'Unknown Error'}</p>
    );
  }

  async function updateCart(cartId, size, quantity) {
    try {
      const request = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({ size, quantity }),
      };
      const response = await fetch(`/api/carts/${cartId}`, request);
      if (!response.ok) throw new Error(`HTTP error!: ${response.status}`);
      const newCart = await response.json();
      if (newCart) console.log('Cart has been updated!:', newCart);
      const updatedCart = items.map((i) =>
        i.cartId === cartId ? { ...i, size, quantity } : i
      );
      setItems(updatedCart);
    } catch (err: any) {
      console.log(err.message);
      setError(err);
    }
  }

  async function deleteCart(cartId) {
    try {
      const request = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      };
      await fetch(`/api/carts/${cartId}`, request);
      const updatedCart = items.filter((item) => item.cartId !== cartId);
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
        <div>Thank you for shopping with us!</div>
        <Row className="border-bottom py-2 mt-3 fw-bold">
          <Col>Product</Col>
          <Col xs={5}>Description</Col>
          <Col>Quantity</Col>
          <Col className="text-center">Subtotal</Col>
        </Row>
        {empty && (
          <Container>
            <Row className="text-center mt-5 mb-2">
              <Col>Your Shopping cart is currently empty</Col>
            </Row>
            <Row className="text-center">
              <Col>
                <button
                  onClick={() => navigate('/')}
                  className="border-1 rounded px-3 py-2">
                  Continue Shopping
                </button>
              </Col>
            </Row>
          </Container>
        )}
        {items.map((item, index) => (
          <Row key={index} className="py-2 border-bottom ">
            <Col>
              <img src={item.productImage} width="80%" />
            </Col>
            <Col xs={5}>
              <div>{item.productName}</div>
              <DropdownButton
                className="py-3"
                id="dropdown-basic-button"
                size="sm"
                variant="secondary"
                title={item.size}>
                {sizes.map((size, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() =>
                      updateCart(item.cartId, size, item.quantity)
                    }>
                    {size}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
            <Col>
              <DropdownButton
                className="py-2"
                id="dropdown-basic-button"
                size="sm"
                variant="secondary"
                title={item.quantity}>
                {quantities.map((quantity, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() =>
                      updateCart(item.cartId, item.size, quantity)
                    }>
                    {quantity}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
            <Col className="d-flex flex-column justify-content-between align-items-center">
              <div>{`$${(item.price * item.quantity).toFixed(2)}`}</div>
              <a
                href="#"
                onClick={() => deleteCart(item.cartId)}
                className="link-dark">
                Remove
              </a>
            </Col>
          </Row>
        ))}
      </div>
      <div className="col-4">
        <h3 className="mb-4">Order Summary</h3>
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="me-auto">{`Subtotal (${items.length} items)`}</div>
            <div>{`$${subtotal.toFixed(2)}`}</div>
          </div>
          <div className="d-flex py-3">
            <div className="me-auto">Taxes</div>
            <div>{`$${taxes.toFixed(2)}`}</div>
          </div>
          <div className="d-flex py-4 border-top">
            <h4 className="me-auto">Total</h4>
            <div>{`$${total.toFixed(2)}`}</div>
          </div>
          <button style={{ height: '3rem' }}>Checkout</button>
        </div>
      </div>
    </div>
  );
}
