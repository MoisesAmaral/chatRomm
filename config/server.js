/*Importar o framework express*/
const express = require('express');

/*Importar o consign*/
const consign = require('consign');

/*Importar o body-parser*/
const bodyParser = require('body-parser');

/*Importar o express-validator*/
const expressValidator = require('express-validator');

/*Iniciar o objeto do express*/
const app = express();

/*setar as variaveis 'view engine' e views' do express*/
app.set('view engine', 'ejs');
app.set('views', './app/views');

/*Configurar os middlewares express.static*/
app.use(express.static('./app/public'));

/*Configurar os middlewares body-parser*/
app.use(bodyParser.urlencoded({extended: true}));

/*Configurar os middlewares express-validator*/
app.use(expressValidator());


/*configurar o consign, efetua o autoload das rotas, dos models e dos controllers para o objeto app*/
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

/*Exportar o objeto app*/
module.exports = app;