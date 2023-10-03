import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsCart } from 'react-icons/bs';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import './Header.css';
import { useEffect, useState } from 'react';

export default function Header() {
  const { teamId } = useParams();
  const [team, setTeam] = useState();
  const [error, setError] = useState<any>();

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

  return (
    <div>
      <TopBanner />
      <BottomBanner team={team} />
      <NavBar team={team} />
      <Outlet />
    </div>
  );
}

function TopBanner() {
  return (
    <div className="row d-flex justify-content-end my-1">
      <div className="col-2 d-flex justify-content-center">
        <Button>Sign In</Button>
      </div>
      <div className="col-1 d-flex justify-content-start align-items-center">
        <BsCart />
      </div>
    </div>
  );
}

function BottomBanner({ team }) {
  const backgroundColor = team ? team.bannerColor : 'grey';
  return (
    <div className="row mt-2 py-4" style={{ backgroundColor: backgroundColor }}>
      <div className="col-5 d-flex justify-content-center align-items-center">
        <h4>TOUCHDOWN THREADS</h4>
      </div>
      <div className="col"></div>
      <div className="col d-flex align-items-center">
        <FaMagnifyingGlass className="mx-3" />
        <input type="text" name="search" placeholder="Search products..." />
      </div>
    </div>
  );
}

function NavBar({ team }) {
  const backgroundColor = team ? team.navColor : 'darkgrey';
  return (
    <div className="row" style={{ backgroundColor: backgroundColor }}>
      <div className="col"></div>
      <div className="col-5 d-flex justify-content-between py-2">
        <Link to="/catalog/Jersey">Jerseys</Link>
        <Link to="/catalog/men">Men</Link>
        <Link to="/catalog/women">Women</Link>
      </div>
      <div className="col"></div>
    </div>
  );
}
