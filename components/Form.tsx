import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { postTodo } from "@lib/api";
import { listsAtom } from "@lib/atoms";
import { dueDateToDate } from "@lib/utils";
import { ToDo, todoSchema } from "@lib/schema";

export default function Form({ todo }: { todo: ToDo | null }) {
  const router = useRouter();

  const [lists] = useAtom(listsAtom);

  const qc = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ToDo>({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit = async (formData: ToDo) => {
    console.log("formData", formData);
    const posted = await postTodo({
      id: formData.id,
      title: formData.title,
      description: formData.description,
      completed: formData.completed,
      due: dueDateToDate(formData.due),
      listId: formData.listId,
    });
    console.log("new todo", posted);
    qc.invalidateQueries(["todos"]);
    reset();
    router.replace("/");
  };

  // reset form data based on atom
  useEffect(() => {
    if (todo) {
      const dateFromJsonApi = todo.due as string | null;
      const dateString = dateFromJsonApi?.slice(0, -8) ?? null;
      reset({
        ...todo,
        due: dateString,
      });
    } else {
      reset({
        completed: false,
        description: "",
        due: new Date(),
        title: "",
      });
    }
  }, [reset, todo]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid w-96 grid-cols-[1fr,2fr] items-center gap-4 text-xl text-slate-800"
    >
      <label className="text-slate-200">Title</label>
      <div>
        <input
          className="form-input m-1 rounded-md text-slate-800 outline"
          {...register("title")}
        />
        <p className="text-slate-100">{errors.title?.message}</p>
      </div>

      <label className="text-slate-200">Description</label>
      <div>
        <input
          type="textarea"
          className="textarea form-input m-1 rounded-md outline"
          {...register("description")}
        />
        <p className="text-slate-100">{errors.description?.message}</p>
      </div>

      <label className="text-slate-200">Due Date</label>
      <div>
        <input
          style={{ colorScheme: "light" }}
          className="form-input m-1 rounded-md outline"
          type="datetime-local"
          {...register("due", {
            setValueAs(value) {
              try {
                const tryCast = new Date(value);
                if (tryCast instanceof Date) {
                  return tryCast;
                } else {
                  return null;
                }
              } catch (err) {
                console.log(err);
                return null;
              }
            },
          })}
        />
        <p className="text-slate-100">{errors.due?.message}</p>
      </div>

      <label className="text-slate-200">List</label>
      <div>
        <select
          className="form-select m-1 rounded-md text-slate-800 outline"
          {...register("listId")}
        >
          {lists.length > 0 &&
            lists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
        </select>
        <p className="text-slate-100">{errors.listId?.message}</p>
      </div>

      <label className="mr-4 w-44 cursor-pointer pr-4 text-slate-100">
        Completed
      </label>
      <input
        type="checkbox"
        {...register("completed")}
        className="checkbox-primary checkbox px-4"
      />

      <div>
        <p className="text-slate-100">{errors.completed?.message}</p>
      </div>

      <button
        type="submit"
        className="col-span-full mx-auto mb-4 w-fit rounded-md bg-gray-300 p-2"
      >
        submit
      </button>
    </form>
  );
}
