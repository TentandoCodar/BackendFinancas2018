const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

//Cros origin requests
app.use(cors({origin:'*'}));
//Forma de receber os dados das chamadas a api
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
//Incluir minhas rotas no app de maneira mais implicita e com menos verbosidade
consign().include('routes').into(app);

app.listen(5300);