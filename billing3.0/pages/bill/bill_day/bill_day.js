// pages/bill/bill_day/bill_day.js
var app = getApp();
const server = require("../.../../../../utils/server.js");
var util = require("../.../../../../utils/util.js");

Page({
  data: {
    bill: [],
    // 将账单按照支出收入分类
    imToday:[],
    exToday:[],
    // 今天的总收入和总支出
    totalimToday:0,
    totalexToday:0,
    // 分别为今天的具体时间、年份日期、几号、周几、月份
    time:'',
    date:'',
    date1:'',
    day:'',
    month:'',
    year:'',
    

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取父页面数据 
    that.setData({
      time:options.time,
      date:options.date,
      date1: options.date1,
      day:options.day,
      month:options.month,
     year:options.year
    })
  


  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    // 连接后台接口
    var that = this;
    server.request("/bill/getBillList", '', function (res) {
      console.log(res);
      that.setData({
        bill: res.data.data.bill
      })
      that.formatTime();
      that.incomeToday();
      that.outputToday();
    });
  },
  
  formatTime: function () {
    // 时间戳转换
    var that = this;
    var temp = this.data.bill;
    for (var i = 0; i < temp.length; i++) {
      temp[i].saveTime = util.toData(temp[i].saveTime, 'Y-M-D h:m:s');
    }
    that.setData({
      bill: temp
    })
  },
  
  // 筛选收入账单,计算今天总收入
  incomeToday:function(){
    var that = this;
    var temp = new Array;
    var total=0.00;
    for (var i = 0; i < that.data.bill.length; i++) {
      
      if (that.data.bill[i].bType === "收入"){
        var date2 = that.data.bill[i].saveTime.substr(0, 10);
        if (date2 === that.data.date) {
          temp.push(that.data.bill[i]);
          total += that.data.bill[i].money;
        }
      }
    };
    that.setData({
      imToday:temp,
      totalimToday:total
    })
  },
  // 筛选支出账单，计算今天总支出
  outputToday: function () {
    var that = this;
    var temp = new Array;
    var total = 0.00;

    for (var i = 0; i < that.data.bill.length; i++) {
      if (that.data.bill[i].bType === "支出") {
        var date2 = that.data.bill[i].saveTime.substr(0, 10);
        if (date2 === that.data.date) {
          temp.push(that.data.bill[i]);
          total += that.data.bill[i].money;
        }
      } 
    };
  
    that.setData({
      exToday:temp,
      totalexToday:total
    })
  },
  // 删除账单
  delBill:function(event){
    var that=this;
    var Bill=that.data.bill;
    var data = {
      bId : event.currentTarget.dataset.bid
    }
    server.request("/bill/deleteBill", data, function (res){
      for(var i=0;i<Bill.length;i++){
        if(Bill[i].bId==data.bId){
          Bill.splice(i,1);
          break;
        }
      }
      that.setData({
        bill:Bill
      })
      that.incomeToday();
      that.outputToday();
    });
  },
  // 跳到详情界面
  todetail: function (event) {
    var data = {
      bType: event.currentTarget.dataset.btype,
      bId: event.currentTarget.dataset.bid,
      gDetail: event.currentTarget.dataset.gdetail,
      gType: event.currentTarget.dataset.gtype,
      gType2: event.currentTarget.dataset.gtype2,
      gType4: event.currentTarget.dataset.gtype4,
      location: event.currentTarget.dataset.location,
      money: event.currentTarget.dataset.money,
      saveTime: event.currentTarget.dataset.savetime,
    }
    wx.navigateTo({
      url: '/pages/bill/bill_detail/bill_detail?bType=' + data.bType + '&bId=' + data.bId + '&gDetail=' + data.gDetail + '&gType=' + data.gType + '&gType2=' + data.gType2 + '&gType4=' + data.gType4 + '&location=' + data.location + '&money=' + data.money + '&saveTime=' + data.gDetail + '&saveTime=' + data.saveTime,
    })
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