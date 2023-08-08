import express from 'express'
import * as dotenv from 'dotenv'
import { getOne, getAll, addOne, updateOne, deleteOne, getQuery }
  from './logic.js'

dotenv.config()

const stringValues = ['climbStartTime', 'climbEndTime']

function getValuesMap (req) {
  return new Map([
    ['boulderId', req.body.boulderId],
    ['sessionId', req.body.sessionId],
    ['attempts', req.body.attempts],
    ['sends', req.body.sends],
    ['climbStartTime', req.body.climbStartTime],
    ['climbEndTime', req.body.climbEndTime]
  ])
}

const climbRouter = express.Router()

climbRouter.get('/', (req, res) => {
  getAll(res, process.env.CLIMB_TABLE_NAME)
})

climbRouter.get('/:id', (req, res) => {
  getOne(res, process.env.CLIMB_TABLE_NAME, req.params.id)
})

climbRouter.get('/query/:query', (req, res) => {
  getQuery(res, process.env.CLIMB_TABLE_NAME, req.params.query)
})

climbRouter.post('/', (req, res) => {
  addOne(res, process.env.CLIMB_TABLE_NAME, getValuesMap(req), stringValues)
})

climbRouter.put('/:id', (req, res) => {
  updateOne(res, process.env.CLIMB_TABLE_NAME, req.params.id, getValuesMap(req),
    stringValues)
})

climbRouter.delete('/:id', (req, res) => {
  deleteOne(res, process.env.CLIMB_TABLE_NAME, req.params.id)
})

export default climbRouter
