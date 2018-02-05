import React from 'react'
import '../styles/game.css'

const boxColor = {
  2: '#eee4da',
  4: '#ede0c8',
  8: '#f2b179',
  16: '#f59563',
  32: '#f67c5f',
  64: '#f65e3b',
  128: '#edcf72',
  265: '#edcc61',
  512: '#edc850',
  1024: '#edc53f',
  2048: '#edc22e',
  4096: '#3c3a32'
}

export default class Game extends React.Component {
  componentDidMount() {
    const { refs: { game } } = this
    this.ctx = game.getContext('2d')
    this.ctx.font=`25px Helvetica Neue`;
    this.boxs = []
    for (let i = 0; i < 16; i++) {
      const row = Math.ceil((i + 1) / 4) - 1
      const column = i % 4
      const beginX = (row) * 50 + 0.5
      const beginY = (column) * 50 + 0.5
      this.boxs.push({
        row,
        column,
        position: [
          {
            x: beginX,
            y: beginY
          },
          {
            x: beginX + 49,
            y: beginY
          },
          {
            x: beginX + 49,
            y: beginY + 49
          },
          {
            x: beginX,
            y: beginY + 49
          }
        ]
      })
    }
    this.createBox()
    this.createBox()    
    this.draw()
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }
  createBox() {
    let emptyBoxs = this.boxs.map((boxs, index) => {
      if (boxs.value) {
        return null
      } else {
        return index
      }
    })
    emptyBoxs = emptyBoxs.filter(box => box != null)
    const len = emptyBoxs.length
    const index = emptyBoxs[Math.floor(Math.random() * len)]
    this.boxs[index].value = 2
    this.boxs[index].color = boxColor[2]
    this.boxs[index].textColor = '#776e65'
  }
  drawLine() {
    const { ctx } = this
    ctx.strokeStyle = 'rgb(187, 173, 160)'
    ctx.lineWidth = 2
    for (let i = 1; i < 4; i++) {
      ctx.beginPath()
      ctx.moveTo(50 * i, 0)
      ctx.lineTo(50 * i, 200)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, 50 * i)
      ctx.lineTo(200, 50 * i)
      ctx.stroke()
    }
  }
  drawBoxs() {
    const { ctx, boxs } = this
    ctx.lineJoin = "round"
    boxs.forEach(box => {
      if (box.value) {
        const { position } = box
        ctx.fillStyle = box.color
        ctx.beginPath()
        ctx.moveTo(position[0].x, position[0].y)
        for (let i = 1; i < 4; i++) {
          ctx.lineTo(position[i].x, position[i].y)
        }
        ctx.closePath()
        ctx.fill()
        ctx.fillStyle = box.textColor
        ctx.fillText(box.value, position[0].x + 18, position[0].y + 33)
      }
    })
  }
  draw() {
    this.drawLine()
    this.drawBoxs()
  }
  clear() {
    const { ctx } = this
    ctx.clearRect(0, 0, 200, 200)
  }
  handleKeyDown(e) {
    const { key } = e
    this.trigger(key)
  }
  trigger(key) {
    if (key = 'w') {
      this.boxs.forEach((box, index) => {
        if (box.row != 0) {
          let end = index
          for(let i = index; i >= 0 && i < 16; i -= 4) {
            if (boxs[i].value) {

            } else {
              end = i
            }
          } 
        }
      })
    }
  }
  render() {
    return (
      <canvas className="game" onKeyDown={this.handleKeyDown.bind(this)} ref="game" width="200" height="200"></canvas>
    )
  }
}