import '../styles/catelog.css'
import { computed } from 'mobx'

export default class Catelog extends React.Component {
  @computed get top() {
    const { props: { active } } = this
    return `${(36 + active * 26) / 16}rem`
  }
  static defaultProps = {
    catelog: []
  }
  render() {
    const { props: { catelog, handleClick }, top } = this

    return (
      <section className="catelog">
        <header>目录</header>
        <div className="active" style={{ top }}></div>
        <ul>
          {
            catelog.map((cate, index) => (
              <li className={`t${cate.t} ellipsis`} key={index}>
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


