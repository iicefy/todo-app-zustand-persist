"use client";

import { useTodoStore } from "@/store/store";
import TodoCard from "./TodoCard";


const TodoList = () => {
  const { todos } = useTodoStore();

  if (todos.length === 0) return <p className="text-xl">No todos.</p>;

  return (
    <div className="gap-4 flex flex-col">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
