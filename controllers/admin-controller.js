const adminController = {
  getAdminHomePage: (req, res) => {
    res.render('admin/dashboard')
  }
}

module.exports = adminController
