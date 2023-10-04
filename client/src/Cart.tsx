export default function Cart() {
  return (
    <div className="p-5 d-flex">
      <div className="col-7 me-auto">
        <h2>Order Details</h2>
        <div>Your Order will be with you soon</div>
        <div className="d-flex mt-4 border-bottom">
          <div className="col-4 me-auto">Product</div>
          <div className="col-1 me-auto">Quantity</div>
          <div className="col-2 d-flex justify-content-end">Subtotal</div>
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
