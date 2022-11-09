import { HiCheck, HiPencil, HiTrash, HiX } from "react-icons/hi";
import { useRef, useState, useMemo } from "react";
import { useAtom } from "jotai";
import { matchSorter } from "match-sorter";

import { List, ToDo } from "@lib/schema";
import { selectedListAtom, todoAtom, todoStatusAtom } from "@lib/atoms";
import { deleteTodo } from "@lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { anyDateToHRF } from "@lib/utils";
import { twMerge } from "tailwind-merge";

export default function Todos({ lists }: { lists: Array<List> }) {
  const router = useRouter();
  const searchRef = useRef(null);
  const [search, setSearch] = useState("");
  const [, updateTodo] = useAtom(todoAtom);
  const [selectedList] = useAtom(selectedListAtom);
  const [selectedStatus, updateStatus] = useAtom(todoStatusAtom);
  const qc = useQueryClient();

  // use a combination of search, selectedList and selectedStatus
  const filteredTodos = useMemo(() => {
    let todos: ToDo[] = [];

    lists.forEach((list) => {
      if (list.name === selectedList) {
        todos =
          list.todos?.filter((todo) => {
            // check selectedStatus
            if (selectedStatus === "all") {
              return true;
            } else if (selectedStatus === "active") {
              return !todo.completed;
            } else if (selectedStatus === "completed") {
              return todo.completed;
            }
            return false;
          }) || [];
      }
    });

    const searched = matchSorter(todos, search, {
      keys: ["title", "description"],
    });

    return searched;
  }, [lists, selectedList, selectedStatus, search]);

  const deleteOne = async (todo: ToDo) => {
    try {
      await deleteTodo(todo);
      qc.invalidateQueries(["todos"]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <div className="flex h-16 items-center space-x-2">
          <input
            ref={searchRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search..."
            className="input-bordered input input-sm w-36"
          />
          <div
            className="btn-outline btn-sm btn"
            onClick={() => {
              setSearch("");
            }}
          >
            <HiX size={25} />
          </div>
        </div>

        <div className="flex">
          <div className="form-control" onClick={() => updateStatus("all")}>
            <label className="label cursor-pointer">
              <span className="label-text mx-2">All</span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-blue-500 active:bg-blue-500"
                checked={selectedStatus === "all"}
              />
            </label>
          </div>
          <div className="form-control" onClick={() => updateStatus("active")}>
            <label className="label cursor-pointer">
              <span className="label-text mx-2 ">Active</span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-amber-400"
                checked={selectedStatus === "active"}
              />
            </label>
          </div>
          <div
            className="form-control"
            onClick={() => updateStatus("completed")}
          >
            <label className="label cursor-pointer">
              <span className="label-text mx-2">Completed</span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-emerald-500"
                checked={selectedStatus === "completed"}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        {filteredTodos.map((todo) => {
          return (
            <div
              key={todo.id}
              className="flex items-center space-x-2 border-b border-b-slate-700 py-2 text-lg"
            >
              <div
                className="btn-sm btn"
                onClick={() => {
                  deleteOne(todo);
                }}
              >
                <HiTrash size={20} />
              </div>
              <div
                className="btn-sm btn"
                onClick={() => {
                  updateTodo(todo);
                  router.push(`/${todo.id}`);
                }}
              >
                <HiPencil size={20} />
              </div>
              <div
                className={twMerge(
                  "btn-sm btn w-12",
                  todo.completed ? "btn-accent" : "btn-disabled"
                )}
              >
                {todo.completed ? <HiCheck size={25} strokeWidth={3} /> : ""}
              </div>
              <div className="w-36">{todo.title}</div>
              <div className="w-48">{todo.description}</div>
              <div className="w-44">{anyDateToHRF(todo.due)}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
