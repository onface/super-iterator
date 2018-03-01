var extend = require('extend')
function baseEach (parentKeys, data, callback) {
    if (Array.isArray(data)) {
        data.forEach(function (item, index) {
            action(item, index)
        })
    }
    else {
        Object.keys(data).forEach(function (key) {
            action(data[key], key)
        })
    }
    function action (target, key) {
        if (target.id) {
            key = target.id
        }
        var keys = parentKeys.concat(key)
        var cloneKeys = extend(true, [], keys)
		callback(target, cloneKeys)
        // object and array
        if (typeof target === 'object') {
            each(cloneKeys, target, callback)
        }
    }
}
function each (parentKeys, data, callback) {
    var keysMap = {}
    baseEach(parentKeys, data, function (item, keys) {
        keysMap[keys.join(',')] = true
    })
    baseEach(parentKeys, data, function (item, keys) {
        if (keysMap[keys.join(',')]) {
            callback(item, keys)
        }
    })

}
module.exports = {
	forEach: function (data, callback) {
		each([], data, callback)
	},
    map: function (data ,callback) {
        var cloneData = {}
        if (Array.isArray(data)) {
            cloneData = []
        }
        cloneData = extend(true, cloneData, data)
        each([], cloneData, function (item, keys) {
            var cloneKeys = extend(true, [], keys)
            var result = callback(item, cloneKeys)
            var parentKeys = extend(true, [], cloneKeys);parentKeys.pop();
            var currentKey = cloneKeys[cloneKeys.length-1]

            var target = cloneData
            parentKeys.forEach(function (key) {
                target = target[key]
            })
            target[currentKey] = result
        })
        return cloneData
    }
}
