import React from 'react';
import '../styles/roller.css'

export default class Roller extends React.Component {
  constructor () {
    super()
  }

  render() {
    const { props: { total, currentPage }, handleClick } = this
    return (
      <nav className="roller-wrapper">
        <div className="roller-mark"></div>
        <div className="roller">
          <div className="pages">
            {(() => {
              const pages = []
              for (let i = 1; i < +total + 1; i++) {
                pages.push(
                  <div className={`page ${ currentPage == i ? 'active' : '' }`} 
                    key={i}>{i < 10 ? '0' + i : i}
                  </div>
                )
              }
              return pages
            })()}
          </div>
        </div>
        <div className="roller-mask"></div>
      </nav>
    )
  }
}

Roller.defaultProps = {
  total: 1,
  currentPage: 1
}