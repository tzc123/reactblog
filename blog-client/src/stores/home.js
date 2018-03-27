import {  observable, action } from 'mobx'
import { getArticleList } from '../api';

const { initialData } = window

class HomeStore {
  @observable currentPage = 1
  @observable total = 0
  @observable articles = []
  @observable active = 2
  @observable category = ''
  @observable animated = false

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

  @action setCategory(category) {
    this.category = category
    return this.loadData()
  }

  @action setArticleList(articles) {
    this.articles = articles
    this.total = articles.length
    this.triggerAnimation()
  }

  @action setActive(active) {
    if (active > 2 || action < 0) return
    const oldActive = this.active
    this.active = active
    if (oldActive == 1 || active == 1) {
      this.loadData()
    } else {
      this.triggerAnimation()
    }
  }

  @action setAnimated(animated) {
    this.animated = animated
  }

  loadData() {
    return getArticleList({
      category: this.category,
      sortby: this.list[this.active].sortby
    })
      .then(this.setArticleList.bind(this))
  }

  triggerAnimation() {
    this.setAnimated(true)
    setTimeout(() => {
      this.setAnimated(false)
    }, 500);
    setTimeout(() => scrollTo(0, 0), 0)
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
    this.triggerAnimation = this.triggerAnimation.bind(this)
    this.loadData()
  }
}

export default new HomeStore()