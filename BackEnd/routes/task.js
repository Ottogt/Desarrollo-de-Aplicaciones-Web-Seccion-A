var express = require('express');
var router = express.Router();

let task =[
           {id: 1, name: 'Task 1', description: 'Description 1', duedate: '2024-06-30'},
           {id: 2, name: 'Task 2', description: 'Description 2', duedate: '2024-07-30'},
           {id: 3, name: 'Task 3', description: 'Description 3', duedate: '2024-07-30'}              

        ];

        router.get('/getTasks', (req, res) => {
             res.status(200).json(task);
        });

        router.post('/addTask', (req, res) => {
            const { name, description, duedate } = req.body;
            if(name && description && duedate) {
            const newTask = {
                id: Math.floor(Math.random() * 1000) + 1, 
                name,
                description,
                duedate
            };
            task.push(newTask);
            res.status(200).json(newTask);
        } else {
            res.status(400).json({ error: 'Missing required fields' });
        }
        });

        router.delete('/removeTask/:id', (req, res) => {
            if(req.params && req.params.id && !isNaN(req.params.id)) {
                const taskId = parseInt(req.params.id );
                task = task.filter(task => task.id !== taskId);
                res.status(200).json({ message: `Task with id ${taskId} deleted` });
            } else {
                res.status(400).json({ error: 'Missing required fields' });
            }
        });




        module.exports = router;
