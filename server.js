const express = require('express');
const cors = require('cors')

const app = express();
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};
  
app.use(cors(corsOptions))
app.listen(8000, () => {
    console.log('Server started!');
});


app.route('/api/create').post((req, res) => {
    res.send({
      succuss: 'ok'
    });
});

