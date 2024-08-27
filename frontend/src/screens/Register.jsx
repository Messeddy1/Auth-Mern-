import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import FormContainer from "../Component/FormContainer";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../ReduxTolkit/Slice/UsersApiSlice";
import { toast } from "react-toastify";
import { setAuthUser } from "../ReduxTolkit/Reducer/AuthReducer";
import Spinnerloading from "../Component/Spinnerloading";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [ConfermePassword, setConfermePassword] = useState("");
  const dispatch = useDispatch();
  const [register,{isLoading}]= useRegisterMutation()
  const { user } = useSelector((state) => state.Auth);
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password!== ConfermePassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await register({ name,email, password }).unwrap();
      dispatch(setAuthUser({ ...res }));
      navigate("/");
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };
  return (
    <FormContainer>
    <h1 className="text-center text-decoration-underline">Sign Up</h1>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Enter Your Name</Form.Label>
        <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Your name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="ConfermePassword">
        <Form.Label>Conferme Password</Form.Label>
        <Form.Control type="password" value={ConfermePassword} onChange={(e)=>setConfermePassword(e.target.value)} placeholder="Conferme your Password" />
      </Form.Group>
      {isLoading ? (
        <Spinnerloading />
      ) : (
        <Button type="submit" variant="primary" className="mt-3">
          Sign Up
        </Button>
      )}
    </Form>
    <Row className="py-3">
    <Col>
   Have Acount ? <Link to='/login'>Login</Link>
    </Col>
    </Row>
    </FormContainer>
  );
};

export default Register;
