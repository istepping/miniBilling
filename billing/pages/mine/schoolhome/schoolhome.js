var app = getApp();
const server = require("../../../utils/server.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:1,
    hiddenName:1,
    hiddenmodalput: true,
    userId:'',
  },
  onLoad:function(e){
  },
  switchChange: function (e) {
    console.log('switch 发生 change 事件，携带值为', e.detail.value)
    var ifOpen = e.detail.value;
    console.log("ifopen")
    console.log(ifOpen);
    var temp = this.data.ifOpen;
    var data = {
      content:Number(ifOpen)
    }
    console.log(data.content);
    server.request("/setting/setOpenFamily", data, function (res) {
    });
    this.setData({
      hiddenName: !this.data.hiddenName,
    })
    wx.showToast({
      title: '修改成功',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  },
  setting: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  choose: function () {
    wx.navigateTo({
      url: '/pages/mine/schoolhome/choose/choose'
    });
  },
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
    var that = this;
    var data = {
      parentId: this.data.userId
    }
    server.request("/setting/setParentId", data, function (res) {
      console.log(res);
    })
    wx.showToast({
      title: '提交成功',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      userId: e.detail.value
    })
    console.log('您的输入id=' + this.data.userId);
  },
  onShow:function(){
    var that = this;
    server.request("/setting/getSetting", '', function (res) {
      that.setData({
        hiddenName: !res.data.data.setting.uOpenFamily
      })
    });
  }
})
