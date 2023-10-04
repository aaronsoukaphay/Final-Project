import { DropdownButton, Dropdown } from 'react-bootstrap';

export default function Cart() {
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
            <div className="text-center mt-2">
              <img src="/images/stefon-diggs.webp" width="60%" />
            </div>
          </div>
          <div className="d-flex flex-column">
            <div className="border-bottom border-2 border-dark pb-1">
              Description
            </div>
            <div className="d-flex flex-column mt-2">
              <div>Stefon Diggs Buffalo Bills Football Jersey</div>
              <div>Size: S</div>
            </div>
          </div>
          <div className="col-2 d-flex flex-column">
            <div className="border-bottom border-2 border-dark pb-1">
              Quantity
            </div>
            <div className="mt-2">
              <DropdownButton id="dropdown-basic-button" title="1">
                <Dropdown.Item href="#/quantity-1">1</Dropdown.Item>
                <Dropdown.Item href="#/quantity-2">2</Dropdown.Item>
                <Dropdown.Item href="#/quantity-3">3</Dropdown.Item>
                <Dropdown.Item href="#/quantity-4">4</Dropdown.Item>
                <Dropdown.Item href="#/quantity-5">5</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
          <div className="col-2 d-flex flex-column">
            <div className="border-bottom border-2 border-dark pb-1">
              Subtotal
            </div>
            <div className="mt-2">
              <div>$130.00</div>
            </div>
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
