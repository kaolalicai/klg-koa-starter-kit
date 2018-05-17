import * as supertest from 'supertest'
import {app} from '../modules'

export const request = supertest.agent(app)
