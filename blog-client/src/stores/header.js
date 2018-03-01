import {  observable, action, computed } from 'mobx'
import { getArticleCount } from '../api';

const { initialData } = window

class HeaderStore {
  @observable active = false
  @observable nav = initialData
  ? initialData.header.nav
  : [
    {
      text: 'home',
      link: '/'
    },
    {
      text: 'category',
      type: 'category',
      active: false,
      subNav: []
    },
    {
      text: 'links',
      type: 'common',
      active: false,
      subNav: [
        {
          text: 'github',
          link: 'https://github.com/tzc123'
        },
        {
          text: 'juejin',
          link: 'https://juejin.im/user/5936123afe88c20061db655d'
        }
      ]
    },
    {
      text: 'about',
      link: '/about'
    }
  ]
  @computed get activeClass() {
    return `main-header${this.active ? ' active' : ''}`
  }
  @action setArticleCount(articleCount) {
    this.nav[1].subNav = articleCount
  }
  loadData() {
    getArticleCount()
    .then(res => {
      this.setArticleCount(res)
    })
  }
  @action changeActive() {
    this.active = !this.active
  }
  @action closeActive(e) {
    if (e.target.href) {
      this.active = false
    }
  }
  @action changeSubNavActive(index) {
    this.nav[index].active = !this.nav[index].active
  }
  constructor () {
    initialData || this.loadData()
    this.changeActive = this.changeActive.bind(this)
    this.closeActive = this.closeActive.bind(this)
    this.changeSubNavActive = this.changeSubNavActive.bind(this)
  }
}

export default new HeaderStore()