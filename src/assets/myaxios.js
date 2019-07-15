import axios from 'axios'

/**
 * axios二次封装
 * @param arr 包含一系列api的数组
 */

export default function (arr) {
  function _myaxios() {
    this.vueob = null
    this.status=true//防止重复提交标识
  }

  // 获取vue对象$data
  _myaxios.prototype.v = function (ob) {
    this.vueob = ob
  }
  //请求生成模块
  _myaxios.prototype.getAxios = function (config) {
    var _url = config.url
    var _type = config.type
    var _data = config.data
    var fatory = {
      get: function () {
        return axios.get(_url)
      },
      post: function () {
        return axios.post(_url, _data)
      }
    }
    return fatory[_type]()
  }
  //发送请求
  _myaxios.prototype.sendAxios = function (config) {
    var _axios = this.getAxios(config)
    var self = this
    if(this.status) {
      this.status = false
      _axios.then(function (res) {
        self.status = true
        config.success == 'default' ? self.handleAxios(config.dataname, res.data) :
          config.success.call(self.vueob, res)
      })
    }
  }
  // 处理请求
  _myaxios.prototype.handleAxios = function (dataname, data) {
    this.vueob[dataname] = data
  }
  // 初始化
  var _a = new _myaxios()
  arr.forEach(function (item, index) {
    _a[item.name] = function (config) {
      _a.sendAxios({
        url: item.url,
        type: config && config.type || 'get',
        success: config && config.success || 'default',
        data: config && config.data || {},
        dataname: config && config.dataname || item.name
      })
    }
  })
  console.log(_a)
  return _a
}
