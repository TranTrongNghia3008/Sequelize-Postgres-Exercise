const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const expressHandlebars = require('express-handlebars');
const { createPagination } = require('express-handlebars-paginate');
 
app.use(express.static(__dirname + "/html"));


app.engine('hbs', expressHandlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    extname: 'hbs',
    defaultLayout: 'layout',
    runtimeOptions: {allowProtoPropertiesByDefault: true},
    helpers: {
        createPagination
    }
}));

app.set('view engine', 'hbs');

// app.get('/createTables', (req, res) => {
//     let models = require('./models');
//     models.sequelize.sync().then(() => {
//         res.send('tables created!');
//     })
// })

app.use('/', require('./routes/indexRouter'));
app.use('/details/', require('./routes/detailsRouter'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})


