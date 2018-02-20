import React from 'react'

export default (props) => (
  <div className="article-content markdown-body" 
    dangerouslySetInnerHTML={{__html: props.content}}>
  </div>
)