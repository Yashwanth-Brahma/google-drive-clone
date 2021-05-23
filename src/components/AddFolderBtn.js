import React, { useState } from "react";
import { BiFolderPlus } from "react-icons/bi";
import styled from "styled-components";
import { useGlobalContext } from "../context/AuthProvider";
import { database } from "../firebase/firebaseConfig";

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

    if (currentFolder === null) return;

    database.folder.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      currentTimeStamp: database.currentTimeStamp(),
    });
    setName("");
    setOpen(false);
  };
  return (
    <Wrapper>
      <button onClick={openModal}>
        <BiFolderPlus />
      </button>
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
    input {
      height: 20px;
      margin-bottom: 2rem;
      padding: 0.5rem 1rem;
    }
    .btn1 {
      display: flex;
      justify-content: right;
    }
  }
`;
export default AddFolderBtn;
