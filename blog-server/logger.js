const winston = require('winston')
const path = require('path')
const { server: { logPath } } = require('./config')
require('winston-daily-rotate-file')

const { Logger, transports: { DailyRotateFile, File } } = winston

global.logger = new Logger({
    transports: [
      new DailyRotateFile({
        name: 'info',
        filename: logPath + '.info.log',
        datePattern: 'yyyy_MM_dd',
        prepend: true,
        level: 'info'
      }),
      new DailyRotateFile({
        name: 'error',
        filename: logPath + '.error.log',
        datePattern: 'yyyy_MM_dd',
        prepend: true,
        level: 'error'
      })
    ]
  })
