import React, { useEffect, useState } from "react";
import firebase from "../../../Firebase/firebase";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Create from "@material-ui/icons/Create";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import Spinner from "../../Spinner";
const db = firebase.firestore();

const addTodo = async (e, todos, setTodos, setLoading, value, resetValue) => {
  e.preventDefault();
  if (value.trim() === "") {
    return;
  }

  for (const todo of todos) {
    if (todo.value === value) {
      resetValue();
      return;
    }
  }
  setLoading(true);
  await db
    .collection("users")
    .doc(localStorage.getItem("userId"))
    .update({
      todos: firebase.firestore.FieldValue.arrayUnion({
        completed: false,
        value
      })
    });
  setLoading(false);
  setTodos([...todos, { completed: false, value }]);

  resetValue();
};

const handleToggle = async (todo, todos, setLoading, setTodos) => {
  setLoading(true);
  const updatedTodos = todos.map(localTodo => {
    if (localTodo.value === todo.value) {
      localTodo.completed = !localTodo.completed;
    }
    return localTodo;
  });
  await db
    .collection("users")
    .doc(localStorage.getItem("userId"))
    .update({ todos: updatedTodos });

  setLoading(false);
  setTodos([...updatedTodos]);
};

const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: e => setValue(e.target.value),
    resetValue: () => setValue(""),
    updatedValue: async (todo, todos, setLoading, setTodos) => {
      setValue(todo.value);
      setLoading(true);

      const updatedTodos = todos.filter(
        localTodo => localTodo.value !== todo.value
      );
      await db
        .collection("users")
        .doc(localStorage.getItem("userId"))
        .update({ todos: updatedTodos });

      setLoading(false);
      setTodos([...updatedTodos]);
    }
  };
};
const deleteTodo = async (todo, todos, setLoading, setTodos) => {
  setLoading(true);
  const updatedTodos = todos.filter(
    localTodo => localTodo.value !== todo.value
  );
  await db
    .collection("users")
    .doc(localStorage.getItem("userId"))
    .update({ todos: updatedTodos });

  setLoading(false);
  setTodos([...updatedTodos]);
};
export default function Todo() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const { resetValue, updatedValue, ...text } = useInputValue("");

  useEffect(async () => {
    const todos = await db
      .collection("users")
      .where(
        firebase.firestore.FieldPath.documentId(),
        "==",
        localStorage.getItem("userId")
      )
      .get();
    todos.forEach(doc => {
      console.log("doc", doc.data());

      setLoading(false);
      setTodos(doc.data().todos);
    });
  }, []);

  return (
    <div style={{ maxWidth: "90%", margin: "0 auto", marginTop: 10 }}>
      <form
        onSubmit={e => {
          addTodo(e, todos, setTodos, setLoading, text.value, resetValue);
        }}
      >
        <TextField
          {...text}
          id="outlined-full-width"
          label="Todo"
          style={{ margin: 8 }}
          placeholder="Enter your TODO Here!!"
          helperText="Press Enter To ADD TODO!(These TODO will live in browser Storage)"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
        />
      </form>
      {loading ? (
        <Spinner />
      ) : (
        <TransitionGroup component={List} className="List">
          {todos.map(todo => (
            <CSSTransition key={todo.value} classNames="fade" timeout={500}>
              <ListItem
                role={undefined}
                dense
                button
                onClick={() => handleToggle(todo, todos, setLoading, setTodos)}
              >
                <Checkbox
                  checked={todo.completed}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText
                  style={{
                    fontSize: 16,
                    textDecoration: todo.completed ? "line-through" : ""
                  }}
                  primary={todo.value}
                />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Edit">
                    <Create
                      onClick={() =>
                        updatedValue(todo, todos, setLoading, setTodos)
                      }
                    />
                  </IconButton>
                  <IconButton aria-label="Delete">
                    <DeleteForever
                      onClick={() => {
                        deleteTodo(todo, todos, setLoading, setTodos);
                      }}
                    />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </div>
  );
}
