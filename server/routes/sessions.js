import express from 'express'
import * as dotenv from 'dotenv'
import { getOne, getAll, addOne, updateOne, deleteOne } from './logic.js'

dotenv.config()

const stringValues = ['sessionStartTime', 'sessionEndTime']

function getValuesMap (req) {
  return new Map([
    ['sessionStartTime', req.body.sessionStartTime],
    ['sessionEndTime', req.body.sessionEndTime]
  ])
}

const sessionRouter = express.Router()

sessionRouter.get('/:id', (req, res) => {
  getOne(res, process.env.SESSION_TABLE_NAME, req.params.id)
})

sessionRouter.get('/', (req, res) => {
  getAll(res, process.env.SESSION_TABLE_NAME)
})

sessionRouter.post('/', (req, res) => {
  addOne(res, process.env.SESSION_TABLE_NAME, getValuesMap(req), stringValues)
})

sessionRouter.put('/:id', (req, res) => {
  updateOne(res, process.env.SESSION_TABLE_NAME, req.params.id,
    getValuesMap(req), stringValues)
})

sessionRouter.delete('/:id', (req, res) => {
  deleteOne(res, process.env.SESSION_TABLE_NAME, req.params.id)
})

export default sessionRouter
