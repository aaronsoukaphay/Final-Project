import { useEffect, useState } from 'react';
import './ProductDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';

// type Product = {
//   category: string;
//   gender: string;
//   playerId: number;
//   price: number;
//   productId: number;
//   productImage: string;
//   productName: string;
//   teamId: number;
// };

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState<any>({});
  const [error, setError] = useState<any>();
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(0);
  const sizes = ['S', 'M', 'L', 'XL'];
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

  // POSTS cart info into carts table

  type Data = {
    productId: number;
    size: string;
    quantity: number;
    customerId: number;
  };

  async function addToCart(data: Data) {
    if (cartInfo.size === '' || cartInfo.quantity === 0) {
      window.alert('Please select both a size and quantity.');
      return;
    }
    try {
      const request = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await fetch('/api/carts', request);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const cartData = await response.json();
      if (cartData) navigate(`/cart/customer/${cartInfo.customerId}`);
      console.log('Success!:', cartData);
    } catch (err: any) {
      console.log(err.message);
      setError(err);
    }
  }

  const cartInfo = {
    productId: Number(productId),
    size,
    quantity,
    customerId: 1,
  };

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
            <div className="bg-secondary p-4">
              <div className="py-2 subheading">Size</div>
              <div>
                {sizes.map((size, i) => (
                  <button
                    key={i + 1}
                    className="px-2 me-4"
                    onClick={() => setSize(size)}>
                    {size}
                  </button>
                ))}
              </div>
              <div className="py-2 subheading">Quantity</div>
              <div className="d-flex justify-content-between">
                <DropdownButton id="dropdown-basic-button" title={quantity}>
                  <Dropdown.Item onClick={() => setQuantity(1)}>
                    1
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setQuantity(2)}>
                    2
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setQuantity(3)}>
                    3
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setQuantity(4)}>
                    4
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setQuantity(5)}>
                    5
                  </Dropdown.Item>
                </DropdownButton>
                <button
                  style={{ width: '300px', height: '3rem' }}
                  onClick={() => addToCart(cartInfo)}>
                  Add to cart
                </button>
              </div>
              <div>Size:{size}</div>
              <div>Quantity:{quantity}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
