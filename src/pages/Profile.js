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
          <Link to="/">Back Home</Link>
        </button>
        <Link to="/updateprofile">Update Profile</Link>
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
`;
export default Profile;
