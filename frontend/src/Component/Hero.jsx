import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";

function Hero() {
  return (
    <div className="py-5">
      <Container>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>MERN Authentication</Card.Title>
            <Card.Text>
              This is a boilerplate for MERN authentication that stores a JWT in
              an HTTP-Only cookie. It also uses Redux Toolkit and the React
              Bootstrap library
            </Card.Text>
            <LinkContainer to={"/login"}>
              <Button className="me-3" variant="secondary">
                Sign In
              </Button>
            </LinkContainer>
            <LinkContainer to={"/register"}>
              <Button variant="primary">Sign Up</Button>
            </LinkContainer>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Hero;
