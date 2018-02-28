import '../styles/catelog.css'
import initCatelog from '../utils/initCatelog'

export default class Catelog extends React.Component {
  render() {
    const { props: { catelog, active, handleClick } } = this
    return (
      <section className="catelog">
        <header>目录</header>
        <div className="active" style={{top: `${(36 + active * 26) / 16}rem`}}></div>
        <ul>
          {
            initCatelog(catelog).map((cate, index) => (
              <li className={`t${cate.t}`} key={index}>
                <a href={`#heading-${index}`}
                  onClick={handleClick.bind(null, index)}>
                  {cate.text}
                </a>
              </li>
            ))
          }
        </ul>
      </section>
    )
  }
}

Catelog.defaultProps = {
  catelog: []
}

