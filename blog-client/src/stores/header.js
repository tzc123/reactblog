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
  @observable result = []
  @observable focused = false
  @observable progress = 0

  search = debounce((function (target) {
    const keyword = target.value
    search(keyword)
      .then(res => {
        res && this.setResult(res)
      })
  }).bind(this), 500, true)

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
        this.setResult([])
      }), 200);
    }
  }

  @action changeSubNavActive(index) {
    this.nav[index].active = !this.nav[index].active
  }

  @action setProgress(progress) {
    this.progress = progress
  }

  changeProgress(progress) {
    if (this.progress == process) return
    this.progress = progress
    if (progress == 1) {
      setTimeout(() => {
        this.setProgress(0)
      }, 1000);
    }
  }

  constructor () {
    this.changeActive = this.changeActive.bind(this)
    this.cancelActive = this.cancelActive.bind(this)
    this.setResult = this.setResult.bind(this)
    this.setFocused = this.setFocused.bind(this)
    this.setProgress = this.setProgress.bind(this)
    this.changeProgress = this.changeProgress.bind(this)
    this.changeSubNavActive = this.changeSubNavActive.bind(this)
    initialData || this.loadData()
  }
}

export default new HeaderStore()