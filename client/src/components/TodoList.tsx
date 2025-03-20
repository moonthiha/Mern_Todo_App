import { useEffect, useState } from "react"
import { deleteTodo, getData, updateTodo } from "../services/todo";
import { TodoType } from "../types/todo";
import { createTodo } from "../services/todo";




function TodoList() {
    const [todos,setTodos] = useState<TodoType[]>([]);
    const [item, setItem] = useState('');
    const [editId, setEditId] = useState("");

    const [editMode,setEditMode] = useState(false);
   

    const handleModeChange = async (title : string , id : string) => {
      setEditMode(true);
      setItem(title);
      setEditId(id);
   };
   

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const responseData = await getData();
                setTodos(responseData)
            } catch (error) {
                throw new Error("Fail to fetch data.");
            }
        };

        fetchApi();

    }, [todos]);

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        try {
          if(item.trim().length === 0){
            return;
          }
          if(editMode){
            await updateTodo(editId,item);
            setEditMode(false);
          }else{
            await createTodo(item);
          }
          setItem("");
        } catch (error) {
          throw new Error('Fail to add item.');
        }
    };

    const todoRemove = async (id : string) => {
        try {
            await deleteTodo(id);
        } catch (error) {
            throw new Error('fail to delete.');
        }
    };

  return (
    <div className="max-w-3xl mx-auto mt-4">
        <div className=" bg-gray-100 px-4 py-4 rounded-md">
        <ul>
            {
                todos.map((todo,index) => <div key={index} className="flex items-center justify-between">
                    <li  className="font-bold py-2">{todo.title}</li>
                    <div>
                    <button onClick={()=>todoRemove(todo._id)} className="bg-red-500 py-2 px-4 rounded-md text-white text-sm my-2 cursor-pointer">Delete</button>
                    <button className="bg-green-400 text-white text-sm py-2 px-4 rounded-md mx-2 cursor-pointer" onClick={()=>handleModeChange(todo.title,todo._id)}>Edit</button>
                    </div>
                </div>)
            }
        </ul>
        </div>
        <div>
            <form onSubmit={handleSubmit} className="flex items-center justify-center gap-4">
                <input type="text" className="border-b-2 w-full mt-6  p-4 focus:outline-none" value={item} onChange={(e) => setItem(e.target.value)}  />
                <button type="button" className="bg-blue-500 text-white px-6 py-2 rounded-md cursor-pointer font-bold">{editMode ? "Update" : "Add"}</button>
            </form>
        </div>
    </div>
  )
}

export default TodoList