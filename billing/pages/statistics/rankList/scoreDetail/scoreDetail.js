// pages/statistics/rankList/rankDetail/scoreDetail/scoreDetail.js

const server = require(".../../../../../../utils/server.js");
var util = require(".../../../../../../utils/util.js");
var wxCharts = require(".../../../../../../utils/wxcharts.js");
const app = getApp();
var windowW = 0; 
var swindowW = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageWidth: 0,
    simgeWidth: 0,
    billingScore: "",
    scores1: [],
    scores2: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var scores1 = that.data.scores1;
    var scores2 = that.data.scores2;
    scores1[0] = options.score1
    scores1[1] = options.score2
    scores1[2] = options.score3
    scores2[0] = options.score4
    scores2[1] = options.score5
    scores2[2] = options.score6
    console.log(options);
    // 屏幕宽度
    that.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth,
      simageWidth: wx.getSystemInfoSync().windowWidth*0.95*0.28
    });
    console.log(that.data.imageWidth);
    console.log(that.data.simageWidth);

    //计算屏幕宽度比列
    windowW = that.data.imageWidth / 375;
    swindowW = that.data.simageWidth / 85;
    console.log(windowW);
    console.log(swindowW);

    that.setData({
      billingScore: options.totalscore,
      scores1: scores1,
      scores2: scores2
    })
    console.log(that.data.scores1);
    console.log(that.data.scores2);
    // ringCanvas
    new wxCharts({
      animation: true,
      canvasId: 'ringCanvas',
      type: 'ring',
      extra: {
        ringWidth: 20,
        pie: {
          offsetAngle: -120
        }
      },
      title: {
        name: that.data.billingScore,
        color: '#000000',
        fontSize: 17
      },
      subtitle: {
        name: '比零分数',
        color: '#666666',
        fontSize: 13
      },
      series: [{
        name: '比零系数',
        data: parseFloat(that.data.scores1[0]),
        stroke: false,
        color: '#f7931e'
      }, {
        name: '大金额商品占比',
        data: parseFloat(that.data.scores1[1]),
        stroke: false,
        color: '#ffedc6'
      }, {
        name: '商品购买率',
        data: parseFloat(that.data.scores1[2]),
        stroke: false,
        color: '#cdeeaa'
      }, {
        name: '消费波动率',
        data: parseFloat(that.data.scores2[0]),
        stroke: false,
        color: '#96dae4'
      }, {
        name: '经济率',
        data: parseFloat(that.data.scores2[1]),
        stroke: false,
        color: '#5893d4'
      }, {
        name: '常用种类占比',
        data: parseFloat(that.data.scores2[2]),
        stroke: false,
        color: '#6d70c6'
      }],
      disablePieStroke: true,
      width: (375 * windowW),
      height: (260 * windowW),
      dataLabel: true,
      legend: false,
      padding: 0
    });

    // ringCanvasSmall   '比零系数''大金额商品占比''商品购买率''消费波动率' '经济率''常用种类占比'
    new wxCharts({
      animation: true,
      canvasId: 'ringCanvasSmall1',
      type: 'ring',
      extra: {
        ringWidth: 5,
        pie: {
          offsetAngle: -90
        }
      },
      title: {
        name: parseFloat(that.data.scores1[0]),
        color: '#000000',
        fontSize: 14
      },
      series: [{
        name: '比零系数',
        data: parseFloat(that.data.scores1[0]),
        stroke: false,
        color: '#f7931e'
      }, {
        name: '余下值',
          data: 100 - parseFloat(that.data.scores1[0]),
        stroke: false,
          color: '#F2F2F2'
      }],
      disablePieStroke: true,
      width: (85 * swindowW),   //move horizontally
      height: (100 * swindowW), //small
      dataLabel: false,
      legend: false,
      padding: 0
    });

    // ringCanvasSmall   '比零系数''大金额商品占比''商品购买率''消费波动率' '经济率''常用种类占比'
    new wxCharts({
      animation: true,
      canvasId: 'ringCanvasSmall2',
      type: 'ring',
      extra: {
        ringWidth: 5,
        pie: {
          offsetAngle: -90
        }
      },
      title: {
        name: parseFloat(that.data.scores1[1]),
        color: '#000000',
        fontSize: 14
      },
      series: [{
        name: '大金额商品占比',
        data: parseFloat(that.data.scores1[1]),
        stroke: false,
        color: '#ffedc6'
      }, {
        name: '余下值',
          data: 100 - parseFloat(that.data.scores1[1]),
        stroke: false,
          color: '#F2F2F2'
      }],
      disablePieStroke: true,
      width: (85 * swindowW),   //move horizontally
      height: (100 * swindowW), //small
      dataLabel: false,
      legend: false,
      padding: 0
    });
    // ringCanvasSmall   '比零系数''大金额商品占比''商品购买率''消费波动率' '经济率''常用种类占比'
    new wxCharts({
      animation: true,
      canvasId: 'ringCanvasSmall3',
      type: 'ring',
      extra: {
        ringWidth: 5,
        pie: {
          offsetAngle: -90
        }
      },
      title: {
        name: parseFloat(that.data.scores1[2]),
        color: '#000000',
        fontSize: 14
      },
      series: [{
        name: '商品购买率',
        data: parseFloat(that.data.scores1[2]),
        stroke: false,
        color: '#cdeeaa'
      }, {
        name: '余下值',
          data: 100 - parseFloat(that.data.scores1[2]),
        stroke: false,
          color: '#F2F2F2'
      }],
      disablePieStroke: true,
      width: (85 * swindowW),   //move horizontally
      height: (100 * swindowW), //small
      dataLabel: false,
      legend: false,
      padding: 0
    });
    // ringCanvasSmall   '比零系数''大金额商品占比''商品购买率''消费波动率' '经济率''常用种类占比'
    new wxCharts({
      animation: true,
      canvasId: 'ringCanvasSmall4',
      type: 'ring',
      extra: {
        ringWidth: 5,
        pie: {
          offsetAngle: -90
        }
      },
      title: {
        name: parseFloat(that.data.scores2[0]),
        color: '#000000',
        fontSize: 14
      },
      series: [{
        name: '消费波动率',
        data: parseFloat(that.data.scores2[0]),
        stroke: false,
        color: '#96dae4'
      }, {
        name: '余下值',
          data: 100 - parseFloat(that.data.scores2[0]),
        stroke: false,
          color: '#F2F2F2'
      }],
      disablePieStroke: true,
      width: (85 * swindowW),   //move horizontally
      height: (100 * swindowW), //small
      dataLabel: false,
      legend: false,
      padding: 0
    });
    // ringCanvasSmall   '比零系数''大金额商品占比''商品购买率''消费波动率' '经济率''常用种类占比'
    new wxCharts({
      animation: true,
      canvasId: 'ringCanvasSmall5',
      type: 'ring',
      extra: {
        ringWidth: 5,
        pie: {
          offsetAngle: -90
        }
      },
      title: {
        name: parseFloat(that.data.scores2[1]),
        color: '#000000',
        fontSize: 14
      },
      series: [{
        name: '经济率',
        data: parseFloat(that.data.scores2[1]),
        stroke: false,
        color: '#5893d4'
      }, {
        name: '余下值',
          data: 100 - parseFloat(that.data.scores2[1]),
        stroke: false,
          color: '#F2F2F2'
      }],
      disablePieStroke: true,
      width: (85 * swindowW),   //move horizontally
      height: (100 * swindowW), //small
      dataLabel: false,
      legend: false,
      padding: 0
    });
    // ringCanvasSmall   '比零系数''大金额商品占比''商品购买率''消费波动率' '经济率''常用种类占比'
    new wxCharts({
      animation: true,
      canvasId: 'ringCanvasSmall6',
      type: 'ring',
      extra: {
        ringWidth: 5,
        pie: {
          offsetAngle: -90
        }
      },
      title: {
        name: parseFloat(that.data.scores2[2]),
        color: '#000000',
        fontSize: 14
      },
      series: [{
        name: '常用种类占比',
        data: parseFloat(that.data.scores2[2]),
        stroke: false,
        color: '#6d70c6'
      }, {
        name: '余下值',
          data: 100 - parseFloat(that.data.scores2[2]),
        stroke: false,
          color: '#F2F2F2'
      }],
      disablePieStroke: true,
      width: (85 * swindowW),   //move horizontally
      height: (100 * swindowW), //small
      dataLabel: false,
      legend: false,
      padding: 0
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})