import '../styles/sortnav.css'
import { Link } from 'react-router-dom'
import { inject } from 'mobx-react'

@inject('home')
class SortNav extends React.Component {
  
  render() {
    const { list, setActive, active } = this.props.home
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