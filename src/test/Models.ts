/**
 * 为了方便做数据清理，这里采用了飞线式写法
 * @type {{}}
 */
const models = {}
Object.assign(models, require('../user/model'))
// Object.assign(models, require('../order/model'))
export {models}
