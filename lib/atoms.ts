import { atom } from "jotai";
import { List, ToDo } from "./schema";

// frontend state management
// ! combined with server state using @tanstack/react-query

export const selectedListAtom = atom("");

export const todoStatusAtom = atom<"all" | "completed" | "active">("all");

export const todoAtom = atom<ToDo | null>(null);

export const listsAtom = atom<Array<List>>([]);
