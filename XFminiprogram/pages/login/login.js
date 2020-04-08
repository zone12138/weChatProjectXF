// pages/login/login.js
// 引入md5对密码进行加密
import * as MD5 from '../../lib/md5/md5.min';
// 引入api接口路径
import {api} from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountImage:"../../asset/imgs/login/account.png",
    passwordImage:"../../asset/imgs/login/password.png",
    passwordValue:'',
    passwordClear:false,
    accountClear:false,
    accountValue:'',
    isChecked: true
  },

  // 登录按钮
  login() {
    // 当勾选记住密码时，存储账号和密码
    if (this.data.isChecked){
      wx.setStorage({
        key: 't1',
        data: this.data.accountValue
      })
      wx.setStorage({
        key: 't2',
        data: this.data.passwordValue
      })
    }
    var app = getApp();     // 取得全局App
    // MD5加密
    var password = MD5.hex(this.data.passwordValue);  
    console.log(api.login)
    wx.request({
      url: api.login, //仅为示例，并非真实的接口地址
      data: {
        j_username: this.data.accountValue,
        j_password: password,
        equipmentType:"1"
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res)
        var list = JSON.parse(decodeURIComponent(res.header["Set-Cookie"]).split("=")[1]);
        if (list.ErrorMessage){
          wx.showToast({
            title: list.ErrorMessage,
            icon: 'none',
            duration: 2000
          })
        }else{
          app.globalData.userInfo = list;
          wx.switchTab({
            url: '../index/index',
          })
        }
      }
    })
  },

  // 记住密码checkbox框
  checkboxChange(e){
    this.setData({
      isChecked: !this.data.isChecked
    });
    console.log(this.data.isChecked)
  },

  // 获取用户名输入框内容
  getAccount(e){
    this.setData({
      accountValue: e.detail.value
    })
    // 当输入框的值非空时，显示小叉
    if (this.data.accountValue) {
      this.setData({
        accountClear: true
      })
    }else{
      this.setData({
        accountClear: false
      })
    }
  },

  // 获取密码输入框内容
  getPassword(e){
    this.setData({
      passwordValue: e.detail.value
    })
    // 当输入框的值非空时，显示小叉
    if (this.data.passwordValue) {
      this.setData({
        passwordClear: true
      })
    }else{
      this.setData({
        passwordClear: false
      })
    }
  },

  // 清空输入框
  reset_method(){
    this.setData({
      passwordValue: "",
      accountValue: ""
    })
  },

  // 账号输入框获取焦点
  foucusAccount(){
    // 切换激活图标
    this.setData({
      accountImage:"../../asset/imgs/login/account-selected.png"
    });
    // 当输入框的值非空时，显示小叉
    if (this.data.accountValue){
      this.setData({
        accountClear: true
      })
    }
  },

  // 账号输入框失去焦点
  blurAccount(){
    // 切换灰色图标，隐藏小叉
    this.setData({
      accountImage: "../../asset/imgs/login/account.png",
      accountClear: false
    })
  },

  // 密码输入框获取焦点
  foucusPassword(){
    // 切换激活图标
    this.setData({
      passwordImage: "../../asset/imgs/login/password-selected.png"
    })
    // 当输入框的值非空时，显示小叉
    if (this.data.passwordValue) {
      this.setData({
        passwordClear: true
      })
    }
  },

  // 密码输入框失去焦点
  blurPassword(){
    // 切换灰色图标，隐藏小叉
    this.setData({
      passwordImage: "../../asset/imgs/login/password.png",
      passwordClear: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var accountValue = wx.getStorageSync('t1');
    var passwordValue = wx.getStorageSync('t2');
    if (accountValue){
      this.setData({
        accountValue: accountValue
      })
    }
    if (passwordValue){
      this.setData({
        passwordValue: passwordValue
      })
    }

    console.log(getApp().globalData.userInfo)
    
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