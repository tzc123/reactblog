import {  observable, action } from 'mobx'
import { getArticleList } from '../api';

class HomeStore {
  @observable currentPage = 1
  @observable total = 0
  @observable articles = []

  loadData(category) {
    getArticleList(category, this.currentPage)
      .then(this.setArticleList.bind(this))
  }

  @action setArticleList(articles) {
    this.articles = articles
    this.total = articles.length
  }

  constructor() {
    this.loadData(null)
  }
}

export default new HomeStore()