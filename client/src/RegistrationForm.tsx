import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './RegistrationForm.css';

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData.entries());
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/customers/sign-up', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const customer = await res.json();
      if (customer) navigate('/sign-in');
      console.log('Registered', customer);
    } catch (err) {
      alert(`Error registering user: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container className="my-3">
      <Row className="flex-column align-items-center">
        <Col
          lg={6}
          xs={11}
          className="border border-4 border-bottom-0 border-dark p-3 pb-0">
          <div>
            <h3>Register</h3>
            Already have an account?{' '}
            <a href="/sign-in" className="text-dark">
              SIGN IN
            </a>
          </div>
        </Col>
        <Col
          lg={6}
          xs={11}
          className="border border-4 border-top-0 border-dark p-3">
          <form onSubmit={handleSubmit}>
            <div className="row margin-bottom-1">
              <div className="col">
                <label className="mb-2 d-block">
                  Username
                  <input
                    required
                    name="username"
                    type="text"
                    className="d-block"
                    style={{ width: '100%', height: '2.5rem' }}
                  />
                </label>
                <label className="mb-2 d-block">
                  Password
                  <input
                    required
                    name="password"
                    type="password"
                    className="d-block"
                    style={{ width: '100%', height: '2.5rem' }}
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <button
                  style={{ width: '100%' }}
                  disabled={isLoading}
                  className="py-2 mt-4 rounded border-1 button">
                  Register
                </button>
              </div>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
