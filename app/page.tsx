import TodoHeader from "@/components/todo/TodoHeader";
import dynamic from "next/dynamic";

const TodoList = dynamic(() => import('@/components/todo/TodoList'), { ssr: false })

export default function Home() {

  return (
    <div className="flex flex-col p-4 gap-4">
      <h2 className="text-2xl font-bold tracking-tight py-4">TODO list.</h2>
      <TodoHeader />
      <TodoList />
    </div>
  );
}
