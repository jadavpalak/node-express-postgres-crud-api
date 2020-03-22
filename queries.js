const config = require('./DB.js');
var pg = require('pg');
var client = new pg.Client(config.DB);

client.connect().then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

const getUsers = (request, response) => {
  client.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);
  const query = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [id],
  }
  client.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email  } = request.body;
  const query = {
    text: 'INSERT INTO users (name, email) VALUES ($1, $2)',
    values: [name, email],
  }
  client.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User added successfully.`);
  });
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  client.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}