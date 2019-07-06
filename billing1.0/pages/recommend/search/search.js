// pages/recommend/search/search.js

const server = require("../.../../../../utils/server.js");
var util = require("../.../../../../utils/util.js");
var bmap = require('../../../utils/bmap-wx.js');
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

  // getlocation: function(e) {
  //   var that = this;
  //   wx.getLocation({
  //     type: 'wgs84', //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标 
  //     success: function(res) {

  //       // success  
  //       that.setData({
  //         longitude: res.longitude,
  //         latitude: res.latitude
  //       })
  //       console.log("location");
  //       console.log(that.data.longitude);
  //       console.log(that.data.latitude);
  //       if (res && res.longitude && res.latitude) {
  //         that.loadcity(that.data.longitude, that.data.latitude);
  //       } else {
  //         that.setData({
  //           city: '获取失败'
  //         })
  //       }
  //     },
  //     fail: function(res) {
  //       that.setData({
  //         city: "获取失败"
  //       })
  //     },
  //     complete: function(res) {},
  //   });
  // },
  // loadcity: function(longitude, latitude) {
  //   var that = this;
  //   wx.request({
  //     url: 'https://api.map.baidu.com/geocoder/v2/?ak=KsGrzaMhAv1ckezcpqfYQmMqB7Y20eat&location=' + latitude + ',' + longitude + '&output=json',
  //     data: {},
  //     header: {
  //       'Content-Type': 'application/json'
  //     },
  //     success: function(res) {
  //       if (res && res.data) {
  //         var city = res.data.result.addressComponent.city;
  //         console.log('city');
  //         console.log(res);
  //         that.setData({
  //           city: city.indexOf('市') > -1 ? city.substr(0, city.indexOf('市')) : city
  //         });
  //       } else {
  //         that.setData({
  //           city: "获取失败"
  //         })
  //       }
  //       console.log(that.data.city);
  //     }
  //   })
  // },

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

      // // 新建百度地图对象
      // var BMap = new bmap.BMapWX({
      //   ak: 'KsGrzaMhAv1ckezcpqfYQmMqB7Y20eat'
      // });
      // //-----------------------------------------------------------
      // var fail = function(data) {
      //   console.log(data)
      // };
      // var success = function(data) {
      //   var sugData = [];
      //   var result_num = data.result.length;
      //   console.log("0 " + that.data.result_num);
      //   for (var i = 0; i < 3; i++) {
      //     sugData.push(data.result[i].name);
      //   }
      //   // sugData = data.result[0].name;
      //   that.setData({
      //     result: sugData,
      //     result_num: result_num
      //   });
      // }
      // // 发起suggestion检索请求
      // BMap.suggestion({
      //   query: input_result.rBrand,
      //   region: that.data.city,
      //   city_limit: true,
      //   fail: fail,
      //   success: success
      // });
      // console.log("1 " + that.data.result_num);
      // console.log("result");
      // console.log(that.data.result);
      // //-------------------------------------------------------------
      // var sear_fail = function(data) {
      //   console.log("fail" + data);
      // };
      // var sear_success = function(data) {
      //   //所有实体店地址
      //   console.log("success");
      //   console.log("wxMarkerData");
      //   wxMarkerData = data.wxMarkerData;
      //   console.log(wxMarkerData);
      //   that.setData({
      //     markers: wxMarkerData,
      //   });
      //   if(that.data.markers.length !=0){
      //     //清空之前搜索记录
      //     var testarr = [];
      //     that.setData({
      //       searchlist: []
      //     })

      //     for (var length = wxMarkerData.length, count = 0, id = item_id; count < length; count++ , id++) {
      //       //迁移上一个循环结果
      //       var add_searchlist = that.data.searchlist;
      //       // //testitem，角标压栈
      //       // var testitem = count;
      //       // testarr.push(testitem);
      //       // console.log('testarr');
      //       // console.log(testarr);
      //       //item，对象创建
      //       var item = that.data.search_item;
      //       console.log("id" + item_id);
      //       item.id = item_id++;
      //       item.img = that.imgOf(input_result.rType);
      //       item.shoptitle = wxMarkerData[count].title;
      //       item.address = wxMarkerData[count].address;
      //       item.type = input_result.rType;
      //       item.like = input_result.rLike;
      //       console.log("item");
      //       console.log(item);
      //       //item，对象压栈
      //       add_searchlist.push(item);
      //       console.log("add_searchlist");
      //       console.log(add_searchlist);
      //       //list扩充
      //       that.setData({
      //         searchlist: add_searchlist
      //       });
      //       console.log("searchlist");
      //       console.log(that.data.searchlist[count]);
      //       console.log("searchlist");
      //       console.log(that.data.searchlist);
      //     }
      //     //一次搜索得出的list
      //     console.log("searchlist");
      //     console.log(that.data.searchlist);
      //   }
      //   else {
      //     that.setData({
      //       searchSuccess: 0,
      //       unsearch: '附近没有相关实体店'
      //     })

      //   }
      // }
      // // 发起POI检索请求
      // console.log("count" + count + "result_num" + that.data.result_num);
      // // for(count=0;count<that.data.result_num;count++){
      // console.log(count + ":" + that.data.result[count]);
      // BMap.search({
      //   "query": that.data.result[0],
      //   fail: sear_fail,
      //   success: sear_success
      // });
      // }
      //---------------------------------------------------------------
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
  // write: function(e) {
  //   console.log(this.data.sugData);
  //   this.setData({
  //     sugData: this.data.result,
  //     result: ''
  //   })
  //   console.log(this.data.sugData);
  // },
  // showSearchInfo: function(data, i) {
  //   var that = this;
  //   console.log(data);
  //   that.setData({
  //     shoptitle: '名称：' + data[i].title + '\n',
  //     address: '地址：' + data[i].address + '\n',
  //     tel: '电话：' + data[i].telephone
  //   });
  // },
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