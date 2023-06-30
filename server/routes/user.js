import express from 'express'
import * as fs from 'fs'

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
    return res.status(200).send(JSON.parse(fs.readFileSync('./data/users.json')))
})

userRouter.post('/:username/:password', (req, res) => {
    const username = req.params.username
    const password = req.params.password
  
    const userMap = JSON.parse(fs.readFileSync('./data/users.json'))
    if (userMap.find((user) => user.username === username) !== undefined) {
      return res.status(400).send('User already exists')
    }
  
    const newuser = { username, password }
    userMap.push(newuser)
    fs.writeFileSync('./data/users.json', JSON.stringify(userMap),
      { spaces: '\t', EOL: '\n' })
  
    return res.status(200).send(newuser)
})
  
userRouter.put('/:username/:password', (req, res) => {
    const username = req.params.username
    const password = req.params.password
  
    const userMap = JSON.parse(fs.readFileSync('./data/users.json'))
    const value = userMap.find((user) => user.username === username)
    if (value === undefined) {
      return res.status(404).send('User does not exist')
    }
    value.password = password
  
    fs.writeFileSync('./data/users.json', JSON.stringify(userMap),
      { spaces: '\t', EOL: '\n' })
  
    return res.status(200).send({ username, password })
})
  
userRouter.delete('/:username/:password', (req, res) => {
    const username = req.params.username
    const password = req.params.password
  
    const userMap = JSON.parse(fs.readFileSync('./data/users.json'))
  
    const value = userMap.find((user) => user.username === username)
    if (value === undefined) {
      return res.status(404).send('User not found')
    }
    if (value.password !== password) {
      return res.status(400).send('Incorrect password')
    }
  
    userMap.splice(userMap.indexOf(value), 1)
    fs.writeFileSync('./data/users.json', JSON.stringify(userMap),
      { spaces: '\t', EOL: '\n' })
    return res.status(200).send(username)
})
  
userRouter.post('/:username/:password/signin', (req, res) => {
    const username = req.params.username
    const password = req.params.password
  
    const userMap = JSON.parse(fs.readFileSync('./data/users.json'))
    const value = userMap.find((user) => user.username === username)
    if (value === undefined) {
      return res.status(404).send('User not found')
    }
    if (value.password !== password) {
      return res.status(400).send('Incorrect password')
    }
  
    return res.status(200).send(username)
})


export default userRouter