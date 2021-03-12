const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../../models/user.js')
const passport = require('passport')

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const error_msg = []
  const emailRule = /^\w+((-\w+)|(\.\w+)|(\+\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  //emailRule 來源：https://ithelp.ithome.com.tw/articles/10094951
  if (!email || !password || !confirmPassword) {
    error_msg.push('請填寫所有必填欄位。')
  }
  if (password !== confirmPassword) {
    error_msg.push('密碼與確認密碼不同。')
  }
  if (email.search(emailRule) === -1) {
    error_msg.push('電子信箱格式錯誤。')
  }
  if (error_msg.length > 0) {
    return res.render('register', { name, email, error_msg })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        error_msg.push(`${email} 此信箱已註冊。`)
        return res.render('register', { name, email, error_msg })
      }
    })
    .then(() => {
      const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      User.create({ name, email, password: hash })
        .then(() => {
          req.flash('success_msg', '已成功註冊帳號。')
          return res.redirect('login')
        })
        .catch((error) => {
          console.log(error)
          req.flash('warinig_msg', '抱歉，我們發生了一點問題，請再嘗試一次。')
          return res.render('register', { name, email })
        })
    })
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })
)

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出。')
  res.redirect('/users/login')
})

module.exports = router