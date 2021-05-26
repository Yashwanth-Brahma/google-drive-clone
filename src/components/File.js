import React from "react";
import { AiFillFile } from "react-icons/ai";
import styled from "styled-components";
const File = ({ file }) => {
  return (
    <Wrapper>
      <a
        className="link"
        href={file.url}
        target="_blank"
        rel="noopener noreferrer">
        <AiFillFile /> {file.name}
      </a>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .link {
    text-decoration: none;
    color: #4a5759;
    padding: 0.5rem 1rem;
    border: 1px solid #4a5759;
    width: fit-content;
    max-width: 170px;
    border-radius: 5px;
  }
  .link:hover {
    color: #fff;
    background-color: #4a5759;
  }
`;

export default File;
