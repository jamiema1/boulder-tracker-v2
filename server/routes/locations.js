import express from 'express'
import * as dotenv from 'dotenv'
import { getOne, getAll, addOne, updateOne, deleteOne } from './logic.js'

dotenv.config()

const stringValues = ['name']

function getValuesMap (req) {
  return new Map([
    ['gymId', req.body.gymId],
    ['name', req.body.name]
  ])
}

const locationRouter = express.Router()

locationRouter.get('/:id', (req, res) => {
  getOne(res, process.env.LOCATION_TABLE_NAME, req.params.id)
})

locationRouter.get('/', (req, res) => {
  getAll(res, process.env.LOCATION_TABLE_NAME)
})

locationRouter.post('/', (req, res) => {
  addOne(res, process.env.LOCATION_TABLE_NAME, getValuesMap(req), stringValues)
})

locationRouter.put('/:id', (req, res) => {
  updateOne(res, process.env.LOCATION_TABLE_NAME, req.params.id,
    getValuesMap(req), stringValues)
})

locationRouter.delete('/:id', (req, res) => {
  deleteOne(res, process.env.LOCATION_TABLE_NAME, req.params.id)
})

export default locationRouter
