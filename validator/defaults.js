module.exports = {
  messages: {
    type(key, value, type) {
      return `${key}: ${value} is not a ${type}`
    },
    required(key, value) {
      return `${key}: this key is required`
    },
    minLength(key, value, minLength) {
      return `${key}: the length of ${value} is shorter than ${minLength}`
    },
    maxLength(key, value, maxLength) {
      return `${key}: the length of ${value} is longer than ${maxLength}`
    },
    fixed(key, value, fixed) {
      return `${key}: length fixed ${fixed}`
    },
    min(key, value, min) {
      return `${key}: ${value} is lesser than ${min}`
    },
    max(key, value, max) {
      return `${key}:  ${value} is more than ${max}`
    },
  },
  handles: {
    default(ctx, message, setDefault) {
      rules.required && setDefault()
    }
  },
  handler: function (ctx, message) {}
}