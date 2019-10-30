const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());


consign().include('routes').into(app);

app.listen(5300);