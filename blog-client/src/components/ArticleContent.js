export default ({content = ''}) => (
  <div className="article-content markdown-body" 
    dangerouslySetInnerHTML={{__html: content}}>
  </div>
)