const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('./middlewares/flash')
const app = express()
const port = 3000
let Message = require('./middlewares/Message')


app.set('view engine', 'ejs')
app.use('/assets', express.static('public'))

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'my secret key is very simple',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(flash)

app.get('/', function(req, res) {
    Message.get((messages) => {
        res.render('index', {messages: messages})
    })
})

app.post('/add', function (req, res) {
    if (req.body.message === undefined || req.body.message === '') {
        req.session.flash.error = 'The message is required'
        res.redirect('/')
    } else {
        Message.save(req.body.message, () => {
            res.redirect('/')
        })
    }

})

app.use(function (req, res, next) {
    res.status(404).send('Route not found')
})
app.listen(port)