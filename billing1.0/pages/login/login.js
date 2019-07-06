var server=require("../../utils/server.js");
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
  },
  bindGetUserInfo: function (e) {
    console.log(e);
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      wx.setStorageSync("userInfo", e.detail.userInfo);
      wx.setStorageSync("userInfoTime", new Date().getTime())
      var data = {
        avatarUrl: e.detail.userInfo.avatarUrl,
        city: e.detail.userInfo.city,
        country: e.detail.userInfo.country,
        gender: e.detail.userInfo.gender,
        language: e.detail.userInfo.language,
        nickName: e.detail.userInfo.nickName,
        province: e.detail.userInfo.province
      }
      server.request('/userInfo/addUserInfo', data, function (res) {

      })
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '/pages/account/account'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  }

})