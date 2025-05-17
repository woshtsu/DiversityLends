import express from 'express'
import { runServer } from './Utils/Util.js'
import { routerFA } from './Routes/routes.js'
// import { runServer } from './Utils/Util.js'
// import { routesForoAcademico } from './Routes/routes.js'

const app = express()
app.disable('x-powered-by')
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', routerFA)

runServer(app)