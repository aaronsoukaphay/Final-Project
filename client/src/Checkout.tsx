import { Container, Row, Col } from 'react-bootstrap';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();

  return (
    <Container>
      <Row className="py-2 mt-4">
        <IoIosCheckmarkCircleOutline
          size={70}
          style={{ color: 'rgb(26,186,22)' }}
        />
      </Row>
      <Row className="text-center">
        <h1>Thank you for your purchase!</h1>
        <p>Your order number is: 0002349870128</p>
        <Col>
          <button
            className="w-25 rounded border-1 py-1"
            onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </Col>
      </Row>
    </Container>
  );
}
