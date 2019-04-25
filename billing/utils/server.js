const baseUrl ="https://www.billingf.xyz/billing"
const testUrl ="http://127.0.0.1:8080"

const actualUrl=baseUrl
const validTime=50*60*1000;
const requestWithoutLoading = (url, data = '', callBack, method = 'GET') => {
  console.log("发出请求:" + actualUrl + url);
  console.log("请求参数:");
  console.log(data);
  var token = wx.getStorageSync("token");
  var tokenTime = wx.getStorageSync("tokenTime");
  var myUrl = actualUrl + url;
  if (token == "" || token == null || tokenTime == null || new Date().getTime() - tokenTime > validTime) {
    console.log(token);
    console.log("登陆");
    userLogin(myUrl, data, callBack, method);
  } else {
    getDataWithoutLoading(myUrl, data, callBack, method, token);
  }
}
const getDataWithoutLoading = (url, data = '', callBack, method = 'GET', token = '') => {
  var that = this;
  wx.request({
    url: url,
    data: data,
    method: method,
    header: {
      "Content-Type": method == "GET" ? "application/json" : "application/x-www-form-urlencoded",
      "authorization": token
    },
    success: function (res) {
      wx.hideLoading();
      console.log(url + "请求返回");
      console.log(res);
      if (res.data.message == 'unAuthorization') {
        console.log("未授权");
        userLogin(url, data, callBack, method)
      } else {
        callBack(res);
      }
    },
    fail: function (error) {
      console.log(error);
    }
  })
}
const request = (url, data = '', callBack, method = 'GET')=>{
  console.log("发出请求:" + actualUrl + url);
  console.log("请求参数:");
  console.log(data);
  var token = wx.getStorageSync("token");
  var tokenTime = wx.getStorageSync("tokenTime");
  var myUrl = actualUrl + url;
  if(token=="" || token==null ||tokenTime==null ||new Date().getTime()-tokenTime>validTime)  {
   userLogin(myUrl,data,callBack,method);
  }else{
    getData(myUrl,data,callBack,method,token);
  }
}
const getData=(url,data='',callBack,method='GET',token='')=>{
  showLoading();
  var that = this;
  wx.request({
    url:url,
    data: data,
    method: method,
    header: {
      "Content-Type": method == "GET" ? "application/json" : "application/x-www-form-urlencoded",
      "authorization": token
    },
    success: function (res) {
      wx.hideLoading();
      console.log(url+"请求返回");
      console.log(res);
      if (res.data.message =='unAuthorization'){
        userLogin(url, data, callBack, method)
      }else{
        callBack(res);
      }
    },
    fail: function (error) {
      wx.hideLoading()
      console.log(error);
      failLoading()
    }
  })
}
function userLogin(url, data = '', callBack, method = 'GET'){
  //登陆
  wx.login({
    success: function (res) {
      wx.hideLoading();
      if (res.code) {
        wx.request({
          url: actualUrl + '/user/login',
          data: {
            code: res.code
          },
          success: function (res) {
            console.log(res);
            wx.setStorageSync("token", res.data.data.token)
            wx.setStorageSync("tokenTime", new Date().getTime());
            getDataWithoutLoading(url, data, callBack, method, res.data.data.token);
          },
          fail: function (res) {
            wx.hideLoading();
            console.log(res.errMsg);
          },
          complete: function (res) {
          }
        })
      }
      else {
        console.log("登陆失败");
      }
    }
  })
}
function showLoading() {
  wx.showLoading({
    title: '加载中...'
  })
}
function failLoading() {
  wx.showToast({
    title: '加载失败',
    icon: 'clear'
  })
}

module.exports = {
  request:request,
  requestWithoutLoading:requestWithoutLoading
}