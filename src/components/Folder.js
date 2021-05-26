import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiFillFolder } from "react-icons/ai";

const Folder = ({ folder }) => {
  return (
    <Wrapper>
      <Link
        className="link"
        to={{
          pathname: `/folder/${folder.id}`,
          state: { folder: folder },
        }}>
        <AiFillFolder /> {folder.name}
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .link {
    text-decoration: none;
    color: #4a5759;
    padding: 0.5rem 1rem;
    border: 1px solid #4a5759;
    width: max-content;
    border-radius: 5px;
  }
  .link:hover {
    color: #fff;
    background-color: #4a5759;
  }
`;
export default Folder;
