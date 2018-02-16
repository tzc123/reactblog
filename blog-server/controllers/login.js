module.exports = {
  index(ctx) {
    console.log(ctx.session.login)
    ctx.session.login = true;
    ctx.body = ctx.session
  }
}