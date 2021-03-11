module.exports = {
  authenticator: (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.flash('warning_msg', '請先登入再繼續。')
      return res.redirect('/users/login')
    }
    next()
  }
}