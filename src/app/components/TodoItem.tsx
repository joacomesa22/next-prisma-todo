"use client";
import prisma from "../db";

type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
  deleteTodo: (id: string) => void;
};

export function TodoItem({
  id,
  title,
  complete,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) {
  return (
    <li className="flex items-center gap-2">
      <div className="flex gap-2 items-center">
        <input
          id={id}
          type="checkbox"
          className="cursor-pointer peer"
          defaultChecked={complete}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        <label
          htmlFor={id}
          className="cursor-pointer peer-checked:line-through peer-checked:text-red-400 text-lg"
        >
          {title}
        </label>
      </div>
      <button onClick={() => deleteTodo(id)}>
        <img
          src="can.png"
          alt="can icon"
          className="max-w-[20px] hover:scale-110 duration-100"
        />
      </button>
    </li>
  );
}
