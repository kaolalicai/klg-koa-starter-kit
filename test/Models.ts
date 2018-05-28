/**
 * 为了方便做测试数据清理，这里采用了飞线式写法
 * @type {{}}
 */
const models = {}
Object.assign(models, require('../src/order/model'))
Object.assign(models, require('../src/user/model'))
export {models}
