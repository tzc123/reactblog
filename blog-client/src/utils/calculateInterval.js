export default function (date) {
  date = +date
  if (isNaN(date) || date == NaN ) {
    console.error(new Error('calculateInterval([date])'))
    return ''
  }
  const now = new Date()
  date = new Date(date)
  const years = now.getFullYear() - date.getFullYear()
  if (years > 0) return years + '年前'
  const months = now.getMonth() - date.getMonth()
  if (months > 0) return months + '月前'
  const days = now.getDate() - date.getDate()
  if (days > 0) return days + '天前'
  const houers = now.getHours() - date.getHours()
  if (houers > 0) return houers + '小时前'
  const minutes = now.getMinutes() - date.getMinutes()
  if (minutes > 0) return minutes + '分钟前'
  return '刚刚'
}