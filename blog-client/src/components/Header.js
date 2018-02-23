import React from 'react'
import '../styles/header.css'
import { Link } from "react-router-dom";
import SubNav from './SubNav'

export default class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      nav: [
        {
          text: 'home',
          link: '/'
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
          text: 'links',
          type: 'common',
          subNav: [
            {
              text: 'github',
              url: require('../images/github.png'),
              link: 'https://github.com/tzc123'
            },
            {
              text: 'juejin',
              url: require('../images/github.png'),
              link: 'https://juejin.im/user/5936123afe88c20061db655d'
            }
          ]
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
      <header className="main-header">
        <div className="container">
          <Link className="title" to="/">
            DAZ
          </Link>
          <nav>
            <div className="search">
              <input placeholder="你倒是搜啊..."/>
              <img src={require('../images/search.png')}></img>
            </div>
            <ul>
              {nav.map((item, index) => (
                <li key={index}>
                  <Link to={!!item.link ? item.link : '/'}>
                    {item.text}
                  </Link>
                  {item.subNav ? <SubNav type={item.type} subNav={item.subNav}/> : ''}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}