import { useState, useEffect } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './Catalog.css';

export type Product = {
  category: string;
  gender: string;
  playerId: number;
  price: number;
  productId: number;
  productImage: string;
  productName: string;
  teamId: number;
};

export type Team = {
  bannerColor: string;
  navColor: string;
  teamIcon: string;
  teamId: number;
  teamLogo: string;
  teamName: string;
};

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<unknown>();
  const [team, setTeam] = useState<Team>();
  const { teamId, category, searchQuery } = useParams();
  const [inStock, setInStock] = useState<boolean>(true);

  useEffect(() => {
    async function getProducts() {
      setError(undefined);
      setInStock(true);
      try {
        let url;
        if (category) {
          url = `/api/products/${category}`;
        } else if (searchQuery) {
          url = `/api/search?query=${searchQuery}`;
        } else {
          url = `/api/products/teams/${teamId}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const products = await response.json();
        if (!products[0]) {
          setInStock(false);
        }
        setProducts(products);
      } catch (err: any) {
        console.log(err.message);
        setError(err);
      }
    }
    getProducts();
  }, [category, teamId, searchQuery]);

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
    <Container fluid>
      <div className="p-4">
        <h3 className="catalogHeading text-uppercase">
          {team ? team.teamName : category ? category : 'search results'}
        </h3>
      </div>
      {!inStock && (
        <p className="text-center">{`Sorry, could not find products matching the selection: ${
          searchQuery ? searchQuery : category
        }`}</p>
      )}
      <Row>
        {products.map((product, index) => (
          <Col
            key={index}
            xl={2}
            lg={3}
            md={4}
            sm={4}
            xs={6}
            className="d-flex justify-content-center">
            <a
              href={`/details/${product.productId}`}
              className="text-decoration-none d-flex justify-content-center mb-5">
              <Card style={{ width: '100%' }} className="card border-0">
                <Card.Img
                  variant="top"
                  src={product.productImage}
                  className="w-75 mt-3 align-self-center"
                />
                <Card.Body>
                  <Card.Title className="card-text">
                    {product.productName}
                  </Card.Title>
                  <Card.Text>{`Price: $${product.price.toFixed(2)}`}</Card.Text>
                </Card.Body>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
