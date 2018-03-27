import {  observable, action, autorun } from 'mobx'
import { computed } from 'mobx'
import { getArticle } from '../api'
const { initialData } = window

const initialArticle = {
  title: '',
  content: '',
  browse: 0,
  ategory: '',
  created_at: '0000-00-00',
  catelog: [],
  comments: []
}

class ArticleStore {
  
  @observable article = initialArticle
  @observable active = 0
  
  @computed get top() {
    return `${(36 + this.active * 26) / 16}rem`
  }

  @action setArticle(article) {
    this.article = article
  }

  @action setActive(active) {
    this.active = active
  }

  @action clear() {
    this.article = initialArticle
  }

  loadData(id) {
    return getArticle(id)
      .then(this.setArticle.bind(this))
  }

  constructor() {
    this.loadData = this.loadData.bind(this)
    this.setActive = this.setActive.bind(this)
    this.setArticle(
      initialData
      ? initialData.article
        ? initialData.article.article
        : initialArticle
      : initialArticle
    )
  }
}

export default new ArticleStore()