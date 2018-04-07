const fdValidator = require('../../validator')
const hex = /[0-9a-f]{24}/

fdValidator.messages.required = function(key, value) {
  return `${key}是必须的`
}

fdValidator.validators.isId = function (value) {
  return hex.test(value)
}

fdValidator.messages.isId = function (key, value) {
  return `${value}不是合法的ID`
}

fdValidator.handler = function (ctx, message) {
  const { request: { url, method } } = ctx
  logger.info(message, { url, method })
  ctx.body = {
    success: false,
    message: message
  }
}

module.exports = {
  list: fdValidator({
    query: {
      size: {
        rules: {
          type: 'number'
        }
      }, 
      index: {
        rules: {
          type: 'number'
        }
      }
    }
  }),
  index: fdValidator({
    params: {
      id: {
        rules: {
          type: 'string',
          isId: true
        }
      }
    }
  })
}