import { computed } from 'mobx'
import calculateInterval from '../utils/calculateInterval'


export default class CommentItem extends React.Component {

  @computed get created_at() {
    return calculateInterval(this.props.comment.created_at)
  }
  
  render() {
    const { props: { comment: { text, incisive, useful, useless, nonsense }, index }, created_at } = this

    return (
      <li className="comment">
        <header>
          {index + 1}楼:
          <span>{created_at}</span>
        </header>
        <div className="content">
          {text}
        </div>
        <footer>
          <ul>
            <li className="tag">
              精辟（{incisive}）
            </li>
            <li className="tag">
              有用（{useful}）
            </li>
            <li className="tag">
              没用（{useless}）
            </li>
            <li className="tag">
              扯淡（{nonsense}）
            </li>            
          </ul>
        </footer>
      </li>
    )
  }
}