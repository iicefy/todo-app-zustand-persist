import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type TodoType = {
  id: string;
  content: string;
  isCompleted: boolean;
};

type TodoStoreType = {
  todos: TodoType[];
  addTodo: (todo: TodoType) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, content: string) => void;
  toggleTodo: (id: string) => void;
};

const todoStore: StateCreator<TodoStoreType> = (set) => ({
  todos: [],
  addTodo: (todo: TodoType) =>
    set((state) => ({ todos: [...state.todos, todo] })),
  deleteTodo: (id: string) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
  editTodo: (id: string, content: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, content } : todo
      ),
    })),
  toggleTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ),
    })),
});

export const useTodoStore = create<TodoStoreType>()(
  devtools(
    persist(todoStore, {
      name: "todo-storage",
      partialize: (state) => ({ todos: state.todos }),
    })
  )
);
