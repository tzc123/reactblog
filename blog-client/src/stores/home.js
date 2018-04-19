import {  observable, action } from 'mobx'
import { getArticleList } from '../api';

const { initialData } = window

class HomeStore {
  @observable currentPage = 1
  @observable total = 0
  @observable articles = []
  @observable active = 2
  @observable category = ''
  @observable animated = true
  @observable fade = false

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
    this.setFade(true)
    return this.loadData()
  }

  @action setArticleList(articles) {
    this.articles = articles
    this.total = articles.length
    console.log(articles)
    this.triggerAnimation()
  }

  @action changeActive(active) {
    if (active > 2 || action < 0) return
    const oldActive = this.active
    if (oldActive == 1 || active == 1) {
      this.setFade(true)
      this.loadData()
        .then(() => {
          this.setActive(active)
        })
    } else {
      this.setFade(true)
      setTimeout(() => {
        this.setActive(active)
        this.triggerAnimation()
      }, 100);
    }
  }

  @action setActive(active) {
    this.active = active
  }

  @action setAnimated(animated) {
    this.animated = animated
  }

  @action setFade(fade) {
    this.fade = fade
  }
  loadData() {
    return getArticleList({
      category: this.category,
      sortby: this.list[this.active].sortby
    }).then(
      this.setArticleList.bind(this)
    )
  }

  triggerAnimation() {
    this.setFade(false)
    this.setAnimated(true)
    setTimeout(() => {
      this.setAnimated(false)
    }, 500)
  }
  
  constructor() {
    this.changeActive = this.changeActive.bind(this)
    this.setActive = this.setActive.bind(this)
    this.triggerAnimation = this.triggerAnimation.bind(this)
    initialData && initialData.home 
    ? this.setArticleList(initialData.home.articles)
    : this.loadData()
  }
}

export default new HomeStore()