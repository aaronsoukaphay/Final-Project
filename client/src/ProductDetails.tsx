import { useEffect, useState, useContext } from 'react';
import './ProductDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import CartContext from './CartContext';

export default function ProductDetails() {
  const { items, setItems } = useContext(CartContext);
  const { productId } = useParams();
  const [product, setProduct] = useState<any>({});
  const [error, setError] = useState<any>();
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(0);
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
    if (!sessionStorage.getItem('token')) {
      window.alert('Please sign in to add to cart');
      navigate('/sign-in');
      return;
    }
    try {
      const request = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      };
      const response = await fetch('/api/carts/add-to-cart', request);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const cartData = await response.json();
      const updatedCart = [...items];
      const newItem = {
        ...cartData,
        productName: product.productName,
        productImage: product.productImage,
        price: product.price,
      };
      updatedCart.push(newItem);
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
      <div className="container">
        <div className="d-flex mt-5">
          <div className="d-flex justify-content-center">
            <img
              src={product.productImage}
              className="img-fluid"
              width="70%"></img>
          </div>
          <div className="d-flex flex-column justify-content-evenly">
            <div className="mb-4 heading fs-4">{product.productName}</div>
            <div className="heading">{`Price: $${product.price}.00`}</div>
            <div className="bg-light p-4">
              <div className="py-2 subheading">Size</div>
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
              <div className="py-2 subheading">Quantity</div>
              <div className="d-flex justify-content-between">
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
                <button
                  style={{ width: '300px', height: '3rem' }}
                  onClick={() => addToCart(cartInfo)}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
