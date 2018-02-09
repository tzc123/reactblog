import React from 'react'
import ArticleItem from './ArticleItem.js'
import '../styles/article.css'
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
  
  handleClick(index, e) {
    const { state: { articles } } = this 
    this.setState({
      articles: [...articles, {
        title: 'js的基础类型',
        time: '2017-10-25',
        pic: '../images/bg.jpeg',
        views: 33,
        isInserted: true
      }]
    })
  }
  render() {
    const { state: { articles } } = this
    return (
      <ul className="article-list">
      <div className="line"></div>
        {
          articles.map(
            (article, index) => (
              <ArticleItem 
                {...article} 
                key={index}
                index={index}
                handleClick={this.handleClick.bind(this, index)} />
            ) 
          )
        }
      </ul>
    )
  }
}

ArticleList.defaultProps = {
    
}