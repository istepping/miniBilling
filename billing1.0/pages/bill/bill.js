// pages/statistics/rank:
var app = getApp();
const server = require("../.../../../utils/server.js");
var util = require("../.../../../utils/util.js");


Page({
  /**
   * 页面的初始数据
   */
  data: {
    image:[
      {
        "ima": ''
        },
      {
        "ima": 'http://pic.yupoo.com/youheng/d7f1bb69/ec9ea982.png',
        },
      {
        "ima": 'http://pic.yupoo.com/youheng/2b2fc236/c1ce5f7d.png',
       } ,
      { "ima": 'http://pic.yupoo.com/youheng/ab7831ca/64fe11d3.png',}

    ],
    bill: [],
    // 将账单按照支出收入分类.
    imToday: [],
    exToday: [],
    imToweek: [],
    exToweek: [],
    imTomonth: [],
    exTomonth: [],
    imToyear: [],
    exToyear: [],
    //本天、本周、本月、本年的总收入、支出
    totalimToday: 0,
    totalexToday: 0,
    totalimToweek: 0,
    totalexToweek: 0,
    totalimTomonth: 0,
    totalexTomonth: 0,
    totalBalanceTomonth: '',
    totalimToyear: 0,
    totalexToyear: 0,
    // 分别为今天的具体时间、年份日期、几号、周几、年份、年份后两位、月份
    time: '',
    date: '',
    date1: '',
    day: '',
    year:'',
    year1:'',
    month:'',
    // 本周第一天、最后一天、本月最大天数
    Toweekfirst:'',
    Toweeklast:'',
    MaxMonth:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow: function () {
    var that = this;
    // 连接后台接口
    server.requestWithoutLoading("/bill/getBillList", '', function (res) {
      that.setData({
        bill: res.data.data.bill
      });
      that.formatTime();
      that.incomeToday();
      that.outputToday();
      that.incomeToweek();
      that.outputToweek();
      that.incomeTomonth();
      that.outputTomonth();
      that.incomeToyear();
      that.outputToyear();
      that.MaxMonthOfDate();
      that.everyweek();
      that.debug();
      that.setData({

      });


    });
  },
  // 调试
  debug:function(){
    var that = this;
    console.log(that.data.bill);
  },
  // 获取时间
  formatTime: function () {
    // 时间戳转换
    var that = this;
    var temp = this.data.bill;
    for (var i = 0; i < temp.length; i++) {
      temp[i].saveTime = util.toData(temp[i].saveTime, 'Y-M-D h:m:s');
    }
    that.setData({
      bill: temp
    });
    // 获取当前时间
    var TIME = util.formatTime(new Date());
    var DAY = that.data.day;
    switch (new Date().getDay()) {
      case 0: DAY = '周日'; break;
      case 1: DAY = '周一'; break;
      case 2: DAY = '周二'; break;
      case 3: DAY = '周三'; break;
      case 4: DAY = '周四'; break;
      case 5: DAY = '周五'; break;
      case 6: DAY = '周六'; break;
    }
    that.setData({
      time: TIME,
      date: TIME.substr(0, 10),
      date1: TIME.substr(8, 2),
      day: DAY,
      year:TIME.substr(0,4),
      year1: TIME.substr(2, 2),
      month:TIME.substr(5, 2),

    })
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
      totalexToday: total,
     
    })
  },
    // 筛选收入账单,计算本周总收入
  incomeToweek:function(){
    var that = this;
    var temp = new Array;
    var date = that.data.date;
    date = date.replace(/-/g, "/");
    var now = new Date(Date.parse(date));
    var total = 0.00;
    for (var i = 0; i < that.data.bill.length; i++)
    {
      if (that.data.bill[i].bType === "收入")
      {
        var a = that.data.bill[i].saveTime.substr(0, 10);
        var oldtime = a.replace(/-/g, "/");
        var old = new Date(Date.parse(oldtime));
        if (that.check(old, now)) {
          temp.push(that.data.bill[i]);
          total += that.data.bill[i].money;
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
    var date=that.data.date;
    date = date.replace(/-/g, "/");
    var now = new Date(Date.parse(date));
    var total = 0.00;
    for (var i = 0; i < that.data.bill.length; i++) {
      if (that.data.bill[i].bType === "支出") {
        var a = that.data.bill[i].saveTime.substr(0,10);
        var oldtime = a.replace(/-/g, "/");
        var old = new Date(Date.parse(oldtime));
        if (that.check(old, now)) {
          temp.push(that.data.bill[i]);
          total += that.data.bill[i].money;
        }
      }
    }
 
    that.setData({
      exToweek: temp,
      totalexToweek: total
    })
  },
  // 判断两个日期是否是同一周
  check: function (old, now) {
    var oneDayTime = 1000 * 60 * 60 * 24;
    var old_count = parseInt(old.getTime() / oneDayTime);
    var now_other = parseInt(now.getTime() / oneDayTime);
    return parseInt((old_count + 4) / 7) == parseInt((now_other + 4) / 7);
  },
  // 计算每周第一天、最后一天
  everyweek:function(){
    var that=this;
    var DAY=new Date().getDay();
    DAY=(DAY==0)?7:DAY;
    var TIME = util.formatTime(new Date());
    var date = TIME.substr(5, 5);
    var first=date;var last=date;
    var ffirst=first.split("-");var llast=last.split("-");
    var day=parseInt(date.substr(3,2));
    var month = (parseInt(date.substr(0, 2)) - 1) == 0 ? 12 : parseInt(date.substr(0, 2)) - 1;
    var a = day - DAY + 1;
    if (a <= 0) {
      ffirst[0] = (parseInt(ffirst[0]) - 1) == 0 ? 12 : parseInt(ffirst[0]) - 1;
      if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) { ffirst[1] = 31 + a; }
      else if (month == 4 || month == 6 || month == 69 || month == 11) { ffirst[1] = 30 + a; }
      else if (month == 2 && that.isLeapYear()) { ffirst[1] = 29 + a; }
      else { ffirst[1] = 28 +a; }
    }
    else {
      ffirst[1] = day - DAY + 1;
    }
    if ((day + 7 - DAY) > that.data.MaxMonth) {
      llast[0] = (parseInt(llast[0]) + 1 > 12) ? 1 : parseInt(llast[0]) + 1;
     
      llast[1] = day + 7 - DAY - that.data.MaxMonth;
    }
    else {
      llast[1] = day + 7 - DAY;
    }
    first=ffirst.join(".");
    last = llast.join(".");
 

    that.setData({
      Toweekfirst:first,
      Toweeklast:last,
    })


  },
  // 判断是否是闰年
  isLeapYear:function () {
    var date=new Date();
    return (0 == date.getYear() % 4 && ((date.getYear() % 100 != 0) || (date.getYear() % 400 == 0)));
  },
  // 计算当天日期所在月的最大天数
 MaxMonthOfDate:function(){
   var that=this;
   var month = parseInt(that.data.month);
   var maxmonth=0;
   if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
   {maxmonth=31;}
   else if (month == 4 || month == 6 || month == 69 || month == 11)
   {maxmonth=30;}
   else if (month==2 && that.isLeapYear())
   {maxmonth=29;}
   else
   {maxmonth=28;}
   that.setData({
     MaxMonth:maxmonth,
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
    var totalimTomonth = that.data.totalimTomonth;
    var totalBalanceTomonth = totalimTomonth - total;
    totalBalanceTomonth = totalBalanceTomonth > 0 ? "+" + totalBalanceTomonth : totalBalanceTomonth;
    that.setData({
      exTomonth: temp,
      totalexTomonth: total,
      totalBalanceTomonth: totalBalanceTomonth
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
 

  // 页面跳转
  toaccount: function () {
    wx.switchTab({
      url: '/pages/account/account',
    })
  },
  tobill_day: function () {
    
    wx.navigateTo({

      url: '/pages/bill/bill_day/bill_day?time=' + this.data.time + '&date=' + this.data.date + '&date1=' + this.data.date1 + '&day=' + this.data.day + '&month=' + this.data.month+ '&year=' + this.data.year,

    })
  },
  tobill_week: function () {
    wx.navigateTo({
      url: '/pages/bill/bill_week/bill_week?time=' + this.data.time + '&date=' + this.data.date + '&date1=' + this.data.date1 + '&day=' + this.data.day + '&year=' + this.data.year + '&month=' + this.data.month + '&Toweekfirst=' + this.data.Toweekfirst,
    })
  },
  tobill_month: function () {
    wx.navigateTo({
      url: '/pages/bill/bill_month/bill_month?time=' + this.data.time + '&date=' + this.data.date + '&date1=' + this.data.date1 + '&day=' + this.data.day + '&month=' + this.data.month + '&year=' + this.data.year + '&MaxMonth=' + this.data.MaxMonth + '&Toweekfirst=' + this.data.Toweekfirst + '&Toweeklast=' + this.data.Toweeklast+'&exToweek='+this.data.exToweek,
    })
  },
  tobill_year: function () {
    wx.navigateTo({
      url: '/pages/bill/bill_year/bill_year?time=' + this.data.time + '&date=' + this.data.date + '&date1=' + this.data.date1 + '&day=' + this.data.day + '&year=' + this.data.year + '&month=' + this.data.month + '&totalimTomonth=' + this.data.totalimTomonth + '&totalexTomonth=' + this.data.totalexTomonth,
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