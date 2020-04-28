const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const methodOverride = require('method-override');

const indexRoutes = require('./routes/index');

// connection to mongoDB =====================
mongoose.connect('mongodb://localhost/post_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) {
        console.log('ERROR: no mongoDB connection...');
    } else {
        console.log('MongoDB connected...');
    }
});


// middlewares ================================
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(expressSanitizer());
app.use(methodOverride('_method'));

app.use(indexRoutes);


// listener ==============================
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening at port ${port}...`);
})