import React, { useState } from "react";
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
const addTodo = (e, todos, setTodos, value, resetValue) => {
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
  setTodos([...todos, { completed: false, value }]);
  resetValue();
};
const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: e => setValue(e.target.value),
    resetValue: () => setValue(""),
    updatedValue: (todo, todos, setTodos) => {
      setValue(todo.value);
      const updatedTodos = todos.filter(
        localTodo => localTodo.value !== todo.value
      );
      setTodos([...updatedTodos]);
    }
  };
};

const handleToggle = (todo, todos, setTodos) => {
  const updatedTodos = todos.map(localTodo => {
    if (localTodo.value === todo.value) {
      localTodo.completed = !localTodo.completed;
    }
    return localTodo;
  });
  setTodos([...updatedTodos]);
};

const deleteTodo = (todo, todos, setTodos) => {
  const updatedTodos = todos.filter(
    localTodo => localTodo.value !== todo.value
  );
  setTodos([...updatedTodos]);
};

export default function TempTodos() {
  const [todos, setTodos] = useState([]);
  const { resetValue, updatedValue, ...text } = useInputValue("");

  return (
    <div style={{ maxWidth: "90%", margin: "0 auto", marginTop: 10 }}>
      <form
        onSubmit={e => {
          addTodo(e, todos, setTodos, text.value, resetValue);
        }}
      >
        <TextField
          {...text}
          id="outlined-full-width"
          label="Todo"
          style={{ margin: 8 }}
          placeholder="Enter your TODO Here!!"
          helperText="Press Enter To ADD TODO!"
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
        />
      </form>
      <TransitionGroup component={List} className="List">
        {todos.map(todo => (
          <CSSTransition key={todo.value} classNames="fade" timeout={500}>
            <ListItem
              role={undefined}
              dense
              button
              onClick={() => handleToggle(todo, todos, setTodos)}
            >
              <Checkbox checked={todo.completed} tabIndex={-1} disableRipple />
              <ListItemText
                style={{
                  fontSize: 16,
                  textDecoration: todo.completed ? "line-through" : ""
                }}
                primary={todo.value}
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="Edit">
                  <Create onClick={() => updatedValue(todo, todos, setTodos)} />
                </IconButton>
                <IconButton aria-label="Delete">
                  <DeleteForever
                    onClick={() => {
                      deleteTodo(todo, todos, setTodos);
                    }}
                  />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
