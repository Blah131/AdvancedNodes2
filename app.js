const express = require ('express');
const morgan = require ('morgan');
const mongoose = require ('mongoose');

// express app
const app = express();


// connect to mongodb
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.2rbld.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts';
mongoose.connect(dbURI)
    .then((result) => app.listen(3001))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');



// middleware & static files
app.use(express.static('public'));


app.use(morgan('dev'));


app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi fidns eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    //res.send('<p>homepage</p>');
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
});

app.get('/blogs/create', (req,res) => {
    res.render('create', { title: 'Create a new Blog' });
})


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
});

