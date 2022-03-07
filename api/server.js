// BUILD YOUR SERVER HERE
const express = require('express')
const server = express()
const Users = require('../api/users/model')

server.use(express.json())

server.get('/api/users', async (req, res) => {
    try {
    const users = await Users.find()
    res.status(200).json(users)
    }
    catch {
        res.status(500).json({message: "The users information could not be retrieved"})
    }
})

server.get('/api/users/:id', async (req, res) => {
    try {
    const user = await Users.findById(req.params.id)
    if(!user) return res.status(404).json({message: "The user with the specified ID does not exist"})
    res.status(200).json(user)
    }
    catch {
    res.status(500).json({message: "The user information could not be retrieved"})
    }
})

server.post('/api/users', async (req, res) => {
    try {
    if( !("name" in req.body) || !("bio" in req.body) )
    return res.status(400).json({message: "Please provide name and bio for the user"})

    const newUser = await Users.insert(req.body)
    res.status(201).json(newUser)
    }
    catch {
    res.status(500).json({message: "There was an error while saving the user to the database"})
    }
})

server.delete('/api/users/:id', async  (req, res) => {
    try {
    const user = await Users.findById(req.params.id)
    if(!user) 
    return res.status(404).json({message: "The user with the specified ID does not exist"})

    const deletedUser = await Users.remove(req.params.id)
    res.status(200).json(deletedUser)
    }
    catch {
    res.status(500).json({message: "The user could not be removed"})
    }
})

server.put('/api/users/:id', async (req, res) => {
    try {
    const { id } = req.params
    const { body } = req;

    const user = await Users.findById(id)
    if(!user)
    return res.status(404).json({message: "The user with the specified ID does not exist"})

    if( !("name" in req.body) || !("bio" in req.body) )
    return res.status(400).json({message: "Please provide name and bio for the user"})

    const updatedUser = await Users.update(id, body)
    res.status(200).json(updatedUser)
    }
    catch {
    res.status(500).json({message: "The user information could not be modified"})
    }
})

module.exports = server;