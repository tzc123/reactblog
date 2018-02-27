import React from 'react'
import '../styles/header.css'
import { Link } from "react-router-dom";
import SubNav from './SubNav'

export default class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      active: false,
      nav: [
        {
          text: 'home',
          link: '/'
        },
        {
          text: 'category',
          type: 'category',
          active: false,
          subNav: []
        },
        {
          text: 'links',
          type: 'common',
          active: false,
          subNav: [
            {
              text: 'github',
              link: 'https://github.com/tzc123'
            },
            {
              text: 'juejin',
              link: 'https://juejin.im/user/5936123afe88c20061db655d'
            }
          ]
        },
        {
          text: 'about',
          link: '/about'
        }
      ]
    }
  }
  componentDidMount() {
    const { props: { event }, state, state: { nav: [ , item] } } = this
    event.on('articleCount', articleCount => {
      item.subNav = articleCount
      this.setState(state)
    })
  }
  handlePullList() {
    const { state: { active } } = this
    this.setState({
      active: !active
    })
  }
  handleClick(e) {
    if (e.target.href) {
      this.setState({
        active: false
      })
    }
  }
  handleTouchStart(index) {
    const { state } = this
    state.nav[index].active = !state.nav[index].active
    this.setState(state)
  }
  render() {
    const { state: { nav, active } } = this
    return (
      <header className={`main-header ${active ? 'active' : ''}`}>
        <div className="container">
          <Link className="title" to="/">
            DAZ
          </Link>
          <nav>
            <div className="search">
              <input placeholder="你倒是搜啊..."/>
              <img src={require('../images/search.png')}></img>
            </div>
            <ul className="nav" onClick={this.handleClick.bind(this)}>
              {nav.map((item, index) => (
                <li key={index}>
                  {
                    item.link
                    ? <Link to={item.link}>
                        {item.text}
                      </Link>
                    : <a onTouchStart={this.handleTouchStart.bind(this, index)}>
                        {item.text}
                      </a>
                  }
                  {
                    item.link
                    ? ''
                    : <SubNav type={item.type}
                        active={nav[index].active}
                        subNav={item.subNav} />
                  }
                </li>
              ))}
            </ul>
            <div className="icon-list"
              onTouchStart={this.handlePullList.bind(this)}>
              <div className="line line-1"></div>
              <div className="line line-2"></div>
              <div className="line line-3"></div>
            </div>
          </nav>
        </div>
      </header>
    )
  }
}