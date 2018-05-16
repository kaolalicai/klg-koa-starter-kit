import * as tracer from 'tracer'

export interface LogConfig {
  level?: string
  dateformat?: string
  stackIndex?: number
  inspectOpt?: {
    showHidden?: boolean
    depth?: number
  },
  transport?: Function
}

export class Logger {
  private logger: any
  private config: LogConfig

  constructor (config?: LogConfig) {
    if (config) {
      if (!config.stackIndex) config.stackIndex = 1
      this.config = config
    } else {
      this.config = {stackIndex: 1}
    }
    this.logger = tracer.console(this.config)
  }

  log (msg: any, ...params): void {
    this.logger.log.apply(this, arguments)
  }

  info (msg: any, ...params): void {
    this.logger.info.apply(this, arguments)
  }

  debug (msg: any, ...params): void {
    this.logger.debug.apply(this, arguments)
  }

  warn (msg: any, ...params): void {
    this.logger.warn.apply(this, arguments)
  }

  error (msg: any, ...params): void {
    this.logger.error.apply(this, arguments)
  }

  err (msg: any, ...params): void {
    this.error.apply(this, arguments)
  }
}
