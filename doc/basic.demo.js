var each = require('super-iterator')
var data = {
    name: 'nimo',
    list: [
        {
            title: 'abc'
        },
        {
            title: '123'
        }
    ]
}
console.log('## forEach')
each.forEach(data, function (item, keys) {
    console.log(JSON.stringify(keys))
    console.log(item)
    console.log('\r\n')
})
console.log('## map')
var newData = each.map(data, function (item, keys) {
    switch(item.constructor) {
        case Object:
            item.debug = true
        break
        case Array:
            item.push('debug')
        break
        case String:
            item = item + '-debug'
        break
        case Number:

        break
    }
    return item
})
console.log(
    newData
)
