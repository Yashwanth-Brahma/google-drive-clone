import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROOT_FOLDER } from "../hooks/useFolder";

const ViewFolderPath = ({ currentFolder }) => {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];

  if (currentFolder) path = [...path, ...currentFolder.path];

  return (
    <Wrapper>
      {path.map((folder, index) => {
        return (
          <Link
            className="link"
            to={{
              pathname: folder.id ? `/folder/${folder.id}` : "/",
              state: { folder: { ...folder, path: path.slice(1, index) } },
            }}
            key={folder.id}>
            {folder.name}/
          </Link>
        );
      })}
      {currentFolder && <span>{currentFolder.name}</span>}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  text-transform: capitalize;
  padding-top: 0.5rem;
  .link {
    text-decoration: none;
    color: #219ebc;
  }
  span {
    color: #adb5bd;
  }
`;

export default ViewFolderPath;
