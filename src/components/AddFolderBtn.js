import React, { useState } from "react";
import { BiFolderPlus } from "react-icons/bi";
import styled from "styled-components";
import { useGlobalContext } from "../context/AuthProvider";
import { database } from "../firebase/firebaseConfig";
import { ROOT_FOLDER } from "../hooks/useFolder";

const AddFolderBtn = ({ currentFolder }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const { currentUser } = useGlobalContext();

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentFolder === null || name === "") return;
    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }
    database.folder.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      currentTimeStamp: database.currentTimeStamp(),
      path: path,
    });
    setName("");
    setOpen(false);
  };
  return (
    <Wrapper>
      <p onClick={openModal} className="add">
        <BiFolderPlus />
      </p>
      {open && (
        <div
          onClick={(e) => {
            if (e.target.classList.contains("modal")) {
              closeModal();
            }
          }}
          className="modal">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="foldername"
              id="foldername"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="btn1">
              <button onClick={closeModal}>Close</button>
              <button type="submit">Add Folder</button>
            </div>
          </form>
        </div>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    padding-top: 3rem;
  }
  form {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 2rem;
    max-height: fit-content;
    width: 400px;
    height: 100px;
    border-radius: 5px;

    input {
      height: 20px;
      margin-bottom: 2rem;
      padding: 0.5rem 1rem;
    }
    .btn1 {
      display: flex;
      justify-content: flex-end;
      button {
        color: #38b000;
        border: 1px solid #38b000;
        margin-left: 1rem;
        background-color: #fff;
        padding: 00.3rem 0.8rem;
        border-radius: 4px;
      }
      button:hover {
        color: #fff;
        background-color: #38b000;
      }
    }
  }
  .add {
    color: #38b000;
    border: 2px solid #38b000;
    padding: 0.4rem 0.3rem;
    border-radius: 4px;
    background-color: #fff;
  }
  .add:hover {
    color: white;
    background-color: #38b000;
  }
`;
export default AddFolderBtn;
