import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context/AuthProvider";

const ForgotPassword = () => {
  const emailRef = useRef();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      setLoading(true);
      await forgotPassword(emailRef.current.value).then(() => {
        setMessage("Email sent");
      });
    } catch (err) {
      setMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Wrapper className="container">
        <div>
          <p className="error">{message && message}</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="emal"
              id="email"
              ref={emailRef}
              className="input"
            />
            <button type="submit" disabled={loading} className="btn">
              Submit
            </button>
            <Link to="/login">Login</Link>
          </form>
        </div>
      </Wrapper>
    </>
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
export default ForgotPassword;
