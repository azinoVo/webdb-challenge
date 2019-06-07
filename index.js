const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();
server.use(helmet());
server.use(express.json());


//
//---------------------------------------------------------------------------------//

server.post('/', (req, res) => {
	
});


// 
//---------------------------------------------------------------------------------//

server.post('/', (req, res) => {
	
});


// 
//---------------------------------------------------------------------------------//

server.get('/', (req, res) => {

});



//---------------------------------------------------------------------------------//


// Middleware
//---------------------------------------------------------------------------------//

function checkFields (req, res, next) {
    const {} = req.body;
}

//---------------------------------------------------------------------------------//

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`\n** API running on http://localhost:${port} **\n`));
