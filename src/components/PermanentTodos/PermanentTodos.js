import React, { useContext } from "react";
import AuthContext from "../../Context/auth";
import Todo from "./Todo";
import Login from "./Login";
export default function PermanentTodos() {
  const { isAuth } = useContext(AuthContext);

  return <div>{isAuth ? <Todo /> : <Login />}</div>;
}
