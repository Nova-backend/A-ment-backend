const bodyParser = require('body-parser')
const cookie_parser = require('cookie-parser');
require('dotenv').config();
        
module.exports.middleware = (app)=>{
        app.use(bodyParser.json())
        app.use(cookie_parser(process.env.COOKIE_SECRET));
}