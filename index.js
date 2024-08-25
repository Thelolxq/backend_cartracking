const  express  = require('express');
const routerUser = require('./src/routes/UserRoutes')
const cors = require('cors')
const app = express();
require('dotenv').config()
const port = process.env.PORT;
app.use(cors())
app.use(express.json())
app.use(routerUser);
app.listen(port, ()=> console.log(`escuchando en el puerto ${port}`))
