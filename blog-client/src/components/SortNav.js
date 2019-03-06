import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@inject('home')
@observer
class SortNav extends React.Component {
  
  render() {
    const { list, active, changeActive } = this.props.home
    return (
      <nav className="sort-nav">
        order by:
        <ul>
          {
            list.map(
              (item, index) => (
                <li className={active == index ? 'active' : ''} 
                  key={index} 
                  onClick={() => changeActive(index)}>
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