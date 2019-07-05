// pages/statistics/user_statistics/details1/details2/details2.js
var app = getApp();
const server = require("../../../../../../utils/server.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dateMonth:'',
    dateYear:'',
    ppindex: 0,
    gettId:'',
    detaillist3:
      [],
    imglist: [
      { "img": '/images/account/exCls/饮食.png' },
      { "img": '/images/account/exCls/服饰.png' },
      { "img": '/images/account/exCls/运动.png' },
      { "img": '/images/account/exCls/学习.png' },
      { "img": '/images/account/exCls/交通.png' },
      { "img": '/images/account/exCls/娱乐.png' },
      { "img": '/images/account/exCls/日用.png' },
      { "img": '/images/account/exCls/电子.png' },
      { "img": '/images/account/exCls/通讯.png' },
    ]
      //   {
      //     "title": "篮球",
      //     "img": '/images/account/cls/运动.png',
      //     "money": "800RMB",
      //   },
      //   {
      //     "title": "足球",
      //     "img": '/images/account/cls/运动.png',
      //     "money": "700RMB",
      //   },
      //   {
      //     "title": "羽毛球",
      //     "img": '/images/account/cls/运动.png',
      //     "money": "600RMB",
      //   },
      //   {
      //     "title": "网球",
      //     "img": '/images/account/cls/运动.png',
      //     "money": "500RMB",
      //   },
      //   {
      //     "title": "乒乓球",
      //     "img": '/images/account/cls/运动.png',
      //     "money": "400RMB",
      //   },
      //   {
      //     "title": "排球",
      //     "img": '/images/account/cls/运动.png',
      //     "money": "300RMB",
      //   },

      // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      dateMonth: options.temdateMonth,
      dateYear: options.temdateYear,
      ppindex: options.pindex,
      gettId: options.temptId,
    })
    console.log("options");
    var data = {
      pTypeId: options.temptId
    }
    server.requestWithoutLoading("/gtype/getChildType", data, function (res) {
      console.log(res)
      that.setData({
        detaillist3: res.data.data.gtypes
      })
      for (var i = 0; i < that.data.detaillist3.length; i++) {
        console.log("for循环正在执行")
        var data = {
          year: that.data.dateYear,
          month: that.data.dateMonth,
          level: 3,
          type: that.data.detaillist3[i].tName
        }
        server.requestWithoutLoading("/bill/getBillsByMonth", data, function (res) {
          //处理数据
          var myMoney = res.data.data.expose.sumMoney

          var tType = res.data.data.expose.type;
          var temp = that.data.detaillist3;
          for (var i = 0; i < temp.length; i++) {
            if (temp[i].tName == tType) {
              temp[i].money = myMoney
            }
          }
          // var temp2={
          //   tBelong:temp[i].tBelong,
          //   tExtra: temp[i].tExtra,
          //   tId:temp[i].tId,
          //   tName: temp[i].tName,
          //   tPtypeid: temp[i].tPtypeid,
          //   tPtypename: temp[i].tPtypename,
          //   tState: temp[i].tState,
          //   money:myMoney
          // }
          that.setData({
            detaillist3: temp
          });
          console.log(that.data.detaillist3);
        })
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  todetails3() {
    wx.navigateTo({
      url: '/pages/statistics/userStatistics/details1/details1',
    })
  },
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;
    this.setData({
      index3: Index
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})