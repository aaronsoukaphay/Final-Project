import { useEffect, useState } from 'react';
import './ProductDetails.css';
import { useParams, Link } from 'react-router-dom';

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
              <div className="subheading">Size</div>
              <div>
                <button>S</button>
                <button>M</button>
                <button>L</button>
                <button>XL</button>
              </div>
              <div className="mt-4">
                <div className="text">Quantity</div>
                <button>Quantity</button>
                <Link to="/cart">
                  <button>Add to cart</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
