var app = getApp();
const server = require("../../utils/server.js");
Page({

  data: {
    avatar: '',
    name: ''
  },
   
   onLoad:function(){
     
   },
  onShow: function () {
    var that = this;
    server.requestWithoutLoading("/userInfo/getUserInfo", '', function (res) {
      console.log(res);
      that.setData({
        avatar: res.data.data.userInfo.uAvatarurl,
        name: res.data.data.userInfo.uNickname
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
    wx.navigateTo({
      url: '/pages/mine/personal/personal'
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