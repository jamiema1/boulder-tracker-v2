import express from 'express'
import mysql from 'mysql'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const port = 3001

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jamiema1',
  database: 'boulder-tracker'
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// db.connect(err => {
//     if (err) throw err
//     console.log("Successfully connected to the database")
// })

app.post('/api/insert', (req, res) => {
  const id = req.body.id
  const rating = req.body.rating
  const colour = req.body.colour
  const holdType = req.body.holdType
  const boulderType = req.body.boulderType
  const sendAttempts = req.body.sendAttempts
  const sendStatus = req.body.sendStatus
  const description = req.body.description

  const values = [id, rating, colour, holdType, boulderType, sendAttempts, sendStatus, description]

  const q = 'INSERT INTO boulders (id, rating, colour, holdType, boulderType, sendAttempts, sendStatus, description) VALUES (?,?,?,?,?,?,?,?);'

  db.query(q, values, (err, data) => {
    if (err) return res.json('Error' + err)
    res.send(data)
  })
})

app.get('/api/get', (req, res) => {
  const q = makeQueryString(req.query)
  db.query(q, (err, data) => {
    if (err) return res.json('Error' + err)
    res.send(data)
  })
})

function makeQueryString (query) {
  let q = 'SELECT '

  Object.keys(query).forEach(column => { q = q.concat(column + ', ') })

  if (q.substring(q.length - 2) === ', ') {
    q = q.substring(0, q.length - 2)
  } else {
    q = q.concat('null')
  }

  q = q.concat(' FROM boulders LIMIT ')

  const limit = 10
  q = q.concat(limit + ';')

  return q
}

app.delete('/api/delete', (req, res) => {
  const q = 'DELETE FROM boulders WHERE id = ' + req.body.id + ';'

  db.query(q, (err, data) => {
    if (err) return res.json('Error' + err)
  })
})

app.listen(port, () => {
  console.log('Connected to backend')
})
