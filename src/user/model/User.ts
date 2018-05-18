import {mongodb} from '../modules'
import {prop, instanceMethod, InstanceType, Typegoose} from 'typegoose'

export class User extends Typegoose {
  @prop({required: true})
  name: string

  @prop({required: true, index: true, unique: true})
  phone: string

  @prop()
  isRegister: boolean

  @prop({default: 0})
  balance: number

  @instanceMethod
  registerSuccess (this: InstanceType<User>) {
    this.isRegister = true
    return this.save()
  }
}

export const UserModel = new User().getModelForClass(User)
