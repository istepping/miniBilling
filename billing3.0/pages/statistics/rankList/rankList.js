var server=require('../../../utils/server.js');
var util=require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentYear: '2019',
    currentMonth: '04',
    data:[]
  },
  //日期选择
  dateChange:function(res){
    var that=this;
    console.log(res);
    var date=res.detail.value;
    this.setData({
      currentYear:date.substring(0,4),
      currentMonth:date.substring(5,7)
    })
    wx.showLoading({
      title: '拼命加载中...',
    })
    server.requestWithoutLoading('/prank/getPrankByMonth', { year: this.data.currentYear, month: this.data.currentMonth }, function (res) {
      if (res.data.statusCode != 0 && res.data.data.pranks.length>0){
        that.setData({
          data: res.data.data
        })
      }else{
        wx.showToast({
          title: '该月份没有数据',
        })
      }
    })
  },
  goDetail:function(res){
    console.log(res);
    wx.navigateTo({
      url: '/pages/statistics/rankList/scoreDetail/scoreDetail?score1=' + res.currentTarget.dataset.id1 + '&score2=' + res.currentTarget.dataset.id2 + '&score3=' + res.currentTarget.dataset.id3 + '&score4=' + res.currentTarget.dataset.id4 + '&score5=' + res.currentTarget.dataset.id5 + '&score6=' + res.currentTarget.dataset.id6 + '&totalscore=' + res.currentTarget.dataset.id7,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var time=new Date().getTime();
    that.setData({
      currentYear: util.toData(time, 'Y'),
      currentMonth: '0'+(parseInt(util.toData(time, 'M'))-1)
    })
    wx.showLoading({
      title: '拼命加载中...',
    })
    server.requestWithoutLoading('/prank/getPrankByMonth', { year: this.data.currentYear, month: this.data.currentMonth},function(res){
      that.setData({
        data:res.data.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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