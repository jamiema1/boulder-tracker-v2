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
  const startDate = req.body.startDate
  const sendDate = req.body.sendDate
  const description = req.body.description

  const values = [id, rating, colour, holdType, boulderType, sendAttempts,
    startDate, sendDate, description]

  const q = 'INSERT INTO boulders (id, rating, colour, holdType, boulderType,' +
     ' sendAttempts, startDate, sendDate, description) VALUES' +
     ' (?,?,?,?,?,?,?,?,?);'
  db.query(q, values, (err, data) => {
    if (err) return res.json('Error' + err)
    res.send(data)
  })
})

app.get('/api/get', (req, res) => {
  const url = decodeURIComponent(req.url.substring(9))
  const query = JSON.parse(url)
  const q = makeQueryString(query)
  // console.log(q)

  db.query(q, (err, data) => {
    if (err) {
      return res.json('Error - ' + err)
    }
    res.send(data)
  })
})

function makeQueryString (query) {
  const q = ''
  return q.concat(
    SELECT(query.select), ' ',
    FROM(query), ' ',
    WHERE(query.where), ' ',
    ORDERBY(query.orderby), ' ',
    LIMIT(query.limit), ';'
  )
}

function SELECT (columns) {
  let q = 'SELECT '

  columns.forEach(column => { q = q.concat(column + ', ') })

  if (q.substring(q.length - 2) === ', ') {
    q = q.substring(0, q.length - 2)
  } else {
    q = q.concat('null')
  }
  return q
}

function FROM (query) {
  return 'FROM boulders'
}

function WHERE (query) {
  if (query === '') {
    return ''
  }
  return 'WHERE ' + query
}

function ORDERBY (columns) {
  let q = 'ORDER BY '
  columns.forEach(column => {
    const col = Object.keys(column)[0]
    const value = Object.values(column)[0]
    q = q.concat(col, ' ', value, ', ')
  })
  return q.substring(0, q.length - 2)
}

function LIMIT (limit) {
  if (limit === 'null') {
    return 'LIMIT 15'
  }
  if (limit === 'NONE') {
    return ''
  }
  return 'LIMIT ' + limit
}

app.delete('/api/delete', (req, res) => {
  const q = 'DELETE FROM boulders WHERE id = ' + req.body.id + ';'

  db.query(q, (err, data) => {
    if (err) return res.json('Error - ' + err)
    res.send(data)
  })
})

app.listen(port, () => {
  console.log('Connected to backend')
})
