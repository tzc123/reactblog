export default function (str) {
  str = str.split('?')[1]
  const res = {}
  str.split('&').forEach(item => {
    item = item.split('=')
    res[item[0]] = item[1]
  });
  return res
}