const express = require('express')
const db_connection = require('./config/db_connection');
const articlesRoutes = require('./routes/articlesRoutes')
const app = express();

const port = process.env.PORT || 5000;


app.use(express.static(`${__dirname}/backend/public`))



//routes
app.use('/api/articles', articlesRoutes)


app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`)
});
