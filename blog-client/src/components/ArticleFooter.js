import CommentList from './CommentList'
import CommentsArea from './CommentArea'

export default class ArticleFooter extends React.Component {
  
  render() {
    const { id, comments } = this.props

    return (
      <footer className="article-footer">
        <CommentsArea id={id}/>
        {
          comments.length > 0 
          ? <CommentList comments={comments} />
          : <li className="comment">
              <header>
                1楼:
              </header>
              <div className="content">
                虚位以待...
              </div>
              <footer></footer>
            </li>
        }
      </footer>
    )
  }
}