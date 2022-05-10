const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const falsh = require('connect-flash')
const methodOverride = require('method-override')
const routes = require('./routes/index')
const app = express()
const PORT = process.env.PORT || 3000
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.engine('hbs', exphbs.engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(falsh())
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.success_messages = req.success_messages
  res.locals.warning_messages = req.warning_messages
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}.`)
})
