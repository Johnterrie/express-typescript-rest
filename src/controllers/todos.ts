import { RequestHandler } from "express"

import Todo, { TodoModel } from "../models/todos"

export const createTodo: RequestHandler = async (req, res) => {
    try {
        const data: TodoModel = req.body;
        console.log("data", data)
        let todos = await Todo.create(data);
        return res.status(200).json({
            message: "Todo created successfully",
            data: todos
        })
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

export const getTodo: RequestHandler = async (req, res) => {
    try {
        let todos = await Todo.find({});
        return res.status(200).json({
            message: "all todos!", data: todos
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const updateTodo: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      var todos = await Todo.findByIdAndUpdate(id, req.body, { new: true });
      return res
        .status(200)
        .json({ message: "Todo updated successfully!", data: todos });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
};

export const deleteTodo: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      var isDeleted = await Todo.findByIdAndDelete(id);
      if (!isDeleted) throw new Error("Failed to delete todo");
      return res.status(200).json({ message: "Todo deleted successfully!" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
  