import axios from 'axios'

/**
 * axios二次封装
 * @param arr 包含一系列api的数组
 */

export default function (arr) {
  function _myAxios() {
    this.vueObj = null//vue实例对象
    this.status = true//防止重复提交标识
  }

  // 获取vue对象$data
  _myAxios.prototype.v = function (ob) {
    this.vueObj = ob
  }
  //请求生成模块
  _myAxios.prototype.getAxios = function (config) {
    var _url = config.url
    var _type = config.type
    var _data = config.data
    var fatory = {
      get: function () {
        return axios.get(_url, {
          params: _data
        })
      },
      post: function () {
        return axios.post(_url, _data)
      },
      put: function () {
        return axios.put(_url, _data)
      },
      delete: function () {
        return axios.delete(_url, {
          params: _data
        })
      },
      head: function () {
        return axios.head(_url, {
          params: _data
        })
      }
    }
    return fatory[_type]
  }
  //发送请求
  _myAxios.prototype.sendAxios = function (config) {
    var _axios = this.getAxios(config)
    var self = this
    if (this.status || !config.isBlock) {
      config.isBlock ? this.status = false : true
      _axios().then(function (res) {
        self.status = true
        config.success == 'default' ? self.handleAxios(config.dataName, res.data) :
          config.success.call(self.vueObj, res)
      }).catch(function (err) {
        config.error == 'default'? self.catchAxios(err) :
          config.error.call(self.vueObj, err)
      })
    }
  }
  // 处理请求
  _myAxios.prototype.handleAxios = function (dataName, data) {
    this.vueObj[dataName] = data
  }
  _myAxios.prototype.catchAxios = function (err) {
    // 错误处理
  }
  // 初始化
  var _a = new _myAxios()
  arr.forEach(function (item, index) {
    _a[item.name] = function (config) {
      _a.sendAxios({
        url: item.url,
        type: config && config.type || 'get',
        success: config && config.success || 'default',
        error: config && config.error || 'default',
        data: config && config.data || {},
        dataName: config && config.dataName || item.name,
        isBlock: config && typeof config.isBlock !== 'undefined' ?  config.isBlock : true // 是否阻塞流程
      })
    }
  })
  return _a
}
