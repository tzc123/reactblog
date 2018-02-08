const winston = require('winston')
const path = require('path')
require('winston-daily-rotate-file')

const { Logger, transports: { DailyRotateFile, File } } = winston

const infoDailyRotateFile = new DailyRotateFile({
  filename: path.join(__dirname, `logs/.info.log`),
  datePattern: 'yyyy_MM_dd',
  prepend: true,
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
})

module.exports = new Logger({
    transports: [
      new DailyRotateFile({
        name: 'info',
        filename: path.join(__dirname, `logs/.info.log`),
        datePattern: 'yyyy_MM_dd',
        prepend: true,
        level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
      }),
      new DailyRotateFile({
        name: 'error',
        filename: path.join(__dirname, `logs/.error.log`),
        datePattern: 'yyyy_MM_dd',
        prepend: true,
        level: process.env.NODE_ENV === 'development' ? 'debug' : 'error'
      })
    ]
  })