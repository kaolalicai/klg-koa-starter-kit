import * as http from 'http'
import * as supertest from 'supertest'
import {app} from '../modules'

const server = http.createServer(app.callback())

export const request = supertest.agent(server)
