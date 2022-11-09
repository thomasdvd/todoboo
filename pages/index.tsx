// node_modules
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { HiPlus } from "react-icons/hi";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useAtom } from "jotai";
// files
import { getLists } from "@lib/api";
import ListBar from "@components/ListBar";
import Todos from "@components/Todos";
import { listsAtom, selectedListAtom, todoAtom } from "@lib/atoms";
import Header from "@components/Header";

export default function Page() {
  const router = useRouter();

  // application state
  const [, setTodo] = useAtom(todoAtom);
  const [myLists, updateLists] = useAtom(listsAtom);
  const [selectedList] = useAtom(selectedListAtom);

  // server state (managed directly with database)
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getLists,
  });

  const gotoNewTodo = () => {
    const createdId = uuidv4();
    setTodo({
      completed: false,
      description: "",
      due: new Date().toISOString(),
      id: createdId,
      listId: myLists.find((list) => list.name === selectedList)?.id ?? "",
      title: "",
    });
    router.push(`/${createdId}`);
  };

  useEffect(() => {
    if (!isLoading && data && !("error" in data) && data) updateLists(data);
  }, [data, isLoading, updateLists]);

  if (!isLoading && data && "error" in data) {
    // will render error page
    throw new Error(data.error);
  }

  return (
    <>
      <Header />

      <div className="mx-auto w-3/4 p-2">
        <main>
          <div>
            <div className="mb-2 text-3xl font-semibold">My Lists</div>
          </div>

          {data && Array.isArray(data) && <ListBar lists={data} />}

          <div className="my-4 border-b" />

          <div>
            <div className="mb-2 text-3xl font-semibold">Todos</div>
          </div>

          <div className="btn-accent btn-sm btn" onClick={gotoNewTodo}>
            New
            <HiPlus size={20} />
          </div>

          {data && Array.isArray(data) && <Todos lists={data} />}
        </main>
      </div>
    </>
  );
}
