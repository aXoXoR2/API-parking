const app = require('./app');

// Starting server
app.listen(app.get('port'), ()=>{
    console.log('Server on PORT', app.get('port'));
});