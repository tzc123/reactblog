import { observer, inject } from "mobx-react"
import { observable, action } from "mobx"
import '../styles/header.css'
import { Link } from "react-router-dom";
import { getArticleCount } from '../api';
import SubNav from './SubNav'

@inject('header')
@observer 
class Header extends React.Component {
  render() {
    const store = this.props.header
    const { nav, active, activeClass, changeActive, changeSubNavActive, closeActive } = store
    return (
      <header className={activeClass}>
        <div className="container">
          <Link className="title" to="/">
            DAZ
          </Link>
          <nav>
            <div className="search">
              <input placeholder="你倒是搜啊..."/>
              <img src={require('../images/search.png')}></img>
            </div>
            <ul className="nav" onClick={closeActive}>
              {nav.map((item, index) => (
                <li key={index}>
                  {
                    item.link
                    ? <Link to={item.link}>
                        {item.text}
                      </Link>
                    : <a onTouchStart={changeSubNavActive.bind(null, index)}>
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
              onTouchStart={changeActive}>
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

export default Header