import React, { useState, Suspense, useEffect } from "react";
import NavBar from "./components/NavBar";
import SelectTodo from "./components/SelectTodos";
import Spinner from "./components/Spinner";
import AuthContext from "./Context/auth";

import firebase, { authSocial, googleProvider } from "./Firebase/firebase";
const db = firebase.firestore();
const TempTodos = React.lazy(() => import("./components/TempTodos/TempTodos"));
const PriestTodos = React.lazy(() => import("./components/PriestTodos"));
const PermanentTodos = React.lazy(() => import("./components/PermanentTodos"));

const current = currentTodo => {
  switch (currentTodo) {
    case "TEMP TODOS":
      return <TempTodos />;
    case "PRIEST TODOS":
      return <PriestTodos />;
    case "PERMANENT TODOS":
      return <PermanentTodos />;
    case "HOME":
      return null;
    default:
      return null;
  }
};

export default function App() {
  const [currentTodo, setTodos] = useState(null);
  const [isAuth, setAuth] = useState(false);
  const setTodo = currentTodo => {
    setTodos(currentTodo);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
  }, []);

  const googleLogin = async () => {
    authSocial
      .signInWithPopup(googleProvider)
      .then(result => {
        localStorage.setItem("token", result.user.qa);
        localStorage.setItem("userId", result.user.uid);
        const collection = db.collection("users");
        const userID = localStorage.getItem("userId"); // ID after created the user.
        collection
          .doc(userID)
          .get()

          .then(doc => {
            if (doc.exists) {
              setAuth(true);

              return;
            } else {
              collection.doc(userID).set({
                uid: userID,
                todos: []
              });
              setAuth(true);
            }
          });
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <AuthContext.Provider value={{ googleLogin, isAuth }}>
      <NavBar backToHome={setTodo} />

      {current(currentTodo) !== null ? (
        <Suspense fallback={Spinner}>{current(currentTodo)}</Suspense>
      ) : (
        <SelectTodo cuurentTodo={setTodo} />
      )}
    </AuthContext.Provider>
  );
}
