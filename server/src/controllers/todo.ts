import { Request, Response } from "express";
import { Todo } from "../models/Todo";

export const createTodo = async (req : Request,res :Response) => {
    try {
        const {title} = req.body;
        const newTodo = await Todo.create({
            title : title
        });
        res.status(201).json({message : "new todo added.", data : newTodo});
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "something went wrong."});
    }
};

export const getSingleTodo = async (req : Request , res : Response) => {
    // const id = req.params;
   try {
    const getData = await Todo.findById({_id : req.params.id});
    if(!getData){
        res.status(404).json({message : "Todo not found"});
        return;
    }
    res.status(200).json({message : "Searching Single Todo", data : getData});

   } catch (error) {
    console.log(error);
    res.status(500).json({message : "something went wrong."});
   }
};

export const getAllTodo = async (req : Request , res : Response) => {
    try {
        const getAllData = await Todo.find();
        if(!getAllData){
            return;
        };
        res.status(200).json({message : 'Searching All Todo', data : getAllData});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "server is something wrong."});
        
    }
};

export const deleteTodo = async (req : Request , res : Response) => {
    try {
        const {id} = req.params;
        const findTodo = await Todo.findById({_id : id});
        if(!findTodo){
            res.status(404).json({message : "Delete Todo Not Found."});
            return;
        }
        await Todo.findByIdAndDelete({_id : id});
        const remainData = await Todo.find();
        res.status(200).json({message : "Delete Todo Success.", data : remainData});
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "something went wrong."})
    }
};


export const updateTodo = async (req : Request, res : Response) => {
    const {id} = req.params;
    const {title} = req.body;
    try {
        const updateTodo = await Todo.findById({_id : id});
        if(!updateTodo){
            res.status(404).json({message : "Update Todo Not Found."});
            return;
        }
        const updatedTodo = await Todo.findByIdAndUpdate(id, {
            title : title,
        });
        const newTodo = await Todo.findById(id);
        
        res.status(200).json({message : "Todo Updated success.", data : newTodo});
    } catch (error) {
        
    }
};
