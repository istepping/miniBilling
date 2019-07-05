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
    server.requestWithoutLoading("/setting/setBillPrivate", data, function (res) {
    });
  },
  onLoad:function(option){
    if (option.id=='1'){
      this.setData({
        ifOpen: true
      }) 
    }
  },
  onShow:function(e){
  }
})