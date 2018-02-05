import React from 'react';
import '../styles/roller.css'

export default class Roller extends React.Component {
  constructor () {
    super()
  }

  componentDidMount() {
    const { refs: { pages } } = this
    this.top = pages.getBoundingClientRect().top
  }

  handleScroll(e) {
    const { timeout, refs: { pages, roller } } = this
    timeout && clearTimeout(timeout)
    this.timeout = setTimeout(() => {
      let { top } = pages.getBoundingClientRect()
      let distance = this.top - top
      roller.scrollTo(0, Math.round(distance / 40) * 40)
    }, 500)
  }

  render() {
    const { props: { total } } = this
    return (
      <div>
        <div className="roller_mark"></div>
        <div className="roller_mask"></div>
        <div className="roller" ref="roller" onScroll={this.handleScroll.bind(this)}>
          <div className="pages" ref="pages">
            {(() => {
              const pages = []
              for (let i = 0; i < +total; i++) {
                pages.push(<div className="page" key={i}>{i + 1 < 10 ? '0' + (i + 1) : i + 1}</div>)
              }
              return pages
            })()}
          </div>
        </div>
      </div>
    )
  }
}