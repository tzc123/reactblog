import '../styles/comment.css'
import { comment } from '../api'
import { inject } from 'mobx-react'
import throttle from '../utils/throttle'

let offsetTop
function handleScroll() {
  const { setSticky } = this.props.article
  const scrollY = window.scrollY || window.pageYOffset
  offsetTop || (offsetTop = this.refs.sticky.offsetTop)
  setSticky(scrollY >= offsetTop)
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
    offsetTop = null
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleSubmit() {
    const { props: { id, article: { loadComments } }, refs: { input } } = this
    comment(
      id,
      input.innerText
    )
      .then(loadComments.bind(null, id))
  }

  handleBlur(e) {
    const { setEmpty } = this.props.article
    setEmpty(!e.target.innerText)
  }

  render() {
    const { handleSubmit, handleBlur, props: { id, sticky, empty  } } = this

    return (
      <section className={'comment-area' + (sticky ? ' sticky' : '')} ref="sticky">
        <p className={empty ? 'empty' : ''} contentEditable="true" ref="input" onBlur={handleBlur.bind(this)}></p>
        <div className="submit" onClick={handleSubmit.bind(this)}>crazy bb</div>
      </section>
    )
  }
}

export default CommentArea