  // pages/add.js
var Chart = require("../../../utils/wxcharts.js");
var server = require("../../../utils/server.js");
var windowW = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前图表类型
    chartType: 0,
    year: '',
    month: '',
    //统计类型 年 = year 月 = month 周 = week
    statType: 'week',
    
    exClsList: ['饮食', '服饰', '运动', '学习', '交通', '娱乐', '日用', '电子', '通讯', '其他'],
    //支出排行数据列表
    exRankingList: [],
    //支出排行榜最高的支出金额
    topSumMoney: 0,
    //支出分类数据
    exTypeList: [],
    //折线图x轴
    xValues: [],
    //折线图y轴
    yValues: [],
    //本周的相关数据
    exWeekTypeList: [],
    exWeekRankingList: [],
    xWeekValues: [],
    yWeekValues: [],
    //是否有相应数据展示
    nothing: false,
  },
  
  changeChartType: function(event) {
    if(this.data.chartType != event.target.dataset.type) {
      this.setData({
        chartType: event.target.dataset.type
      })
    }
  },
  
  switchChartType: function(event) {
    this.setData({
      chartType: event.detail.current
    })
  },

  changeYear: function(event) {
    if (this.data.statType != 'year' || this.data.year != event.detail.value) {
      this.setData({
        statType: 'year',
        chartType: 0,
        year: event.detail.value
      })

      var that = this;
      var data = {
        year: this.data.year
      }

      server.request("/bill/getTypeSumByYear", data, function (res) {
        if(res.data.statusCode == 1) {
          var rawData = res.data.data.exposeCount;
          var topSumMoney = 0;
          var exTypeList = new Array();

          rawData.sort(that.compare);
          for (var i = 0; i < rawData.length; i++) {
            if (rawData[i].sumMoney == 0) {
              rawData = rawData.slice(0, i);
              break;
            }
          }
          for (var i = 0; i < rawData.length; i++) {
            exTypeList.push({
              name: rawData[i].type,
              data: rawData[i].sumMoney,
            })
          }

          if (rawData.length > 0) {
            topSumMoney = rawData[0].sumMoney;
          }
          
          that.setData({
            exRankingList: rawData,
            exTypeList: exTypeList,
            topSumMoney: topSumMoney,
          })

          if (that.data.exTypeList.length != 0) {
            that.setData({
              nothing: false
            })
            new Chart({
              animation: true,
              canvasId: 'pieChart',
              type: 'pie',
              series: that.data.exTypeList,
              width: (375 * windowW),
              height: (250 * windowW),
              dataLabel: true,
            });
          } else {
            that.setData({
              nothing: true
            })
          }
        }
      })

      server.request("/bill/getMonthSumByYear", data, function (res) {
        if (res.data.statusCode == 1) {
          var rawData = res.data.data.monthExpose;
          var xValues = new Array();
          var yValues = new Array();

          for (var i = 0; i < rawData.length; i++) {
            xValues.push(rawData[i].month);
            yValues.push(rawData[i].sumMoney);
          }

          that.setData({
            xValues: xValues,
            yValues: yValues,
          })

          new Chart({
            canvasId: 'lineChart',
            type: 'line',
            animation: true,
            categories: that.data.xValues,
            series: [{
              name: '支出明细',
              data: that.data.yValues,
            }],
            yAxis: {
              min: 0
            },
            xAxis: {
              disableGrid: true,
              type: 'circle'
            },
            dataLabel: false,
            dataPointShape: false,
            width: (375 * windowW),
            height: (200 * windowW),
          });
        }
      });
    }
    
  },

  changeMonth: function(event) {
    if(this.data.statType != 'month' || this.data.year + '-' + this.data.month != event.detail.value) {
      var that = this;
      var tmp = event.detail.value.split('-');
      that.setData({
        statType: 'month',
        chartType: 0,
        year: tmp[0],
        month: tmp[1],
      })
      var data = {
        year: tmp[0],
        month: tmp[1],
      }
      
      server.request("/bill/getTypeBill", data, function (res) {
        if (res.data.statusCode == 1) {
          var rawData = res.data.data.exposeCount;
          var topSumMoney = 0;
          var exTypeList = new Array();

          rawData.sort(that.compare);
          for (var i = 0; i < rawData.length; i++) {
            if (rawData[i].sumMoney == 0) {
              rawData = rawData.slice(0, i);
              break;
            }
          }
          for (var i = 0; i < rawData.length; i++) {
            exTypeList.push({
              name: rawData[i].type,
              data: rawData[i].sumMoney,
            })
          }

          if (rawData.length > 0) {
            topSumMoney = rawData[0].sumMoney;
          }

          that.setData({
            exRankingList: rawData,
            exTypeList: exTypeList,
            topSumMoney: topSumMoney,
          })

          if (that.data.exTypeList.length != 0) {
            that.setData({
              nothing: false
            })
            new Chart({
              animation: true,
              canvasId: 'pieChart',
              type: 'pie',
              series: that.data.exTypeList,
              width: (375 * windowW),
              height: (250 * windowW),
              dataLabel: true,
            });
          } else {
            that.setData({
              nothing: true
            })
          }
          
        }
      });

      server.request("/bill/getDayBillWithMonth", data, function (res) {
        if (res.data.statusCode == 1) {
          var rawData = res.data.data.dayExposeCount;
          var xValues = new Array();
          var yValues = new Array();

          for (var i = 0; i < rawData.length; i++) {
            xValues.push(rawData[i].day);
            yValues.push(rawData[i].sumMoney);
          }

          that.setData({
            xValues: xValues,
            yValues: yValues,
          })

          new Chart({
            canvasId: 'lineChart',
            type: 'line',
            animation: true,
            categories: that.data.xValues,
            series: [{
              name: '支出明细',
              data: that.data.yValues,
            }],
            yAxis: {
              min: 0
            },
            xAxis: {
              disableGrid: true,
            },
            dataLabel: false,
            dataPointShape: false,
            width: (375 * windowW),
            height: (200 * windowW),
          });
        }
      });

    }
  },

  toWeek: function(event) {
    if (this.data.statType != 'week') {
      if(this.data.exWeekTypeList.length > 0) {
        this.setData({
          nothing: false,
          statType: 'week',
          topSumMoney: this.data.exWeekRankingList[0].sumMoney,
          chartType: 0,
        })

        new Chart({
          animation: true,
          canvasId: 'pieChart',
          type: 'pie',
          series: this.data.exWeekTypeList,
          width: (375 * windowW),
          height: (250 * windowW),
          dataLabel: true,
        })

        new Chart({
          canvasId: 'lineChart',
          type: 'line',
          animation: true,
          dataLabel: true,
          dataPointShape: false,
          categories: this.data.xWeekValues,
          series: [{
            name: '支出明细',
            data: this.data.yWeekValues,
            color: '#FDD853'
          }],
          yAxis: {
            min: 0
          },
          xAxis: {
            disableGrid: true,
          },
          width: (375 * windowW),
          height: (200 * windowW),
        })

      } else {
        this.setData({
          nothing: true
        })
        
      }
    }
  },

  compare: function(prev, next) {
    return next.sumMoney - prev.sumMoney;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth
    });
    console.log(this.data.imageWidth);

    //计算屏幕宽度比列
    windowW = this.data.imageWidth / 375 * 14/15;
    console.log(windowW);

    //初始化年份
    var current = new Date();
    this.setData({
      year: current.getFullYear(),
      month: current.getMonth() + 1,
    })

    var that = this;
    var data = {
      year: current.getFullYear(),
      month: current.getMonth() + 1
    }
    var weekDay = ['一', '二', '三', '四', '五', '六', '日'];
    
    server.request("/bill/getDayBillWithMonth", data, function (res) {
      if (res.data.statusCode == 1) {
        var rawData = res.data.data.dayExposeCount;
        var wk = current.getDay();
        var day = (current.getDate() - 1) - (current.getDay() + 6) % 7;
        var xWeekValues = new Array();
        var yWeekValues = new Array();
        var wkCount = 0;

        if(day < 0) {
          var prev = data;
          if(prev.month == 1) {
            prev.year--; prev.month = 12;
          } else {
            prev.month--;
          }

          server.request("/bill/getDayBillWithMonth", prev, function (res) {
            if(res.data.statusCode == 1) {
              var prevRawData = res.data.data.dayExposeCount;
              
              for (var i = prevRawData.length + day; i < prevRawData.length; i++, wkCount++) {
                xWeekValues.push(weekDay[wkCount]);
                yWeekValues.push(prevRawData[i].sumMoney);
              }
              for(var i = 0; i < day + 7; i++, wkCount++) {
                xWeekValues.push(weekDay[wkCount]);
                yWeekValues.push(rawData[i].sumMoney);
              }

              that.setData({
                xWeekValues: xWeekValues,
                yWeekValues: yWeekValues,
              })
              
              new Chart({
                canvasId: 'lineChart',
                type: 'line',
                animation: true,
                dataLabel: true,
                dataPointShape: false,
                categories: that.data.xWeekValues,
                series: [{
                  name: '支出明细',
                  data: that.data.yWeekValues,
                  color: '#fdd853'
                }],
                yAxis: {
                  min: 0
                },
                xAxis: {
                  disableGrid: true,
                },
                width: (375 * windowW),
                height: (200 * windowW),
              });
            }

          })
        } else if(day + 6 > rawData.length) {
          for(var i = day; i < rawData.length; i++, wkCount++) {
            xWeekValues.push(weekDay[wkCount]);
            yWeekValues.push(rawData[i].sumMoney);
          }
          for( ;wkCount < 7; wkCount ++) {
            xWeekValues.push(weekDay[wkCount]);
            yWeekValues.push(0);
          }
          
          that.setData({
            xWeekValues: xWeekValues,
            yWeekValues: yWeekValues,
          })

          new Chart({
            canvasId: 'lineChart',
            type: 'line',
            animation: true,
            dataLabel: true,
            dataPointShape: false,
            categories: that.data.xWeekValues,
            series: [{
              name: '支出明细',
              data: that.data.yWeekValues,
              color: '#fdd853'
            }],
            yAxis: {
              min: 0
            },
            xAxis: {
              disableGrid: true,
            },
            width: (375 * windowW),
            height: (200 * windowW),
          });



        } else {       
          for (var i = day; i < day + 7; i++, wkCount++) {
            xWeekValues.push(weekDay[wkCount]);
            yWeekValues.push(rawData[i].sumMoney);
          }

          that.setData({
            xWeekValues: xWeekValues,
            yWeekValues: yWeekValues,
          })

          new Chart({
            canvasId: 'lineChart',
            type: 'line',
            animation: true,
            dataLabel: true,
            dataPointShape: false,
            categories: that.data.xWeekValues,
            series: [{
              name: '支出明细',
              data: that.data.yWeekValues,
              color: '#fdd853'
            }],
            yAxis: {
              min: 0
            },
            xAxis: {
              disableGrid: true,
            },
            width: (375 * windowW),
            height: (200 * windowW),
          });
        }
        

      }
    })

    server.request("/bill/getBillList", '', function (res) {
      if(res.data.statusCode == 1) {
        var rawData = res.data.data.bill
        console.log(rawData)
        var first = (current.getTime() - 86400000) - (current.getDay() + 6) % 7 * 86400000;
        var gTypes = new Array
        var weekBill = new Array
        var exWeekTypeList = new Array
        var exWeekRankingList = new Array

        for(var i = 0; i < rawData.length; i++) {
          if (rawData[i].bType == '支出' && rawData[i].saveTime > first && rawData[i].saveTime < first + 7 * 86400000) {
            weekBill.push(rawData[i])
          }
        }

        //处理当周的账单生成分类数据
        for(var i = 0; i < weekBill.length; i++) {
          if(!gTypes.includes(weekBill[i].gType)) {
            gTypes.push(weekBill[i].gType)

            exWeekRankingList.push({
              index: that.data.exClsList.indexOf(weekBill[i].gType),
              type: weekBill[i].gType,
              sumMoney: weekBill[i].money,
            })
          } else {
            exWeekRankingList[gTypes.indexOf(weekBill[i].gType)].sumMoney += weekBill[i].money
          }
        }
        if (exWeekRankingList.length > 0) {
          exWeekRankingList.sort(that.compare)
          for(var i = 0; i < exWeekRankingList.length; i++) {
            exWeekTypeList.push({
              name: exWeekRankingList[i].type,
              data: exWeekRankingList[i].sumMoney
            })
          }

          that.setData({
            nothing: false,
            topSumMoney: exWeekRankingList[0].sumMoney,
            exWeekTypeList: exWeekTypeList,
            exWeekRankingList: exWeekRankingList
          })

          new Chart({
            animation: true,
            canvasId: 'pieChart',
            type: 'pie',
            series: that.data.exWeekTypeList,
            width: (375 * windowW),
            height: (250 * windowW),
            dataLabel: true,
          })
        } else {
          that.setData({
            nothing: true,
            exWeekTypeList: exWeekTypeList,
            exWeekRankingList: exWeekRankingList
          })
        }
        
      }
    })

    /*
    server.request("/bill/getTypeBill", data, function(res) {
      if(res.data.statusCode == 1) {
        var rawData = res.data.data.exposeCount;
        var topSumMoney = 0;
        var exTypeList = new Array();

        rawData.sort(that.compare);
        for (var i = 0; i < rawData.length; i++) {
          if (rawData[i].sumMoney == 0) {
            rawData = rawData.slice(0, i);
            break;
          }
        }
        for(var i = 0; i < rawData.length; i++) {
          exTypeList.push({
            name: rawData[i].type,
            data: rawData[i].sumMoney,
          })
        }
        
        if(rawData.length > 0) {
          topSumMoney = rawData[0].sumMoney;
        }

        that.setData({
          exRankingList: rawData,
          exTypeList: exTypeList,
          topSumMoney: topSumMoney,
        })
        
        new Chart({
          animation: true,
          canvasId: 'pieChart',
          type: 'pie',
          series: that.data.exTypeList,
          width: (375 * windowW),
          height: (250 * windowW),
          dataLabel: true,
        });
      }
    })
    

    server.request("/bill/getDayBillWithMonth", data, function (res) {
      if (res.data.statusCode == 1) {
        var rawData = res.data.data.dayExposeCount;
        var xValues = new Array();
        var yValues = new Array();

        for(var i = 0; i < rawData.length; i++) {
          xValues.push(rawData[i].day);
          yValues.push(rawData[i].sumMoney);
        }

        that.setData({
          xValues: xValues,
          yValues: yValues,
        })

        new Chart({
          canvasId: 'lineChart',
          type: 'line',
          animation: true,
          categories: that.data.xValues,
          series: [{
            name: '支出明细',
            data: that.data.yValues,
          }],
          yAxis: {
            min: 0
          },
          xAxis: {
            disableGrid: true,
          },
          dataLabel: false,
          dataPointShape: false,
          width: (375 * windowW),
          height: (200 * windowW),
        });
      }
    })
    */
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