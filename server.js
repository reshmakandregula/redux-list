const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

 app.get('/', (req, res) => res.json({msg: 'Welcome to the Users API'})
 );
 app.use(express.json());

 app.use('/api/users', require('./routes/users'));

const PORT= process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));