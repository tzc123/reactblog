import React from 'react'
import '../styles/game.css'

const boxType = {
  2: {
    color: '#eee4da',
    textColor: '#776e65',
    offset: {
      x: 18,
      y: 33
    },
    font: '25px Helvetica Neue'
  },
  4: {
    color: '#ede0c8',
    textColor: '#776e65',
    offset: {
      x: 18,
      y: 33
    },
    font: '25px Helvetica Neue'
  },
  8: {
    color: '#f2b179',
    textColor: '#f9f6f2',
    offset: {
      x: 18,
      y: 33
    },
    font: '25px Helvetica Neue'
  },
  16: {
    color: '#f59563',
    textColor: '#f9f6f2',
    offset: {
      x: 10,
      y: 33
    },
    font: '25px Helvetica Neue'
  },
  32: {
    color: '#f67c5f',
    textColor: '#f9f6f2',
    offset: {
      x: 10,
      y: 33
    },
    font: '25px Helvetica Neue'
  },
  64: {
    color: '#f65e3b',
    textColor: '#f9f6f2',
    offset: {
      x: 10,
      y: 33
    },
    font: '25px Helvetica Neue'
  },
  128: {
    color: '#edcf72',
    textColor: '#f9f6f2',
    offset: {
      x: 4,
      y: 33
    },
    font: '23px Helvetica Neue'
  },
  256: {
    color: '#edcc61',
    textColor: '#f9f6f2',
    offset: {
      x: 5,
      y: 33
    },
    font: '23px Helvetica Neue'
  },
  512: {
    color: '#edc850',
    textColor: '#f9f6f2',
    offset: {
      x: 5,
      y: 33
    },
    font: '23px Helvetica Neue'
  },
  1024: {
    color: '#edc53f',
    textColor: '#f9f6f2',
    offset: {
      x: 1,
      y: 32
    },
    font: '20px Helvetica Neue'
  },
  2048: {
    color: '#edc22e',
    textColor: '#f9f6f2',
    offset: {
      x: 2,
      y: 32
    },
    font: '20px Helvetica Neue'
  },
  4096: {
    color: '#3c3a32',
    textColor: '#f9f6f2',
    offset: {
      x: 2,
      y: 32
    },
    font: '20px Helvetica Neue'
  },
}

