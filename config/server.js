/* importar o modulo do framwork express*/
var express = require('express');

/* importar o módulo do consign*/
var consign = require('consign');

/* importar o módulo do body-parser*/
var bodyParser = require('body-parser');

/* importar o módulo express-validator*/
var expressValidaor = require('express-validator');

/* iniciar o objeto express*/
var app = express();

/* setar as variáveis 'view engine' e 'views' do express*/

app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar p middleware express.static*/
app.use(express.static('./app/public'));

/* configurar o midlleware body-parser*/
app.use(bodyParser.urlencoded({extended: true}));

/* configurar o middleware express-validator*/
app.use(expressValidaor());

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app*/
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);

/* exportar o objeto app*/
module.exports= app;