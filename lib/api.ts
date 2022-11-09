import { List, ToDo } from "./schema";

/**
 * frontend api services
 *
 * @warning uses type assertion
 *
 * I reccomend trpc for end-to-end type safety
 */

export const getLists = async () => {
  try {
    const res = await fetch(`/api/list`);
    const lists = await res.json();
    return lists as Array<List> | { error: string };
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const postTodo = async (todo: ToDo) => {
  const rawResponse = await fetch(`/api/todo`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  const content = await rawResponse.json();

  return content;
};

export const putTodo = async (todo: ToDo) => {
  const res = await fetch(`/api/todo`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  const content = await res.json();

  return content;
};

export const deleteTodo = async (todo: ToDo) => {
  const res = await fetch(`/api/todo`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  const content = await res.json();

  return content;
};

export const postList = async (list: List) => {
  const rawResponse = await fetch(`/api/list`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });

  const content = await rawResponse.json();

  return content;
};
