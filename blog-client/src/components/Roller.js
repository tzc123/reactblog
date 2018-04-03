import { inject, observer } from 'mobx-react';

@inject('home')
@observer
export default class Roller extends React.Component {

  render() {
    const { props: { home: { total, currentPage } }, handleClick } = this
    const pages = []
    for (let i = 1; i < +total + 1; i++) {
      pages.push(
        <div className={`page ${ currentPage == i ? 'active' : '' }`} 
          key={i}>{i < 10 ? '0' + i : i}
        </div>
      )
    }

    return (
      <nav className="roller-wrapper">
        <div className="roller-mark"></div>
        <div className="roller">
          <div className="pages">
            {pages}
          </div>
        </div>
        <div className="roller-mask"></div>
      </nav>
    )
  }
}