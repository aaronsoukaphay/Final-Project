import { useEffect, useState, useContext } from 'react';
import './ProductDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton, Row, Col, Container } from 'react-bootstrap';
import CartContext from './CartContext';

export default function ProductDetails() {
  const { items, setItems } = useContext(CartContext);
  const { productId } = useParams();
  const [product, setProduct] = useState<any>({});
  const [error, setError] = useState<any>();
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const quantities = [1, 2, 3, 4, 5];
  const navigate = useNavigate();

  useEffect(() => {
    async function getProductDetails() {
      try {
        setError(undefined);
        const response = await fetch(`/api/products/selected/${productId}`);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const fetchedProduct = await response.json();
        setProduct(fetchedProduct);
      } catch (err: any) {
        console.log(err.message);
        setError(err);
      }
    }
    if (productId) {
      getProductDetails();
    }
  }, [productId]);

  if (error || !product) {
    console.error('Fetch error:', error);
    return (
      <p>Error! {error instanceof Error ? error.message : 'Unknown Error'}</p>
    );
  }

  type Data = {
    productId: number;
    size: string;
    quantity: number;
  };

  const cartInfo = {
    productId: Number(productId),
    size,
    quantity,
  };

  async function addToCart(data: Data) {
    if (cartInfo.size === '' || cartInfo.quantity === 0) {
      window.alert('Please select both a size and quantity.');
      return;
    }
    if (!localStorage.getItem('token')) {
      window.alert('Please sign in to add to cart');
      navigate('/sign-in');
      return;
    }
    try {
      const request = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      };
      const response = await fetch('/api/carts/add-to-cart', request);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const cartData = await response.json();
      const newItem = {
        ...cartData,
        productName: product.productName,
        productImage: product.productImage,
        price: product.price,
      };
      const updatedCart = [...items, newItem];
      setItems(updatedCart);
      console.log(updatedCart);
      navigate(`/cart`);
      console.log('Added to cart!:', cartData);
    } catch (err: any) {
      console.log(err.message);
      setError(err);
    }
  }

  function handleSize(size) {
    setSize(size);
  }

  return (
    <>
      <Container>
        <Row className="mt-4">
          <Col className="d-flex justify-content-center" md={5}>
            <img
              src={product.productImage}
              className="img-fluid"
              width="70%"></img>
          </Col>
          <Col className="d-flex flex-column justify-content-evenly mb-5">
            <h3 className="my-4 heading fs-4">{product.productName}</h3>
            <p className="heading">{`Price: $${product.price}.00`}</p>
            <div className="bg-light p-4">
              <p className="py-2 subheading m-0">Size</p>
              <div>
                {sizes.map((s, index) => (
                  <button
                    style={{
                      backgroundColor: s === size ? 'darkgrey' : 'white',
                    }}
                    key={index}
                    className="px-2 me-4 border-1 rounded button"
                    onClick={() => handleSize(s)}>
                    {s}
                  </button>
                ))}
              </div>
              <p className="py-2 m-0 subheading">Quantity</p>
              <Row className="justify-content-between">
                <Col>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={quantity}
                    variant="secondary">
                    {quantities.map((quantity, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => setQuantity(quantity)}>
                        {quantity}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Col>
                <Col xs={8} lg={8}>
                  <button
                    className="border-1 rounded w-100 py-1 button"
                    onClick={() => addToCart(cartInfo)}>
                    Add to cart
                  </button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
