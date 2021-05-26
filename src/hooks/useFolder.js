import { useEffect, useReducer } from "react";
import { useGlobalContext } from "../context/AuthProvider";
import { database } from "../firebase/firebaseConfig";

const ACTION = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS: "set-child-folder",
  SET_CHILD_FILES: "set-child-files",
};

export const ROOT_FOLDER = { name: "root", id: null, path: [] };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolder: [],
        childFile: [],
      };
    case ACTION.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTION.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolder: payload.childFolder,
      };

    case ACTION.SET_CHILD_FILES:
      return {
        ...state,
        childFile: payload.childFile,
      };
    default:
      return state;
  }
};

export const useFolder = (folderId = null, folder = null) => {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolder: [],
    childFile: [],
  });
  const { currentUser } = useGlobalContext();
  useEffect(() => {
    dispatch({ type: ACTION.SELECT_FOLDER, payload: { folderId, folder } });
  }, [folder, folderId]);

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTION.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }
    database.folder
      .doc(folderId)
      .get()
      .then((doc) => {
        dispatch({
          type: ACTION.UPDATE_FOLDER,
          payload: { folder: database.formatDoc(doc) },
        });
      })
      .catch(() => {
        dispatch({
          type: ACTION.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  useEffect(() => {
    return database.folder
      .where("parentId", "==", folderId)
      .where("userId", "==", currentUser.uid)
      .orderBy("currentTimeStamp")
      .onSnapshot((snap) => {
        dispatch({
          type: ACTION.SET_CHILD_FOLDERS,
          payload: { childFolder: snap.docs.map(database.formatDoc) },
        });
      });
  }, [folderId, currentUser]);

  useEffect(() => {
    return database.files
      .where("folderId", "==", folderId)
      .where("userId", "==", currentUser.uid)
      .orderBy("currentTimeStamp")
      .onSnapshot((snap) => {
        dispatch({
          type: ACTION.SET_CHILD_FILES,
          payload: { childFile: snap.docs.map(database.formatDoc) },
        });
      });
  }, [folderId, currentUser]);

  return state;
};
