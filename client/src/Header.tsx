import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { BsCart } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { Row, Col, Container } from 'react-bootstrap';
import './Header.css';
import { useEffect, useState, useContext } from 'react';
import CartContext from './CartContext';

export default function Header() {
  const { teamId } = useParams();
  const [team, setTeam] = useState();
  const [error, setError] = useState<any>();
  const { items, setToken } = useContext(CartContext);
  const navigate = useNavigate();

  let totalQuantity = 0;
  items.forEach((item) => (totalQuantity += item.quantity));

  useEffect(() => {
    async function getTeamInfo() {
      setError(undefined);
      try {
        const response = await fetch(`/api/teams/${teamId}`);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const teamInfo = await response.json();
        setTeam(teamInfo);
      } catch (err: any) {
        console.log(err.message);
        setError(err);
      }
    }
    if (teamId) {
      getTeamInfo();
    } else {
      setTeam(undefined);
    }
  }, [teamId]);

  if (error) {
    console.error('Fetch error:', error);
    return (
      <p>Error! {error instanceof Error ? error.message : 'Unknown Error'}</p>
    );
  }

  function handleAccount() {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      setToken(undefined);
      navigate('/');
      console.log('User signed out');
    } else {
      navigate('/sign-in');
    }
  }

  function handleSubmit(event) {
    const form = event.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    formJson.search
      ? navigate(`/search/${formJson.search}`)
      : event.preventDefault();
  }

  return (
    <div>
      <TopBanner
        team={team}
        handleAccount={() => handleAccount()}
        quantity={totalQuantity}
      />
      <BottomBanner team={team} handleSubmit={(e) => handleSubmit(e)} />
      <NavBar team={team} />
      <Outlet />
    </div>
  );
}

function TopBanner({ team, handleAccount, quantity }) {
  return (
    // <Row className="justify-content-end align-items-center py-2 mx-2">
    //   {team && (
    //     <Col>
    //       <h2>touchdown threads</h2>
    //     </Col>
    //   )}
    //   <Col xs={2} className="px-2 text-end">
    //     <a href="#" onClick={handleAccount} className="text-dark">
    //       <p className="m-0 account">
    //         {localStorage.getItem('token') ? 'Sign Out' : 'Sign In'}
    //       </p>
    //     </a>
    //   </Col>
    //   {localStorage.getItem('token') && (
    //     <Col xs={1} className="text-end">
    //       <Link to={`/cart`}>
    //         <BsCart style={{ color: 'black' }} className="cart" xs={15} />
    //         <div className="cartNumber rounded-circle text-decoration-none">
    //           {quantity > 0 && quantity}
    //         </div>
    //       </Link>
    //     </Col>
    //   )}
    // </Row>

    //not mobile friendly
    <div className="d-flex align-items-center">
      <div className="me-auto ps-4 pageName">{team && 'TOUCHDOWN THREADS'}</div>
      <div className="p-2">
        <a href="#" onClick={handleAccount} className="text-dark account px-3">
          {localStorage.getItem('token') ? 'Sign Out' : 'Sign In'}
        </a>
      </div>
      {localStorage.getItem('token') && (
        <div className="mx-4">
          <Link to={`/cart`}>
            <BsCart style={{ color: 'black' }} className="cart" size={25} />
            <div className="cartNumber rounded-circle text-decoration-none">
              {quantity > 0 && quantity}
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

function BottomBanner({ team, handleSubmit }) {
  const backgroundColor = team ? team.bannerColor : 'rgb(244,245,245)';
  return (
    <div style={{ backgroundColor: backgroundColor }}>
      <Container>
        <Row className="d-flex align-items-center justify-content-between">
          {team ? (
            <Col
              className="pageName text-center py-2"
              lg={3}
              md={3}
              sm={3}
              xs={4}>
              <img src={team.teamLogo} className="img-fluid w-75" />
            </Col>
          ) : (
            <Col className="pageName text-dark text-center py-4" lg={5}>
              <h2>touchdown threads</h2>
            </Col>
          )}
          <Col lg={3}>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Search products..."
                name="search"
                type="search"
                className="p-1 rounded-start border-1 border-black searchBar"
              />
              <button className="py-1 px-2 rounded-end border-1 border-black">
                <FaSearch />
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function NavBar({ team }) {
  const navItems = ['home', 'jerseys', 'men', 'women'];
  const backgroundColor = team ? team.navColor : 'rgb(54,52,54)';
  return (
    <div
      className="d-flex py-2 navName text-uppercase justify-content-evenly align-items-center"
      style={{ backgroundColor: backgroundColor }}>
      {navItems.map((navItem, index) => (
        <a
          key={index}
          href={navItem === 'home' ? '/' : `/catalog/${navItem}`}
          className="text-decoration-none text-light">
          {navItem}
        </a>
      ))}
    </div>
  );
}
