const winston = require('winston')
const path = require('path')
require('winston-daily-rotate-file')

const { Logger, transports: { DailyRotateFile, File } } = winston

global.logger = new Logger({
    transports: [
      new DailyRotateFile({
        name: 'info',
        filename: path.join(__dirname, `logs/.info.log`),
        datePattern: 'yyyy_MM_dd',
        prepend: true,
        level: 'info'
      }),
      new DailyRotateFile({
        name: 'error',
        filename: path.join(__dirname, `logs/.error.log`),
        datePattern: 'yyyy_MM_dd',
        prepend: true,
        level: 'error'
      })
    ]
  })
