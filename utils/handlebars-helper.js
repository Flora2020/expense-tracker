const Handlebars = require('handlebars')

Handlebars.registerHelper('isEqual', (left, right, options) => {
  if (arguments.length < 2) {
    throw new Error('Handlerbars Helper "isEqual" needs 2 parameters')
  }

  if (left === right) {
    return options.fn(right)
  } else {
    return options.inverse(right)
  }
})

module.exports = console.log('handlebars helpers registered!')