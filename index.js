const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");

//middleware 
app.use(cors());
app.use(express.json()); 

//routes

//create a to do 
app.post("/todo", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *", 
            [description]
        );
        res.json(newTodo);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
});

//get all to do 

app.get("/todo", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);

    } catch (err) {
        console.error(err.message);
    }
    });

//get a to do 

app.get("/todo/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);
    
      res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
    });


//update a to do 

app.put("/todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 price = $200 WHERE id = $3", 
            [description, price, id]
        );
        res.json("your to do has been updated");
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
});


//delete a to do 

app.delete("/todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE id = $1", 
            [id]
        );
        res.json("your to do has been deleted");
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
});



app.listen(5555, () => {
    console.log('Server running on port 5555');
});
