import './ProductDetails.css';

export default function ProductDetails() {
  return (
    <>
      <div className="container">
        <div className="d-flex mt-5">
          <div className="d-flex justify-content-center">
            <img
              src="/images/lamar-jackson.webp"
              className="img-fluid"
              width="70%"></img>
          </div>
          <div className="d-flex flex-column justify-content-evenly">
            <div className="mb-4 heading fs-4">
              Christian McCaffrey San Francisco 49ers Jersey
            </div>
            <div className="heading">Price: $129.99</div>
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
                <button>Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
