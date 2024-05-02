import { exists } from "fs";
import { TodoItem } from "./components/TodoItem";
import prisma from "./db";
import Link from "next/link";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, completed: boolean) {
  "use server";
  const exists = await prisma.todo.count({ where: { id: id } });
  if (exists > 0) {
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        completed,
      },
    });
  }
}

async function deleteTodo(id: string) {
  "use server";
  const exists = await prisma.todo.count({ where: { id: id } });
  if (exists > 0) {
    console.log("DELETED");
    await prisma.todo.delete({
      where: {
        id: id,
      },
    });
  }
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mt-4">
        <h1 className="text-4xl">Todos</h1>
        <Link href="/new" className="hover:text-red-400">
          New
        </Link>
      </header>
      <ul className="py-4 flex flex-col gap-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            complete={todo.completed}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </>
  );
}
