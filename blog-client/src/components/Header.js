import { observer, inject } from "mobx-react"
import '../styles/header.css'
import { Link } from "react-router-dom";
import SubNav from './SubNav'

@inject('header')
@observer 
class Header extends React.Component {
  render() {
    const { 
      nav, 
      active, 
      activeClass, 
      changeActive, 
      changeSubNavActive, 
      cancelActive, 
      setFocused,
      focused,
      search, 
      result
    } = this.props.header
    return (
      <header className={activeClass}>
        <div className="container">
          <Link className="title" to="/">
            DAZ
          </Link>
          <nav>
            <div className="search"
              onBlur={() => setFocused(false)}>
              <input name="search" 
              onInput={search}
              onFocus={() => setFocused(true)}
              placeholder="你倒是搜啊..."/>
              <i></i>
              <ul className={`result${result ? '' : ' hidden'}`}>
                {
                  result != null
                  ? result.length > 0
                    ? result.map(
                        item => 
                          <li key={item._id}>
                            <Link className="ellipsis"
                              to={`/article/${item._id}`}>
                              {item.title}
                            </Link>
                          </li>
                      ) 
                    : <li>无任何匹配的结果</li>
                  : ''
                }
              </ul>
            </div>
            <ul className="nav" onClick={cancelActive}>
              {nav.map((item, index) => (
                <li key={index}>
                  {
                    item.link
                    ? <Link to={item.link}>
                        {item.text}
                      </Link>
                    : <a onTouchStart={() => changeSubNavActive(index)}>
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