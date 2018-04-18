import ReactDOM from 'react-dom'
import RouterComponent from './router.js'
const isNode = typeof window === 'undefined'
if (!isNode) {
	require('./styles/base.css')
	require('./styles/home.css')
	require('./styles/header.css')
	require('./styles/game.css')
	require('./styles/articlelist.css')
	require('./styles/roller.css')
	require('./styles/sortnav.css')
	require('./styles/mask.css')
	require('./styles/article.css')
	require('./styles/catelog.css')
	require('./styles/comment.css')
	require('./styles/about.css')
	require('./styles/notfound.css')
	require('../static/css/hopscotch.min.css')
	require('../static/css/github-markdown.css')
}
// 前端渲染使用render 后端渲染使用hydrate
const renderMethod = window.initialData
	? ReactDOM.hydrate
	: module.hot
		? ReactDOM.render 
		: ReactDOM.hydrate
// 宽度为500以下，识别为手机，手机的显示效果统一为iPhone6/7/8的显示效果
const width = window.innerWidth
if (width < 500) {
	document.querySelector('html').style.fontSize = width * 16 / 375 + 'px'
}

renderMethod(
	<RouterComponent />, document.getElementById('app')
)
