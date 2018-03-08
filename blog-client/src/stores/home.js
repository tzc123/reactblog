import {  observable, action } from 'mobx'
import { getArticleList } from '../api';

const { initialData } = window

class HomeStore {
  @observable currentPage = 1
  @observable total = 0
  @observable articles = []
  @observable active = 2

  list = [
    {
      text: 'time'
    },
    {
      text: 'browse'
    },
    {
      text: 'default'
    }
  ]
  
  loadData(category) {
    if (typeof category != 'string') return
    return getArticleList(category, this.currentPage)
      .then(this.setArticleList.bind(this))
  }

  @action setArticleList(articles) {
    // if (({}).toString.call(articles) != '[object Array]') return
    this.articles = articles
    this.total = articles.length
  }

  @action setActive(active) {
    if (active > 2 || action < 0) return
    this.active = active
  }
  constructor() {
    this.setArticleList(
      initialData
      ? initialData.home
        ? initialData.home.articles
        : []
      : []
    )
    this.setActive = this.setActive.bind(this)
  }
}

export default new HomeStore()