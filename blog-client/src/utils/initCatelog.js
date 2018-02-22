export default function (catelog) {
  if (!catelog || catelog.length == 0) return
  let levels = []
  catelog.forEach(cate => {
    const { level } = cate
    if (levels.indexOf(level) == -1) {
      levels.push(level)
    }
  })
  levels = levels.sort((a, b) => a - b)
  return catelog.map(cate => (
      {
        ...cate,
        t: levels.indexOf(cate.level) + 1
      }
    )
  )
}