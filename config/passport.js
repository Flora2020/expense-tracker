const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user.js')
module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, { type: 'warning_msg', message: '此信箱未註冊。' })
          }
          bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (!isMatch) {
                return done(null, false, { type: 'warning_msg', message: '信箱或密碼錯誤。' })
              }
              return done(null, user)
            })
            .catch(error => {
              return done(error, false, { type: 'warning_msg', message: '抱歉，我們發生了一點問題，請再嘗試一次。' })
            })
        })
    }
  ))

  passport.serializeUser((user, done) => {
    return done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => { return done(null, user) })
      .catch(error => { return done(error, false) })
  })
}