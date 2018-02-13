import React from 'react'
import ArticleItem from './ArticleItem.js'
import '../styles/articlelist.css'
import '../images/bg.jpeg'

export default class ArticleList extends React.Component {
  constructor() {
    super()
    this.state = {
      articles: [
        {
          title: 'js的基础类型',
          time: '2017-10-25',
          pic: '../images/bg.jpeg',
          views: 10,
          isInserted: false
        },
        {
          title: 'js的基础类型',
          time: '2017-10-25',
          pic: '../images/bg.jpeg',
          views: 20,
          isInserted: false          
        },
        {
          title: 'js的基础类型',
          time: '2017-10-25',
          pic: '../images/bg.jpeg',
          views: 33,
          isInserted: false          
        },
        {
          title: 'js的基础类型',
          time: '2017-10-25',
          pic: '../images/bg.jpeg',
          views: 33,
          isInserted: false          
        },
        {
          title: 'js的基础类型',
          time: '2017-10-25',
          pic: '../images/bg.jpeg',
          views: 33,
          isInserted: false          
        },
        {
          title: 'js的基础类型',
          time: '2017-10-25',
          pic: '../images/bg.jpeg',
          views: 33,
          isInserted: false          
        },
        {
          title: 'js的基础类型',
          time: '2017-10-25',
          pic: '../images/bg.jpeg',
          views: 33,
          isInserted: false          
        },
        {
          title: 'js的基础类型',
          time: '2017-10-25',
          pic: '../images/bg.jpeg',
          views: 33,
          isInserted: false          
        }
      ]
    }
  }
  
  render() {
    const { state: { articles } } = this
    return (
      <ul className="article-list">
        {
          articles.map(
            (article, index) => (
              <ArticleItem 
                {...article} 
                key={index}
                index={index} />
            ) 
          )
        }
      </ul>
    )
  }
}

ArticleList.defaultProps = {
    
}