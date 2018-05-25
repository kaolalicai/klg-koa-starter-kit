import {Request, RequestData} from 'klg-request'

export class BaseProxy {
  protected request = new Request()
  protected remoteUrl = ''

  async post (path: string, data: RequestData) {
    await this.request.post(this.remoteUrl + path, data)
  }

  async get (path: string, data: RequestData) {
    await this.request.get(this.remoteUrl + path, data)
  }
}
