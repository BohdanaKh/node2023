
const express = require('express');
const fileService = require('./file.service');


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


//GET ALL
app.get('/users', async (req, res) => {
    const users = await fileService.readDB();
    res.json(users);
});


//CREATE USER
app.post('/users', async (req, res) => {
    const {name, age} = req.body;

    if (!name || name.length < 3) {
        return res.status(400).json('Wrong name');
    }
    if (!age || age < 0 || age > 100)  {
        return res.status(400).json('Wrong age');
    }

    const users = await fileService.readDB();
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name,
        age,
    }
    users.push(newUser);

    await fileService.writeDB(users);

    res.status(201).json(newUser);
});

//GET BY ID
app.get('/users/:id', async (req, res) => {
    const {id} = req.params;

    const users = await fileService.readDB();

    const user = users.find((user) => user.id === +id);
    if (!user) {
        return res.status(422).json('user not found');
    }

    res.json(user);
});



//UPDATE
app.patch('/users/:id', async (req, res) => {
    const {id} = req.params;
    const {name, age} = req.body;

    if (name && name.length < 3) {
        return res.status(400).json('Wrong name');
    }
    if (age && (age < 0 || age > 100)) {
        return res.status(400).json('Wrong age');
    }

    const users = await fileService.readDB();
    const user = users.find((user) => user.id === +id);

    if (!user) {
        return res.status(422).json('user not found');
    }
    if (name) user.name = name;
    if (age) user.age = age;

    await fileService.writeDB(users);

    res.status(201).json(user);
});



//DELETE
app.delete('/users/:id', async (req, res) => {
    const {id} = req.params;

    const users = await fileService.readDB();
    const index = users.findIndex((user) => user.id === +id);

    if (index === -1) {
        return res.status(422).json('user not found');
    }
    users.splice(index, 1);
    await fileService.writeDB(users);

    res.sendStatus(204);
});

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`)
});