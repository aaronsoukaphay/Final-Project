import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  const [logos, setLogos] = useState<any>([]);
  const [error, setError] = useState<any>();

  useEffect(() => {
    async function getTeamLogos() {
      try {
        const response = await fetch('/api/teams');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const teamLogos = await response.json();
        setLogos(teamLogos);
      } catch (err: any) {
        console.log(err.message);
        setError(err);
      }
    }
    getTeamLogos();
  }, []);

  if (error || !logos) {
    console.error('Fetch error:', error);
    return (
      <p>Error! {error instanceof Error ? error.message : 'Unknown Error'}</p>
    );
  }

  return (
    <>
      <div className="row text-center">
        <h3>Shop Your Favorite Teams!</h3>
      </div>
      <div className="row">
        {logos.map((logo, i) => (
          <Link
            to={`/catalog/teams/${logo.teamId}`}
            key={i}
            className="col d-flex justify-content-center">
            <img src={logo.teamLogo} className="img-fluid" />
          </Link>
        ))}
      </div>
      <div className="row m-4 g-0">
        <div className="col-8">
          <img src="/images/gameday-banner.jpeg" className="img-fluid" />
        </div>
        <div className="col bg-dark text-white">
          <div className="container p-4 d-flex flex-column align-items-left">
            <div>
              <h4>FOOTBALL IS BACK!</h4>
            </div>
            <p className="fs-6">
              Get ready for the new season with the latest and greatest in NFL
              gear! Shop jerseys for the whole family and rep your team this
              season in style!
            </p>
            <div>
              <Button>Shop NFL Jerseys</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <img src="/images/dress-like-the-pros.webp" className="img-fluid" />
      </div>
    </>
  );
}
