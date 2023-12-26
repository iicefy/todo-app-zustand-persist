"use client";

import { useTodoStore } from "@/store/store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const TodoHeader = () => {
  const { addTodo } = useTodoStore();
  const [todoInput, setTodoInput] = useState("");

  const createTodo = () => {
    addTodo({
      id: uuidv4(),
      content: todoInput,
      isCompleted: false,
    });
    setTodoInput("");
  };

  return (
    <div className="flex gap-2">
      <Input
        onChange={(e) => setTodoInput(e.target.value)}
        value={todoInput}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createTodo();
          }
        }}
      />
      <Button onClick={createTodo} disabled={todoInput === ""}>
        Add
      </Button>
    </div>
  );
};

export default TodoHeader;
