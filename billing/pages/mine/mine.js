var app = getApp();
const server = require("../../utils/server.js");
Page({

  data: {
    avatar: '',
    name: '',
    ifOpen:''
  },
   
   onLoad:function(){
     
   },
  onShow: function () {
    var that = this;
    server.requestWithoutLoading("/userInfo/getUserInfo", '', function (res)     {
      console.log(res);
      that.setData({
        avatar: res.data.data.userInfo.uAvatarurl,
        name: res.data.data.userInfo.uNickname
      })
    });
    server.requestWithoutLoading("/setting/getSetting", '', function (res) {
      that.setData({
        ifOpen: res.data.data.setting.uPrivate
      })
    });
  },
// 页面跳转
  navTo1: function () {
    wx.navigateTo({
      url: '/pages/mine/schoolhome/schoolhome'
    });
  },
  navTo2: function () {
    var that=this;
    wx.navigateTo({
      url: '/pages/mine/personal/personal?id='+that.data.ifOpen
    });
  },
  navTo3: function () {
    wx.navigateTo({
      url: '/pages/mine/myset/myset'
    });
  },
  navTo4: function () {
    wx.navigateTo({
      url: '/pages/mine/aboutus/aboutus'
    });
  }

})