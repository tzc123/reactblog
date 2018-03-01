import {  observable, action, autorun } from 'mobx'

import { getArticle } from '../api'

class ArticleStore {
  @observable article = {
    title: '',
    content: '',
    browse: 0,
    ategory: '',
    created_at: '0000-00-00',
    catelog: [],
  }
  @observable active = 0

  @action setArticle(article) {
    this.article = article
  }

  @action setActive(active) {
    this.active = active
  }

  loadData(id) {
    return getArticle(id)
      .then(this.setArticle.bind(this))
  }

  constructor() {
    this.loadData = this.loadData.bind(this)
    this.setActive = this.setActive.bind(this)
  }
}

export default new ArticleStore()