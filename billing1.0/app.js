//app.js
//sunlei login
var server=require("./utils/server.js");
App({
  onLaunch:function(){
  },
  userLogin:function(){
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          server.request('/user/login', { code: res.code }, function (res)          {
            console.log(res)
            that.globalData.token = res.data.token;
            wx.setStorageSync("token", that.globalData.token)
            wx.setStorageSync("tokenTime", new Date().getTime());
            console.log(res);
          })
        }
        else {

        }
      }
    })

  },
  //传递一个回调的函数
  getUserInfo: function (cb) {
    var that = this;
    // js可以使用if()判断是否为空、
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              that.globalData.userInfo = res.userInfo;
              //判断是否为函数，然后调用该函数recommend/recommend",
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  
  globalData: {
    userInfo: null,
    token: null
  }
})