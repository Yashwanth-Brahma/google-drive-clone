import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import AddFileBtn from "../components/AddFileBtn";
import AddFolderBtn from "../components/AddFolderBtn";
import Folder from "../components/Folder";
import Navbar from "../components/Navbar";
import ViewFolderPath from "../components/ViewFolderPath";
import { useFolder } from "../hooks/useFolder";
import File from "../components/File";
import styled from "styled-components";

const Home = () => {
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const { state = {} } = useLocation();
  const { folderid } = useParams();
  const { folder, childFolder, childFile } = useFolder(folderid, state.folder);

  return (
    <Wrapper>
      <Navbar />
      <div className="container">
        <div className="header">
          <ViewFolderPath currentFolder={folder} />
          <div className="add1">
            <AddFolderBtn currentFolder={folder} />
            <AddFileBtn
              currentFolder={folder}
              setProgress={setProgress}
              setError={setError}
            />
          </div>
        </div>
        {childFolder.length > 0 && (
          <div className="folder">
            {childFolder.map((child) => {
              return (
                <div key={child.id}>
                  <Folder folder={child} />
                </div>
              );
            })}
          </div>
        )}
        {childFolder.length > 0 && childFile.length > 0 && <hr />}
        {progress > 0 && (
          <p
            style={{
              maxWidth: `${progress}%`,
              backgroundColor: "blue",
              height: "5px",
            }}></p>
        )}
        {error && <p>{error}</p>}
        {childFile.length > 0 && (
          <div className="file">
            {childFile.map((child) => {
              return (
                <div key={child.id}>
                  <File file={child} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .add1 {
    display: flex;
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    margin-bottom: 2rem;
    background-color: #e8eddf;
    padding: 0.5rem 0.3rem;
    border-radius: 5px;
  }
  .folder {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
    margin: 2rem 0;
  }
  .file {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
    margin: 2rem 0;
  }
`;

export default Home;
