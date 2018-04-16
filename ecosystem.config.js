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
      instances: 4,      
      "env": {
        "NODE_ENV": "production"
      },
      "ignore_watch": ["node_modules", "blog-server/logs", ".git", "blog-client", "package-lock.json", "package.json", "ssr", "static", "ssr-server/logs"]
    },

    // Second application
    {
      name      : 'webhook',
      script    : 'webhook/deploy.js'
    },

    // second application
    {
      name: 'ssr',
      script: 'ssr-server/app.js',
      instances: 4,
      watch: true,
      "env": {
        "NODE_ENV": "production"
      },
      "ignore_watch": ["node_modules", "blog-server", ".git", "blog-client", "package-lock.json", "package.json", "asset", "static", "ssr-server/logs"]
    }
  ]
};
