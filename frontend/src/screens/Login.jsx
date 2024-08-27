import { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../Component/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../ReduxTolkit/Slice/UsersApiSlice";
import { setAuthUser } from "../ReduxTolkit/Reducer/AuthReducer";
import { toast } from "react-toastify";
import Spinnerloading from "../Component/Spinnerloading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { user } = useSelector((state) => state.Auth);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setAuthUser({ ...res }));
      navigate("/");
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };
  return (
    <FormContainer>
      <h1 className="text-center text-decoration-underline">Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </Form.Group>
        {isLoading ? (
          <Spinnerloading />
        ) : (
          <Button type="submit" variant="primary" className="mt-3">
            Sign In
          </Button>
        )}
      </Form>
      <Row className="py-3">
        <Col>
          New Costumer ? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
