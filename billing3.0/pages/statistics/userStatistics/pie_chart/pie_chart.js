var Chart = require("../../../../utils/wxcharts.js");
var app = getApp();
const server = require("../../../../utils/server.js");
var windowW = 0;
Page({
  data: {
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    flag:1,
    date: '',
    dateMonth:'',
    dateYear:'',
    nullFlag:0,
    datalist:[
      {
        type: '饮食',
        money: 0,
      },
      {
        type: '服饰',
        money: 0,
      },
      {
        type: '日用',
        money: 0,
      },
      {
        type: '学习',
        money: 0,
      },
      {
        type: '交通',
        money: 0,
      },
      {
        type: '娱乐',
        money: 0,
      },
      {
        type: '日用',
        money: 0,
      },
      {
        type: '电子',
        money: 0,
      },
      {
        type: '通讯',
        money: 0,
      },
      {
        type: '其他',
        money: 0,
      },
    ]

  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      date: e.detail.value,
      dateYear: e.detail.value.split("-")[0],
      dateMonth: e.detail.value.split("-")[1],
      flag:0,
    });
    this.onLoad();
    console.log("执行点击")
  },
  todetails() {
    wx.navigateTo({
      url: '/pages/statistics/userStatistics/details1/details1?temdateYear=' + this.data.dateYear + '&temdateMonth=' + this.data.dateMonth,
    })
  },

  // 点击下拉显示框
 
  onLoad: function (options) {
    
    var current = new Date();
    console.log(current);
    var dateStr=new Array(); 
    if(this.data.flag==1){
    this.setData({
      dateYear: current.getFullYear().toString(),
      dateMonth: '0'+(current.getMonth() + 1).toString(),
      date: current.getFullYear().toString() + '-' + '0'+(current.getMonth() + 1).toString()
    })}

    var that = this;
    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth,
    });
    console.log(this.data.imageWidth);
    //计算屏幕宽度比列
    windowW = this.data.imageWidth / 375;
    console.log(windowW);
    for (var j = 0; j < this.data.datalist.length; j++) {
      var dataTemp =
      {
        year: this.data.dateYear,
        month: this.data.dateMonth,
        level: 1,
        typeId: '',
        type: this.data.datalist[j].type,
        sumMoney: 0,
      };
      
      server.request("/bill/getBillsByMonth", dataTemp, function (res) {
        wx.hideToast();
        console.log("datatmp");
        console.log(dataTemp);
        var myMoney = res.data.data.expose.sumMoney
        var tType = res.data.data.expose.type;
        var temp = that.data.datalist;
        for (var i = 0; i < temp.length; i++) {
          if (temp[i].type == tType) {
            temp[i].money = myMoney
          }
        }
        console.log("temp");
        console.log(temp);
        that.setData({
          datalist: temp
        })
        
        if (j == that.data.datalist.length){
          setTimeout(function () {
            //要延时执行的代码
          new Chart({
            animation: false, //是否有动画
            canvasId: 'pieChart',
            type: 'pie',
            series: [{
              name: '餐饮',
              data: that.data.datalist[0].money,
            }, {
              name: '服饰',
              data: that.data.datalist[1].money,
            }, {
              name: '日用',
              data: that.data.datalist[2].money,
            }, {
              name: '学习',
              data: that.data.datalist[3].money,
            }, {
              name: '交通',
              data: that.data.datalist[4].money,
              },{
                name: '娱乐',
                data: that.data.datalist[5].money,
              }, {
                name: '日用',
                data: that.data.datalist[6].money,
              },  {
                name: '电子',
                data: that.data.datalist[7].money,
              }, 
              {
                name: '通讯',
                data: that.data.datalist[8].money,
              },  {
                name: '其他',
                data: that.data.datalist[9].money,
              }, 
            ],
            width: (375 * windowW),
            height: (400 * windowW),
            dataLabel: true,
          });
          }, 600) 
        }
      })
      
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  onShow:function(){
    this.onLoad;
    
  }
})