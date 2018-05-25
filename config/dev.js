module.exports = {
  isProd: false,
  log: {
    level: 'info'
  },
  port: process.env.PORT || 3008,
  database: {
    redis: {
      url: 'redis://joda:6379'
    },
    mongoDebug: true,
    mongodb: [
      {
        name: 'db',
        url: 'mongodb://joda/kit',
        options: {}
      }
    ]
  },
}
