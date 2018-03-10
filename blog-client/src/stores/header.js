import {  observable, action, computed } from 'mobx'
import { getArticleCount, search } from '../api'
import debounce from '../utils/debounce'

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
  @observable result = [null]
  @observable focused = false
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
  search = debounce((function (target) {
    const keyword = target.value
    search(keyword)
      .then(res => {
        res && this.setResult(res)
      })
  }).bind(this), 500, true)
  @action setResult(result) {
    this.result = result
  }
  @action changeActive() {
    this.active = !this.active
  }
  @action cancelActive(e) {
    if (e.target.href) {
      this.active = false
    }
  }
  @action setFocused(focused) {
    if (focused) {
      this.focused = focused
    } else {
      setTimeout(action(() => {
        this.focused = focused
        this.setResult([null])
      }), 200);
    }
  }
  @action changeSubNavActive(index) {
    this.nav[index].active = !this.nav[index].active
  }
  constructor () {
    initialData || this.loadData()
    this.changeActive = this.changeActive.bind(this)
    this.cancelActive = this.cancelActive.bind(this)
    this.setResult = this.setResult.bind(this)
    this.setFocused = this.setFocused.bind(this)
    this.changeSubNavActive = this.changeSubNavActive.bind(this)
  }
}

export default new HeaderStore()