import ReactDOM from 'react-dom'
import RouterComponent from './router.js'
import './styles/base.css'
const renderMethod = window.initialData
	? ReactDOM.hydrate
	: module.hot
		? ReactDOM.render 
		: ReactDOM.hydrate

renderMethod(
	<RouterComponent />, document.getElementById('app')
)
