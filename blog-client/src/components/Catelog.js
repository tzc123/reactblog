import React from 'react'
import '../styles/catelog.css'

export default class Catelog extends React.Component {
  handleClick() {
    setImmediate(() => {
      scrollBy(0, -95)
    })
  }
  render() {
    const { props: { catelog, active } } = this
    return (
      <section className="catelog">
        <header>目录</header>
        <div className="active" style={{top: 41 + active * 26}}></div>
        <ul>
          {
            catelog.map((cate, index) => (
              <li className={`t${cate.t}`} key={index}>
                <a href={`#heading-${index}`}
                  onClick={
                    index != catelog.length - 1 
                    ? this.handleClick.bind(this)
                    : () => {}
                  }>
                  {cate.text}
                </a>
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

