const db = require('../models')
const User = db.User
const Group = db.Group
const adminController = {
  getAdminHomePage: (req, res) => {
    res.render('admin/dashboard')
  },
  getUsersPage: (req, res, next) => {
    User.findAll({ raw: true, nest: true, include: [Group] }).then(users => {
      if (!users) throw new Error('Something wrong please try again!')
      return res.render('admin/users', { users })
    })
      .catch(error => next(error))
  },
  getAddUserPage: (req, res, next) => {
    return Group.findAll({
      raw: true
    })
      .then(groups => res.render('admin/addUser', { groups }))
      .catch(err => next(err))
  },
  getEditUserPage: (req, res, next) => {
    const id = req.params.id
    return Promise.all([
      User.findByPk(id, { raw: true }),
      Group.findAll({ raw: true })
    ])
      .then(([user, groups]) => {
        if (!user) throw new Error('Something wrong please try again!')
        return res.render('admin/editUser', { editUser: user, groups })
      })
      .catch(err => next(err))
  },
  updateUser: (req, res, next) => {
    const id = req.params.id
    const { name, email, isAdmin, groupId } = req.body
    User.findByPk(id)
      .then(user => {
        if (!user) throw new Error('Something wrong please try again!')
        return user.update({ name, email, groupId, isAdmin })
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
  },
  getAddGroupPage: (req, res) => {
    res.render('admin/addGroup')
  },
  addGroup: (req, res, next) => {
    const { name, status } = req.body
    if (!name || !status) throw new Error('All feilds needed.')
    return Group.findOne({ where: { name } })
      .then(group => {
        if (group) throw new Error('Group already exist!')
        return Group.create({ name, status })
      })
      .then(() => {
        req.flash('success_messages', 'You have successfully added a group!')
        res.redirect('/admin/groups')
      })
      .catch(error => next(error))
  },
  getEditGroupPage: (req, res, next) => {
    const id = req.params.id
    return Group.findByPk(id, { raw: true })
      .then(group => {
        if (!group) throw new Error('Something wrong please try again!')
        console.log(group)
        return res.render('admin/editGroup', { group })
      })
      .catch(err => next(err))
  },
  updateGroup: (req, res, next) => {
    const id = req.params.id
    const { name, status } = req.body
    Group.findByPk(id)
      .then(group => {
        if (!group) throw new Error('Something wrong please try again!')
        return group.update({ name, status })
      })
      .then(() => {
        req.flash('success_messages', 'You have successfully updated a group.')
        res.redirect('/admin/groups')
      })
      .catch(error => next(error))
  },
  deleteGroup: (req, res, next) => {
    const id = req.params.id
    Group.findByPk(id)
      .then(group => {
        if (!group) throw new Error('Something wrong please try again!')
        return group.destroy()
      })
      .then(() => {
        req.flash('success_messages', 'You have successfully deleted a group.')
        res.redirect('/admin/groups')
      })
      .catch(error => next(error))
  },
  searchGroup: (req, res, next) => {
    if (!req.query.keyword) return res.redirect('back')
    const keyword = req.query.keyword.trim().toLowerCase()
    return Group.findAll({ raw: true })
      .then(groups => {
        if (!groups) throw new Error('Something wrong please try again!')
        const filteredGroup = groups.filter(group => group.name.toLowerCase().includes(keyword))
        return filteredGroup
      })
      .then(filteredGroup => {
        if (!filteredGroup.length) {
          req.flash('warning_messages', `There is no results about ${keyword}`)
          res.redirect('/admin/groups')
        } else {
          return res.render('admin/groups', { groups: filteredGroup })
        }
      })
      .catch(error => next(error))
  }
}

module.exports = adminController
