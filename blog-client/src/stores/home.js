import {  observable, action } from 'mobx'
import { getArticleList } from '../api';

const { initialData } = window

class HomeStore {
  @observable currentPage = 1
  @observable total = 0
  @observable articles = []
  @observable active = 2
  @observable category = ''

  list = [
    {
      text: 'time',
      sortby: 'created_at'
    },
    {
      text: 'browse',
      sortby: 'browse'      
    },
    {
      text: 'default',
      sortby: 'created_at'      
    }
  ]
  
  loadData() {
    return getArticleList({
      category: this.category,
      sortby: this.list[this.active].sortby
    })
      .then(this.setArticleList.bind(this))
  }

  @action setCategory(category) {
    this.category = category
    return this.loadData()
  }

  @action setArticleList(articles) {
    // if (({}).toString.call(articles) != '[object Array]') return
    this.articles = articles
    this.total = articles.length
  }

  @action setActive(active) {
    if (active > 2 || action < 0) return
    const oldActive = this.active
    this.active = active
    if (oldActive == 1 || active == 1) {
      this.loadData()
    }
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
    this.loadData()
  }
}

export default new HomeStore()