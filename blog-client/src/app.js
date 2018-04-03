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

const renderMethod = window.initialData
	? ReactDOM.hydrate
	: module.hot
		? ReactDOM.render 
		: ReactDOM.hydrate

renderMethod(
	<RouterComponent />, document.getElementById('app')
)
