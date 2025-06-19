import express from 'express'
import { runServer } from './Utils/Util.js'
import { routerFA } from './Routes/routes.js'
import cors from 'cors'


const ACCEPTED_ORIGINS = [
  'http://localhost:5173',
]


const app = express()
app.disable('x-powered-by')
app.use(express.json())

app.use(cors({
  origin: ACCEPTED_ORIGINS,
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// app.use(cors({
//   origin: (origin, callback) => {
//     const allowedOrigin = 'http://localhost:5173';

//     if (!origin || origin === allowedOrigin) {
//       callback(null, true);
//     } else {
//       callback(new Error('CORS bloqueado: origen no permitido'));
//     }
//   },
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', routerFA)

runServer(app)