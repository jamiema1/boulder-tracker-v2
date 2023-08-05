import express from 'express'
import * as dotenv from 'dotenv'
import { getOne, getAll, addOne, updateOne, deleteOne } from './logic.js'

dotenv.config()

const stringValues = ['name', 'address', 'city']

const gymRouter = express.Router()

gymRouter.get('/:id', (req, res) => {
  getOne(res, process.env.GYM_TABLE_NAME, req.params.id)
})

gymRouter.get('/', (req, res) => {
  getAll(res, process.env.GYM_TABLE_NAME)
})

gymRouter.post('/', (req, res) => {
  const values = new Map([
    ['name', req.body.name],
    ['address', req.body.address],
    ['city', req.body.city]
  ])

  addOne(res, process.env.GYM_TABLE_NAME, values, stringValues)
})

gymRouter.put('/:id', (req, res) => {
  const values = new Map([
    ['name', req.body.name],
    ['address', req.body.address],
    ['city', req.body.city]
  ])

  updateOne(res, process.env.GYM_TABLE_NAME, req.params.id, values,
    stringValues)
})

gymRouter.delete('/:id', (req, res) => {
  deleteOne(req, res, req.params.id, process.env.GYM_TABLE_NAME)
})

export default gymRouter
