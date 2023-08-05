import express from 'express'
import mysql from 'mysql'
import * as dotenv from 'dotenv'

dotenv.config()

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DATABASE_HOSTNAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
})

const climbRouter = express.Router()

climbRouter.get('/:id', (req, res) => {
  const id = req.params.id
  const q = 'SELECT * FROM climbs WHERE id = ' + id

  db.query(q, (err, data) => {
    if (err) {
      return res.status(400).json({ error: 'Error - ' + err })
    }
    if (data.length === 0) {
      return res.status(404).json({ error: 'Error - id not found' })
    }
    res.status(200).json({ data })
  })
})

climbRouter.get('/', (req, res) => {
  const q = 'SELECT * FROM climbs'

  db.query(q, (err, data) => {
    if (err) {
      return res.status(400).json({ error: 'Error - ' + err })
    }
    res.status(200).json({ data })
  })
})

climbRouter.post('/', (req, res) => {
  const boulderId = req.body.boulderId
  const sessionId = req.body.sessionId
  const attempts = req.body.attempts
  const sends = req.body.sends
  const climbStartTime = req.body.climbStartTime
  const climbEndTime = req.body.climbEndTime

  const values = [boulderId, sessionId, attempts, sends, climbStartTime,
    climbEndTime]

  const q = 'INSERT INTO climbs (boulderId, sessionId, attempts, sends,' +
     ' climbStartTime, climbEndTime) VALUES' +
     ' (?,?,?,?,?,?);'
  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(400).json({ error: 'Error - ' + err })
    }
    res.status(200).json({
      data: [
        {
          id: JSON.parse(JSON.stringify(data)).insertId
        }
      ]
    })
  })
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

  let q = 'UPDATE climbs SET '

  values.forEach((value, key) => {
    if (key === 'boulderId' || key === 'sessionId' || key === 'attempts' ||
     key === 'sends') {
      q = q.concat(key + ' = ' + value + ', ')
    } else {
      q = q.concat(key + ' = \'' + value + '\', ')
    }
  })
  q = q.substring(0, q.length - 2)
    .concat(' WHERE id = ' + req.params.id + ';')

  db.query(q, (err, data) => {
    console.log(err)
    if (err) {
      return res.status(400).json({ error: 'Error - ' + err })
    }
    if (data === undefined) {
      return res.status(400).json({ error: 'Error - ' + err })
    }
    if (JSON.parse(JSON.stringify(data)).affectedRows === 0) {
      return res.status(404).json({ error: 'Error - id not found' })
    }
    if (JSON.parse(JSON.stringify(data)).changedRows === 0) {
      return res.status(202).json({ error: 'Error - no data updated' })
    }
    res.status(200).json({
      data: [
        {
          id: req.params.id
        }
      ]
    })
  })
})

climbRouter.delete('/:id', (req, res) => {
  const q = 'DELETE FROM climbs WHERE id = ' + req.params.id + ';'

  db.query(q, (err, data) => {
    if (err) {
      return res.status(400).json({ error: 'Error - ' + err })
    }
    if (JSON.parse(JSON.stringify(data)).affectedRows === 0) {
      return res.status(404).json('Error - id not found')
    }
    res.status(200).json(req.params.id)
  })
})

export default climbRouter
