import mongoose, { Schema } from "mongoose";

const TodoShema = new Schema({
    title : {
        type : String,
        required : true,
    }
});

export const Todo = mongoose.model("Todos", TodoShema);