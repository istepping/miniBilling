var app = getApp();
var server = require("../../utils/server.js");
var util = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    exprice: '',
    exname: '',
    exnote: '',

    inprice: '',
    inname: '',
    innote: '',
    date: '',
    
    //当前Tab页
    curTab: 0,
    //当前选择支出分类索引
    exCls: 9,
    //当前选择收入分类索引
    inCls: 0,

    rData: [],
    rating: ['5分（很满意）', '4分（满意）', '3分（一般）', '2分（不满意）', '1分（很差）'],
    rateIndex: 0,
    clsList: [],
    //支出分类     0       1       2      3       4      5       6       7      8       9
    exClsList: ['饮食', '服饰', '运动', '学习', '交通', '娱乐', '日用', '电子', '通讯', '其他'],
    //收入分类
    inClsList: ['生活费', '兼职', '奖学金', '其他'],
    specificCls: Array(10),
    subType: '',
    subTypeBrand: '',

    subTypeAndBrand:[[],[]],
    index: [0, 0],
    flag: false,

    exName: false,
    exDate: false,
    exNote: false,
    exRate: false,

    inDate: false,
    inNote: false,

  },

  //改变 (支出/收入) Tab页
  changeTab: function(event) {
    if (this.data.curTab != event.target.dataset.cur) {
      this.setData({
        curTab: event.target.dataset.cur
      })
    }
  },

  swiperTab: function(event) {
    this.setData({
      curTab: event.detail.current
    })
  },

  //改变支出类型
  changeExCls: function (event) {
    if (this.data.exCls !== event.target.dataset.cur) {
      this.setData({
        exCls: event.target.dataset.cur
      })

      var specificCls = this.data.specificCls
      if (typeof(specificCls[this.data.exCls]) != 'undefined') {
        var subType = specificCls[this.data.exCls].subType,
            subTypeBrand = specificCls[this.data.exCls].subTypeBrand[0]
        var subTypeAndBrand = [[],[]]
        subTypeAndBrand[0] = subType
        subTypeAndBrand[1] = subTypeBrand
        this.setData({
          flag: true,
          subTypeAndBrand: subTypeAndBrand,
          subType: subType[0],
          subTypeBrand: subTypeBrand[0]
        })
      } else {
        this.setData({
          flag: false,
          subTypeAndBrand: [[],[]],
          subType: '',
          subTypeBrand: '',
        })
      }
    }
  },

  //改变收入类型
  changeInCls: function (event) {
    if (this.data.inCls !== event.target.dataset.cur) {
      this.setData({
        inCls: event.target.dataset.cur
      })
    }
  },

  //打开或关闭 名称选项
  switchName: function (event) {
    var status;
    if(this.data.curTab == 0) {
      status = !this.data.exName;
      this.setData({
        exName: status
      })
    } else if (this.data.curTab == 1) {
      status = !this.data.inName;
      this.setData({
        inName: status
      })
    }
  },

  //打开或关闭 日期选项
  switchDate: function (event) {
    var status;
    if (this.data.curTab == 0) {
      status = !this.data.exDate;
      this.setData({
        exDate: status
      })
    } else if (this.data.curTab == 1) {
      status = !this.data.inDate;
      this.setData({
        inDate: status
      })
    }
  },

  changeRate: function (e) {
    this.setData({
      rateIndex: e.detail.value
    })
  },
  //日期选择
  changeDate: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  switchRate: function (event) {
    var status;
    if (this.data.curTab == 0) {
      status = !this.data.exRate;
      this.setData({
        exRate: status
      })
    }
  },
  //打开关闭 备注选项
  switchNote: function (event) {
    var status;
    if (this.data.curTab == 0) {
      status = !this.data.exNote;
      this.setData({
        exNote: status
      })
    } else if (this.data.curTab == 1) {
      status = !this.data.inNote;
      this.setData({
        inNote: status
      })
    }
  },

  //获取金额
  getPrice: function(event) {
    if (this.data.curTab == 0) {
      this.setData({
        exprice: event.detail.value
      });
    } else if (this.data.curTab == 1) {
      this.setData({
        inprice: event.detail.value
      });
    }
  },

  checkPrice: function(event) {
    if(this.data.curTab == 0) {
      this.setData({
        exprice: parseFloat(this.data.exprice)
      })
    } else if(this.data.curTab == 1) {
      this.setData({
        inprice: parseFloat(this.data.inprice)
      })
    }
  },

  //获取名称
  getName: function(event) {
    if(this.data.curTab == 0) {
      this.setData({
        exname: event.detail.value
      });
    } else if(this.data.curTab == 1) {
      this.setData({
        inname: event.detail.value
      });
    }
  },

  getBrand: function(event) {
    this.setData({
      exbrand: event.detail.value
    })
  },

  //获取备注
  getNote: function(event) {
    if (this.data.curTab == 0) {
      this.setData({
        exnote: event.detail.value
      })
    } else if (this.data.curTab == 1) {
      this.setData({
        innote: event.detail.value
      })
    }
  },

  //子分类与品牌 选择器数值改变
  subtbChange: function (event) {
    this.setData({
      index: event.detail.value
    })
    this.setData({
      subType: this.data.subTypeAndBrand[0][this.data.index[0]],
      subTypeBrand: this.data.subTypeAndBrand[1][this.data.index[1]]
    })
  },

  //子分类与品牌列值改变 数据调整
  subtbColumnChange: function (event) {
    var index = this.data.index
    index[event.detail.column] = event.detail.value
    this.setData({
      index: index
    })
    if(event.detail.column == 0) {
      var subTypeAndBrand = this.data.subTypeAndBrand
      index[1] = 0
      subTypeAndBrand[1] = this.data.specificCls[this.data.exCls].subTypeBrand[event.detail.value]
      console.log(subTypeAndBrand[1])
      this.setData({
        index: index,
        subTypeAndBrand: subTypeAndBrand,
      })
    }

    this.setData({
      subType: this.data.subTypeAndBrand[0][this.data.index[0]],
      subTypeBrand: this.data.subTypeAndBrand[1][this.data.index[1]]
    })
  },

  //保存当前记账
  submit: function(event) {
    if(this.data.curTab == 0) {
      if(this.data.exprice != '' && this.data.exname != '') {
        //金额验证
        if (/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(this.data.exprice)==false){
          wx.showToast({
            title: '金额格式不正确!',
            icon: 'none',
            duration: 1000,
            mask: true,
          })
          return;
        }
        //定义准备提交的数据
        var data = {
          bType: '支出',
          money: this.data.exprice,
          saveTime: this.data.date + ' 00:00:00',
          gType: this.data.exClsList[this.data.exCls],
          gDetail: this.data.exname,
          extraInfo: this.data.exnote,
        }
        if (this.data.exClsList[this.data.exCls] == '其他') {
          
        }
        else {
          data.gType2 = this.data.subType
          data.gType4 = this.data.subTypeBrand
        }

        if(this.data.exRate == true) {
          data.gType4Id = 5 - this.data.rateIndex
        }

      } else {
        var title;
        if(this.data.exprice == '') {
          title = '请输入金额'
        } else {
          title = '请输入商品名称'
        }
        wx.showToast({
          title: title,
          icon: 'none',
          duration: 1000,
          mask: true,
        })
        return;
      }
    } else {
      if (this.data.inprice != '') {
        //金额格式验证
        if (/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(this.data.exprice) == false) {
          wx.showToast({
            title: '金额格式不正确!',
            icon: 'none',
            duration: 1000,
            mask: true,
          })
          return;
        }
        var data = {
          bType: '收入',
          money: this.data.inprice,
          saveTime: this.data.date + ' 00:00:00',
          gType: this.data.inClsList[this.data.inCls],
          extraInfo: this.data.innote,
        };
      } else {
        wx.showToast({
          title: '请输入金额',
          icon: 'none',
          duration: 1000,
          mask: true,
        })
        return;
      }
    }
    console.log(data);
    var that = this;
    server.request("/bill/addBillWithTypes", data, function(res){
      if(res.data.statusCode) {
        wx.showToast({
          title: '保存成功',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        that.setData({
          exName: false,
          exDate: false,
          exNote: false,
          exRate: false,
          inDate: false,
          inNote: false,
          exprice: '',
          exname: '',
          exnote: '',
          rateIndex: 0,
          flag: false,
          subTypeAndBrand: [[],[]],
          index: [0, 0],
          subType: '',
          subTypeBrand: '',
          inprice: '',
          innote: '',
          inCls: 3,
          exCls: 9,
        })
      } else {
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync("userInfo");
    var userInfoTime = wx.getStorageSync("userInfoTime");
    if(userInfo==""||userInfo==null || new Date().getTime()-userInfoTime>24*60*60*1000){
      //是否授权用户信息
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                wx.setStorageSync("userInfo",res.userInfo);
                wx.setStorageSync("userInfoTime", new Date().getTime())
                var data={
                  avatarUrl:res.userInfo.avatarUrl,
                  city: res.userInfo.city,
                  country: res.userInfo.country,
                  gender: res.userInfo.gender,
                  language: res.userInfo.language,
                  nickName: res.userInfo.nickName,
                  province: res.userInfo.province
                }
                server.request('/userInfo/addUserInfo',data,function(res){
                })
              }
            });
          } else {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
    }

    var cur = new Date();
    var date = [cur.getFullYear(), cur.getMonth() + 1, cur.getDate()].join('-');
    
    this.setData({
      date: date
    })
    
    var that = this;
    server.request("/gtype/getType", '', function (res) {
      if (res.data.statusCode === 1) {
        that.setData({
          clsList: res.data.data.gtypes
        });
      }
    });

    server.request("/recommend/getRecommendType", '', function (res) {
      if (res.data.statusCode === 1) {
        var rcm = res.data.data.recommend
        that.setData({
          rData: res.data.data.recommend
        });

        var prevType = that.data.exClsList[0]
        var prevSubType = rcm[0].rName
        var specificCls = new Array(10)
        var subType = new Array
        var subTypeBrand = new Array
        var brand = new Array

        for(var i=0; i < rcm.length; i++) {
          if(rcm[i].rType == prevType) {
            if (rcm[i].rName == prevSubType) {
              brand.push(rcm[i].rBrand)
            } else {
              subType.push(prevSubType)
              subTypeBrand.push(brand)
              prevSubType = rcm[i].rName
              brand = []
              i--
            }
          } else {
            subType.push(prevSubType)
            subTypeBrand.push(brand)
            specificCls[rcm[i - 1].rId.toString().charAt(0) - 1] = {
              type: prevType,
              subType: subType,
              subTypeBrand: subTypeBrand
            }

            prevType = rcm[i].rType
            prevSubType = rcm[i].rName
            subTypeBrand = []
            subType = []
            brand = []
            i--
          }
        }
        subType.push(prevSubType)
        subTypeBrand.push(brand)
        specificCls[rcm[i - 1].rId.toString().charAt(0) - 1] = {
          type: prevType,
          subType: subType,
          subTypeBrand: subTypeBrand
        }

        that.setData({
          specificCls: specificCls
        })
        console.log(specificCls)
      }
    });

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