import express from 'express';
// import { runServer } from './Utils/Util.js'
// import { routesForoAcademico } from './Routes/routes.js'
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// app.use('/api', routesForoAcademico)
app.listen(1234, () => {
    console.log('Server running on port 1234');
});
// runServer(app)
