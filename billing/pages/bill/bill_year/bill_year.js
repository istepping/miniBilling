// pages/bill/bill_year/bill_year.js
var app = getApp();
const server = require("../.../../../../utils/server.js");
var util = require("../.../../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailShow: false,
    detailShow1: [false, false, false, false, false, false, false, false, false, false, false, false],
    bill: [],
    // 将账单按照支出收入分类
    imToyear: [],
    exToyear: [],
    imTomonth: [],
    exTomonth: [],
    // 每个月的支出收入结余
    everymonth:[],
    // 本年的总收入和总支出
    totalimToyear: 0,
    totalexToyear: 0,
    totalimTomonth: 0,
    totalexTomonth: 0,
    totalimToday: 0,
    totalexToday: 0,
    // 
    // 分别为今天的具体时间、年份日期、几号、周几、月份
    time: null,
    date: null,
    date1: null,
    day: null,
    year: null,
    month:null,


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
      year: options.year,
      month:options.month
    })
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    // 连接后台接口
    var that=this;
    server.request("/bill/getBillList", '', function (res) {
      console.log(res);
      that.setData({
        bill: res.data.data.bill
      });
      that.formatTime();
      that.incomeToyear();
      that.outputToyear();
      that.incomeTomonth();
      that.outputTomonth();
      that.everymonthdetail();
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
  // 筛选收入账单,计算本年总收入
  incomeToyear: function () {
    var that = this;
    var temp = new Array;
    var total = 0.00;

    for (var i = 0; i < that.data.bill.length; i++) {

      if (that.data.bill[i].bType === "收入") {
        var year1 = that.data.bill[i].saveTime.substr(0, 4);
        if (year1 === that.data.year) {
          temp.push(that.data.bill[i]);
          total += that.data.bill[i].money;
        }
      }
    };
    that.setData({
      imToyear: temp,
      totalimToyear: total
    })
  },
  // 筛选支出账单,计算本年总支出
  outputToyear: function () {
    var that = this;
    var temp = new Array;
    var total = 0.00;

    for (var i = 0; i < that.data.bill.length; i++) {

      if (that.data.bill[i].bType === "支出") {
        var year1 = that.data.bill[i].saveTime.substr(0, 4);
        if (year1 === that.data.year) {
          temp.push(that.data.bill[i]);
          total += that.data.bill[i].money;
        }
      }
    };
    that.setData({
      exToyear: temp,
      totalexToyear: total
    })
  },
  // 筛选收入账单,计算本月总收入
  incomeTomonth: function () {
    var that = this;
    var temp = new Array;
    var total = 0.00;

    for (var i = 0; i < that.data.bill.length; i++) {

      if (that.data.bill[i].bType === "收入") {
        var month1 = that.data.bill[i].saveTime.substr(5, 2);
        if (month1 === that.data.month) {
          temp.push(that.data.bill[i]);
          total += that.data.bill[i].money;
        }
      }
    };
    for (var i = 0; i < temp.length; i++) {
      var date = temp[i].saveTime.substr(8, 2);
      var a = Date.parse(temp[i].saveTime);
      var DAY = null;
      switch (new Date(a).getDay()) {
        case 0: DAY = '周日'; break;
        case 1: DAY = '周一'; break;
        case 2: DAY = '周二'; break;
        case 3: DAY = '周三'; break;
        case 4: DAY = '周四'; break;
        case 5: DAY = '周五'; break;
        case 6: DAY = '周六'; break;
      }
      temp[i].gType4 = date;
      temp[i].gType4id = DAY;

    }
    that.setData({
      imTomonth: temp,
      totalimTomonth: total
    })
  },
  // 筛选支出账单,计算本月总支出
  outputTomonth: function () {
    var that = this;
    var temp = new Array;
    var total = 0.00;

    for (var i = 0; i < that.data.bill.length; i++) {

      if (that.data.bill[i].bType === "支出") {
        var month1 = that.data.bill[i].saveTime.substr(5, 2);
        if (month1 === that.data.month) {
          temp.push(that.data.bill[i]);
          total += that.data.bill[i].money;
        }
      }
    };
    for (var i = 0; i < temp.length; i++) {
      var date = temp[i].saveTime.substr(8, 2);
      var a = Date.parse(temp[i].saveTime);
      var DAY = null;
      switch (new Date(a).getDay()) {
        case 0: DAY = '周日'; break;
        case 1: DAY = '周一'; break;
        case 2: DAY = '周二'; break;
        case 3: DAY = '周三'; break;
        case 4: DAY = '周四'; break;
        case 5: DAY = '周五'; break;
        case 6: DAY = '周六'; break;
      }
      temp[i].gType4 = date;
      temp[i].gType4id = DAY;

    }
    that.setData({
      exTomonth: temp,
      totalexTomonth: total
    })
  },
  // 创建二维数组设置每个月的细节
  everymonthdetail:function(){
    var that =this;
    var month=new Date().getMonth;
    var temp1 =new Array();
    for(var i=0;i<12;i++){
      temp1[i] = { income: 0, output: 0, balance: 0, year: that.data.year, month: i + 1, everyimmonth: [], everyexmonth: []  };                    
      for(var j=0;j<3;j++){
        temp1[i][j]=0;
      }
    }
    for (var i = 0; i < that.data.bill.length; i++)
    {
      var a = Date.parse(that.data.bill[i].saveTime);

      var date = parseInt(that.data.bill[i].saveTime.substr(5, 2))-1;

     if(that.data.bill[i].saveTime.substr(0,4)==that.data.year){
       if (that.data.bill[i].bType === "收入") {
         temp1[date][0] += that.data.bill[i].money;
         temp1[date].income += that.data.bill[i].money;
         temp1[date].everyimmonth.push(that.data.bill[i]);
       }
       if (that.data.bill[i].bType === "支出") {
         temp1[date][1] += that.data.bill[i].money;
         temp1[date].output += that.data.bill[i].money;
         temp1[date].everyexmonth.push(that.data.bill[i]);

       }
       temp1[date][2] = temp1[date][0] - temp1[date][1];
       temp1[date].balance = temp1[date].income - temp1[date].output;
       temp1[date][2] = temp1[date][2] >= 0 ? "+" + temp1[date][2] : temp1[date][2];
       temp1[date].balance = temp1[date].balance >= 0 ? "+" + temp1[date].balance : temp1[date].balance;
       temp1[date].year = parseInt(new Date(a).getFullYear());
       temp1[date].month = (parseInt(new Date(a).getMonth()) == 0) ? 1 : parseInt(new Date(a).getMonth()) + 1;
     }
    }
    for (var i = 0; i < temp1.length; i++) {
      for (var j = 0; j < temp1[i].everyexmonth.length; j++) {
        var date = temp1[i].everyexmonth[j].saveTime.substr(8, 2);
        var a = Date.parse(temp1[i].everyexmonth[j].saveTime);
        var DAY = null;
        switch (new Date(a).getDay()) {
          case 0: DAY = '周日'; break;
          case 1: DAY = '周一'; break;
          case 2: DAY = '周二'; break;
          case 3: DAY = '周三'; break;
          case 4: DAY = '周四'; break;
          case 5: DAY = '周五'; break;
          case 6: DAY = '周六'; break;
        }

        temp1[i].everyexmonth[j].gType4 = date;
        temp1[i].everyexmonth[j].gType4id = DAY;
      }
      for (var j = 0; j < temp1[i].everyimmonth.length; j++) {
        var date = temp1[i].everyimmonth[j].saveTime.substr(8, 2);
        var a = Date.parse(temp1[i].everyimmonth[j].saveTime);
        var DAY = null;
        switch (new Date(a).getDay()) {
          case 0: DAY = '周日'; break;
          case 1: DAY = '周一'; break;
          case 2: DAY = '周二'; break;
          case 3: DAY = '周三'; break;
          case 4: DAY = '周四'; break;
          case 5: DAY = '周五'; break;
          case 6: DAY = '周六'; break;
        }

        temp1[i].everyimmonth[j].gType4 = date;
        temp1[i].everyimmonth[j].gType4id = DAY;
      }
    }




    temp1.reverse();
    console.log(temp1);
    that.setData({
      everymonth: temp1,
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
      location: event.currentTarget.dataset.location,
      money: event.currentTarget.dataset.money,
      saveTime: event.currentTarget.dataset.savetime,
    }
    wx.navigateTo({
      url: '/pages/bill/bill_detail/bill_detail?bType=' + data.bType + '&bId=' + data.bId + '&gDetail=' + data.gDetail + '&gType=' + data.gType + '&gType2=' + data.gType2 + '&location=' + data.location + '&money=' + data.money + '&saveTime=' + data.gDetail + '&saveTime=' + data.saveTime,
    })
  },

  /**
   *
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
      detailShow: !this.detailShow,
    })
    this.detailShow = !this.detailShow;

  }, 
  getdailybill1: function (event) {
    var data = {
      monthNumber: event.currentTarget.dataset.monthnumber,
    }
    var detailShow = this.data.detailShow1;
    for (var i = 0; i < 12; i++) {
      if (i == 12 - data.monthNumber) {
        detailShow[i] = !detailShow[i];
      }
    }
    this.setData({
      detailShow1: detailShow
    })
  }, 
})