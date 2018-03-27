import '../styles/comment.css'
import { comment } from '../api'

export default class CommentArea extends React.Component {
 
  handleSubmit() {
    comment(
      this.props.id,
      this.refs.text.innerText
    )
  }

  render() {
    const { handleSubmit, props : { id } } = this

    return (
      <section className="comment-area">
        <p contentEditable="true" ref="text"></p>
        <div className="submit" onClick={handleSubmit.bind(this)}>crazy bb</div>
      </section>
    )
  }
}