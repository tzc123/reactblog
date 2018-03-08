import '../styles/sortnav.css'
import { Link } from 'react-router-dom'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'

@inject('home')
@observer
class SortNav extends React.Component {
  render() {
    const { list, setActive, active } = this.props.home
    return (
      <nav className="sort-nav">
        <ul>
          {
            list.map(
              (item, index) => 
                <li className={active == index ? 'active' : ''} key={index}>
                  <Link to="/" onClick={() => setActive(index)} >
                    {item.text}
                  </Link>
                </li>
            )
          }
        </ul>
      </nav>
    )
  }
}

export default SortNav