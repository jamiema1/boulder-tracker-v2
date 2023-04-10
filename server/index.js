import express from 'express'
import mysql from 'mysql'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// const db = mysql.createConnection({
//   host: 'boulder-tracker-db.cn7nz4spdrrn.us-west-2.rds.amazonaws.com',
//   user: 'jamiema1',
//   password: 'jamiema1',
//   database: 'boulderTracker'
// })

// db.connect(err => {
//   if (err) throw err
//   console.log('Successfully connected to the database')
// })

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DATABASE_HOSTNAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: 'boulderTracker'
})

// Register/Signin Page APIs

app.get('/users', (req, res) => {
  return res.status(200).send(JSON.parse(fs.readFileSync('./data/users.json')))
})

app.post('/user/:username/:password', (req, res) => {
  const username = req.params.username
  const password = req.params.password

  const userMap = JSON.parse(fs.readFileSync('./data/users.json'))
  if (userMap.find((user) => user.username === username) !== undefined) {
    return res.status(400).send('User already exists')
  }

  const newuser = { username, password }
  userMap.push(newuser)
  fs.writeFileSync('./data/users.json', JSON.stringify(userMap),
    { spaces: '\t', EOL: '\n' })

  return res.status(200).send(newuser)
})

app.put('/user/:username/:password', (req, res) => {
  const username = req.params.username
  const password = req.params.password

  const userMap = JSON.parse(fs.readFileSync('./data/users.json'))
  const value = userMap.find((user) => user.username === username)
  if (value === undefined) {
    return res.status(404).send('User does not exist')
  }
  value.password = password

  fs.writeFileSync('./data/users.json', JSON.stringify(userMap),
    { spaces: '\t', EOL: '\n' })

  return res.status(200).send({ username, password })
})

app.delete('/user/:username/:password', (req, res) => {
  const username = req.params.username
  const password = req.params.password

  const userMap = JSON.parse(fs.readFileSync('./data/users.json'))

  const value = userMap.find((user) => user.username === username)
  if (value === undefined) {
    return res.status(404).send('User not found')
  }
  if (value.password !== password) {
    return res.status(400).send('Incorrect password')
  }

  userMap.splice(userMap.indexOf(value), 1)
  fs.writeFileSync('./data/users.json', JSON.stringify(userMap),
    { spaces: '\t', EOL: '\n' })
  return res.status(200).send(username)
})

app.post('/user/:username/:password/signin', (req, res) => {
  const username = req.params.username
  const password = req.params.password

  const userMap = JSON.parse(fs.readFileSync('./data/users.json'))
  const value = userMap.find((user) => user.username === username)
  if (value === undefined) {
    return res.status(404).send('User not found')
  }
  if (value.password !== password) {
    return res.status(400).send('Incorrect password')
  }

  return res.status(200).send(username)
})

// Boulder List APIs

app.post('/boulder', (req, res) => {
  const rating = req.body.rating
  const colour = req.body.colour
  const holdType = req.body.holdType
  const boulderType = req.body.boulderType
  const sendAttempts = req.body.sendAttempts
  const startDate = req.body.startDate
  const sendDate = req.body.sendDate
  const description = req.body.description

  const values = [rating, colour, holdType, boulderType, sendAttempts,
    startDate, sendDate, description]

  const q = 'INSERT INTO boulders (rating, colour, holdType, boulderType,' +
     ' sendAttempts, startDate, sendDate, description) VALUES' +
     ' (?,?,?,?,?,?,?,?);'
  db.query(q, values, (err, data) => {
    if (err) return res.json('Error - ' + err)
    res.send(data)
  })
})

app.put('/boulder', (req, res) => {
  const values = new Map([
    ['id', req.body.id],
    ['rating', req.body.rating],
    ['colour', req.body.colour],
    ['holdType', req.body.holdType],
    ['boulderType', req.body.boulderType],
    ['sendAttempts', req.body.sendAttempts],
    ['startDate', req.body.startDate],
    ['sendDate', req.body.sendDate],
    ['description', req.body.description]
  ])

  let q = 'UPDATE boulders SET '

  values.forEach((value, key) => {
    if (key === 'id' || key === 'rating' || key === 'sendAttempts' ||
    (key === 'sendDate' && value === null)) {
      q = q.concat(key + ' = ' + value + ', ')
    } else {
      q = q.concat(key + ' = \'' + value + '\', ')
    }
  })
  q = q.substring(0, q.length - 2)

  q = q.concat(' WHERE id = ' + values.get('id') + ';')

  db.query(q, (err, data) => {
    if (err) return res.json('Error - ' + err)
    res.send(data)
  })
})

app.get('/boulders', (req, res) => {
  const url = decodeURIComponent(req.url.substring(10))
  const query = JSON.parse(url)
  const q = makeGetQueryString(query)

  db.query(q, (err, data) => {
    if (err) return res.json('Error - ' + err)
    res.send(data)
  })
})

function makeGetQueryString (query) {
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

  columns.forEach(column => {
    q = q.concat(column + ', ')
  })

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

app.delete('/boulder/:id', (req, res) => {
  const q = 'DELETE FROM boulders WHERE id = ' + req.params.id + ';'

  db.query(q, (err, data) => {
    if (err) return res.json('Error - ' + err)
    res.send(data)
  })
})

app.listen(process.env.PORT, () => {
  console.log('Connected to backend')
  console.log('Running on port: ' + process.env.PORT)
})
