/* helper for correcting timezone offset*/
const formatStartDate = (date) => {
  date = new Date(date)
  let minutes = date.getMinutes()
  let time = date.getTimezoneOffset()
  date.setMinutes(minutes + time)
  return date
}

export default formatStartDate