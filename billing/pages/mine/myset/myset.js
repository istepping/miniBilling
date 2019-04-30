var app = getApp();
const server = require("../../../utils/server.js");
Page({

    data: {
      userId:0,
      gradeIndex: 0,
      sexIndex:0,
      gradeRange:
       [{ id: 0, year: '2012' },
       { id: 1, year: '2013' }, 
       { id: 2, year: '2014' },
       { id: 3, year: '2015' },
       { id: 4, year: '2016' },
       { id: 5, year: '2017' },
       { id: 6, year: '2018' },
       { id: 7, year: '2019' },
       { id: 8, year: '2020' }],   
      sex: [
        { id: 0, selectSex: '男' },
        { id: 1, selectSex: '女' }],   
      userGrade:'2018',
      userSex:'男',
      school: '',
      avatar: '',
      name: '',
      date:'请填写',
      value:'>', 
  },
  
  onLoad: function () {
    var that = this;
    var preGrade;
    server.request("/user/getUserInfo",'', function (res) {
      console.log("user");
        that.setData({
        userId: res.data.data.user.uId,
        userSex: res.data.data.user.uGender,
        userGrade: res.data.data.user.uGrade,
        school:res.data.data.user.uSchool,
      })
    });
    },
onShow: function () {
  var that = this;
  server.request("/userInfo/getUserInfo", '', function (res) {
    console.log(res);
    that.setData({
      avatar: res.data.data.userInfo.uAvatarurl,
      name: res.data.data.userInfo.uNickname
    })
  });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindyearChange:function(e){
    this.setData({
      year:e.detail.value
    })
  },
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      gradeIndex: e.detail.value,
      userGrade: this.data.gradeRange[e.detail.value].year
    });
    console.log(gradeIndex);
    console.log(this.data.gradeRange[e.detail.value].year);
  }, 
  bindSexChange: function (e) {
    this.setData({
      sexIndex: e.detail.value,
      userSex:this.data.sex[e.detail.value].selectSex
    })
  },
  blurName: function (e) {
    this.setData({ name: wx.getStorageSync('name') });
  },
  changeSchool: function (e) {
    var schoolName = e.detail.value.trim();
    },
  inputSchool: function (e) {
    this.data.school = e.detail.value;
  },
  submit:function(e){
    var sexIndex= this.data.sexIndex;
    var index = this.data.index;
    var gradeIndex=this.data.gradeIndex;
    var data={
        uDate:this.data.date,
        uSchool:this.data.school,
        uGender:this.data.sex[sexIndex].selectSex,
        uGrade:this.data.gradeRange[gradeIndex].year,
    }
    console.log(data);
    server.request("/user/updateInfo", data, function (res) {
    });
    wx.showToast({
      title: '提交成功',
      icon: 'none',
    })
  }
})
