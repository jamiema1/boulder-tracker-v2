import express from 'express'
import * as dotenv from 'dotenv'
import { getOne, getAll, addOne, updateOne, deleteOne, getQuery }
  from './logic.js'

dotenv.config()

const stringValues = ['username', 'password', 'firstName', 'lastName', 'email']

function getValuesMap (req) {
  return new Map([
    ['username', req.body.username],
    ['password', req.body.password],
    ['firstName', req.body.firstName],
    ['lastName', req.body.lastName],
    ['email', req.body.email]
  ])
}

const userRouter = express.Router()

userRouter.get('/:id', (req, res) => {
  getOne(res, process.env.USER_TABLE_NAME, req.params.id)
})

userRouter.get('/', (req, res) => {
  getAll(res, process.env.USER_TABLE_NAME)
})

userRouter.get('/query/:query', (req, res) => {
  getQuery(res, process.env.USER_TABLE_NAME, req.params.query)
})

userRouter.post('/', (req, res) => {
  addOne(res, process.env.USER_TABLE_NAME, getValuesMap(req), stringValues)
})

userRouter.put('/:id', (req, res) => {
  updateOne(res, process.env.USER_TABLE_NAME, req.params.id, getValuesMap(req),
    stringValues)
})

userRouter.delete('/:id', (req, res) => {
  deleteOne(res, process.env.USER_TABLE_NAME, req.params.id)
})

export default userRouter
