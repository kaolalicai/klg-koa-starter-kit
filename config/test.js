module.exports = {
  isProd: false,
  log: {
    level: 'info'
  },
  port: process.env.PORT || 3000,
  database: {
    mongoDebug: true,
    mongodb: [
      {
        name: 'db',
        url: process.env.MONGODB || 'mongodb://joda:27017/kit-test',
        options: {}
      }
    ]
  },
}
