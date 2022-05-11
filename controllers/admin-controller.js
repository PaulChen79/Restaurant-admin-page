const db = require('../models')
const User = db.User
const Group = db.Group
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
  },
  searchUser: (req, res, next) => {
    if (!req.query.keyword) return res.redirect('back')
    const keyword = req.query.keyword.trim().toLowerCase()
    return User.findAll({ raw: true })
      .then(users => {
        if (!users) throw new Error('Something wrong please try again!')
        const filteredUsers = users.filter(user => user.name.toLowerCase().includes(keyword) || user.email.toLowerCase().includes(keyword))
        return filteredUsers
      })
      .then(filteredUsers => {
        if (!filteredUsers.length) {
          req.flash('warning_messages', `There is no results about ${keyword}`)
          res.redirect('/admin/users')
        } else {
          return res.render('admin/users', { users: filteredUsers })
        }
      })
      .catch(error => next(error))
  },
  getGroupsPage: (req, res, next) => {
    Group.findAll({ raw: true }).then(groups => {
      if (!groups) throw new Error('Something wrong please try again!')
      return res.render('admin/groups', { groups })
    })
      .catch(error => next(error))
  }
}

module.exports = adminController
