import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import userRoutes from './routes/user.js'
import climbRoutes from './routes/climb.js'
import boulderRoutes from './routes/boulder_old.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/boulder_old', boulderRoutes)
app.use('/climb', climbRoutes)
app.use('/user', userRoutes)

app.listen(process.env.PORT, () => {
  console.log('Connected to backend')
  console.log('Running on port: ' + process.env.PORT)
})
