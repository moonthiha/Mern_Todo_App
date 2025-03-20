import { TodoType } from "../types/todo";

const API_URL = import.meta.env.VITE_MODE === "development" ? import.meta.env.VITE_LOCAL_API_URL : import.meta.env.VITE_API_URL;
console.log(API_URL);

export const getData = async () :Promise<TodoType[]> => {
    const response = await fetch(API_URL);
    const rawData = await response.json();
    return rawData.data;
};

export const createTodo = async (title : string) :Promise<TodoType> => {
    const response = await fetch(`${API_URL}/add`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({title}),
    });

    const data = await response.json();
    return data.data;
};

export const deleteTodo = async (id:string) => {
    await fetch(`${API_URL}/delete/${id}`, {
        method : "DELETE",
    });
};

export const updateTodo = async (id:string, title:string) => {
    const response = await fetch(`${API_URL}/update/${id}`, {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({title}),
    });

    const data = await response.json();
    return data.data;
} 