import '../styles/sortnav.css'
import { Link } from 'react-router-dom'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

@observer
class SortNav extends React.Component {
  @observable active = 2
  list = [
    {
      text: '时间'
    },
    {
      text: '热度'
    },
    {
      text: '默认'
    }
  ]
  @action handleClick(index) {
    this.active = index
  }
  render() {
    const { list, handleClick, active } = this 
    return (
      <nav className="sort-nav">
        <ul>
          {
            list.map(
              (item, index) => 
                <li className={active == index ? 'active' : ''} key={index}>
                  <Link to="/" onClick={handleClick.bind(this, index)} >
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