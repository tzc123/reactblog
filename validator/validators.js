const checkType = require('./checkType')
const { email, phone } = require('./regExps')
const { exist } = require('./utils')


module.exports = {
  type(value, type) {
    if (!exist(value)) {
      return true
    } else if (typeof type != 'string' || typeof value != 'string') {
      throw new Error('type(value:?[string], type:?[string])')
    } else {
      return checkType[type](value)
    }
  },
  required(value) {
    if (!exist(value)) {
      return false
    }
    return true
  },
  minLength(value, min) {
    if (typeof min != 'number') {
      throw new Error('minLength(value:[string | number], min:[number])')
    }
    if (typeof value == 'number') {
      value = value + ''
    }
    if (!exist(value)) {
      return true
    } else if (!exist(value.length)) {
      throw new Error('minLength(value:[string | number], min:[number])')
    } else {
      return value.length >= min
    }
  },
  maxLength(value, max) {
    if (typeof max != 'number') {
      throw new Error('maxLength(value:[string | number], max:[number])')
    }
    if (typeof value == 'number') {
      value = value + ''
    }
    if (!exist(value)) {
      return true
    } else if (!exist(value.length)) {
      throw new Error('maxLength(value:[string | number], max:[number])')
    } else {
      return value.length <= max
    }
  },
  fixed(value, fixed) {
    if (typeof fixed != 'number' || (exist(value) && !exist(value.length))) {
      throw new Error('fixed(value:[string], fixed:[number])')
    }
    if (!exist(value)) {
      return true
    } else {
      return value.length == fixed
    }
  },
  min(value, min) {
    if (typeof min != 'number' || typeof value != 'number') {
      throw new Error('min(value:[number], min:[number])')
    }
    if (!exist(value)) {
      return true
    } else {
      return value >= min
    }
  },
  max(value, max) {
    if (typeof max != 'number' || typeof value != 'number') {
      throw new Error('max(value:[number], max:[number])')
    }
    if (!exist(value)) {
      return true
    } else {
      return value <= max
    }
  },
  isEmail(value) {
    if (!exist(value)) {
      return true
    } else {
      return email.test(value)
    }
  },
  isPhone(value) {
    if (!exist(value)) {
      return true
    } else {
      return phone.test(value)
    }
  }
}