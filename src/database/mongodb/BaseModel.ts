import {Typegoose, GetModelForClassOptions} from 'typegoose'
import {dbs} from './Connection'

class BaseModel extends Typegoose {

  getModelForClass<T> (t: T, {existingMongoose, schemaOptions, existingConnection}: GetModelForClassOptions = {}) {

    // typegoose 默认会 parse 父类，但是 BaseModel 没有东西可以 parse，会报错，那就假装自己是 Typegoose 类，跳过 parse
    let parentCtor = Object.getPrototypeOf(this.constructor.prototype).constructor
    if (parentCtor && parentCtor.name === 'BaseModel') {
      Object.defineProperty(parentCtor, 'name', {value: 'Typegoose'})
    }

    // 默认使用第一个连接
    if (!existingConnection) existingConnection = dbs.get('db')

    // 时间
    schemaOptions = schemaOptions || {}
    Object.assign(schemaOptions, {timestamps: true})
    return super.getModelForClass<T>(t, {existingMongoose, schemaOptions, existingConnection})
  }
}

export {BaseModel}
export * from 'typegoose'
