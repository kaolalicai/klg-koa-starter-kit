module.exports = {
  isProd: false,
  log: {
    level: 'info'
  },
  port: process.env.PORT || 3000,
  database: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS
    },
    mongoDebug: false,
    mongodb: [
      {
        name: 'db',
        url: process.env.MONGODB || 'mongodb://localhost/unit-test',
        options: {}
      }
    ]
  },
}
