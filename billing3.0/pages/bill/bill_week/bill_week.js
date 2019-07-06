// pages/bill/bill_week/bill_week.js
var app = getApp();
const server = require("../.../../../../utils/server.js");
var util = require("../.../../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailShow:false,
    detailShow1: [false, false, false, false, false, false,false],
    bill:[],
    bill1:[], //存储时间为时间戳的账单
    // 将账单按照支出收入分类
    imToweek: [],
    exToweek: [],
    imToday: [],
    exToday: [],
    // 每天的支出收入结余
    everyday: [],
    // 本周的总收入和总支出
    totalimToweek: 0,
    totalexToweek: 0,
    totalimToday: 0,
    totalexToday: 0,
    // 分别为今天的具体时间、年份日期、几号、周几、年份。月份
    time: '',
    date: '',
    date1: '',
    day: '',
    year: '',
    month: '',
    // 本周第一天
    Toweekfirst:'',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取父页面数据
    that.setData({
      time: options.time,
      date: options.date,
      date1: options.date1,
      day: options.day,
      year:options.year,
      month:options.month,
      Toweekfirst: options.Toweekfirst,
    
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 连接后台接口
    var that = this;
    server.request("/bill/getBillList", '', function (res) {
      that.setData({
        bill: res.data.data.bill,
        bill1: res.data.data.bill
      })
      that.formatTime();
      that.incomeToweek();
      that.outputToweek();

      that.everydaydetail();
     
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
  // 筛选收入账单,计算本周总收入
  incomeToweek: function () {
    var that = this;
    var temp = new Array;
    var now = new Date();
    var total = 0.00;
    for (var i = 0; i < that.data.bill1.length; i++) {
      if (that.data.bill1[i].bType === "收入") {
        var a = that.data.bill1[i].saveTime;
        var old = new Date(a);
        if (that.check(old, now)) {
          temp.push(that.data.bill1[i]);
          total += that.data.bill1[i].money;
        }
      }
    }
    that.setData({
      imToweek: temp,
      totalimToweek: total
    })

  },
  // 筛选支出账单,计算本周总支出
  outputToweek: function () {
    var that = this;
    var temp = new Array;
    var date = that.data.date;
    date = date.replace(/-/g, "/");
    var now = new Date(Date.parse(date));
    var total = 0.00;
    for (var i = 0; i < that.data.bill1.length; i++) {
      if (that.data.bill1[i].bType === "支出") {
        var a = that.data.bill1[i].saveTime;

        var old = new Date(a);
        if (that.check(old, now)) {
          temp.push(that.data.bill1[i]);
          total += that.data.bill1[i].money;
        }
      }
    }
    that.setData({
      exToweek: temp,
      totalexToweek: total
    })

  },
  //创建二维数组设置每天的细节
  everydaydetail: function () {

    var that = this;
    var temp1 = new Array();
    for (var i = 0; i < 7; i++) {
      temp1[i] = { income: 0, output: 0, balance: 0, year: that.data.year, month: that.data.month, day: 0, dayNum: i + 1, everyimday: [], everyexday: [] };
    }


    for (var i = 0; i < that.data.imToweek.length; i++) {
      var a = that.data.imToweek[i].saveTime;
      // 每次记账是周几
      var day = parseInt(new Date(a).getDay());
      // 数组中的位置
      var number = 0;
      if (day == 0) {
        number = 6;
      }
      else {
        number = day - 1;
      }
      temp1[number].income += that.data.imToweek[i].money;
      temp1[number].year = parseInt(new Date(a).getFullYear());
      temp1[number].month = (parseInt(new Date(a).getMonth()) == 0) ? 1 : parseInt(new Date(a).getMonth()) + 1;
      temp1[number].day = parseInt(new Date(a).getDate());
      temp1[number].everyimday.push(that.data.imToweek[i]);
    }
    for (var i = 0; i < that.data.exToweek.length; i++) {
      var a = that.data.exToweek[i].saveTime;
      // 每次记账是周几
      var day = parseInt(new Date(a).getDay());
      // 数组中的位置
      var number = 0;
      if (day == 0) {
        number = 6;
      }
      else {
        number = day - 1;
      }
      temp1[number].output = temp1[number].output + that.data.exToweek[i].money;
      temp1[number].year = parseInt(new Date(a).getFullYear());
      temp1[number].month = (parseInt(new Date(a).getMonth()) == 0) ? 1 : parseInt(new Date(a).getMonth()) + 1;
      temp1[number].day = parseInt(new Date(a).getDate());
      temp1[number].everyexday.push(that.data.exToweek[i]);

    }
    for (var i = 0; i < 6; i++) {

      temp1[i].balance = temp1[i].income - temp1[i].output;

      temp1[i].balance = temp1[i].balance >= 0 ? "+" + temp1[i].balance : temp1[i].balance;

    }
    temp1.reverse();
    console.log(temp1);
    var temp2=that.data.imToweek;
    var temp3=that.data.exToweek;
    for (var i = 0; i < temp2.length; i++) {
      temp2[i].saveTime = util.toData(temp2[i].saveTime, 'Y-M-D h:m:s');
    }
    for (var i = 0; i < temp3.length; i++) {
      temp3[i].saveTime = util.toData(temp3[i].saveTime, 'Y-M-D h:m:s');
    }

    that.setData({
      everyday: temp1,
      imToweek:temp2,
      exToweek:temp3
    })
    

  },


  // 判断两个日期是否是同一周
  check: function (old, now) {
      var oneDayTime = 1000 * 60 * 60 * 24;
      var old_count = parseInt(old.getTime() / oneDayTime);
      var now_other = parseInt(now.getTime() / oneDayTime);
      return parseInt((old_count + 4) / 7) == parseInt((now_other + 4) / 7);


  },
  // 筛选收入账单,计算今天总收入
  incomeToday: function () {
    var that = this;
    var temp = new Array;
    var total = 0.00;
    for (var i = 0; i < that.data.bill.length; i++) {

      if (that.data.bill[i].bType === "收入") {
        var date2 = that.data.bill[i].saveTime.substr(0, 10);
        if (date2 === that.data.date) {
          temp.push(that.data.bill[i]);
          total += that.data.bill[i].money;
        }
      }
    }
    that.setData({
      imToday: temp,
      totalimToday: total
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
      exToday: temp,
      totalexToday: total
    })
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

  },
  getdailybill: function () {
    this.setData({
      detailShow :!this.detailShow,
    })
    this.detailShow = !this.detailShow;
    
  }, 
  getdailybill1: function (event) {
    var data = {
      dayNum: event.currentTarget.dataset.daynum,
    }
    var detailShow = this.data.detailShow1;
    for (var i = 0; i < 7; i++) {
      if (i == 7 - data.dayNum) {
        detailShow[i] = !detailShow[i];
      }
    }
    this.setData({
      detailShow1: detailShow
    })
  }, 

})