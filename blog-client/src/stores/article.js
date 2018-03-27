import {  observable, action, autorun } from 'mobx'
import { computed } from 'mobx'
import { getArticle, comment, getComments } from '../api'
const { initialData } = window

const initialArticle = {
  title: '',
  content: '',
  browse: 0,
  ategory: '',
  created_at: '0000-00-00',
  catelog: []
}

class ArticleStore {
  
  @observable article = initialArticle
  @observable active = 0
  @observable sticky = false
  @observable comments = []

  @computed get top() {
    return `${(36 + this.active * 26) / 16}rem`
  }

  @computed get created_at() {
    return new Date(this.article.created_at)
      .toLocaleDateString()
      .replace(/\//g,'-')
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

  @action setSticky(sticky) {
    this.sticky = sticky
  }

  @action setComments(comments) {
    this.comments = comments
  }

  loadData(id) {
    return getArticle(id)
      .then(this.setArticle.bind(this))
  }

  loadComments(id) {
    return getComments(id)
      .then(this.setComments.bind(this)) 
  }

  constructor() {
    this.loadData = this.loadData.bind(this)
    this.setActive = this.setActive.bind(this)
    this.setSticky = this.setSticky.bind(this)
    this.loadComments = this.loadComments.bind(this)
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