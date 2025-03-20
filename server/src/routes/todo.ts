import { Router } from "express";
import { createTodo, deleteTodo, getAllTodo, getSingleTodo, updateTodo } from "../controllers/todo";

const todoRoute = Router();

todoRoute.post("/add", createTodo );
todoRoute.get("/:id", getSingleTodo);
todoRoute.get("/",getAllTodo);
todoRoute.delete("/delete/:id",deleteTodo);
todoRoute.put("/update/:id", updateTodo);

export default todoRoute;