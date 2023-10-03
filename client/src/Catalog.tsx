import { useState, useEffect } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

export default function Catalog() {
  const [products, setProducts] = useState<any>([]);
  const [error, setError] = useState<any>();
  const [team, setTeam] = useState<any>();
  const { teamId, category } = useParams();

  useEffect(() => {
    async function getProducts() {
      setError(undefined);
      try {
        const url = category
          ? `/api/products/${category}`
          : `/api/products/teams/${teamId}`;
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const products = await response.json();
        if (!products) throw new Error('currently out of stock');
        setProducts(products);
      } catch (err: any) {
        console.log(err.message);
        setError(err);
      }
    }
    getProducts();
  }, [category, teamId]);

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

  if (error || !products) {
    console.error('Fetch error:', error);
    return (
      <p>Error! {error instanceof Error ? error.message : 'Unknown Error'}</p>
    );
  }

  return (
    <>
      <div className="p-4">
        <h3>{team ? team.teamName : 'PRODUCTS'}</h3>
      </div>
      <Container>
        <Row>
          {products.map((product, i) => (
            <Col key={i} className="d-flex justify-content-center">
              <Link
                to={`/details/${product.productId}`}
                className="text-decoration-none">
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={product.productImage} />
                  <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    <Card.Text>{`Price: $${product.price}.00`}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
