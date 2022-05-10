const adminController = {
  getAdminHonePage: (req, res) => {
    res.render('admin/dashboard')
  }
}

module.exports = adminController
