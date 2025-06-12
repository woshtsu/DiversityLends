import express from 'express'
import { runServer } from './Utils/Util.js'
import { routerFA } from './Routes/routes.js'
import cors from 'cors'
// import { runServer } from './Utils/Util.js'
const ACCEPTED_ORIGINS = [
  'http://localhost:5173',
]
const app = express()
app.disable('x-powered-by')
app.use(express.json())
app.use(cors({
  allowedHeaders: ACCEPTED_ORIGINS
}))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', routerFA)

runServer(app)