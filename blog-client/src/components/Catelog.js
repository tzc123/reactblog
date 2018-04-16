class Catelog extends React.Component {

  render() {
    const { catelog , top , handleClick } = this.props
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

export default Catelog


