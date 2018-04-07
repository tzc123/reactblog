const defaults = require('./defaults')
const validators = require('./validators')
const { analyze, merge } = require('./utils')

function handleValidate(key, value, option, ctx) {
  const { rules = {}, handlers = {} } = option
  if (
    typeof option != 'object' 
    || typeof rules != 'object'
    || typeof handlers != 'object'
    || (option.messages && typeof option.messages != 'object')
  ) {
    throw new Error('rules,handlers,messages must be object')
  }
  const messages = merge(defaults.messages, option.messages || {})
  const validatorsKeys = Object.keys(validators)
  validatorsKeys.shift()
  return validatorsKeys.every(validatorkey => {
    if (rules[validatorkey] || rules[validatorkey] == 0) {
      const res = validators[validatorkey](value, rules[validatorkey])
      if (!messages[validatorkey]) {
        console.log(`custom rule ${validatorkey} require a message generate function`)
        messages[validatorkey] = () => {}
      }
      const message = (messages[validatorkey])(key, value, rules[validatorkey])
      res || (handlers[validatorkey] || defaults.handler)(ctx, message)
      return res
    } else {
      return true
    }
  })
}

function fdValidator (options) {
  return async function (ctx, next) {
    await next()
    const needValidates = Object.keys(options)
    needValidates.forEach(nv => {
      const params = analyze(ctx, nv)
      const option = options[nv]
      const pKeys = Object.keys(option)
      pKeys.forEach(key => {
        const ruleType = option[key].rules && option[key].rules.type
        const handlerType = option[key].handlers && option[key].handlers.type || defaults.handler
        const messageType = option[key].messages && option[key].messages.type || defaults.messages.type
        if (ruleType) {
          const value = validators.type(params[key], ruleType)
          if (value !== false) {
            params[key] = value === true ? params[key] : value
          } else {
            handlerType(ctx, messageType(key, params[key], ruleType))
            return
          }
        }
        handleValidate(key, params[key], option[key], ctx)
      })
    })
  }
}

fdValidator.messages = defaults.messages
fdValidator.handler = defaults.handler
fdValidator.validators = validators

module.exports = fdValidator
