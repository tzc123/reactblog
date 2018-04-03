import debounce from '../utils/debounce'

export default class Mask extends React.Component {

  constructor() {
    super()
    const { innerWidth, innerHeight } = window
    this.state = {
      width: innerWidth,
      height: innerHeight
    }
  }

  componentDidMount() {
    window.addEventListener('resize', debounce(this.handleResize.bind(this), 500))
    document.body.addEventListener('click', this.handleClick.bind(this))
    this.ctx = this.refs.canvas.getContext('2d')
    this.ctx.lineWidth = 20
  }

  handleResize() {
    const { innerWidth, innerHeight } = window
    this.setState({
      width: innerWidth,
      height: innerHeight
    })
  }

  handleClick(e) {
    const { ctx } = this
    const { clientX, clientY } = e
    let i = 0
    let opacity = 0.5
    this.animate(() => {
      this.clear()
      ctx.beginPath()
      ctx.fillStyle = `rgba(100,100,100,${opacity})`
      ctx.arc(clientX, clientY, i, 0, Math.PI * 2)
      ctx.fill()
      i += 2
      opacity -= 0.005
    }, 2000)
  }

  animate(callback, interval) {
    const timeBegin = +new Date()
    const handle = () => {
      callback()
      const timeNow = +new Date()
      if (timeNow - timeBegin < interval) {
        requestAnimationFrame(handle)
      } else {
        this.clear()
      }
    }
    handle()
  }

  clear() {
    const { ctx, state: { width, height } } = this
    ctx.clearRect(0, 0, width, height)
  }
  
  render() {
    const { handleClick, state } = this
    return (
      <canvas className="canvas-mask" ref="canvas" {...state}></canvas>
    )
  }
}