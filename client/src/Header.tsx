import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsCart } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import './Header.css';
import { useEffect, useState } from 'react';

export default function Header() {
  const { teamId } = useParams();
  const [team, setTeam] = useState();
  const [error, setError] = useState<any>();
  const navigate = useNavigate();

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
    const token = sessionStorage.getItem('token');
    if (token) {
      sessionStorage.removeItem('token');
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
      <TopBanner team={team} handleAccount={() => handleAccount()} />
      <BottomBanner team={team} handleSubmit={(e) => handleSubmit(e)} />
      <NavBar team={team} />
      <Outlet />
    </div>
  );
}

function TopBanner({ team, handleAccount }) {
  return (
    <div className="d-flex align-items-center">
      <div className="me-auto ps-4 pageName">{team && 'TOUCHDOWN THREADS'}</div>
      <div className="p-2">
        <Button onClick={handleAccount}>
          {sessionStorage.getItem('token') ? 'Sign Out' : 'Sign In'}
        </Button>
      </div>
      <div className="mx-4">
        {sessionStorage.getItem('token') && (
          <Link to={`/cart`}>
            <BsCart />
          </Link>
        )}
      </div>
    </div>
  );
}

function BottomBanner({ team, handleSubmit }) {
  const backgroundColor = team ? team.bannerColor : 'rgb(244,245,245)';
  return (
    <div
      className="d-flex justify-content-around align-items-center py-4"
      style={{ backgroundColor: backgroundColor }}>
      <div className="pageName text-dark">
        {team ? (
          <img src={team.teamLogo} width="60%" className="img-fluid " />
        ) : (
          'TOUCHDOWN THREADS'
        )}
      </div>
      <div className="col-3">
        <form
          onSubmit={handleSubmit}
          className="d-flex align-items-center justify-content-center">
          <input
            placeholder="Search products..."
            name="search"
            type="search"
            className="p-1 rounded-start border-1"
          />
          <button className="py-1 px-2 rounded-end border-1">
            <FaSearch />
          </button>
        </form>
      </div>
    </div>
  );
}

function NavBar({ team }) {
  const backgroundColor = team ? team.navColor : 'rgb(54,52,54)';
  return (
    <div
      className="d-flex py-2 navName text-uppercase justify-content-evenly align-items-center"
      style={{ backgroundColor: backgroundColor }}>
      <Link className="text-light text-decoration-none" to="/">
        Home
      </Link>
      <Link className="text-light text-decoration-none" to="/catalog/Jersey">
        Jerseys
      </Link>
      <Link className="text-light text-decoration-none" to="/catalog/men">
        <div>Men</div>
      </Link>
      <Link className="text-light text-decoration-none" to="/catalog/women">
        <div>Women</div>
      </Link>
    </div>
  );
}
