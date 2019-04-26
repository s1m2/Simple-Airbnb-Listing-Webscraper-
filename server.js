const express = require('express');
const app = express();
const morgan = require('morgan');
const route = require('./route');

const port = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use('/', route);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

