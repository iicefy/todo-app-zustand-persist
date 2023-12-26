"use client";

import { TodoType, useTodoStore } from "@/store/store";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

const TodoCard = ({ todo }: { todo: TodoType }) => {
  const { deleteTodo, toggleTodo, editTodo } = useTodoStore();
  const [editInput, setEditInput] = useState(todo.content);
  const [editState, setEditState] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editState) {
      editInputRef.current?.focus();
    }
  }, [editState]);

  const saveEditTodo = () => {
    editTodo(todo.id, editInput);
    setEditState(false);
  };

  const discardEditTodo = () => {
    setEditInput(todo.content);
    setEditState(false);
  };

  return (
    <div className="p-4 border border-solid border-slate-200 flex justify-between items-center rounded-lg gap-4">
      <div className="flex gap-4 items-center w-full">
        <Checkbox
          checked={todo.isCompleted}
          onClick={() => toggleTodo(todo.id)}
        />
        {editState ? (
          <Input
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            onBlur={() => discardEditTodo()}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (editInput === "") {
                  discardEditTodo();
                } else {
                  saveEditTodo();
                }
              }
            }}
            ref={editInputRef}
            className="text-xl font-bold tracking-tight border-none p-0"
          />
        ) : (
          <div
            className="flex gap-2 items-center"
            onClick={() => {
              setEditState(true);
            }}
          >
            <p className="text-xl font-bold tracking-tight">{todo.content}</p>
            <Icon icon="bx:edit" style={{ fontSize: "20px" }} />
          </div>
        )}
      </div>
      <Button variant={"destructive"} onClick={() => deleteTodo(todo.id)}>
        Delete
      </Button>
    </div>
  );
};

export default TodoCard;
