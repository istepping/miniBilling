var app=getApp();
const server=require("../../../../utils/server.js")
Page({
  data: {
    items:[
      {name:"0",value:'父亲'},
      {name:"1",value:'母亲'}],
    focus: false,
    inputValue: '',
    userId:'',
    flag:'0',
  },
  bindKeyInput: function (e) {
    this.setData({
      userId: e.detail.value
    })
    console.log('您的输入id=' + this.data.userId);
  },

  switchChange:function(e){
    var that=this;
    var uflag=Number(e.detail.value);
    that.setData({
        flag:uflag
    })
    console.log('您的flag='+that.data.flag);
    // var data={
    //   flag:Number(e.detail.value)
    //   }
    // server.request("/setting/setParentId", data, function (res) {
    // });
    // server.request("/setting/parentId")
  },
   submit:function(e){
    var that = this;
    var data={
      flag: this.data.flag,
      parentId: this.data.userId
      }
    server.request("/setting/setParentId",data,function(res){
      console.log(res);
    })
     wx.showToast({
       title: '提交成功',
       icon: 'succes',
       duration: 1000,
       mask: true
     })
  },
  radioChange: function (e) {
  this.setData({
    flag:e.detail.value
  })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  bindReplaceInput: function (e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    var left
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }
    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }
    // 或者直接返回字符串,光标在最后边
    // return value.replace(/11/g,'2'),
  },
  bindHideKeyboard: function (e) {
    if (e.detail.value === '123') {
      // 收起键盘
      wx.hideKeyboard()
    }
  },
})
