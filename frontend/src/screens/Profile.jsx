import { Button, Form } from "react-bootstrap";
import FormContainer from "../Component/FormContainer";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinnerloading from "../Component/Spinnerloading";
import { useUpdateUserMutation } from "../ReduxTolkit/Slice/UsersApiSlice";
import { setAuthUser } from "../ReduxTolkit/Reducer/AuthReducer";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [ConfermePassword, setConfermePassword] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Auth);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const navigate = useNavigate();
  useEffect(() => {
    setEmail(user.email);
    setName(user.name);
  }, [user.email, user.name]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== ConfermePassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await updateUser({
        _id: user._id,
        name,
        email,
        password,
      }).unwrap();
      dispatch(setAuthUser({ ...res }));
      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
      console.log(error);
    }
  };
  return (
    <FormContainer>
      {isLoading ? (
        <Spinnerloading />
      ) : (
        <Fragment>
          <h1 className="text-center text-decoration-underline">
            Update Profile
          </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Enter Your Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your name"
              />
            </Form.Group>
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
            <Form.Group className="mb-3" controlId="ConfermePassword">
              <Form.Label>Conferme Password</Form.Label>
              <Form.Control
                type="password"
                value={ConfermePassword}
                onChange={(e) => setConfermePassword(e.target.value)}
                placeholder="Conferme your Password"
              />
            </Form.Group>
            <Link to="/">
              <Button type="submit" variant="primary" className="me-4 mt-3">
                Go back
              </Button>
            </Link>
            {isLoading ? (
              <Spinnerloading />
            ) : (
              <Button type="submit" variant="success" className="mt-3">
                Save
              </Button>
            )}
          </Form>
        </Fragment>
      )}
    </FormContainer>
  );
};

export default Profile;
