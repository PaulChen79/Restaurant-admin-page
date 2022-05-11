const { ensureAuthenticated, getUser } = require('../helpers/auth-helpers')

const authenticated = (req, res, next) => {
  if (ensureAuthenticated(req)) {
    return next()
  }
  req.flash('warning_messages', 'You have to login to visit.')
  res.redirect('/users/login')
}
const authenticatedAdmin = (req, res, next) => {
  if (ensureAuthenticated(req)) {
    if (getUser(req).isAdmin) return next()
    res.redirect('/')
  } else {
    req.flash('warning_messages', 'You are not a admin. Please check with your admin.')
    res.redirect('/users/login')
  }
}
module.exports = {
  authenticated,
  authenticatedAdmin
}
