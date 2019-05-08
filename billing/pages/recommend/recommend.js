// pages/recommend/recommend.js
var app = getApp();
const server = require("../.../../../utils/server.js");
var util = require("../.../../../utils/util.js");
Page({
  data: {
    recolist: [],
    personallist:[],
    types:[],
    curTab: 7,
    curType: '推荐',
    recommend: true,
    foodShow: false,
    studyShow: false,
    sportShow: false,
    clothShow: false,
    electShow: false,
    enterShow: false,
    traffShow: false,
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    server.requestWithoutLoading("/recommend/getRecommendWithUId", '', function (res) {
      console.log("personallist");
      console.log(res);
      that.setData({
        personallist: res.data.data.recommend,
      });
    });
    server.requestWithoutLoading("/recommend/getRecommend", '', function(res) {
      var list = res.data.data.recommend;
      console.log(list.length);
      that.inorder(list, 0, list.length-1);
      console.log("list");
      console.log(list);
      that.setData({
        recolist: list,
      });
      that.counttypes();
    });
    
  },

  counttypes:function(){
    var that = this;
    var list = that.data.recolist;
    var typelist = [];
    console.log(list);
    for(var i=0; i<list.length; i++){
      if(!that.isInTypes(typelist,list[i].rName)){   // 0:not in, 1: in
        typelist.push(list[i].rName);
      }
    }
    that.setData({
      types: typelist
    })
    console.log('types');
    console.log(that.data.types);
  },

  isInTypes:function(list,e){
    for(var i=0; i<list.length; i++){
      if(list[i] == e){
        return 1;
      }
    }
    return 0;
  },

  changeTab: function(event) {
    var that = this;
    if (that.data.curTab == event.target.dataset.cur) {
      return false;
    } else {
      that.setData({
        curTab: event.target.dataset.cur
      })
    }

    if (this.data.curTab == 0) {
      this.setData({
        recommend: false,
        foodShow: true,
        studyShow: false,
        sportShow: false,
        clothShow: false,
        electShow: false,
        enterShow: false,
        traffShow: false,curType: '饮食'
      })
    }else if (this.data.curTab == 1) {
      this.setData({
        recommend: false,
        foodShow: false,
        studyShow: true,
        sportShow: false,
        clothShow: false,
        electShow: false,
        enterShow: false,
        traffShow: false,curType: '学习'
      })

    } else if (this.data.curTab == 2) {
      this.setData({
        recommend: false,
        foodShow: false,
        studyShow: false,
        sportShow: false,
        clothShow: true,
        electShow: false,
        enterShow: false,
        traffShow: false,curType: '运动'
      })
    } else if (this.data.curTab == 3) {
      this.setData({
        recommend: false,
        foodShow: false,
        studyShow: false,
        sportShow: false,
        clothShow: true,
        electShow: false,
        enterShow: false,
        traffShow: false,curType: '服饰'
      })
    } else if (this.data.curTab == 4) {
      this.setData({
        recommend: false,
        foodShow: false,
        studyShow: false,
        sportShow: false,
        clothShow: false,
        electShow: true,
        enterShow: false,
        traffShow: false,curType: '电子'
      })
    } else if (this.data.curTab == 5) {
      this.setData({
        recommend: false,
        foodShow: false,
        studyShow: false,
        sportShow: false,
        clothShow: false,
        electShow: false,
        enterShow: true,
        traffShow: false,curType: '娱乐'
      })
    } else if (this.data.curTab == 6) {
      this.setData({
        recommend: false,
        foodShow: false,
        studyShow: false,
        sportShow: false,
        clothShow: false,
        electShow: false,
        enterShow: false,
        traffShow: true,curType: '交通'
      })
    } else if (this.data.curTab == 7) {
      this.setData({
        recommend: true,
        foodShow: false,
        studyShow: false,
        sportShow: false,
        clothShow: false,
        electShow: false,
        enterShow: false,
        traffShow: false, curType: '推荐'
      })
    }
  },
  toSearch: function(e) {
    console.log('recommend');
    console.log(this.data.recolist);
    let data = JSON.stringify(this.data.recolist);
    let types = JSON.stringify(this.data.types);
    wx.navigateTo({
      url: '/pages/recommend/search/search?recolist=' + data+'&types=' + types,
    })
  },
  inorder: function(arr, start, end) {
    var that = this;
    if (start > end) {
      return;
    }
    let i = start,
      j = end,
      pivot = arr[start]; //存放基准数
    while (i !== j) {
      // 从右边开始，找第一个小于基准的位置
      while (parseFloat(arr[j].rLike) <= parseFloat(pivot.rLike) && i < j) {
        j--;
      }
      // 从左边开始，找第一个大于基准的位置
      while (parseFloat(arr[i].rLike) >= parseFloat(pivot.rLike) && i < j) {
        i++;
      }
      // 交换两个数
      if (i < j) {
        let tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
    }
    // 最后把基准数归位
    arr[start] = arr[i];
    arr[i] = pivot;
    // 递归处理左边
    that.inorder(arr, start, i - 1);
    // 递归处理右边
    that.inorder(arr, i + 1, end);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})