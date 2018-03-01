const { getArticleCount } = require('../api')

module.exports = async function () {
  const store = {
    nav: [
      {
        text: 'home',
        link: '/'
      },
      {
        text: 'category',
        type: 'category',
        active: false,
        subNav: await getArticleCount()
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
    ],
    active: false,
    changeSubNavActive: () => {},
    activeClass: 'main-header'
  }
  return store
}