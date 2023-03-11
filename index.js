const express = require('express');
const bodyParser = require('body-parser');
const { request } = require('express');
const app = express();
const db = require('./queries')
const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express and Postgres API' })
});

app.get('/users', db.getUsers);
app.get('/users/show/:id', db.getOneUser);
app.post('/users/create', db.createUser);
app.put('/users/update/:id', db.updateUser);
app.delete('/users/delete/:id', db.deleteUser);

app.listen(port, () => {
    console.log('Serveur démarré sur le port 3000.');
})