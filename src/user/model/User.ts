import {Document, Model, Schema} from 'mongoose'
import {mongodb} from '../modules'

const db = mongodb.dbs.get('db')
const modelName = 'User'

export interface IUser {
  name: string
  phone: string
  isRegister: boolean
  balance: number
}

export interface UserModel extends IUser, Document {
  registerSuccess (): UserModel
}

const schema: Schema = new Schema({
  phone: {type: String, required: true, index: true, unique: true},
  name: {type: String, required: true},
  isRegister: {type: Boolean},
  balance: {type: Number, default: 0}

})

schema.methods.registerSuccess = function (this: UserModel) {
  this.isRegister = true
  return this.save()
}

schema.set('timestamps', true)        // createAt, updatedAt -> UTC
export const User: Model<UserModel> = db.model<UserModel>(modelName, schema, modelName)
