var app = getApp();
const server = require("../.../../../../utils/server.js");
var util = require("../.../../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailShow: false,
    detailShow1:[false,false,false,false,false,false],
    bill: [],
    // 将账单按照支出收入分类
    imTomonth: [],
    exTomonth: [],
    imToweek: [],
    exToweek: [],
    // 每周的支出收入结余
    everyweek: [],
    // 本月的总收入和总支出
    totalimTomonth: 0,
    totalexTomonth: 0,
    totalimToweek: 0,
    totalexToweek: 0,
    // 分别为今天的具体时间、年份日期、几号、年份、周几、月份、本月第一天、最后一天是周几、本月最大天数
    time: null,
    date: null,
    date1: null,
    year:null,
    day: null,
    month:null,
    monthfirst:null,
    monthlast:null,
    MaxMonth:0,
    // 当前周数、本周第一天、最后一天、当前月有几周
    weekNum:0,
    Toweekfirst: null,
    Toweeklast: null,
    weekcount:0

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
      year:options.year,
      day: options.day,
      month:options.month,
      MaxMonth: options.MaxMonth,
      Toweekfirst:options.Toweekfirst,
      Toweeklast: options.Toweeklast,
      exToweek:options.exToweek
    
      
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
      });
      that.formatTime();
      that.incomeTomonth();
      that.outputTomonth();
      that.incomeToweek();
      that.outputToweek();
      that.everymonthFirstDay();
      that.remakeweek();
      that.weekcountmake();
      that.weeknummake();
      that.everyweekdetail();
      console.log(that.data.everyweek);

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
  // 筛选收入账单,计算本月总收入
  incomeTomonth: function () {
    var that = this;
    var temp = new Array;
    var total = 0.00;
   
    for (var i = 0; i < that.data.bill.length; i++) {

      if (that.data.bill[i].bType === "收入") {
        var month1 = that.data.bill[i].saveTime.substr(5, 2);    
        if(month1===that.data.month)
        {
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
    that.setData({
      exTomonth: temp,
      totalexTomonth: total
    })
  },
    // 筛选收入账单,计算本周总收入
  incomeToweek: function () {
    var that = this;
    var temp = new Array;
    var now = new Date();
    var total = 0.00;
    for (var i = 0; i < that.data.bill.length; i++) {
      if (that.data.bill[i].bType === "收入") {
        var a = Date.parse(that.data.bill[i].saveTime);
        var old = new Date(a);
        if (that.check(old, now)) {
          temp.push(that.data.bill[i]);
          total += that.data.bill[i].money;
        }
      }
    }
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
      imToweek: temp,
      totalimToweek: total
    })
  },
  // 筛选支出账单,计算本周总支出
  outputToweek: function () {
    var that = this;
    var temp = new Array;
    var now = new Date();
    var total = 0.00;
    for (var i = 0; i < that.data.bill.length; i++) {
      if (that.data.bill[i].bType === "支出") {
        var a = Date.parse(that.data.bill[i].saveTime);
        var old = new Date(a);
        if (that.check(old, now)) {
          temp.push(that.data.bill[i]);
          total += that.data.bill[i].money;
        }
      }
    }


    for(var i=0;i<temp.length;i++){
      var date=temp[i].saveTime.substr(8,2);
      var a = Date.parse(temp[i].saveTime);
      var DAY=null;
      switch (new Date(a).getDay()) {
        case 0: DAY = '周日'; break;
        case 1: DAY = '周一'; break;
        case 2: DAY = '周二'; break;
        case 3: DAY = '周三'; break;
        case 4: DAY = '周四'; break;
        case 5: DAY = '周五'; break;
        case 6: DAY = '周六'; break;
      }
      temp[i].gType4=date;
      temp[i].gType4id=DAY;
   
    }
    console.log(temp);
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
    return parseInt((old_count + 3) / 7) == parseInt((now_other + 3) / 7);


  },
  // 每月第一天、最后一天是周几
  everymonthFirstDay: function () {
    var that = this;
    var date = new Date();
    date.setFullYear(that.data.year, that.data.month - 1, 1);
    var monthfirst1 = (parseInt(date.getDay()) == 0) ? 7 : parseInt(date.getDay());
    date.setFullYear(that.data.year, that.data.month - 1, that.data.MaxMonth);
    var monthlast1 = (parseInt(date.getDay()) == 0) ? 7 : parseInt(date.getDay());
    that.setData({
      monthfirst: monthfirst1,
      monthlast:monthlast1
    })
  },
  // 重新设置本周第一天最后一天使其不越界
  remakeweek:function(){
    var that=this;
    var first=that.data.Toweekfirst;
    var last=that.data.Toweeklast;
    var ffirst = first.split("."); var llast = last.split(".");
    if(ffirst[0]!=that.data.month){
      ffirst[0] = that.data.month;
      ffirst[1]=1;
    }
    if (llast[0] != that.data.month){
      llast[0] = that.data.month;
      llast[1]=that.data.MaxMonth;
    }
    first=ffirst.join('.');
    last=llast.join('.');
    that.setData({
      Toweekfirst:first,
      Toweeklast:last
    })


  },
  //计算本月有几周，可能为4、5、6
  weekcountmake:function(){
    var that = this;
    var maxmonth = parseInt(that.data.MaxMonth);
    var weekcount = 0;
    if (maxmonth == 28) { weekcount = 4; }
    else if (maxmonth == 29) { weekcount = 5; }
    else if (maxmonth==30){
      if (parseInt(that.data.monthfirst)==7)
      {weekcount=6;}
      else{weekcount=5;}
    }
    else {
      if (parseInt(that.data.monthfirst) == 6 || parseInt(that.data.monthfirst) == 7)
      {weekcount=6;}
      else { weekcount = 5; }
    }
    that.setData({
      weekcount:weekcount
    })

  },
  // 计算当前是第几周
  weeknummake:function(){
    var that = this;
    var weekNum=0;
    var date1=parseInt(that.data.date1);
    weekNum= parseInt((date1 - (7 - that.data.monthfirst + 1)) % 7) <= 0 ? parseInt((date1 - (7 - that.data.monthfirst + 1)) / 7) + 1 : parseInt((date1 - (7 - that.data.monthfirst + 1)) / 7) + 2;
    
    that.setData({
      weekNum:weekNum,
    })
console.log(weekNum);
  },

    //创建二维数组设置每周的细节
  everyweekdetail: function () {
    var that = this;
    var temp1 = new Array();
    var weekcount=that.data.weekcount;
    var monthfirst=that.data.monthfirst;
    var monthlast=that.data.monthlast;
    // 创建二维数组
    for (var i = 0; i < weekcount; i++) {
      temp1[i] = { income: 0, output: 0, balance: null, year: that.data.year, month: that.data.month,weekNumber:i+1,first:null,last:null,everyimweek:[],everyexweek:[], };
      for (var j = 0; j < 3; j++) {
        temp1[i][j] = 0;
      }
    }
     
    // 设定每周日期
    temp1[that.data.weekNum - 1].first = that.data.Toweekfirst;
    temp1[that.data.weekNum - 1].last = that.data.Toweeklast;
    var ffirst = that.data.Toweekfirst.split(".");
    var llast = that.data.Toweeklast.split(".");
    for( var i=0;i<2;i++){
      ffirst[i]=parseInt(ffirst[i]);
      llast[i]=parseInt(llast[i]);
    }
    var first=null;var last=null;
    if (that.data.weekNum == 1 || that.data.weekNum==weekcount)
    {
      if (that.data.weekNum == 1){
        ffirst[1] = parseInt(ffirst[1]) + 8-parseInt(monthfirst);
        llast[1] = parseInt(ffirst[1]) + 6;
        first = ffirst.join(".");
        last = llast.join(".");
        temp1[1].first = first;
        temp1[1].last = last;
        for(var i=2;i<weekcount;i++){
          ffirst[1] = parseInt(ffirst[1]) + 7;
          llast[1] = parseInt(ffirst[1]) + 6;
          if (llast[1] > that.data.MaxMonth) { llast[1] = that.data.MaxMonth; }
          first = ffirst.join(".");
          last = llast.join(".");
          temp1[i].first = first;
          temp1[i].last = last;
        }
      }
      else{
        llast[1] = parseInt(ffirst[1]) - parseInt(monthlast);
        ffirst[1]=llast[1]-6;
        first = ffirst.join(".");
        last = llast.join(".");
        temp1[weekcount-1].first = first;
        temp1[weekcount-1].last = last;
        for (var i = weekcount-1; i >= 0; i++) {
          ffirst[1] = parseInt(ffirst[1]) - 7;
          llast[1] = parseInt(ffirst[1]) + 6;
          if (ffirst[1] <= 0) { ffirst[1] = 1; }
          first = ffirst.join(".");
          last = llast.join(".");
          temp1[i].first = first;
          temp1[i].last = last;
        }
      }
    }
else{
  var fffirst=ffirst;var lllast=llast;
      for (var i = that.data.weekNum - 2; i >= 0; i--) {
    
        lllast[1] -=7 ;
        fffirst[1] = lllast[1] - 6;
        if (fffirst[1] <= 0) { fffirst[1] = 1; }
        first = fffirst.join(".");
        last = lllast.join(".");
        temp1[i].first = first;
        temp1[i].last = last;
    
      }

      var fffirst = that.data.Toweekfirst.split(".");
      var lllast = that.data.Toweeklast.split(".");
      for (var i = 0; i < 2; i++) {
        ffirst[i] = parseInt(ffirst[i]);
        llast[i] = parseInt(llast[i]);
      }

      for (var i = that.data.weekNum; i < weekcount; i++) {
        fffirst[1] += 7 ;
        lllast[1] = fffirst[1] + 6;
        if (lllast[1] > that.data.MaxMonth) { lllast[1] = that.data.MaxMonth; }
        first = fffirst.join(".");
        last = lllast.join(".");
        temp1[i].first = first;
        temp1[i].last = last;
      }
}
    //判断属于第几周
    
    for (var i = 0; i < that.data.imTomonth.length; i++) {
      var day = parseInt(that.data.imTomonth[i].saveTime.substr(8, 2));
      var number = 0;
      for (j = 0; j < temp1.length; j++) {
        var first = temp1[j].first;
        var last = temp1[j].last;
        var ffirst = first.split('.');
        var llast = last.split(".");
        if (day >= parseInt(ffirst[1]) && day <= parseInt(llast[1]))
        { number = parseInt(temp1[j].weekNumber); }
      }
      temp1[number - 1][0] += that.data.imTomonth[i].money;
      temp1[number - 1].income += that.data.imTomonth[i].money;
      temp1[number - 1].everyimweek.push(that.data.imTomonth[i]);
    }

    for (var i = 0; i < that.data.exTomonth.length; i++) {
      var day = parseInt(that.data.exTomonth[i].saveTime.substr(8, 2));
      var number = 0;
      for (j = 0; j < temp1.length; j++) {
        var first = temp1[j].first;
        var last = temp1[j].last;
        var ffirst = first.split('.');
        var llast = last.split(".");
        if (day >= parseInt(ffirst[1]) && day <= parseInt(llast[1])) { number = parseInt(temp1[j].weekNumber); }
      }

      temp1[number - 1][1] += that.data.exTomonth[i].money;
      temp1[number - 1].output += that.data.exTomonth[i].money;
      temp1[number - 1].everyexweek.push(that.data.exTomonth[i]);

    }
    for (var i = 0; i < weekcount; i++) {
      temp1[i][2] = temp1[i][0] - temp1[i][1];
      temp1[i].balance = temp1[i].income - temp1[i].output;
      temp1[i][2] = temp1[i][2] >= 0 ? "+" + temp1[i][2] : temp1[i][2];
      temp1[i].balance = temp1[i].balance >= 0 ? "+" + temp1[i].balance : temp1[i].balance;

    }
    for (var i = 0; i < temp1.length; i++) {
      for(var j=0;j<temp1[i].everyexweek.length;j++){
        var date = temp1[i].everyexweek[j].saveTime.substr(8, 2);
        var a = Date.parse(temp1[i].everyexweek[j].saveTime);
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
      
      temp1[i].everyexweek[j].gType4 = date;
      temp1[i].everyexweek[j].gType4id = DAY;
      }
      for (var j = 0; j < temp1[i].everyimweek.length; j++) {
        var date = temp1[i].everyimweek[j].saveTime.substr(8, 2);
        var a = Date.parse(temp1[i].everyimweek[j].saveTime);
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

        temp1[i].everyimweek[j].gType4 = date;
        temp1[i].everyimweek[j].gType4id = DAY;
      }
    }
     temp1.reverse();
    console.log(temp1);
    that.setData({
      everyweek: temp1,
      weekcount: weekcount
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
      weekNumber: event.currentTarget.dataset.weeknumber,
    }
    var detailShow=this.data.detailShow1;
    for(var i=0;i<6;i++){
      if(i==6-data.weekNumber){
        detailShow[i] = !detailShow[i];
      }
    }
   this.setData({
     detailShow1:detailShow
   })
  }, 
})