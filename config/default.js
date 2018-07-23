module.exports = {
  isProd: false,
  log: {
    level: 'info'
  },
  tracer: {
    enable: true
  },
  port: process.env.PORT || 3000,
  database: {
    mongoDebug: false,
    mongodb: [
      {
        name: 'db',
        url: process.env.MONGODB || 'mongodb://localhost/unit-test',
        options: {}
      }
    ],
    redis: {
      url: process.env.REDIS || 'redis://:authpassword@127.0.0.1:6380',
    }
  },
  third: {
    url: 'http://localhost:4006'
  }
}
