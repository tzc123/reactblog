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
    // const { timeout, refs: { pages, roller } } = this
    // timeout && clearTimeout(timeout)
    // this.timeout = setTimeout(() => {
    //   let { top } = pages.getBoundingClientRect()
    //   let distance = this.top - top
    //   roller.scrollTo(0, Math.round(distance / 40) * 40)
    // }, 500)
  }
  
  handleClick(index) {
    // const { refs: { roller } } = this
    // roller.scrollTo(0, this.top + ((index - 8) * 40) + 9)
  }

  render() {
    const { props: { total, currentPage }, handleClick } = this
    return (
      <div className="roller__wrapper">
        <div className="roller" ref="roller" onScroll={this.handleScroll.bind(this)}>
          <div className="pages" ref="pages">
            {(() => {
              const pages = []
              for (let i = 1; i < +total + 1; i++) {
                pages.push(<div className={`page ${ currentPage == i ? 'active' : '' }`} onClick={handleClick.bind(this, i)} key={i}>{i < 10 ? '0' + i : i}</div>)
              }
              return pages
            })()}
          </div>
        </div>
        <div className="roller__mask"></div>
        <div className="roller__mark"></div>
      </div>
    )
  }
}