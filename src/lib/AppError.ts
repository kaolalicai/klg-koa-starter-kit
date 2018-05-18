import * as util from 'util'

const ErrorInfo = {
  UNKNOWN_ERROR: '未知错误',
  NOT_EXIST: '%s不存在:%s',
  EXIST: '%s已存在',
}

const ErrorCode = {
  DEFAULT: 1,
  REQUEST_REPEAT: 1501,
  ORDER_REPEAT: 1502,
  SYS_ERROR: 1504,
  NOT_ENOUGH: 1505            // 余额不足
}

export class AppError extends Error {
  static ERRORS = ErrorInfo
  static CODES = ErrorCode

  code: number
  message: string

  constructor (message: string = ErrorInfo.UNKNOWN_ERROR, ...params) {
    super()
    if (params && params.length) {
      params.unshift(message)
      message = util.format(...params)
      // message = util.format.apply(util, params)
    }
    this.code = ErrorCode.DEFAULT
    this.message = message
  }
}
