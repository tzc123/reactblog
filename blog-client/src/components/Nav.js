import React from 'react'
import '../styles/nav.css'
import { Link } from "react-router-dom";
import SubNav from './SubNav'

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      nav: [
        {
          text: 'home'
        },
        {
          text: 'category',
          type: 'category',
          subNav: [
            {
              text: 'js',
              count: '10',
            },
            {
              text: 'css',
              count: '20'
            },
            {
              text: 'vue',
              count: '12',
            },
            {
              text: 'react',
              count: '13',
            },
            {
              text: 'node',
              count: '15',
            }
          ]
        },
        {
          text: 'links'
        },
        {
          text: 'about',
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
                  {item.subNav ? <SubNav type={item.type} subNav={item.subNav}/> : ''}
                </li>
              ))}
          </ul>
        </nav>
      </div>
    )
  }
}