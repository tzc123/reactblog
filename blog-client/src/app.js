import ReactDom from 'react-dom'
import RouterComponent from './router.js'
import './styles/base.css'

ReactDom.hydrate(
	<RouterComponent />, document.getElementById('app')
)
