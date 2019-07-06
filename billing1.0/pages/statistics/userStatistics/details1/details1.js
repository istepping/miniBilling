// pages/statistics/user_statistics/details1/details1.js
var Chart = require("../../../../utils/wxcharts.js");
var windowW = 0;
var app = getApp();
const server = require("../../../../utils/server.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loadingOver:0,
    status: 0, 
    xValues: [],
    yValues: [],
    showlist: [],
    dateMonth:'',
    dateYear:'',
    index: 0,
    givetId:0,
    level:1,
    nextPageType:'',
    lastPageType:'',
    detaillist1:
      [ 
      ],
      imglist:[
        {"img": '/images/account/exCls/饮食.png'},
        { "img": '/images/account/exCls/服饰.png' },
        { "img": '/images/account/exCls/运动.png' },
        { "img": '/images/account/exCls/学习.png' },
        { "img": '/images/account/exCls/交通.png' },
        { "img": '/images/account/exCls/娱乐.png' },
        { "img": '/images/account/exCls/日用.png' },
        { "img": '/images/account/exCls/电子.png' },
        { "img": '/images/account/exCls/通讯.png' },
      ]

  },
  changeChartType: function (event) {
    if (this.data.chartType != event.target.dataset.type) {
      this.setData({
        chartType: event.target.dataset.type
      })
    }
  },
  switchChartType: function (event) {
  var  that =this;
    this.setData({
      chartType: event.detail.current
    })
    console.log(event.detail.current)
    if (event.detail.current==1){
      this.setData({
        loadingOver:1
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
    this.setData({
      dateMonth:options.temdateMonth,
      dateYear:options.temdateYear,
    });
    server.requestWithoutLoading("/gtype/getType", '', function (res) {
      console.log(res);
      if (res.data.statusCode) {
            that.setData({
              detaillist1: res.data.data.gtypes
            })
            var temp=[];
              for (var i=0;i<that.data.detaillist1.length;i++){
                var type=that.data.detaillist1[i];
                  if(type.tBelong!='收入'){
                    temp.push(type);
                  }
              }
              that.setData({
                detaillist1:temp
              });
            console.log("detail1");
            console.log(that.data.detaillist1);
            //获取金额
                for(var j=0;j<that.data.detaillist1.length;j++){
                    var data = {
                      year: that.data.dateYear,
                      month: that.data.dateMonth,
                      level: 1,
                      type:that.data.detaillist1[j].tName
                    }
                  server.requestWithoutLoading('/bill/getBillsByMonth', data, function (res) {
                    //处理数据
                    var xValues = new Array();
                    var yValues = new Array();
                    var myMoney=res.data.data.expose.sumMoney
                    var tType=res.data.data.expose.type;
                    var temp=that.data.detaillist1;
                    for(var i=0;i<temp.length;i++){
                      if(temp[i].tName==tType){
                        temp[i].money=myMoney
                      }
                      xValues.push(temp[i].tName);
                      yValues.push(temp[i].money);
                    }
                    that.setData({
                      xValues: xValues,
                      yValues: yValues,
                    })
                    for (var m = 0; m < temp.length; m++)
                      {
                      for (var n = 0; n < temp.length - m - 1; n++)
                     {
                        if (temp[n].money < temp[n+1].money) {
                       var temp1,temp2;
                          temp1 = temp[n + 1].money;
                          temp[n + 1].money = temp[n].money;
                          temp[n].money = temp1;
                          temp2 = temp[n + 1].tName;
                          temp[n + 1].tName = temp[n].tName;
                          temp[n].tName = temp2;
                          }
                        }
                      }
                    that.setData({
                      detaillist1: temp
                    });
                    console.log(that.data.detaillist1); 
                    setTimeout(function () {
                      new Chart({
                        canvasId: 'lineCanvas',
                        type: 'line',
                        animation: true,
                        categories: that.data.xValues,
                        series: [{
                          name: '一级分类',
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
    var that =this;
   
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

  optionTap(e) {
    var that=this;
    let Index = e.currentTarget.dataset.index;
    let temptId = e.currentTarget.dataset.tid;
    console.log(temptId);
    wx.navigateTo({
      url: '/pages/statistics/userStatistics/details1/details2/details2?index=' + Index +        '&temptId=' + temptId + '&temdateYear=' + this.data.dateYear + '&temdateMonth=' + this.data.dateMonth,
    })
  },
  todetails2() {

  }
})