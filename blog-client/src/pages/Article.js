const React = require('react')
const ReactMarkdown = require('react-markdown')

export default class Article extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '# 123123123 \n ```js \n var a = 0; \n ```'
    }
  }
  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }
  render() {
    return (
      <div className="article">
        <ReactMarkdown source={this.state.value} />
        <textarea name="" id="" cols="30" rows="10" onChange={this.handleChange.bind(this)}></textarea>
      </div>
    )
  }
}