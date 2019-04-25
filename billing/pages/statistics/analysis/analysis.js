/*pages/statistics/analysis/analysis.js*/
var wxCharts = require("../../../utils/wxcharts.js");

const server = require("../.../../../../utils/server.js");
var util = require("../.../../../../utils/util.js");
const app = getApp();

var windowW = 0;
Page({

  /**
   * 页面的初始数据
   */

  onShareAppMessage: function(res) {},
  data: {
    isGetData: false,
    imageWidth: 0,
    perclist: [],
    sortdata: [],
    billlists: [{
        "blid": 1001,
        "blimg": '',
        "blname": "",
        "blnum": "",
        "blcontent": ""
      },
      {
        "blid": 1002,
        "blimg": '',
        "blname": "",
        "blnum": "",
        "blcontent": ""
      },
      {
        "blid": 1003,
        "blimg": '',
        "blname": "",
        "blnum": "",
        "blcontent": ""
      },
      {
        "blid": 1004,
        "blimg": '',
        "blname": "",
        "blnum": "",
        "blcontent": ""
      },
      {
        "blid": 1005,
        "blimg": '',
        "blname": "",
        "blnum": "",
        "blcontent": ""
      },
      {
        "blid": 1006,
        "blimg": '',
        "blname": "",
        "blnum": "",
        "blcontent": ""
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 连接后台接口
    server.request("/action/getAction", '', function(res) {
      console.log("billlist");
      var data = that.data.billlists;
      data[0].blnum = res.data.data.action.actions[0].aHabit; //习惯性
      data[0].blcontent= res.data.data.action.habitInfo;
      data[1].blnum = res.data.data.action.actions[0].aCollection;  //经济型
      data[1].blcontent = res.data.data.action.economicInfo;
      data[2].blnum = res.data.data.action.actions[0].aImagine; //专注型
      data[2].blcontent = res.data.data.action.attentionInfo;
      data[3].blnum = res.data.data.action.actions[0].aReason;  //理智型
      data[3].blcontent = res.data.data.action.reasonInfo;      
      data[4].blnum = res.data.data.action.actions[0].aImpluse; //冲动型
      data[4].blcontent = res.data.data.action.impluseInfo;
      data[5].blnum = res.data.data.action.actions[0].aRandom;  //随机型
      data[5].blcontent = res.data.data.action.randomInfo;
      console.log(data[0].blnum);
      that.initial(data);
      // 屏幕宽度
      that.setData({
        imageWidth: wx.getSystemInfoSync().windowWidth
      });
      console.log(that.data.imageWidth);

      //计算屏幕宽度比列
      windowW = that.data.imageWidth / 375;
      console.log(windowW);

      new wxCharts({
        canvasId: 'radarCanvas',
        type: 'radar',
        categories: [data[0].blname, data[1].blname, data[2].blname, data[3].blname, data[4].blname, data[5].blname],
        series: [{
          data: [data[0].blnum.substring(0, data[0].blnum.length - 1), data[1].blnum.substring(0, data[1].blnum.length - 1), data[2].blnum.substring(0, data[2].blnum.length - 1), data[3].blnum.substring(0, data[3].blnum.length - 1), data[4].blnum.substring(0, data[4].blnum.length - 1), data[5].blnum.substring(0, data[5].blnum.length - 1)]
        }],
        width: (375 * windowW),
        height: (270 * windowW), //改大小
        legend: false,
        dataLabel: true,
        extra: {
          radar: {
            max: 100
          }
        }
      });
      that.inorder(data, 0, 5);
      data[0].blid = 1001;
      data[1].blid = 1002;
      data[2].blid = 1003;
      data[3].blid = 1004;
      data[4].blid = 1005;
      data[5].blid = 1006;

      that.toStandard(data);
      that.setData({
        billlists: data,
      })
      console.log(that.data.billlists);
    });
  },
  judge: function (num,val) {
    for (var index = 0; index < 5; index++) {
      if (val < this.data.percent[index]) {
        console.log(this.data.contain[num][index]);
        return this.data.contain[num][index];
      }
    };
  },
  initial: function(data) {
    //judge(perseFloat(data[0].blnum));
    data[0].blname = "习惯"
    data[0].blimg = '/images/statistics_img/overlapping.png'
    data[1].blname = "经济"
    data[1].blimg = '/images/statistics_img/money.png'
    data[2].blname = "专注"
    data[2].blimg = '/images/statistics_img/center_focus_strong.png'
    data[3].blname = "理智"
    data[3].blimg = '/images/statistics_img/Brain.png'
    data[4].blname = "冲动"
    data[4].blimg = '/images/statistics_img/fire.png'
    data[5].blname = "随机"
    data[5].blimg = '/images/statistics_img/center.png'
  },
  toStandard: function(data) {
    var that = this;
    data[0].blnum = data[0].blnum.substring(0, data[0].blnum.indexOf('.') + 2) + '%';
    data[1].blnum = data[1].blnum.substring(0, data[1].blnum.indexOf('.') + 2) + '%';
    data[2].blnum = data[2].blnum.substring(0, data[2].blnum.indexOf('.') + 2) + '%';
    data[3].blnum = data[3].blnum.substring(0, data[3].blnum.indexOf('.') + 2) + '%';
    data[4].blnum = data[4].blnum.substring(0, data[4].blnum.indexOf('.') + 2) + '%';
    data[5].blnum = data[5].blnum.substring(0, data[5].blnum.indexOf('.') + 2) + '%';
  },
  inorder: function(arr, start, end) {
    var that = this;
    if (start > end) {
      return;
    }
    let i = start,
      j = end,
      pivot = arr[start]; //存放基准数
    while (i !== j) {
      // 从右边开始，找第一个小于基准的位置
      while (parseFloat(arr[j].blnum) <= parseFloat(pivot.blnum) && i < j) {
        j--;
      }
      // 从左边开始，找第一个大于基准的位置
      while (parseFloat(arr[i].blnum) >= parseFloat(pivot.blnum) && i < j) {
        i++;
      }
      // 交换两个数
      if (i < j) {
        let tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
    }
    // 最后把基准数归位
    arr[start] = arr[i];
    arr[i] = pivot;
    // 递归处理左边
    that.inorder(arr, start, i - 1);
    // 递归处理右边
    that.inorder(arr, i + 1, end);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(e) {
    var that = this;
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
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

  },
})