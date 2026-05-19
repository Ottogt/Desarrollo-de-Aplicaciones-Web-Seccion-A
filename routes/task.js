const e = require('express');
var express = require('express');
var router = express.Router();
const DATABASE = process.env.DATABASE;


        router.get('/getTasks', async function (req, res ,next)  {
        const db =req.db;
        try {
            if (DATABASE === 'MYSQL') {
                const[response]= await db.query('SELECT * FROM tasks');
                res.status(200).json(tasks);
            }
            return res.status(500).json({ error: 'Invalid DATABASE env variable' });
    
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ error: 'Fetching tasks' });
        }
    });


        
    router.post('/addTasks', async function (req, res ,next)  {

      const db =req.db;
       if ( req.body && req.body.name && req.body.description && req.body.duedate) {
        try { 
            if (DATABASE === 'MYSQL') {   

                const response = await db.query('INSERT INTO tasks (name, description, duedate)VALUES (?, ?, ?)', 
            [
                req.body.name, 
                req.body.description, 
                req.body.duedate
            ]);    
            return res.status(200).json({ message: 'Task added successfully', taskId: response.insertId });

        } else {
            return res.status(500).json({ error: 'Invalid DATABASE env variable' });
        }
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ error: 'Error adding task' });
    }
} else {
    res.status(400).json({ error: 'Missing required fields' });
}
    });


    router.delete('/removeTasks', async function (req, res ,next)  {

      const db =req.db;

        if ( req.body && req.body.id) {

            let taskId = req.params.id;

            try {
                if (DATABASE === 'MYSQL') {
                    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
                    return res.status(200).json({ message: 'Task removed successfully' });
                } else {
                    return res.status(500).json({ error: 'Invalid DATABASE env variable' });
                }
            } catch (error) {
                console.error('Error removing task:', error);
                res.status(500).json({ error: 'Error removing task ' });
            }
        } else {
            res.status(400).json({ error: 'Missing required fields' });
        }
    });
                
    
    




        module.exports = router;
