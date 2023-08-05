import express from 'express'
import * as dotenv from 'dotenv'
import { getOne, getAll, addOne, updateOne, deleteOne } from './logic.js'

dotenv.config()

const stringValues = ['climbStartTime', 'climbEndTime']

const climbRouter = express.Router()

climbRouter.get('/:id', (req, res) => {
  getOne(res, process.env.CLIMB_TABLE_NAME, req.params.id)
})

climbRouter.get('/', (req, res) => {
  getAll(res, process.env.CLIMB_TABLE_NAME)
})

climbRouter.post('/', (req, res) => {
  const values = new Map([
    ['boulderId', req.body.boulderId],
    ['sessionId', req.body.sessionId],
    ['attempts', req.body.attempts],
    ['sends', req.body.sends],
    ['climbStartTime', req.body.climbStartTime],
    ['climbEndTime', req.body.climbEndTime]
  ])

  addOne(res, process.env.CLIMB_TABLE_NAME, values, stringValues)
})

climbRouter.put('/:id', (req, res) => {
  const values = new Map([
    ['boulderId', req.body.boulderId],
    ['sessionId', req.body.sessionId],
    ['attempts', req.body.attempts],
    ['sends', req.body.sends],
    ['climbStartTime', req.body.climbStartTime],
    ['climbEndTime', req.body.climbEndTime]
  ])

  updateOne(res, process.env.CLIMB_TABLE_NAME, req.params.id, values,
    stringValues)
})

climbRouter.delete('/:id', (req, res) => {
  deleteOne(res, process.env.CLIMB_TABLE_NAME, req.params.id)
})

export default climbRouter
