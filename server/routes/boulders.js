import express from 'express'
import * as dotenv from 'dotenv'
import { getOne, getAll, addOne, updateOne, deleteOne, getQuery }
  from './logic.js'

dotenv.config()

const stringValues = ['colour', 'boulderType', 'description',
  'setStartDate', 'setEndDate']

const nullableValues = ['setEndDate']

function getValuesMap (req) {
  return new Map([
    ['locationId', req.body.locationId],
    ['rating', req.body.rating],
    ['colour', req.body.colour],
    ['boulderType', req.body.boulderType],
    ['description', req.body.description],
    ['setStartDate', req.body.setStartDate],
    ['setEndDate', req.body.setEndDate]
  ])
}

const boulderRouter = express.Router()

boulderRouter.get('/:id', (req, res) => {
  getOne(res, process.env.BOULDER_TABLE_NAME, req.params.id)
})

boulderRouter.get('/', (req, res) => {
  getAll(res, process.env.BOULDER_TABLE_NAME)
})

boulderRouter.get('/query/:query', (req, res) => {
  getQuery(res, process.env.BOULDER_TABLE_NAME, req.params.query)
})

boulderRouter.post('/', (req, res) => {
  addOne(res, process.env.BOULDER_TABLE_NAME, getValuesMap(req),
    stringValues, nullableValues)
})

boulderRouter.put('/:id', (req, res) => {
  updateOne(res, process.env.BOULDER_TABLE_NAME, req.params.id,
    getValuesMap(req), stringValues, nullableValues)
})

boulderRouter.delete('/:id', (req, res) => {
  deleteOne(res, process.env.BOULDER_TABLE_NAME, req.params.id)
})

export default boulderRouter
