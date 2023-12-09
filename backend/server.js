const path =  require('path');
const uploadRoutes = require('./routes/uploadRoutes')
const express = require('express')
const cookieParser = require('cookie-parser')
const db_connection = require('./config/db_connection');
const articlesRoutes = require('./routes/articlesRoutes')
const utilisateurRoutes = require('./routes/utilisateurRoutes')
const commandesRoutes = require('./routes/commandeRoute')
const livraisonRoutes = require('./routes/livraisonRoutes')
const reduxTestRoutes = require('./routes/reduxTestRoute')
const forgotPasswordRoute = require('./routes/forgotPasswordRoute')
const app = express();
const {notFound, errorHandler} = require('./middleware/errorMiddleware');
const cors = require('cors');
const port = process.env.PORT || 5000;

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

//cookie-parser middleware
app.use(cookieParser());





//routes articles
app.use('/api/articles', articlesRoutes)

//routes utilisateurs
app.use('/api/utilisateurs', utilisateurRoutes)

//routes commandes
app.use('/api/commandes', commandesRoutes)
app.use('/api/upload', uploadRoutes)

app.use('/api/test', reduxTestRoutes)

app.get('/api/config/paypal', (req,res) => 
res.send({clientId: process.env.PAYPAL_CLIENT_ID}))

//routes livraison
app.use('/api/livraison', livraisonRoutes)

//routes forgot password
app.use('/api/forgot', forgotPasswordRoute)


__dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// errorMiddleWares
app.use(notFound);
app.use(errorHandler);


app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`)
});
