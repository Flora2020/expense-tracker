function formateMongooseDate(originalDate, punctuation) {
  const date = [
    ('0000' + originalDate.getFullYear()).slice(-4),
    ('00' + (originalDate.getMonth() + 1)).slice(-2),
    ('00' + originalDate.getDate()).slice(-2)
  ]

  return date.join(punctuation)
}

function daysOfMonth(year, month) {
  const daysPerMonth = { '01': 31, '02': 28, '03': 31, '04': 30, '05': 31, '06': 30, '07': 31, '08': 31, '09': 30, '10': 31, '11': 30, '12': 31 }

  if (Number(year) % 4 === 0) {
    daysPerMonth['02'] = 29
  }

  return daysPerMonth[month]
}

function isValidDate(date) {
  // ValidDate 格式：YYYY-MM-DD，西元年第一個數字須為 1 或 2
  const dateRul = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
  //dateRul參考來源 https://www.regextester.com/96683
  const YYYYMMDD = date.split('-')
  const year = YYYYMMDD[0]
  const month = YYYYMMDD[1]
  const day = Number(YYYYMMDD[2])

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

module.exports = {
  formateMongooseDate,
  daysOfMonth,
  isValidDate
}