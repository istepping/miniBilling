// pages/recommend/recommend.js
var app = getApp();
const server = require("../.../../../utils/server.js");
var util = require("../.../../../utils/util.js");


Page({
  /**
   * 页面的初始数据
   */
  data: {
    recolist:[],
    recommend:[],
    tabName:['推荐','电子','服饰','饮食','学习','交通','娱乐','日用','运动','通讯','其他'],
    curTab:0,
    searchContent:''
  },
  searchChange:function(res){
    this.setData({
      searchContent:res.detail.value
    })
  },
  changeTab: function (event) {
    var that = this;
    that.setData({
      curTab:event.target.id
    })
  },
  search:function(res){
    var that=this;
    wx.showLoading({
      title: '正在为您搜索...',
    })
    server.requestWithoutLoading("/recommend/searchByName", {name:this.data.searchContent}, function (res) {
      wx.hideLoading();
      that.setData({
        recommend: res.data.data.recommend,
        searchContent:'',
        curTab:0
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '正在为您推荐...',
    })
    server.requestWithoutLoading("/recommend/getRecommendWithUId", '', function (res) {
      wx.hideLoading();
      that.setData({
        recommend: res.data.data.recommend
      });
    });
    server.requestWithoutLoading("/recommend/getRecommend", '', function (res) {
      that.setData({
        recolist: res.data.data.recommend
      });
    });
  },
  /**
* 生命周期函数--监听页面显示
*/
  onShow: function () {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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