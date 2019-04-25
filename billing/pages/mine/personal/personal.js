var app = getApp();
const server = require("../../../utils/server.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifOpen:false
  },

  switchChange: function (e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    var that=this;
    that.setData({
      ifOpen:e.detail.value
    })
    var data = {
      content: Number(this.data.ifOpen)
    }
    console.log(data.content);
    server.request("/setting/setBillPrivate", data, function (res) {
    });
    wx.showToast({
      title: '修改成功',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  },
  onShow:function(e){
    var that = this;
    server.request("/setting/getSetting", '', function (res) {
      that.setData({
        ifOpen: res.data.data.setting.uPrivate
      })
    });
  }
})