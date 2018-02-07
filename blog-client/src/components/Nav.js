import React from 'react'
import '../styles/nav.css'
import { Link } from "react-router-dom";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      nav: [
        {
          text: 'js',
          count: 10,
          color: 'yellow'
        },
        {
          text: 'css',
          count: 5,
          color: 'yellowgreen'
        },
        {
          text: 'vue',
          count: 12,
          color: 'purple'
        },
        {
          text: 'react',
          count: 2,
          color: 'skyblue'
        },
        {
          text: 'nodejs',
          count: 10,
          color: 'pink'
        }
      ]
    }
  }
  render() {
    let nav = this.state.nav

    return (
      <div className="nav-wrapper">
        <nav>
          <Link to="/">
            <span className="title">DAZs</span>
          </Link>
          <ul >
            {nav.map((item, index) => (
                <li key={index}>
                  {item.text}
                  <span>
                    「<span className="color-blue">{item.count}</span>」
                  </span>
                </li>
              ))}
              <li>about</li>
          </ul>
        </nav>
      </div>
    )
  }
}