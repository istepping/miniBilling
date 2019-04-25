// pages/statistics/user_statistics/details1/details2/details2.js
var app = getApp();
var Chart = require("../../../../../utils/wxcharts.js");
var windowW = 0;
const server = require("../../../../../utils/server.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {

    loadingOver: 0,
    status: 0,
    xValues: [],
    yValues: [],
    dateMonth: '',
    dateYear: '',
    gettId: 0,
    givetId: 0,
    pindex:0,
    detaillist2:
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
        // {
        //   "title": "健身",
        //   "img": '/images/account/cls/运动.png',
        //   "money": "5000RMB",
        // },
        // {
        //   "title": "球类",
        //   "img": '/images/account/cls/运动.png',
        //   "money": "6000RMB",

        // },
        // {
        //   "title": "器材",
        //   "img": '/images/account/cls/运动.png',
        //   "money": "7000RMB",
        // },
  },
  changeChartType: function (event) {
    if (this.data.chartType != event.target.dataset.type) {
      this.setData({
        chartType: event.target.dataset.type
      })
    }
  },
  switchChartType: function (event) {
    var that = this;
    this.setData({
      chartType: event.detail.current
    })
    console.log(event.detail.current)
    if (event.detail.current == 1) {
      this.setData({
        loadingOver: 1
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth,
    });
    console.log(this.data.imageWidth);
    //计算屏幕宽度比列
    windowW = this.data.imageWidth / 375;
    var that = this;
    that.setData({
      dateMonth: options.temdateMonth,
      dateYear: options.temdateYear,
      gettId: options.temptId,
       pindex:options.index
    });
    console.log("options"+options);
    var data={
      pTypeId:that.data.gettId,
    }
   console.log("pTypeId"+data.pTypeId)
    server.requestWithoutLoading("/gtype/getChildType",data,function (res) {
      that.setData({
        detaillist2: res.data.data.gtypes
      })
      console.log("detaillist2")
      console.log(that.data.detaillist2);
    //获取金额
    for (var i = 0; i < that.data.detaillist2.length; i++) {
      console.log("for循环正在执行")
      var data = {
        year: that.data.dateYear,
        month: that.data.dateMonth,
        level: 2,
        type: that.data.detaillist2[i].tName
      }
      server.requestWithoutLoading("/bill/getBillsByMonth", data, function (res) {
        //处理数据
        var xValues = new Array();
        var yValues = new Array();
        var myMoney = res.data.data.expose.sumMoney;
        var tType = res.data.data.expose.type;
        var temp = that.data.detaillist2;
        for (var i = 0; i < temp.length; i++) {
          if (temp[i].tName == tType) {
            temp[i].money = myMoney
          }
          xValues.push(temp[i].tName);
          yValues.push(temp[i].money);
        }
        that.setData({
          xValues: xValues,
          yValues: yValues,
        })
        that.setData({
          detaillist2: temp
        });
        console.log(that.data.detaillist2);
        setTimeout(function () {
          new Chart({
            canvasId: 'lineCanvas',
            type: 'line',
            animation: true,
            categories: that.data.xValues,
            series: [{
              name: '二级分类',
              data: that.data.yValues,
            }],
            yAxis: {
              title: '消费金额 (元)',
              format: function (val) {
                return val.toFixed(2);
              },
              min: 0
            },
            width: 360,
            height: 190,
          });//要延时执行的代码
        }, 1000) //延迟时间 这里是1秒
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
  },

  optionTap(e) {
    console.log(e)
    let Index = e.currentTarget.dataset.pindex;
    let temptId = e.currentTarget.dataset.tid;
    wx.navigateTo({
      url: '/pages/statistics/userStatistics/details1/details2/details3/details3?pindex=' + Index + '&temptId=' + temptId + '&temdateYear=' + this.data.dateYear + 
      '&temdateMonth=' + this.data.dateMonth,
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
  },


})