const Handlebars = require('handlebars')

Handlebars.registerHelper('isEqual', (left, right, options) => {
  if (arguments.length < 2) {
    throw new Error('Handlerbars Helper "isEqual" needs 2 parameters');
  }

  if (left === right) {
    return options.fn(right)
  } else {
    return options.inverse(right)
  }
})

module.exports = console.log('handlebars helpers registered!')

/*參考資料
Helper
https://medium.com/ling-ni-lee/handlebars%E7%AD%86%E8%A8%98-helper%E6%87%89%E7%94%A8-16978fd6c352
https://smlpoints.com/notes-handlebars-register-helper-guideline.html

巢狀結構
https://www.itread01.com/content/1549486270.html
*/