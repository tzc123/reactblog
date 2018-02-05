import React from 'react';
import '../styles/roller.css'

export default class Roller extends React.Component {
  constructor () {
    super()
  }
  render() {
    const { props: { total } } = this
    return (
      <div>
        <div className="roller_mask"></div>
        <div className="roller">
          <div className="pages">
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