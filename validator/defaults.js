module.exports = {
  messages: {
    type: function (key, value, type) {
      return `${key}: ${value} is not a ${type}`
    },
    required: function (key, value) {
      return `${key}: this key is required`
    },
    minLength: function (key, value, minLength) {
      return `${key}: the length of ${value} is shorter than ${minLength}`
    },
    maxLength: function (key, value, maxLength) {
      return `${key}: the length of ${value} is longer than ${maxLength}`
    },
    fixed: function (key, value, fixed) {
      return `${key}: length fixed ${fixed}`
    },
    min: function (key, value, min) {
      return `${key}: ${value} is lesser than ${min}`
    },
    max: function (key, value, max) {
      return `${key}:  ${value} is more than ${max}`
    },
  },
  handler: function (ctx, message) {}
}