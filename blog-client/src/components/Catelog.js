import React from 'react'
import '../styles/catelog.css'

function initCatelog(catelog) {
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

export default class Catelog extends React.Component {
  constructor(props) {
    super()
    this.state = {
      catelog: initCatelog(props.catelog)
    }
  }
  componentDidMount() {
    // 修复锚点位置
    window.addEventListener('hashchange', this.handleHashChange)
  }
  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange)    
  }
  handleHashChange() {
    const id = location.hash
    if (id.indexOf('heading') != -1) {
      const heading = document.querySelector(id)
      if (heading) {
        scrollBy(0, -95)
      }
    }
  }
  render() {
    const { state: { catelog } } = this
    return (
      <section className="catelog">
        <header>目录</header>
        <ul>
          {
            catelog.map((cate, index) => (
              <li className={`t${cate.t}`} key={index}>
                <a href={`#heading-${index}`}>{cate.text}</a>
              </li>
            ))
          }
        </ul>
      </section>
    )
  }
}

Catelog.defaultProps = {
  catelog: []
}

