// pages/bill/bill_detail/bill_detail.js
var app = getApp();
const server = require("../.../../../../utils/server.js");
var util = require("../.../../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: [
      {
        "ima": 'http://pic.yupoo.com/youheng/b5e3b3a4/1cd757cc.png',
      },
      {
        "ima": 'http://pic.yupoo.com/youheng/d7f1bb69/ec9ea982.png',
      },
      {
        "ima": 'http://pic.yupoo.com/youheng/1b6fe0a8/3d6b0a8e.png',
      },
      { "ima": 'http://pic.yupoo.com/youheng/b601bad2/9e3f5f97.png', }

    ],
    bId:0,
  bType:null,
  gDetail:null,
  gType:null,
  gType2:null,
  location:null,
  money:0,
  // 带正负号的金额
  money1:0,
  savetime:'',
  day:'',
  month:'',
  year:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // 获取父页面数据
    that.setData({
      bId: options.bId,
      bType: options.bType,
      gDetail: options.gDetail,
      gType: options.gType,
      gType2: options.gType2,
      location: options.location,
      money: options.money,
      saveTime: options.saveTime,
      day: options.saveTime.substr(8,2),
      month: options.saveTime.substr(5,2),
      year: options.saveTime.substr(2,2)
    })
    if(that.data.bType=="收入"){
      var money1 =  "+" + that.data.money;
    }
    else{
      var money1 = "-" + that.data.money;
    }
    that.setData({
      money1:money1,
    })
  
  },
  // 删除账单
  delBill: function () {
    var that = this;
    var data = {
      bId: that.data.bId,
    }
    wx.showModal({
      title: '提示',
      content: '小伙子你不再想想吗？',
      confirmText: '不用了',
      cancelText: '再想想',
      success:function(res){
        if(res.confirm){
          server.request("/bill/deleteBill", data, function (res) {
            console.log(1);
            wx.navigateBack();
          });
        }
      }
    })

  },
// 编辑账单
rewrite:function(){
  var that = this;
  var billdetail={
    bId: that.data.bId,
    bType: that.data.bType,
    gDetail: that.data.gDetail,
    gType: that.data.gType,
    gType2: that.data.gType2,
    location: that.data.location,
    money: that.data.money,
    saveTime: that.data.saveTime,
  }
  var data = JSON.stringify(billdetail);
  console.log(1);
  wx.navigateTo({
    url: '/pages/account/reaccount/reaccount?data=' + data,
   
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