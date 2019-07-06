// pages/recommend/search/search.js

const server = require("../.../../../../utils/server.js");
var util = require("../.../../../../utils/util.js");
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    input: true,
    curTab: 0,
    latitude: '',
    longitude: '',
    city: '',

    types: [],
    recolist: [],
    searchResult: [],
    searchSuccess: 0,
    unsearch: '请输入搜索内容',

    result: [],
    result_num: '',

    markers: [],
    shoptitle: '',
    address: '',
    searchlist: [],
    search_item: {
      id: '',
      img: '',
      shoptitle: '',
      type: '',
      address: '',
      like: ''
    }
  },
  // 绑定input输入
  bindKeyInput: function(e) {
    var item_id = 500;
    var that = this;
    if (!e.detail.value) {
      that.setData({
        searchSuccess: 0,
        searchlist: [],
        unsearch: '请输入搜索内容'
      })
    } else {
      var count = 0;
      var list = [];
      var input_result = e.detail.value //that.searchforBrand(e.detail.value);
      var curtype = that.searchtypes(input_result); // input -> type
      console.log('input_result' + input_result);
      if (curtype) {
        that.setData({
          searchSuccess: 1
        });
        server.requestWithoutLoading("/recommend/searchByName?name="+curtype, '', function(res) {
          console.log(res.data.data.recommend);
          list = res.data.data.recommend;
          that.inorder(list, 0 ,list.length-1);
          console.log(list); 
          that.setData({
            searchlist: list
          })
        });
      }
      else{
          that.setData({
            searchSuccess: 0,
            unsearch: '没有相关商品'
          })
      }
    };
  },
  searchtypes: function(e) {
    var that = this;
    var list = that.data.types;
    for (var i = 0; i < list.length; i++) {
      if (list[i].indexOf(e) >= 0) {
        console.log('包含类型' + e);
        return list[i];
      } else if (i == list.length && list[i].indexOf(e)) {
        console.log('不包含类型' + e);
        that.setData({
          searchSuccess: 0,
          unsearch: '未搜索到相关内容'
        })
        return 0;
      }
    }
  },
  /**
   * 页面的初始数据
   */
  inorder: function (arr, start, end) {
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
  toRecommend: function(e) {
    wx.navigateBack({
      url: '/pages/recommend/recommend',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    let types = JSON.parse(options.types);
    console.log(types);
    let data = JSON.parse(options.recolist);
    console.log(data);
    that.setData({
      recolist: data,
      types: types
    })
    console.log('recolist');
    console.log(that.data.recolist);
    console.log(that.data.searchlist);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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