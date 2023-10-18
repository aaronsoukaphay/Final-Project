import { useState, useEffect } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Team } from './Catalog';
import './Home.css';

export default function Home() {
  const [logos, setLogos] = useState<Team[]>([]);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function getTeamLogos() {
      try {
        const response = await fetch('/api/teams');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const teamInfo = await response.json();
        setLogos(teamInfo);
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
      <div className="text-center my-3">
        <h3>Shop Your Favorite Teams!</h3>
      </div>
      <Container>
        <Row className="justify-content-evenly">
          {logos.map((logo, index) => (
            <Col key={index} className="text-center" lg={1} xs={2}>
              <a href={`/catalog/teams/${logo.teamId}`}>
                {<img src={logo.teamIcon} className="img-fluid logo" />}
              </a>
            </Col>
          ))}
        </Row>
      </Container>
      <Row className="p-4">
        <Col className="p-0" md={8}>
          <img src="/images/gameday-banner.jpeg" className="img-fluid" />
        </Col>
        <Col className="bg-dark text-white p-3">
          <h4>FOOTBALL IS BACK!</h4>
          <p className="fs-6">
            Get ready for the new season with the latest and greatest in NFL
            gear! Shop jerseys for the whole family and rep your team this
            season in style!
          </p>
          <Link to="/catalog/jerseys">
            <Button>Shop NFL Jerseys</Button>
          </Link>
        </Col>
      </Row>
      <Row className="mb-5">
        <img src="/images/dress-like-the-pros.webp" className="img-fluid" />
      </Row>
    </>
  );
}
