import '../../static/css/hopscotch.min.css'
import '../../static/css/github-markdown.css'

export default (props) => (
  <div className="article-content markdown-body" 
    dangerouslySetInnerHTML={{__html: props.content || ''}}>
  </div>
)