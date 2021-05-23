import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context/AuthProvider";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const emailRef = useRef();
  const paswordRef = useRef();
  const { login } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, paswordRef.current.value);
      history.push("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Wrapper className="container">
      <div>
        <h2>Login</h2>
        <p className="error">{error && error}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" ref={emailRef} />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={paswordRef}
          />
          <button type="submit" disabled={loading}>
            Login
          </button>
        </form>

        <Link to="/forgotpassword">Forgot Password</Link>
        <p>
          New User <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8rem;
  div {
    width: 400px;
    border: 1px solid gray;
    padding: 1rem;
    display: grid;
  }
  form {
    display: grid;
    gap: 0.8rem 0;
    margin: 1rem 0;
  }
  .error {
    color: #e63946;
  }
`;
export default Login;
