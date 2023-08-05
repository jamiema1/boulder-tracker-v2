import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import gymRoutes from './routes/gyms.js'
import locationRoutes from './routes/locations.js'
import boulderRoutes from './routes/boulders.js'
import sessionRoutes from './routes/sessions.js'
import climbRoutes from './routes/climbs.js'

import boulderOldRoutes from './routes/boulder_old.js'
import userRoutes from './routes/user.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/gym', gymRoutes)
app.use('/location', locationRoutes)
app.use('/boulder', boulderRoutes)
app.use('/session', sessionRoutes)
app.use('/climb', climbRoutes)

app.use('/boulder_old', boulderOldRoutes)
app.use('/user', userRoutes)

app.listen(process.env.PORT, () => {
  console.log('Connected to backend')
  console.log('Running on port: ' + process.env.PORT)
})
