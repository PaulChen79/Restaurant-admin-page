const db = require('../models')
const User = db.User
const adminController = {
  getAdminHomePage: (req, res) => {
    res.render('admin/dashboard')
  },
  getUsersPage: (req, res, next) => {
    User.findAll({ raw: true }).then(users => {
      if (!users) throw new Error('Something wrong please try again!')
      return res.render('admin/users', { users })
    })
      .catch(error => next(error))
  },
  getAddUserPage: (req, res, next) => {
    res.render('admin/addUser')
  },
  getEditUserPage: (req, res, next) => {
    const id = req.params.id
    User.findByPk(id, { raw: true })
      .then(user => {
        if (!user) throw new Error('Something wrong please try again!')
        return res.render('admin/editUser', { editUser: user })
      })
      .catch(error => next(error))
  },
  updateUser: (req, res, next) => {
    const id = req.params.id
    const { name, email, isAdmin } = req.body
    User.findByPk(id)
      .then(user => {
        if (!user) throw new Error('Something wrong please try again!')
        return user.update({ name, email, isAdmin })
      })
      .then(() => {
        req.flash('success_messages', 'You have successfully updated a user.')
        res.redirect('/admin/users')
      })
      .catch(error => next(error))
  },
  deleteUser: (req, res, next) => {
    const id = req.params.id
    User.findByPk(id)
      .then(user => {
        if (!user) throw new Error('Something wrong please try again!')
        return user.destroy()
      })
      .then(() => {
        req.flash('success_messages', 'You have successfully deleted a user.')
        res.redirect('/admin/users')
      })
      .catch(error => next(error))
  }
}

module.exports = adminController
