const express = require("express");
const { v4: uuidv4 } = require("uuid");
const {update_object} = require('./utils/helper');

const app = express();
const PORT = 3000;
app.use(express.json());
let task_list = [];

app.get("/tasks", (req, res) => {
    res.status(200).json({
        msg: "success",
        data: task_list,
    });
});
app.get("/tasks/:id", (req, res) => {
    const task_id = req.params.id;
    const target_task = task_list.find((task) => {
        return task_id === task.id;
    });
    if (!target_task) {
        res.status(404).json({ msg: "requested task not found" });
    }
    res.status(200).json({
        msg: "success",
        data: target_task,
    });
});
app.post("/add_task", (req, res) => {
    const parsed_body = req.body;
    
    const new_task = {
        ...parsed_body,
        id: uuidv4(),
        time_created: new Date(),
        time_modified: new Date(),
    };
    task_list.push(new_task);
    res.status(200).json({
        msg: "success",
        data: new_task,
    });
});
app.put("/update_task/:id", (req, res) => {
    const task_id = req.params.id;
    const parsed_body = req.body;
    const target_task = task_list.find((task) => {
        return task_id === task.id;
    });
    if (!target_task) {
        res.status(404).json({ msg: "requested task not found" });
    }
    update_object(target_task,{...parsed_body,time_modified:new Date()});
    res.status(200).json({
        msg: "success",
        data: target_task,
    });
});

app.delete("/delete_task/:id", (req, res) => {
    const task_id = req.params.id;
    const to_be_deleted_task = task_list.find((task) => {
        return (task_id === task.id);
    });
    
    if (!to_be_deleted_task) {
        res.status(404).json({ msg: "requested task not found" });
    }
    const remaining_tasks = task_list.filter((task) => {
        return (task_id !== task.id);
    });
    task_list = remaining_tasks;
    res.status(200).json({
        msg: "success",
        data: to_be_deleted_task,
    });
});

app.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
});
