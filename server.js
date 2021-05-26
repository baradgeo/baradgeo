const express = require('express');
const connectDB = require('./config/db');
const app = express();

//Connect Databse from Mongo Atlas
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('API running correctly');
});

//Define Static Routes
app.use('/static', require('./routes/static/static'));

//Define API routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/category', require('./routes/api/category'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
