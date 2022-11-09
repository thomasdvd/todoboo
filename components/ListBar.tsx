import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { useAtom } from "jotai";
import { HiPlus } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

import { List } from "@lib/schema";
import { postList } from "@lib/api";
import { selectedListAtom } from "@lib/atoms";

export default function ListBar({ lists }: { lists: Array<List> }) {
  const qc = useQueryClient();
  const newRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [selectedList, updateSelected] = useAtom(selectedListAtom);

  const addList = async () => {
    const created = await postList({ id: uuidv4(), name });
    console.log("created list", created);
    qc.invalidateQueries(["todos"]);
  };

  return (
    <>
      {!selectedList && <div>Please select a list</div>}
      <div className="flex h-16 items-center space-x-2">
        {lists &&
          lists.map((list) => {
            return (
              <div key={list.id}>
                <div
                  className={twMerge(
                    "btn-primary btn-sm btn",
                    list.name === selectedList ? "" : "btn-outline"
                  )}
                  onClick={() => {
                    updateSelected(list.name);
                  }}
                >
                  {list.name}
                </div>
              </div>
            );
          })}

        <div className="flex items-center space-x-2">
          <input
            ref={newRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="New List"
            className="input-bordered input input-sm w-36"
          />
          <div
            className="btn-accent btn-sm btn"
            onClick={() => {
              addList();
            }}
          >
            <HiPlus size={25} />
          </div>
        </div>
      </div>
    </>
  );
}
