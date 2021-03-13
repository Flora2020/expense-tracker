const daysOfMonth = (year, month) => {
  const daysPerMonth = { '01': 31, '02': 28, '03': 31, '04': 30, '05': 31, '06': 30, '07': 31, '08': 31, '09': 30, '10': 31, '11': 30, '12': 31 }

  if (Number(year) % 4 === 0) {
    daysPerMonth['02'] = 29
  }

  return daysPerMonth[month]
}

module.exports = daysOfMonth