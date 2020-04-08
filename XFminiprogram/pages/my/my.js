// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  // 修改用户信息按钮
  editMessage(){
    // wx.navigateTo({
    //   url: '/pages/my/password/password?title=修改密码'
    // })
    wx.showToast({
      title: "该功能尚未开发",
      icon: 'none',
      duration: 2000
    })
  },

  // 水质记录按钮
  waterQualityRecord() {
    wx.navigateTo({
      url: '/pages/my/record/record?title=水质记录'
    })
  },

  // 进出水报表记录按钮
  inAndOutWaterRecord() {
    wx.navigateTo({
      url: '/pages/my/recordPlus/recordPlus?title=进出水记录'
    })
  },

  // 能耗记录按钮
  energyConsumptionRecords() {
    wx.navigateTo({
      url: '/pages/my/recordPlus/recordPlus?title=能耗记录'
    })
  },

  // 历史上报按钮
  historyReported(){
    wx.navigateTo({
      url: '/pages/my/history/history?title=历史上报'
    })
  },

  exitSystem(){
    getApp().globalData.userInfo = null;
    wx.reLaunch({
      url: '../login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: getApp().globalData.userInfo
    })
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