import '../styles/sortnav.css'
import { Link } from 'react-router-dom'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'

class SortNav extends React.Component {
  render() {
    const { list, setActive, active } = this.props
    return (
      <nav className="sort-nav">
        <ul>
          {
            list.map(
              (item, index) => (
                <li className={active == index ? 'active' : ''} 
                  key={index} 
                  onClick={() => setActive(index)}>
                  {item.text}
                </li>
              )
            )
          }
        </ul>
      </nav>
    )
  }
}

export default SortNav