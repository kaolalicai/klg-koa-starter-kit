module.exports = {
  log: {
    level: 'debug'
  },
  port: process.env.PORT || 3000,
  mongodb: {
    debug: true,
    connections: [
      {
        name: 'db',
        url: process.env.MONGODB || 'mongodb://localhost/unit-test',
        options: {}
      }
    ]
  }
}
