import React from 'react'
import ArticleList from '../components/ArticleList'
import Roller from '../components/Roller'
import Nav from '../components/Nav'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <ArticleList /> 
        <Roller total="100" />
      </div>
    )
  }
}