export default class Game extends React.Component {
  constructor() {
    super()
    this.boxs = []
  }
  componentDidMount() {
    const { createInitialBoxs, refs: { game } } = this
    this.ctx = game.getContext('2d')
    this.boxs = createInitialBoxs()
    this.createBox()
    this.createBox()    
    this.draw()
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }
  createInitialBoxs() {
    const initialBoxs = []
    for (let i = 0; i < 16; i++) {
      const row = Math.ceil((i + 1) / 4) - 1
      const column = i % 4
      const beginX = (column) * 50 + 0.5
      const beginY = (row) * 50 + 0.5
      initialBoxs.push({
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
    return initialBoxs
  }
  createBox() {
    const { boxs } = this
    let emptyBoxs = boxs.map((boxs, index) => {
      if (boxs.value) {
        return null
      } else {
        return index
      }
    })
    emptyBoxs = emptyBoxs.filter(box => box != null)
    const len = emptyBoxs.length
    if (len > 0) {
      const index = emptyBoxs[Math.floor(Math.random() * len)]
      boxs[index].index = index
      boxs[index].value = Math.random() < 0.9 ? 2 : 4
    }
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
        const type = boxType[box.value]
        const { position } = box
        ctx.fillStyle = type.color
        ctx.beginPath()
        ctx.moveTo(position[0].x, position[0].y)
        for (let i = 1; i < 4; i++) {
          ctx.lineTo(position[i].x, position[i].y)
        }
        ctx.closePath()
        ctx.fill()
        ctx.font = type.font
        ctx.fillStyle = type.textColor
        ctx.fillText(box.value, position[0].x + type.offset.x, position[0].y + type.offset.y)
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
    const { boxs } = this
    const moveTasks = []
    if (key == 'w' || key == 'ArrowUp') {
      boxs.forEach((box, index) => {
        if (box.value && (box.row != 0)) {
          let end = index
          let datum = box.value
          let hasSame = false
          for(let i = index - 4; i >= 0 && i < 16; i -= 4) {
            let value = boxs[i].value
            if (value) {
              if (hasSame) {
                datum = value
                hasSame = false
              } else {
                if (datum == value) {
                  end -= 4
                  hasSame = true
                } else {
                  datum = value
                }
              }
            } else {
              end -= 4
            }
          } 
          if (end != index) {
            boxs[index].index = end
            moveTasks.push({
              index,
              distance: boxs[index].row - boxs[end].row
            })
          }
        }
      })
    } else if (key == 's' || key == 'ArrowDown') {
      boxs.forEach((box, index) => {
        if (box.value && (box.row != 3)) {
          let end = index
          let datum = box.value
          let hasSame = false
          for(let i = index + 4; i >= 0 && i < 16; i += 4) {
            let value = boxs[i].value
            if (value) {
              if (hasSame) {
                datum = value
                hasSame = false
              } else {
                if (datum == value) {
                  end += 4
                  hasSame = true
                } else {
                  datum = value
                }
              }
            } else {
              end += 4
            }
          } 
          if (end != index) {
            boxs[index].index = end
            moveTasks.push({
              index,
              distance:  boxs[end].row - boxs[index].row
            })
          }
        }
      })
    } else if (key == 'd' || key == 'ArrowRight') {
      boxs.forEach((box, index) => {
        if (box.value && (box.column != 3)) {
          let end = index
          let datum = box.value
          let hasSame = false
          for(let i = index + 1; i < box.row * 4 + 4; i ++) {
            let value = boxs[i].value
            if (value) {
              if (hasSame) {
                datum = value
                hasSame = false
              } else {
                if (datum == value) {
                  end++
                  hasSame = true
                } else {
                  datum = value
                }
              }
            } else {
              end++
            }
          } 
          if (end != index) {
            boxs[index].index = end
            moveTasks.push({
              index,
              distance: boxs[end].column - boxs[index].column
            })
          }
        }
      })
    } else if (key == 'a' || key == 'ArrowLeft') {
      boxs.forEach((box, index) => {
        if (box.value && (box.column != 0)) {
          let end = index
          let datum = box.value
          let hasSame = false
          for(let i = index - 1; i > box.row * 4 - 1; i --) {
            let value = boxs[i].value
            if (value) {
              if (hasSame) {
                datum = value
                hasSame = false
              } else {
                if (datum == value) {
                  end--
                  hasSame = true
                } else {
                  datum = value
                }
              }
            } else {
              end--
            }
          } 
          if (end != index) {
            boxs[index].index = end
            moveTasks.push({
              index,
              distance: boxs[index].column - boxs[end].column
            })
          }
        }
      })
    }
    this.moveBoxs(moveTasks, key)
  }

  moveBoxs(moveTasks, key) {
    const { boxs } = this
    let i = 0
    function handle() {
      if (i < 10) {
        moveTasks.forEach(task => {
          const { index, distance } = task
          for (let i = 0; i < 4; i++) {
            if (key == 'w' || key == 'ArrowUp') {
              boxs[index].position[i].y -= distance * 5
            } else if (key == 's' || key == 'ArrowDown') {
              boxs[index].position[i].y += distance * 5
            } else if (key == 'd' || key == 'ArrowRight') {
              boxs[index].position[i].x += distance * 5
            } else if (key == 'a' || key == 'ArrowLeft') {
              boxs[index].position[i].x -= distance * 5
            }
          }
        })
        this.clear()
        this.draw()
        requestAnimationFrame(handle.bind(this))
      } else {
        this.mergeBoxs()
        if (moveTasks.length > 0) {
          this.createBox()
          this.clear()
          this.draw()
        }
      }
      i ++
    }
    if (moveTasks.length > 0) {
      handle.call(this)
    }
  }
  mergeBoxs() {
    const { ctx, boxs, createInitialBoxs } = this
    const newBoxs = createInitialBoxs()
    for (let i = 0; i < 16; i++) {
      const newbox = boxs.filter(box => box.index == i)
      const len = newbox.length
      if (len == 1 || len == 2) {
        const box = newBoxs[newbox[0].index]
        box.index = newbox[0].index
        box.value = newbox[0].value * len
      }
    }
    this.boxs = newBoxs
  }
  render() {
    return (
      <canvas className="game" onKeyDown={this.handleKeyDown.bind(this)} ref="game" width="200" height="200"></canvas>
    )
  }
}