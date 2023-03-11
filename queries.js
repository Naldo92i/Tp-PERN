const { request, response } = require('express');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'donald',
    host: 'localhost',
    database: 'mern',
    password: 'password',
    port: '5432',
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
    });
}

const getOneUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM users WHERE id_user = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
    });
}

const createUser = (request, response) => {
    const { id_user, nom, prenom } = request.body;

    pool.query('INSERT INTO users (id_user, nom, prenom) VALUES ($1, $2, $3) RETURNING *', [id_user, nom, prenom], 
    (error, results) =>{
        if (error) {
            throw error
        }
        response.status(200).send('Utilisateur ajouté avec succes');
    });
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { nom, prenom } = request.body;

    pool.query(
        'UPDATE users SET nom = $1, prenom = $2 WHERE id_user = $3', [nom, prenom, id],
        (error, results) => {
            if(error) {
                throw error
            }
            response.status(200).send('Utilisateur modifié avec succès');
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(
        'DELETE FROM users WHERE id_user = $1', [id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send('Utilisateur supprimé avec succès');
        }
    )
}

module.exports = {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
}