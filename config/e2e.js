module.exports = {
  isProd: false,
  log: {
    level: 'info'
  },
  port: process.env.PORT || 3008,
  database: {
    mongoDebug: true,
    mongodb: [
      {
        name: 'db',
        url: 'mongodb://joda:27017/kit-test',
        options: {autoIndex: false}
      }
    ],
    redis: {
      url: 'redis://joda:6379'
    }
  },
}
