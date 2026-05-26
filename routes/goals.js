const e = require('express');
var express = require('express');
var router = express.Router();
const DATABASE = process.env.DATABASE;


        router.get('/getGoals', async function (req, res ,next)  {
        const db =req.db;
        try {
            if (DATABASE === 'MYSQL') {
                const[response]= await db.query('SELECT * FROM goals');
                res.status(200).json(response);
            }
            return res.status(500).json({ error: 'Invalid DATABASE env variable' });
    
        } catch (error) {
            console.error('Error fetching goals:', error);
            res.status(500).json({ error: 'Fetching goals' });
        }
    });


        
    router.post('/addGoals', async function (req, res ,next)  {

      const db =req.db;
       if ( req.body && req.body.name && req.body.description && req.body.duedate) {
        try { 
            if (DATABASE === 'MYSQL') {   

                const response = await db.query('INSERT INTO goals (name, description, duedate)VALUES (?, ?, ?)', 
            [
                req.body.name, 
                req.body.description, 
                req.body.duedate
            ]);    
            return res.status(200).json({ message: 'Goal added successfully', goalId: response.insertId });

        } else {
            return res.status(500).json({ error: 'Invalid DATABASE env variable' });
        }
    } catch (error) {
        console.error('Error adding goal:', error);
        res.status(500).json({ error: 'Error adding goal' });
    }
} else {
    res.status(400).json({ error: 'Missing required fields' });
}
    });


    router.delete('/removeGoals', async function (req, res ,next)  {

      const db =req.db;

        if ( req.body && req.body.id) {

            const goalId = req.body.id;

            try {
                if (DATABASE === 'MYSQL') {
                    await db.query('DELETE FROM goals WHERE id = ?', [goalId]);
                    return res.status(200).json({ message: 'Goal removed successfully' });
                } else {
                    return res.status(500).json({ error: 'Invalid DATABASE env variable' });
                }
            } catch (error) {
                console.error('Error removing goal:', error);
                res.status(500).json({ error: 'Error removing goal' });
            }
        } else {
            res.status(400).json({ error: 'Missing required fields' });
        }
    });
                
    
    




        module.exports = router;
