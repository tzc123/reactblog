import CommentItem from './CommentItem'

export default class CommentList extends React.Component {

  render() {
    const { comments } = this.props
    const commentsComponent = comments.map(
      (comment, index) => <CommentItem comment={comment} index={index} key={index} />
    )

    return (
      <ul>
        {commentsComponent}
      </ul>
    )
  }
}