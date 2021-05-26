import React from "react";
import { database, storage } from "../firebase/firebaseConfig";

import { AiOutlineFileAdd } from "react-icons/ai";
import { ROOT_FOLDER } from "../hooks/useFolder";
import { useGlobalContext } from "../context/AuthProvider";
import styled from "styled-components";
const AddFileBtn = ({ currentFolder, setProgress, setError }) => {
  const { currentUser } = useGlobalContext();

  const handleOnchange = (e) => {
    const file = e.target.files[0];
    if (currentFolder === null || file === null) return;

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file);
    try {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progressVal =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressVal);
        },
        () => {},
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            database.files
              .where("name", "==", file.name)
              .where("userId", "==", currentUser.uid)
              .where("folderId", "==", currentFolder.id)
              .get()
              .then((existingFiles) => {
                const existingFile = existingFiles.docs[0];
                if (existingFile) {
                  existingFile.ref.update({ url: url });
                  setProgress(0);
                } else {
                  database.files.add({
                    url: url,
                    name: file.name,
                    currentTimeStamp: database.currentTimeStamp(),
                    userId: currentUser.uid,
                    folderId: currentFolder.id,
                  });
                  setProgress(0);
                }
              });
          });
        }
      );
    } catch (err) {
      setError("file upload error");
      console.log(err);
    }
  };
  return (
    <Wrapper>
      <button className="add">
        <label htmlFor="file">
          <AiOutlineFileAdd />
          <input
            type="file"
            onChange={handleOnchange}
            style={{
              opacity: 0,
              position: "absolute",
              left: "-9999px",
              padding: "0",
              margin: "0",
              height: "0",
            }}
            id="file"
          />
        </label>
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  label {
    padding: 0.8rem 0.4rem;
    width: 50px;
    height: 50px;
  }
  .add {
    color: #38b000;
    border: 2px solid #38b000;
    padding: 0.56rem 0;
    border-radius: 4px;
    /* position: absolute; */
    margin: 0 1rem;
    background-color: #fff;
  }
  .add:hover {
    color: white;
    background-color: #38b000;
  }
`;
export default AddFileBtn;
