import { FormEvent, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import './SignInForm.css';
import CartContext from './CartContext';

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setToken } = useContext(CartContext);

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
      const res = await fetch('/api/customers/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = await res.json();
      localStorage.setItem('token', token);
      setToken(token);
      if (token) navigate('/');
      console.log('Signed In', user, '; received token:', token);
    } catch (err) {
      alert(`Invalid username or password.`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGuest() {
    try {
      const request = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'guest', password: 'password1' }),
      };
      const response = await fetch('/api/customers/sign-in', request);
      if (!response.ok) {
        throw new Error(`fetch Error ${response.status}`);
      }
      const { user, token } = await response.json();
      localStorage.setItem('token', token);
      setToken(token);
      if (token) navigate('/');
      console.log('Signed In', user, '; received token:', token);
    } catch (err) {
      alert(`Invalid username or password.`);
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
            <h3>Sign In</h3>
            Not a member yet?{' '}
            <a href="/register" className="text-dark">
              CREATE AN ACCOUNT
            </a>{' '}
            or{' '}
            <a href="#" onClick={handleGuest} className="text-dark">
              SIGN IN AS GUEST
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
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
