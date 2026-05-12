const e = require('express');
var express = require('express');
var router = express.Router();

let goals =[
           {id: 1, name: 'Goal 1', description: 'Description 1', duedate: '2024-06-30'},
           {id: 2, name: 'Goal 2', description: 'Description 2', duedate: '2024-07-30'},
           {id: 3, name: 'Goal 3', description: 'Description 3', duedate: '2024-07-30'}              

        ];

        router.get('/getGoals', (req, res) => {
            res.status(200).json(goals);
        });

        router.post('/addGoal', (req, res) => {
            const { name, description, duedate } = req.body;
            if(name && description && duedate) {
                const newGoal = {
                id: Math.floor(Math.random() * 1000) + 1, 
                name,
                description,
                duedate
            };
            goals.push(newGoal);
            res.status(200).json(newGoal);
        } else {
            res.status(400).json({ error: 'Missing required fields' });
        }
        }
    );

        router.delete('/removeGoal/:id', (req, res) => {

            if(req.params && req.params.id && !isNaN(req.params.id)) {
                const goalId = parseInt(req.params.id );
                goals = goals.filter(goal => goal.id !== goalId);
                res.status(200).json({ message: `Goal with id ${goalId} deleted` });
        } else {
            res.status(400).json({ error: 'Missing required fields' });
        }   
        }
    );




        module.exports = router;
