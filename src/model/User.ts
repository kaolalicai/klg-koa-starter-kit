import {TypeMongoModel} from '@akajs/mongoose'
import {prop, ReturnModelType} from '@typegoose/typegoose'

// @TypeMongoModel(null, {db: 'db-name'}) // 可以指定 db 连接名
@TypeMongoModel('UserModel')
export class User {
  @prop({index: true, required: true})
  phone: string
  @prop()
  name?: string
}

export type UserModel = ReturnModelType<typeof User>
