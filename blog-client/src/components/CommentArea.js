import '../styles/comment.css'
import { comment } from '../api'
import { inject } from 'mobx-react'
import throttle from '../utils/throttle'

function handleScroll() {
  const { setSticky } = this.props.article
  const { offsetTop } = this.refs.sticky
  setSticky(window.scrollY >= offsetTop)
}

@inject('article')
class CommentArea extends React.Component {
 
  constructor() {
    super()
    this.handleScroll = throttle(handleScroll.bind(this), 50, true)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleSubmit() {
    comment(
      this.props.id,
      this.refs.input.innerText
    )
  }

  render() {
    const { handleSubmit, props: { id, article: { sticky } } } = this

    return (
      <section className={'comment-area' + (sticky ? ' sticky' : '')} ref="sticky">
        <p contentEditable="true" ref="input"></p>
        <div className="submit" onClick={handleSubmit.bind(this)}>crazy bb</div>
      </section>
    )
  }
}

export default CommentArea