const express = require('express');
const userRouting = express.Router();
const db = require('./queries');

userRouting.get('/', db.getUsers);
userRouting.get('/:id', db.getUserById);
userRouting.post('/',db.createUser);
userRouting.put('/:id', db.updateUser);
userRouting.delete('/:id', db.deleteUser);

module.exports = userRouting; 