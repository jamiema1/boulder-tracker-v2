import express from 'express'
import * as dotenv from 'dotenv'
import { getOne, getAll, addOne, updateOne, deleteOne, getQuery }
  from './logic.js'

dotenv.config()

const stringValues = ['name', 'address', 'city']

function getValuesMap (req) {
  return new Map([
    ['name', req.body.name],
    ['address', req.body.address],
    ['city', req.body.city]
  ])
}

const gymRouter = express.Router()

gymRouter.get('/:id', (req, res) => {
  getOne(res, process.env.GYM_TABLE_NAME, req.params.id)
})

gymRouter.get('/', (req, res) => {
  getAll(res, process.env.GYM_TABLE_NAME)
})

gymRouter.get('/query/:query', (req, res) => {
  getQuery(res, process.env.GYM_TABLE_NAME, req.params.query)
})

gymRouter.post('/', (req, res) => {
  addOne(res, process.env.GYM_TABLE_NAME, getValuesMap(req), stringValues)
})

gymRouter.put('/:id', (req, res) => {
  updateOne(res, process.env.GYM_TABLE_NAME, req.params.id, getValuesMap(req),
    stringValues)
})

gymRouter.delete('/:id', (req, res) => {
  deleteOne(res, process.env.GYM_TABLE_NAME, req.params.id)
})

export default gymRouter
