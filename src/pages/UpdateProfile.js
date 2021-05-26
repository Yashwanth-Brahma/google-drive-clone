import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context/AuthProvider";

const UpdateProfile = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { emailUpdate, passwordUpdate, currentUser } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Check Confirm password");
    }

    try {
      setError("");
      setLoading(true);
      await emailUpdate(emailRef.current.value);
      await passwordUpdate(passwordRef.current.value).then(() => {
        setError("Email and Password updated");
      });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Wrapper className="container">
      <div>
        <h2>Update Profile</h2>
        <p className="error">{error && error}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            ref={emailRef}
            defaultValue={currentUser.email}
            className="input"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
            className="input"
          />
          <label htmlFor="confPassword">Confirm Password</label>
          <input
            type="password"
            name="ConfPassword"
            id="Confpassword"
            ref={confirmPasswordRef}
            className="input"
          />
          <button type="submit" disabled={loading} className="btn">
            Sign Up
          </button>
        </form>
        <p>
          <Link to="/">Go back home</Link>
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

export default UpdateProfile;
