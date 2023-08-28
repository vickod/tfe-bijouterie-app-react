const express = require('express')
const cookieParser = require('cookie-parser')
const db_connection = require('./config/db_connection');
const articlesRoutes = require('./routes/articlesRoutes')
const utilisateurRoutes = require('./routes/utilisateurRoutes')
const app = express();
const {notFound, errorHandler} = require('./middleware/errorMiddleware');

const port = process.env.PORT || 5000;

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//cookie-parser middleware
app.use(cookieParser());

app.use(express.static(`${__dirname}/backend/public`));




//routes articles
app.use('/api/articles', articlesRoutes)

//routes utilisateurs
app.use('/api/utilisateurs', utilisateurRoutes)


// errorMiddleWares
app.use(notFound);
app.use(errorHandler);


app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`)
});
