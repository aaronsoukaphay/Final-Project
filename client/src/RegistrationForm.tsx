import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
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
    <div className="d-flex justify-content-center">
      <div className="border border-4 border-black mt-5 p-4 register">
        <div className="row mb-3">
          <div className="col">
            <h3>Register</h3>
            <div>
              Already have an account?{' '}
              <a href="/sign-in" className="text-dark">
                SIGN IN
              </a>
            </div>
          </div>
        </div>
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
      </div>
    </div>
    // <div className="container">
    //   <div className="row">
    //     <div className="column-full d-flex justify-between">
    //       <h1>Register</h1>
    //     </div>
    //   </div>
    //   <form onSubmit={handleSubmit}>
    //     <div className="row margin-bottom-1">
    //       <div className="column-half">
    //         <label className="margin-bottom-1 d-block">
    //           Username
    //           <input
    //             required
    //             name="username"
    //             type="text"
    //             className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
    //           />
    //         </label>
    //         <label className="margin-bottom-1 d-block">
    //           Password
    //           <input
    //             required
    //             name="password"
    //             type="password"
    //             className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
    //           />
    //         </label>
    //       </div>
    //     </div>
    //     <div className="row">
    //       <div className="column-full d-flex justify-between">
    //         <button
    //           disabled={isLoading}
    //           className="input-b-radius text-padding purple-background white-text">
    //           Register
    //         </button>
    //       </div>
    //     </div>
    //   </form>
    //   <Link to="/sign-in">
    //     <button>Already have an account</button>
    //   </Link>
    // </div>
  );
}
