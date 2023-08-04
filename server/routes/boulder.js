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


const boulderRouter = express.Router()


boulderRouter.get('/:id', (req, res) => {
  const id = req.params.id
  const q = "SELECT * FROM boulders_old WHERE id = " + id

  db.query(q, (err, data) => {
    if (err) return res.json('Error - ' + err)
    res.send(data[0])
  })
})

boulderRouter.post('/', (req, res) => {

  console.log(req.body)

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

  const q = 'INSERT INTO boulders_old (rating, colour, holdType, boulderType,' +
     ' sendAttempts, startDate, sendDate, description) VALUES' +
     ' (?,?,?,?,?,?,?,?);'
  db.query(q, values, (err, data) => {
    if (err) return res.json('Error - ' + err)
    res.send(data)
  })
})

boulderRouter.put('/', (req, res) => {

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

  let q = 'UPDATE boulders_old SET '

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



boulderRouter.get('/', (req, res) => {

  const url = decodeURIComponent(req.url.substring(2))
  const query = JSON.parse(url)
  const q = makeGetQueryString(query)

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
    return 'FROM boulders_old'
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

  db.query(q, (err, data) => {
    if (err) return res.json('Error - ' + err)
    res.send(data)
  })
})

boulderRouter.delete('/:id', (req, res) => {
  const q = 'DELETE FROM boulders_old WHERE id = ' + req.params.id + ';'

  db.query(q, (err, data) => {
    if (err) return res.json('Error - ' + err)
    res.send(data)
  })
})


export default boulderRouter