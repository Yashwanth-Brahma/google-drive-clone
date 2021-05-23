import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context/AuthProvider";

const Navbar = () => {
  const { logout } = useGlobalContext();
  return (
    <Wrapper>
      <h1>Cloud Drive</h1>
      <div>
        <Link className="link1" to="/profile">
          Profile
        </Link>
        <button
          onClick={() => {
            logout();
          }}>
          <Link className="link" to="/login">
            Logout
          </Link>
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f1faee;
  button {
    background-color: #e63946;
    font-size: 18px;

    border: none;
    border-radius: 5px;
    padding: 0.5rem 0.8rem;
    .link {
      text-decoration: none;
      color: #fff;
    }
  }
  .link1 {
    text-decoration: none;
    color: #000;
    font-size: 18px;
    margin-right: 1rem;
  }
`;
export default Navbar;
