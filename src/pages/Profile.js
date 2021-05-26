import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context/AuthProvider";

const Profile = () => {
  const { currentUser } = useGlobalContext();

  return (
    <Wrapper className="container">
      <div>
        <h1>Profile</h1>
        <h3>User Name : {currentUser.email}</h3>
        <button>
          <Link to="/" className="link1">
            Back Home
          </Link>
        </button>
        <Link className="link2" to="/updateprofile">
          Update Profile
        </Link>
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
    border-radius: 5px;
    box-shadow: 3px 3px 3px gray;
    padding: 1rem;
    display: grid;
    gap: 1rem;
    background-color: #00509d;
    color: #fff;

    button {
      background-color: #fff;
      border: 1px solid white;
      padding: 0.5rem;
      border-radius: 5px;
    }
    .link1 {
      text-decoration: none;
      color: #00509d;
      font-family: "Courier New", Courier, monospace;
      font-weight: bolder;
      font-size: 18px;
      padding: 0.5rem 8rem;
    }
    .link2 {
      color: #fff;
    }
  }
`;
export default Profile;
