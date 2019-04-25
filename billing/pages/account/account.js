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
    exbrand: '',

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

    clsList: [],
    exClsList: [],
    inClsList: [],
    //支出分类
    //              0       1       2      3       4      5       6       7      8       9
    //exClsList: ['饮食', '服饰', '运动', '学习', '交通', '娱乐', '日用', '电子', '通讯', '其他'],
    //收入分类
    //inClsList: ['生活费', '兼职', '奖学金', '其他'],

    specificCls: [

      //详细分类 一级
      [{
        parent: '饮食',
        children: ['食堂', '餐饮', '甜品', '饮品', '零食', '水果', '外卖', '其他']
      }, {
        parent: '服饰',
        children: ['上衣', '下装', '鞋类', '其他']
      }, {
        parent: '运动',
        children: ['运动锻炼', '相关器材', '其他']
      }, {
        parent: '学习',
        children: ['书写', '收纳', '办公', '英语', 'IT技术', '阅读']
      }, {
        parent: '交通',
        children: ['长途', '短途']
      }, {
        parent: '娱乐',
        children: ['游戏', '电影', '唱歌', '出游', '聚会', '其他']
      }, {
        parent: '日用',
        children: ['日常', '洗护', '洗涤', '其他']
      }, {
        parent: '电子',
        children: ['电脑外设', '移动设备', '生活必备', '其他']
      }, {
        parent: '通讯',
        children: ['上网', '邮寄', '话费', '其他']
      }], 

      //详细分类 二级
      [{
        parent: '上衣',
        children: ['外套', '西装', 'T恤', '背心/马甲', '衬衫', '卫衣', '针织衫/毛衣']
      }, {
        parent: '下装',
        children: ['西裤', '牛仔裤', '休闲裤', '运动裤', '半身裙/连衣裙']
      }, {
        parent: '鞋类',
        children: ['运动鞋', '休闲鞋', '凉鞋', '靴子', '拖鞋', '板鞋']
      }, {
        parent: '其他',
        children: ['背包', '手套', '袜子', '内衣', '帽子', '眼镜']
      }, {
        parent: '运动锻炼',
        children: ['健身', '球类', '瑜伽', '骑行']
      }, {
        parent: '相关器材',
        children: ['球', '球拍', '哑铃', '跳绳', '拉力器', '臂力器', '呼啦圈', '自行车']
      }, {
        parent: '书写',
        children: ['笔', '橡皮', '尺子', '本子', 'A4纸']
      }, {
        parent: '收纳',
        children: ['文具收纳', '文件收纳', '杂物收纳']
      }, {
        parent: '办公',
        children: ['胶', '笔筒', '加字', '美工刀', '钉针系列', '其他']
      }, {
        parent: '英语',
        children: ['新概念英语', '大学四六级', '考研英语', '雅思托福', '其他']
      }, {
        parent: 'IT技术',
        children: ['Java', 'JavaScript', 'Python', 'C/C++', 'HTML', 'CSS', 'SQL', 'Android', 'IOS', 'Linux', '其他']
      }, {
        parent: '长途',
        children: ['飞机', '铁路', '船舶']
      }, {
        parent: '短途',
        children: ['轻轨', '地铁', '打车', '公交车', '共享单车']
      }, {
        parent: '阅读',
        children: ['推理', '小说', '名著', '社科', '传记', '励志', '其他']
      }, {
        parent: '日常',
        children: ['纸巾', '水杯', '毛巾', '化妆']
      }, {
        parent: '洗护',
        children: ['沐浴露', '洗发护发', '牙刷牙膏']
      }, {
        parent: '洗涤',
        children: ['洗衣液', '洗衣粉', '洗洁精', '肥皂']
      }, {
        parent: '电脑外设',
        children: ['鼠标', '键盘', 'U盘', '耳机', '音响', '路由器', '显示器', '打印机', '移动硬盘']
      }, {
        parent: '移动设备',
        children: ['手机', '平板', '笔记本']
      }, {
        parent: '生活必备',
        children: ['排插', '充电', '台灯', '其他']
      }]
    ],

    brand: [{
        type: '上衣',
        brands: ['Nike', 'Adidas', '361', '乔丹', '安踏', '李宁', '特步', '新百伦', '美特斯邦威', '其他']
      }, {
        type: '下装',
        brands: ['Nike', 'Adidas', '361', '乔丹', '安踏', '李宁', '特步', '新百伦', '美特斯邦威', '其他']
      }, {
        type: '鞋类',
        brands: ['Nike', 'Adidas', '361', '乔丹', '安踏', '李宁', '特步', '新百伦', '美特斯邦威', '其他']
      }, {
        type: '相关器材',
        brands: ['红双喜', '斯伯丁', '其他']
      }, {
        type: '书写',
        brands: ['晨光', '爱好', '得力', '三木', '真彩', '其他']
      }, {
        type: '收纳',
        brands: ['晨光', '爱好', '得力', '三木', '真彩', '其他']
      }, {
        type: '办公',
        brands: ['晨光', '爱好', '得力', '三木', '真彩', '其他']
      }, {
        type: '电脑外设',
        brands: ['罗技', '雷蛇', 'cherry', '达尔优', '其他']
      }, {
        type: '移动设备',
        brands: ['华为', '小米', '苹果', 'OPPO', 'VIVO', '戴尔', '华硕', '惠普', '联想', '其他']
      }, {
        type: '电脑周边',
        brands: ['金士顿', '东芝', '其他']
      }, {
        type: '日常',
        brands: ['心相印', 'Vinda', '清风', 'Lock&Lock', '富光', '其他']
      }, {
        type: '洗涤',
        brands: ['立白', '超能', '奥妙', '汰渍', '其他']
      }],
    brandArray: [],
    brandIndex: 0,

    flexColumn: [],
    flexIndex: [],
    specificInfo: '详细分类在这里',

    exName: false,
    exDate: true,
    exNote: false,

    inName: false,
    inDate: true,
    inNote: false,

    markers: [],
    longitude: '',
    latitude: '',
    address: '',
    cityInfo: {}

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

      var specificCls = this.data.specificCls;
      var brand = this.data.brand;
      var exbrand = '';
      var exCls = this.data.exCls;
      var exClass = this.data.exClsList[this.data.exCls].tName;
      var fColumn = new Array;
      var fIndex = new Array;
      var bArray = new Array;
      var bIndex = 0;
      var specificInfo = '';
      if (exCls == 9) {
        
      } else if (exCls == 0 || exCls == 5 || exCls == 8) {
        for (var i = 0; i < specificCls[0].length; i++) {
          if (exClass == specificCls[0][i].parent) {
            fColumn = specificCls[0][i].children;
            fIndex = 0;
            break;
          }
        }
        specificInfo = '>' + fColumn[fIndex];
      } else {
        for (var i = 0; i < specificCls[0].length; i++) {
          if (exClass == specificCls[0][i].parent) {
            fColumn.push(specificCls[0][i].children);
            fIndex.push(0);
            for(var k = 0; k < brand.length; k++) {
              if(fColumn[0][fIndex[0]] == brand[k].type) {
                bArray = brand[k].brands
                bIndex = 0
                exbrand = bArray[bIndex]
                break;
              }
            }
            break;
          }
        }
        for (var j = 0; j < specificCls[1].length; j++) {
          if (fColumn[0][0] == specificCls[1][j].parent) {
            fColumn.push(specificCls[1][j].children);
            fIndex.push(0);
            break;
          }
        }
        for (var i = 0; i < fIndex.length; i++) {
          specificInfo += '>' + fColumn[i][fIndex[i]];
        }
      }
    this.setData({
      exbrand: exbrand,
      flexColumn: fColumn,
      flexIndex: fIndex,
      brandArray: bArray,
      brandIndex: bIndex,
      specificInfo: specificInfo,
    })
        
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
  //更改品牌
  changeBrand: function (event) {
    if(this.data.brandIndex != event.detail.value) {
      var exbrand = this.data.brandArray[event.detail.value]
      if(exbrand == '其他') {
        exbrand = ''
      }
      this.setData({
        brandIndex: event.detail.value,
        exbrand: exbrand,
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

  //日期选择
  changeDate: function (e) {
    this.setData({
      date: e.detail.value
    })
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

  //灵活选择器 选择值
  flexPickerChange: function (event) {
    this.data.flexIndex = event.detail.value;
    var specificInfo = '';

    if(typeof(this.data.flexIndex) == 'object') {
      for (var i = 0; i < this.data.flexIndex.length; i++) {
        specificInfo +=  '>' + this.data.flexColumn[i][this.data.flexIndex[i]];
      }
    } else {
      specificInfo = '>' + this.data.flexColumn[this.data.flexIndex];
    }
    
    this.setData({
      specificInfo: specificInfo,
    })
  },

  //灵活选择器 列值改变 数据调整
  flexPickerColumnChange: function (e) {
    var specificCls = this.data.specificCls;
    var brand = this.data.brand;
    var exCls = this.data.exCls;
    var exClass = this.data.exClsList[this.data.exCls].tName;
    var fColumn = this.data.flexColumn;
    var fIndex = this.data.flexIndex;
    var bArray = new Array;
    var bIndex = 0;
    var specificInfo = '';
    fIndex[e.detail.column] = e.detail.value;

    
    if (e.detail.column == 0) {
      for (var i = 0; i < specificCls[1].length; i++) {
        if (specificCls[1][i].parent == fColumn[0][e.detail.value]) {
          fColumn[1] = specificCls[1][i].children;
          break;
        }
      }
      fIndex[1] = 0;
    }
    for (var i = 0; i < fIndex.length; i++) {
      specificInfo += '>' + fColumn[i][fIndex[i]];
    }

    for (var i = 0; i < brand.length; i++) {
      if (fColumn[0][e.detail.value] == brand[i].type) {
        bArray = brand[i].brands
        bIndex = 0
        break;
      }
    }

    this.setData({
      flexColumn: fColumn,
      flexIndex: fIndex,
      brandArray: bArray,
      brandIndex: bIndex,
      specificInfo: specificInfo,
    })
  },

  //保存当前记账
  submit: function(event) {
    if(this.data.curTab == 0) {
      if(this.data.exprice != '' && this.data.exname != '' && this.data.exbrand != '') {
      //定义准备提交的数据
        var data = {
          bType: '支出',
          money: this.data.exprice,
          saveTime: this.data.date + ' 00:00:00',
          gType: this.data.exClsList[this.data.exCls].tName,
          gType4: this.data.exbrand,
          gDetail: this.data.exname,
          location: this.data.address,
          extraInfo: this.data.exnote
        }
        if (this.data.exClsList[this.data.exCls].tName == '其他') {
          
        }
        else if (typeof (this.data.flexIndex) == 'object') {
          data.gType2 = this.data.flexColumn[0][this.data.flexIndex[0]]
          data.gType3 = this.data.flexColumn[1][this.data.flexIndex[1]]
        } else {
          data.gType2 = this.data.flexColumn[this.data.flexIndex]
        }

      } else {
        var title;
        if(this.data.exprice == '') {
          title = '请输入金额'
        } else {
          title = '请输入商品名称和品牌'
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
        var data = {
          bType: '收入',
          money: this.data.inprice,
          saveTime: this.data.date + ' 00:00:00',
          gType: this.data.inClsList[this.data.inCls].tName,
          gDetail: this.data.inname,
          location: this.data.address,
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
    //金额验证
    if (! /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(data.money)){
      wx.showToast({
        title: '金额格式不正确!',
        icon:'none'
      })
      return;
    }
    server.request("/bill/addBillWithTypes", data, function(res){
      if(res.data.statusCode) {
        wx.showToast({
          title: '保存成功',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        that.setData({
          exprice: '',
          exname: '',
          exnote: '',
          exbrand: '',
          inprice: '',
          inname: '',
          innote: '',
          brandArray: [],
          inCls: 0,
          exCls: 9,
        })
      } else {
        wx.showToast({
          title: '失败',
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
      
      var clsArray = that.data.clsList;
      var data = {
        exArray: [],
        inArray: [],
        specificArray: [],
      }
      for(var i=0; i < clsArray.length; i++) {
        if(clsArray[i].tBelong == '支出') {
          data.exArray.push({tId: clsArray[i].tId, tName: clsArray[i].tName, tBelong: clsArray[i].tBelong});
        } else if(clsArray[i].tBelong == '收入') {
          data.inArray.push({tId: clsArray[i].tId, tName: clsArray[i].tName, tBelong: clsArray[i].tBelong});
        } else if (clsArray[i].tBelong == '通用') {
          data.exArray.push({ tId: clsArray[i].tId, tName: clsArray[i].tName, tBelong: clsArray[i].tBelong });
          data.inArray.push({ tId: clsArray[i].tId, tName: clsArray[i].tName, tBelong: clsArray[i].tBelong });
        }
      }

      that.setData({
        exClsList: data.exArray,
        inClsList: data.inArray,
      })
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