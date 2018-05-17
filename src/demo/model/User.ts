import {mongodb} from '../module'

const {prop} = mongodb

class User extends mongodb.BaseModel {
  @prop()
  name?: string
}

export const UserModel = new User().getModelForClass(User)
