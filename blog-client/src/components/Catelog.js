import React from 'react'
import '../styles/catelog.css'

export default class Catelog extends React.Component {
  render() {
    const { props: { catelog, active, handleClick } } = this
    return (
      <section className="catelog">
        <header>目录</header>
        <div className="active" style={{top: 41 + active * 26}}></div>
        <ul>
          {
            catelog.map((cate, index) => (
              <li className={`t${cate.t}`} key={index}>
                <a href={`#heading-${index}`}
                  onClick={handleClick.bind(null, index, index == catelog.length - 1)}>
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

