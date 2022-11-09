import Link from "next/link";
import { useAtom } from "jotai";
import { HiArrowLeft } from "react-icons/hi";

import { todoAtom } from "@lib/atoms";
import { dueDateToDate } from "@lib/utils";

import Form from "@components/Form";
import Header from "@components/Header";
import CountDown from "@components/CountDown";

export default function ToDoPage() {
  const [todo, setTodo] = useAtom(todoAtom);

  return (
    <>
      <Header />

      <div className="mx-auto w-96">
        <Link href="/">
          <div className="btn" onClick={() => setTodo(null)}>
            <HiArrowLeft size={20} />
          </div>
        </Link>

        {/* todo?.due check for null, so dueDateToDate is Date */}
        {todo?.due && todo?.title && (
          <CountDown deadline={dueDateToDate(todo.due) as Date} />
        )}

        <Form todo={todo} />
      </div>
    </>
  );
}
