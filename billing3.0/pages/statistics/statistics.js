Page({
  /**
   * 页面的初始数据
   */

  data: {
    modalHidden: true,
    showModal: false,
    itemlist:[
    {
     "txt":"个人统计",
     "img":'/images/statistics_img/icon1.png',
      "url":'/pages/statistics/personal/personal',
    },
      {
        "txt": "群体统计",
        "img": '/images/statistics_img/icon2.png',
        "url": '/pages/statistics/userStatistics/pie_chart/pie_chart',
      },
      {
        "txt": "行为分析",
        "img": '/images/statistics_img/icon3.png',
        "url": '/pages/statistics/analysis/analysis',
         },
      {
        "txt": "排行榜",
        "img": '/images/statistics_img/icon4.png',
        "url": '/pages/statistics/rankList/rankList',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  buttonTap: function () {
    this.setData({
      modalHidden: false
    })
  },
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },
  /**
   *  点击确认
   */
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },
  onLoad: function (options) {
    
  },

  toRankList:function(e){

  },

  changecolor: function (e) {
   
  },
  submit: function () {
    this.setData({
      showModal: true
    })
  },

  preventTouchMove: function () {

  },


  go: function () {
    this.setData({
      showModal: false
    })
  }
,
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  toNextpage:function(e){
    var that=this;
    let Index = e.currentTarget.dataset.index;
    console.log(e);
   wx.navigateTo({
     url: "itemlist[Index].url"
   })
  }
})