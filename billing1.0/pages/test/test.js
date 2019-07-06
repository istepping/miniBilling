// pages/test/test.js
var app = getApp();
const server = require("../../utils/server.js");
const chart = require("../../utils/wxcharts.js");
var bmap = require('../../utils/bmap-wx.js'); //
var wxMarkerData = [];
Page({
  data: {
    markers: [],
    shoptitle: '',
    address: '',
    tel: '',
    target: '幸福恋家房地产(北京路店)'
  },
  makertap: function(e) {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
   
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