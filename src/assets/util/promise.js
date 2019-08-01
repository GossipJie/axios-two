(function (root) {
  var optionsCache = {}

  function container(options) {
    options = typeof  options === "string" ? (optionsCache[options] || createOptions(options)) : {}
    var list = [] // 用于存放所有的callback
    var index,length,testting,memory,start,starts
    var fire = function (data) { // 上下文对象 参数
      memory = options.memory && data
      index = starts || 0
      starts = 0
      testting = true
      length = list.length
      for (; index < length; index++) {
        if(list[index].apply(data[0], data[1]) === false && options.stopOnFalse) {
          memory = false
          break;
        }
      }
    }

    var self = {
      add: function () {
        var args = Array.prototype.slice.call(arguments)
        start = list.length
        args.forEach(function (fn) {
          if (toString.call(fn) === "[object Function]") {
            if (!options.unique || !self.has(fn)) {
              list.push(fn)
            }
          }
        })
        if (memory) {
          starts = start
          fire(memory)
        }
        return this
      },

      // 上下文绑定 api
      fireWith: function (context, arguments) {
        var args = [context, arguments]
        if (!options.once || !testting) {
          fire(args)
        }
      },

      // 信息传递
      fire: function () {
        self.fireWith(this, arguments)
      },
      has: function (fn) {
        return fn ? list.indexOf(fn) > -1: !!(list && list.length)
      }
    }
    return self
  }

  function createOptions(options) {
    var object = optionsCache[options] = {}
    options.split(/\s+/).forEach(function (value) {
      object[value] = true
    })
    return object
  }

  // 补丁
  function Derferred() {
    var tuples = [
      // 状态  侦听器| add, 容器， | 最终的状态
      ["resolve", "done", container("once memory"), "resolved"],
      ["reject", "fail", container("once memory"), "rejected"],
      ["notify", "progress", container("memory")]
    ]
    state = "pending"
    promise = {
      state: function () {
        return state
      },
      then: function () {
        var fns = [].slice.call(arguments)
      }
    }
  }

  root.container = container
})(this)
