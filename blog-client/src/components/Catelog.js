import React from 'react'
import '../styles/catelog.css'

export default class Catelog extends React.Component {
  render() {
    const { props: { catelog } } = this
    return (
      <section className="catelog">
        <ul>
          {
            catelog.map((cate, index) => {
              return (
                <li key={index}>
                  <a href={`#heading-${index}`}>{cate.text}</a>
                </li>
              )
            })
          }
        </ul>
      </section>
    )
  }
}

Catelog.defaultProps = {
  catelog: []
}

