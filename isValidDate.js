const daysOfMonth = require('./daysOfMonth')
const isValidDate = (date) => {
  const dateRul = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
  //dateRul參考來源 https://www.regextester.com/96683
  const YYMMDD = date.split('-')
  const year = YYMMDD[0]
  const month = YYMMDD[1]
  const day = Number(YYMMDD[2])

  if (date.length != 10) {
    return false
  }

  if (date.search(dateRul) === -1) {
    return false
  }

  if (day > daysOfMonth(year, month)) {
    return false
  }

  return true
}

module.exports = isValidDate