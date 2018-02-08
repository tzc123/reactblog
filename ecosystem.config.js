module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name: 'app',
      script: 'blog-server/app.js',
      watch: true,
      "env": {
        "NODE_ENV": "development"
      },
      "ignore_watch": ["node_modules", "blog-server/logs", ".git", "blog-client"]
    },

    // Second application
    {
      name      : 'webhook',
      script    : 'webhook/deploy.js'
    }
  ]
};
