// pages/production/waterReport/waterReport.js
// 引入公共函数
import * as util from '../../../utils/util.js'

// 引入封装好的函数
import {
  ProductionModel
} from '../../../models/production.js'

const productionModel = new ProductionModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 日期(会随着日期改变而改变) -- 筛选框的时间
    date: util.dateFormatter("yyyy-MM-dd"),
    // 日期(只会在筛选时，点击确定后才改变) -- 顶部时间
    date1: util.dateFormatter("yyyy-MM-dd"),
    // 清空日期输入框的小叉是否显示
    isClearShow: false,
    // 类选择(弹窗动画)
    animate: 'showBox',
    // 筛选框显示
    yesorno: 'none',
    // 是否隐藏
    hidden: true,
    // 厂站名称数据
    netArray: [],
    // 厂站选中的值
    netValue: "",
    // 水质报表数据
    waterReportData:[],
    // 没有数据的图片
    noDataImage: '../../../asset/imgs/app/noData.png'
  },

  submit(){
    wx.navigateTo({
      url: "pages/production/production"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFactoryInfo();
  },

  // 选择时间
  selectDateTime() {

  },

  // 更换选择时间
  bindDateChange(e) {
    this.setData({
      date: e.detail.value,
      isClearShow: true
    })
  },

  // 清楚选择的时间
  clearTap() {
    this.setData({
      date: "",
      isClearShow: false
    })
  },

  // 显示筛选框
  showBox() {
    this.setData({
      yesorno: 'block',
      animate: 'showBox',
      hidden: false
    });
  },

  // 隐藏筛选框
  hiddenBox() {
    this.setData({
      animate: 'hiddenBox',
      hidden: true,
      date1: this.data.date
    });
    this.getWaterReport();
  },

  // 获取厂站信息
  getFactoryInfo() {
    productionModel.getFactoryInfo().then(res => {
      this.sortFactoryInfo(res.data);
      this.getWaterReport();
    })
  },

  // 获取水质报表数据
  getWaterReport() {
    productionModel.getWaterReport(this.data.date1, this.data.netValue).then(res => {
      this.setData({
        waterReportData: res.data
      })
    })
  },

  // 整理厂站信息
  sortFactoryInfo(data) {
    const array = this.data.netArray;
    for (var i = 0; i < data.length; i++) {
      array.push({
        name: data[i].stationName,
        value: data[i].stationNum
      })
    }
    this.setData({
      netArray: array,
      netValue: data[0].stationNum
    })
  },

  // 切换厂站
  changeNet(e) {
    this.setData({
      netValue: e.currentTarget.dataset.num
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